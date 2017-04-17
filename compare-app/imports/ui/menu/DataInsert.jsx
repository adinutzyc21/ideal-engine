import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap'; // eslint-disable-line no-unused-vars
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

/**
 * DataInsert component - open modal and allow data insertion in the table
 * by adding to the Row and Col tables
 */
export default class DataInsert extends Component {
  /**
   * Initialize state variables and bind this to methods
   */
  constructor(props) {
    super(props);

    // initialize state variables
    this.state = {
      showModal: false,
      header: '',
      optScore: 5,
    };
    // make this available in these methods
    this.handleChangeHeader = this.handleChangeHeader.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  /**
   * Main entry point: show a button and a modal upon clicking the button
   */
  render() {
    // set the name / title
    let title = '';
    switch (this.props.level) {
      case 'row':
        title = ' Add Option';
        break;
      case 'col':
        title = ' Add Criterion';
        break;
      default:
        break;
    }

    // show the button with the optional modal
    return (
      <a role='button' key='a' onClick={this.open}>{title}
        <div key='div' className='modal-example'>
          <Modal key='modal' className='modalStyle'
            show={this.state.showModal}
            onHide={this.close}>

            <div key='form' className='dialogStyle'>
              {this.createForm()}
            </div>
          </Modal>
        </div>
      </a>
    );
  }

  /**
   * Open the modal window
   */
  open() {
    if (!this.props.isDisabled) {
      this.setState({ showModal: true });
    }
  }

  /**
   * Close the modal window
   */
  close() {
    this.setState({ showModal: false, header: '' });
  }

  /**
   * Define the form data based on the data and level
   * @returns the html for the form
   */
  createForm() {
    let formHtml = [];
    const title = ' Add';

    switch (this.props.level) {
      case 'row':
        formHtml = this.newRowForm();
        break;
      case 'col':
        formHtml = this.newColForm();
        break;
      default:
        break;
    }

    // is this button disabled
    let disabledClass = '';
    if (this.state.header.trim().length === 0) {
      disabledClass = 'disabled';
    }

    return (
      <form className='new-data' onSubmit={this.handleSubmit} >
        <div className='content-form'>
          {formHtml}
        </div>
        <button key='button' type='submit' className={'btn btn-primary ' + disabledClass}
          data-toggle='title' data-placement='right' title={title}>
          <i className='glyphicon glyphicon-plus' />{title}
        </button>
      </form>
    );
  }

  /**
   * Change the criterion/option name in the form dynamically
   */
  handleChangeHeader(event) {
    this.setState({ header: event.target.value });
  }

  /**
   * Create the form for adding a new row based on the columns that we have.
   */
  newRowForm() {
    // an array of all the columns in the table
    const cols = this.props.data;

    // the form html that we create below and return
    const formHtml = [];

    /*
    Request the 'Option' header differently from the contents.
    A header asks for the name of the option and also contains a score field that is not editable.
    */
    formHtml.push(
      <span key='span_row'>
        <span key='header_text' className='input-text form-header' >New Option Name:</span>
        <input type='text' key='header' className='form-header'
          placeholder='New option name' autoFocus
          value={this.state.header}
          onChange={this.handleChangeHeader}
          ref='optionName' />
        <input type='text' key='header_score' name='score' className='form-header score-display'
          autoComplete='off' readOnly='true'
          value={this.state.optScore}
          ref='optionNameScore' />
      </span>);

    /*
    Request all the corresponding information:.
    Fill in the value as well as the score of every criterion for the new option.
    */
    if (this.state.header.trim().length !== 0) {
      // TODO: pagination for these!
      for (let i = 1, len = cols.length; i < len; i++) {
        // column headers are unique, so they can be the key
        formHtml.push(
          <span key={'span_row' + i}>
            <span key={'label' + cols[i]._id} className='input-text'>{cols[i].name}: </span>
            <input type='text' key={'value' + cols[i]._id}
              placeholder={'Enter ' + cols[i].name + ' for ' + this.state.header}
              ref={'optionValue' + i} />
            <input type='number' key={'score' + cols[i]._id} name='score' className='input-text'
              min='1' max='10' defaultValue='5' autoComplete='off'
              ref={'optionValueScore' + i} />
          </span>);
      }
    }
    // return the generated form html
    return formHtml;
  }

  /**
   * Insert the row data from the form into the MongoDB table.
   */
  insertRowData() {
    // an array of all the columns in the table
    const cols = this.props.data;

    // the id of the column (which is also the key in the corresponding row)
    let colId = '';

    // is this the first column/row?
    let isFirst = false;

    if (cols.length !== 0) {
      // if there are columns in the table get the header id
      colId = cols[0]._id;
    } else {
      // otherwise create a new header id
      colId = new Meteor.Collection.ObjectID()._str;
      // and mark that this is the first rown/column in the table
      isFirst = true;
    }

    // the object containing the data we need to insert into the Row table
    const rowData = {};

    // set the name of the Option to the form value from the React ref
    rowData[colId] = {
      value: ReactDOM.findDOMNode(this.refs.optionName).value.trim(),
    };

    // set the overall score for the option to the form value from the React ref
    // TODO: calculate it on the spot (probably in the form)
    rowData.score = ReactDOM.findDOMNode(this.refs.optionNameScore).value.trim();


    // set the optionValue & optionValueScore by retrieving the form values via the React ref
    for (let i = 1, len = cols.length; i < len; i++) {
      rowData[cols[i]._id] = {
        value: ReactDOM.findDOMNode(this.refs['optionValue' + i]).value.trim(),
        score: ReactDOM.findDOMNode(this.refs['optionValueScore' + i]).value.trim(),
      };
    }

    // insert a row in the Row and Col tables (if isFirst=true, a first column is added to Col)
    Meteor.call('comparison.insertRow', this.props.tableId, colId, rowData, isFirst);
  }

  /**
   * Create the form for adding a new column based on the rows that we have.
   */
  newColForm() {
    // an array of all the rows in the table
    const rows = this.props.data;

    // the form html that we create below and return
    const formHtml = [];

    /**
     * Request the 'Criterion' header differently from the contents.
     * A header asks for the name of the criterion and also contains a score
     *    field that is editable, from 0-10.
     */
    formHtml.push(
      <span key='span_col'>
        <span key='header_text' className='input-text form-header'>New Criterion Name:</span>
        <input type='text' key='header' className='form-header'
          placeholder='New criterion name' autoFocus
          value={this.state.header}
          onChange={this.handleChangeHeader}
          ref='criterionName' />
        <input type='number' key='header_score' name='score' className='form-header'
          min='0' max='10' defaultValue='5' autoComplete='off'
          ref='criterionNameScore' />
      </span>);

    /**
    * Request all the corresponding information:
    * Fill in the value as well as the score of every option for the new criterion.
    */
    if (this.state.header.trim().length !== 0) {
      // TODO: pagination for these!
      for (let i = 0, len = rows.length; i < len; i++) {
        // option headers are unique, so they can be the key
        formHtml.push(
          <span key={'span_col' + i} >
            <span key={'label' + rows[i]._id} className='input-text'>
              {rows[i][this.props.optionIdx].value}:
                        </span>
            <input type='text' key={'value' + rows[i]._id}
              placeholder={'Enter ' + this.state.header + ' for ' + rows[i][this.props.optionIdx].value}
              ref={'criterionValue' + i} />

            <input type='number' key={'score' + rows[i]._id} name='score' className='input-text'
              min='1' max='10' defaultValue='5' autoComplete='off'
              ref={'criterionValueScore' + i} />
          </span>);
      }
    }
    // return the generated form html
    return formHtml;
  }

  /**
   * Insert the column data from the form into the MongoDB table.
   * This means inserting into the Col table as well as updating the
   *      Row table with a new corresponding field.
   * Note: The menu option that triggers this is disabled if there's
   *      no data in the table (so first add a row).
   */
  insertColData() {
    // an array of all the rows in the table
    const rows = this.props.data;

    // create a new column ID to be used in both Col and Row tables
    const colId = new Meteor.Collection.ObjectID()._str;

    // the object containing the data we need to insert into the Row table
    const colData = {
      name: ReactDOM.findDOMNode(this.refs.criterionName).value.trim(),
      score: ReactDOM.findDOMNode(this.refs.criterionNameScore).value.trim(),
    };
    // insert the data into the Col table
    Meteor.call('comparison.insertColumn', this.props.tableId, colId, colData);

    // for every row, add the corresponding column data to the Row table
    for (let i = 0, len = rows.length; i < len; i++) {
      // create the corresponding column data for this row
      const colDataRow = {
        value: ReactDOM.findDOMNode(this.refs['criterionValue' + i]).value.trim(),
        score: ReactDOM.findDOMNode(this.refs['criterionValueScore' + i]).value.trim(),
      };
      // update the Row table by inserting the column associated with colId
      Meteor.call('comparison.updateRowInsertColumn', rows[i]._id, colId, colDataRow);
    }
  }

  /**
   * Handle the submit event of the form
   * triggers insertRowData or insertColData functions depending on level
   */
  handleSubmit(event) {
    event.preventDefault();

    if (this.props.level === 'row') {
      this.insertRowData();
    } else {
      this.insertColData();
    }

    //  Close form modal dialog
    this.close();
  }
}

/**
 * Properties being passed from the parent.
 * data {array} - provides form input, either the content for the rows or for the columns
 * level {'row' | 'col'} - is this a column or a row?
 * tableId {string} - the id of the table we're inserting into
 * isDisabled {bool} - is this button enabled or not
 * optionIdx {string} - the id of the first column (that is, the option name id)
 */
DataInsert.propTypes = {
  level: PropTypes.oneOf(['row', 'col']).isRequired,
  data: PropTypes.array.isRequired,
  tableId: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  optionIdx: PropTypes.string,
};
