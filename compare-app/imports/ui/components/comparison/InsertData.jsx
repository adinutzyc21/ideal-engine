import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap'; // eslint-disable-line no-unused-vars
import ReactDOM from 'react-dom';
import { Bert } from 'meteor/themeteorchef:bert';
import { Meteor } from 'meteor/meteor';

/**
 * InsertData component - open modal and allow data insertion in the table
 * by adding to the Row table
 */
export default class InsertData extends Component {
  /**
   * Initialize state variables and bind 'this' to methods
   */
  constructor(props) {
    super(props);

    // initialize state variables
    this.state = {
      showModal: false,
      headerName: '',
    };
    // make this available in these methods
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.setVarsBasedOnLevel = this.setVarsBasedOnLevel.bind(this);

    this.newRowFormHtml = this.newRowFormHtml.bind(this);

    // TODO: change
    this.props.isDisabled = false;

    // set vars based on level
    this.setVarsBasedOnLevel();
  }

  /**
   * Set the variables appropriately
   * depending on the level (row or col) passed in
   */
  setVarsBasedOnLevel() {
    // got a column
    if (this.props.level === 'col') {
      this.title = 'Insert Column';
      this.insertToDB = this.insertColData;
      this.createFormHtml = this.newColFormHtml;

    // Got a row
    } else if (this.props.level === 'row') {
      this.title = 'Insert Row';
      this.insertToDB = this.insertRowData;
      this.createFormHtml = this.newRowFormHtml;

    // this should have failed in proptypes though
    } else {
      Bert.alert('Level is wrong', 'danger', 'growl-bottom-left');
    }
  }

  /**
   * Open the modal window
   */
  openModal() {
    if (!this.props.isDisabled) {
      this.setState({ showModal: true });
    }
  }

  /**
   * Close the modal window
   */
  closeModal() {
    this.setState({ showModal: false, headerName: '' });
  }

  /**
   * Main entry point: show a button link and a modal upon clicking the button
   */
  render() {
    // show the button with the optional modal
    return (
      <a role='button' key='a' onClick={this.openModal}>{this.title}
        <div key='div' className='modal-example'>
          <Modal key='modal' className='modalStyle'
            show={this.state.showModal} onHide={this.closeModal}>

            <div key='form' className='dialogStyle'>
              {this.createModalHtml()}
            </div>
          </Modal>
        </div>
      </a>
    );
  }

  /**
   * Define the modal dialog form
   * @returns the html for the modal form
   */
  createModalHtml() {
    // is this button disabled
    let disabledClass = '';

    let submitCallback = this.handleSubmit;

    if (this.state.headerName.trim().length === 0) {
      disabledClass = 'disabled';
      submitCallback = function (event) { event.preventDefault(); return false; };
    }

    return (
      <form className='new-data' onSubmit={submitCallback} >
        <div className='content-form'> {this.createFormHtml()} </div>

        <button key='button' type='submit' className={'btn btn-primary ' + disabledClass}
          data-toggle='title' data-placement='right' title={this.title}>
          <i className='glyphicon glyphicon-plus' />{this.title}
        </button>
      </form>
    );
  }

  /**
   * Change the criterion/option name in the form dynamically
   */
  handleChangeName(event) {
    this.setState({ headerName: event.target.value });
  }

  /**
   * Create the form for adding a new row based on the columns that we have
   */
  newRowFormHtml() {
    // an array of all the columns in the table
    const cols = this.props.data;

    // the form html that we create below and return
    const formHtml = [];

    // Request the 'Option' header (name) differently from the contents
    formHtml.push(
      <span key='span_row'>
        <span key='header_text' className='input-text form-header' >New Option Name:</span>
        <input type='text' key='header' className='form-header'
          placeholder='New option name'
          value={this.state.headerName}
          onChange={this.handleChangeName}
          ref='optionName' autoFocus />
      </span>);

    /*
    Request all the corresponding information:.
    Fill in the value as well as the score of every criterion for the new option.
    */
    if (this.state.headerName.trim().length !== 0) {
      // TODO: pagination for these!
      for (let i = 1, len = cols.length; i < len; i++) {
        // column headers are unique, so they can be the key
        formHtml.push(
          <span key={'span_row' + i}>
            <span key={'label' + cols[i]._id} className='input-text'>{cols[i].name}: </span>
            <input type='text' key={'value' + cols[i]._id}
              placeholder={'Enter ' + cols[i].name + ' for ' + this.state.headerName}
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
   * Create the form for adding a new column based on the rows that we have.
   */
  newColFormHtml() {
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
          value={this.state.headerName}
          onChange={this.handleChangeName}
          ref='criterionName' />
        <input type='number' key='header_score' name='score' className='form-header'
          min='0' max='10' defaultValue='5' autoComplete='off'
          ref='criterionNameScore' />
      </span>);

    /**
    * Request all the corresponding information:
    * Fill in the value as well as the score of every option for the new criterion.
    */
    if (this.state.headerName.trim().length !== 0) {
      // TODO: pagination for these!
      for (let i = 0, len = rows.length; i < len; i++) {
        // option headers are unique, so they can be the key
        formHtml.push(
          <span key={'span_col' + i} >
            <span key={'label' + rows[i]._id} className='input-text'>
              {rows[i][this.props.optionId].value}:
            </span>
            <input type='text' key={'value' + rows[i]._id}
              placeholder={'Enter ' + this.state.headerName + ' for ' + rows[i][this.props.optionId].value}
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
   * Insert the row data from the form into the MongoDB table.
   */
  insertRowData() {
    // an array of all the columns in the table
    const cols = this.props.data;

    // the id of the column (which is also the key in the corresponding row)
    let colId = '';

    // is this the first row?
    let isFirst = false;

    if (cols.length !== 0) {
      // if there are columns in the table get the header id
      colId = cols[0]._id;
    } else {
      // otherwise create a new header id
      colId = new Meteor.Collection.ObjectID()._str;
      // and mark that this is the first row in the table
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
    rowData.score = 5;


    // set the optionValue & optionValueScore by retrieving the form values via the React ref
    for (let i = 1, len = cols.length; i < len; i++) {
      rowData[cols[i]._id] = {
        value: ReactDOM.findDOMNode(this.refs['optionValue' + i]).value.trim(),
        score: parseInt(ReactDOM.findDOMNode(this.refs['optionValueScore' + i]).value.trim(), 10),
      };
    }

    // insert a row in the Row and Col tables (if isFirst=true, a first column is added to Col)
    Meteor.call('insertRow', this.props.tableId, colId, rowData, isFirst);
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
      score: parseInt(ReactDOM.findDOMNode(this.refs.criterionNameScore).value.trim(), 10),
    };
    // insert the data into the Col table
    Meteor.call('insertColumn', this.props.tableId, colId, colData);

    // for every row, add the corresponding column data to the Row table
    for (let i = 0, len = rows.length; i < len; i++) {
      // create the corresponding column data for this row
      const colDataRow = {
        value: ReactDOM.findDOMNode(this.refs['criterionValue' + i]).value.trim(),
        score: parseInt(ReactDOM.findDOMNode(this.refs['criterionValueScore' + i]).value.trim(), 10),
      };
      // update the Row table by inserting the column associated with colId
      Meteor.call('updateRowInsertColumn', rows[i]._id, colId, colDataRow);
    }
  }

  /**
   * Handle the submit event of the form
   * triggers insertOption
   */
  handleSubmit(event) {
    event.preventDefault();

    this.insertToDB();

    //  Close form modal dialog
    this.closeModal();
  }
}

/**
 * Properties being passed from the parent.
 * data {array} - provides form HTML data
 * tableId {string} - the id of the table we're inserting into
 * level {'row' | 'col'} - is this a column or a row?
 * isDisabled {bool} - is this button enabled or not?
 * optionId {string} - the id of the first column (that is, the id of the 'option name' column)
 */
InsertData.propTypes = {
  data: PropTypes.array,
  tableId: PropTypes.string,
  level: PropTypes.oneOf(['row', 'col']).isRequired,
  isDisabled: PropTypes.bool,
  optionId: PropTypes.string,
};
