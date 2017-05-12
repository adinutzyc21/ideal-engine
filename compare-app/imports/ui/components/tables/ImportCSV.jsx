import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';

import Papa from 'papaparse';

import { Modal } from 'react-bootstrap'; // eslint-disable-line no-unused-vars

export default class ImportCSV extends Component {
  /**
  * Initialize state variables and bind 'this' to methods
  */
  constructor(props) {
    super(props);
    this.parseCSV = this.parseCSV.bind(this);

    // initialize state variables
    this.state = {
      showModal: false,
    };

    // make this available in these methods
    this.handleSubmit = this.handleSubmit.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.createModalHtml = this.createModalHtml.bind(this);
  }
  /**
     * Handle the submit event of the form
     * triggers insertOption
     */
  handleSubmit(event) {
    event.preventDefault();

    // TODO: move this to private and use Assets
    const filename = ReactDOM.findDOMNode(this.refs.filename).value.trim();// /files/output.csv

    // TODO: check that that file is indeed CSV
    this.parseCSV(filename, this.props.isDisabled);

    //  Close form modal dialog
    this.closeModal();
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

  parseCSV(filename, isDisabled) {
    if (!isDisabled) {
      const self = this;
      Papa.parse(filename, {
        header: false,
        download: true,
        keepEmptyRows: false,
        skipEmptyLines: true,
        complete(result) {
          const data = result.data;

          // insert this into the meteor table
          Meteor.call('importCSV', self.props.tableId, data);
        },
      });
    }
  }

   /**
   * Define the modal dialog form
   * @returns the html for the modal form
   */
  createModalHtml() {
    return (
      <form className='new-data' onSubmit={this.handleSubmit} >
        <div className='content-form'>
          <span key='span_col'>
            <span key='header_text' className='input-text form-header'>Path to file to import</span>
            <input type='text' key='header' className='form-header'
              placeholder='Path to file to import' autoFocus
              ref='filename' />
          </span>

        </div>

        <button key='button' type='submit' className='btn btn-primary '>Import CSV</button>
      </form>
    );
  }

  /**
   * Display the delete button based on the parameters
   */
  render() {
    // show the button with the optional modal
    return (
      <a role='button' key='a' onClick={this.openModal}>Import CSV
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
}

// TODO: documentation
ImportCSV.propTypes = {
  tableId: PropTypes.string,
  isDisabled: PropTypes.bool,
};
