import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap'; // eslint-disable-line no-unused-vars
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

/**
 * InsertRow component - open modal and allow data insertion in the table
 * by adding to the Row table
 */
export default class InsertRow extends Component {
  /**
   * Initialize state variables and bind 'this' to methods
   */
  constructor(props) {
    super(props);

    // initialize state variables
    this.state = {
      showModal: false,
      optionName: '',
    };
    // make this available in these methods
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    // TODO: change
    this.props.isDisabled = false;
  }

  /**
   * Main entry point: show a button link and a modal upon clicking the button
   */
  render() {
    // show the button with the optional modal
    return (
      <a role='button' key='a' onClick={this.openModal}>Insert Row
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
    this.setState({ showModal: false, optionName: '' });
  }

  /**
   * Define the modal dialog form
   * @returns the html for the modal form
   */
  createModalHtml() {
    // is this button disabled
    let disabledClass = '';

    let submitCallback = this.handleSubmit;

    if (this.state.optionName.trim().length === 0) {
      disabledClass = 'disabled';
      submitCallback = function () { return false; };
    }

    return (
      <form className='new-data' onSubmit={submitCallback} >
        <div className='content-form'> {this.createFormHtml()} </div>

        <button key='button' type='submit' className={'btn btn-primary ' + disabledClass}
          data-toggle='title' data-placement='right' title="Insert Row">
          <i className='glyphicon glyphicon-plus' />Insert Row
        </button>
      </form>
    );
  }

  /**
   * Change the criterion/option name in the form dynamically
   */
  handleChangeName(event) {
    this.setState({ optionName: event.target.value });
  }

  /**
   * Create the form for adding a new row based on the columns that we have
   */
  createFormHtml() {
    // an array of all the columns in the table
    const cols = this.props.cols;

    // the form html that we create below and return
    const formHtml = [];

    // Request the 'Option' header (name) differently from the contents
    formHtml.push(
      <span key='span_row'>
        <span key='header_text' className='input-text form-header' >New Option Name:</span>
        <input type='text' key='header' className='form-header'
          placeholder='New option name'
          value={this.state.optionName}
          onChange={this.handleChangeName}
          ref='optionName' autoFocus />
      </span>);

    /*
    Request all the corresponding information:.
    Fill in the value as well as the score of every criterion for the new option.
    */
    if (this.state.optionName.trim().length !== 0) {
      // TODO: pagination for these!
      for (let i = 1, len = cols.length; i < len; i++) {
        // column headers are unique, so they can be the key
        formHtml.push(
          <span key={'span_row' + i}>
            <span key={'label' + cols[i]._id} className='input-text'>{cols[i].name}: </span>
            <input type='text' key={'value' + cols[i]._id}
              placeholder={'Enter ' + cols[i].name + ' for ' + this.state.optionName}
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
  insertDB() {
    // an array of all the columns in the table
    const cols = this.props.cols;

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
        score: ReactDOM.findDOMNode(this.refs['optionValueScore' + i]).value.trim(),
      };
    }

    // insert a row in the Row and Col tables (if isFirst=true, a first column is added to Col)
    Meteor.call('comparison.insertRow', this.props.tableId, colId, rowData, isFirst);
  }

  /**
   * Handle the submit event of the form
   * triggers insertOption
   */
  handleSubmit(event) {
    event.preventDefault();

    this.insertDB();

    //  Close form modal dialog
    this.closeModal();
  }
}

/**
 * Properties being passed from the parent.
 * cols {array} - provides form HTML data
 * tableId {string} - the id of the table we're inserting into TODO:
 * isDisabled {bool} - is this button enabled or not\
 */
InsertRow.propTypes = {
  cols: PropTypes.array,
  tableId: PropTypes.string,
  isDisabled: PropTypes.bool,
};
