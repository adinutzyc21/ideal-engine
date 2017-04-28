import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap'; // eslint-disable-line no-unused-vars
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';

/**
 * InsertColumn component - open modal and allow data insertion in the table
 * by adding to the Row and Col tables
 */
export default class InsertColumn extends Component {
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

    // show the button with the optional modal
    return (
      <a role='button' key='a' onClick={this.open}>Add Column
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
   * Define the form data
   * @returns the html for the form
   */
  createForm() {
    const title = ' Add';

    const formHtml = this.newColForm();

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
   * Create the form for adding a new column based on the rows that we have.
   */
  newColForm() {
    // debugger;
    // an array of all the rows in the table
    const rows = this.props.rows;

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
    const rows = this.props.rows;

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
   * triggers insertColData function
   */
  handleSubmit(event) {
    event.preventDefault();

    this.insertColData();

    //  Close form modal dialog
    this.close();
  }
}

/**
 * Properties being passed from the parent.
 * data {array} - provides form input, either the content for the rows or for the columns
 * tableId {string} - the id of the table we're inserting into TODO:
 * isDisabled {bool} - is this button enabled or not
 * optionIdx {string} - the id of the first column (that is, the option name id)
 */
InsertColumn.propTypes = {
  rows: PropTypes.array,
  tableId: PropTypes.string,
  isDisabled: PropTypes.bool,
  optionIdx: PropTypes.string,
};
