import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import { Meteor } from 'meteor/meteor';
import { Modal } from 'react-bootstrap'; // eslint-disable-line no-unused-vars

// ButtonDelete component - use to add a delete button and perform delete operations
export default class CreateTable extends Component {
  /**
  * Initialize state variables and bind this to methods
  */
  constructor(props) {
    super(props);

    // initialize state variables
    this.state = {
      showModal: false,
      tableName: '',
      tableDescription: '',
      isPublic: true,
    };
    // make this available in these methods
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleIsPublic = this.toggleIsPublic.bind(this);
    this.handleChangeTableName = this.handleChangeTableName.bind(this);
    this.handleChangeTableDescription = this.handleChangeTableDescription.bind(this);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  /**
   * Change the table name in the form dynamically
   */
  handleChangeTableName(event) {
    this.setState({ tableName: event.target.value });
  }

  /**
   * Change the table description in the form dynamically
   */
  handleChangeTableDescription(event) {
    this.setState({ tableDescription: event.target.value });
  }

  /**
   * Change the table privacy in the form dynamically
   */
  toggleIsPublic(event) {
    // the value is a string
    const pub = !(event.target.value === 'true');
    this.setState({ isPublic: pub });
  }

  /**
   * Handle the submit event of the form
   */
  handleSubmit(event) {
    event.preventDefault();

    const query = {};

    const tableId = new Meteor.Collection.ObjectID()._str;
    query._id = tableId;

    query.name = this.state.tableName;

    query.isPublic = this.state.isPublic;

    if (Meteor.user() === null) {
      query.owner = '';
    } else {
      query.owner = Meteor.user().username;
    }

    query.description = this.state.tableDescription;

    Meteor.call('tables.insertTable', query);

    //  Close form
    this.close();
  }

  /**
   * Display the delete button based on the parameters
   */
  render() {
    // display the button
    return (
      <a role='button' onClick={this.open}>New Table
        <div className='modal-example'>
          <Modal className='modalStyle'
            show={this.state.showModal}
            onHide={this.close}>

            <div className='dialogStyle'>
              {this.createForm('New Table')}
            </div>
          </Modal>
        </div>
      </a>);
  }

  /**
   * Define the form data based on the data and level
   * @returns the html for the form
   */
  createForm(title) {
    let classN = '';
    if (this.state.tableName.trim().length === 0) {
      classN = 'disabled';
    }

    let publicCheckbox = <label key='isPublic' className='input-text tableForm'>
      Public Table</label>;
    if (Meteor.user() !== null) {
      publicCheckbox =
        <span>
          <input type='checkbox' id='isPublic' value={this.state.isPublic}
            checked={this.state.isPublic} onChange={this.toggleIsPublic} />
          <label htmlFor='isPublic' key='isPublic' className='input-text tableForm'>
            Make Public</label>
        </span>;
    }
    return (
      <form className='new-table'
        onSubmit={this.handleSubmit}>
        <div className='content-form'>
          <span key='header_text' className='input-text form-header'>New Table Name:</span>
          <input key='table_name' type='text' className='tableForm'
            value={this.state.tableName} onChange={this.handleChangeTableName} autoFocus />

          {publicCheckbox}

          <span key='description_text' className='input-text form-header'>Short Description:</span>
          <textarea key='table_description' id='tableDescription' rows='3' cols='40'
            value={this.state.tableDescription}
            onChange={this.handleChangeTableDescription} ></textarea>
        </div>

        <button key='button' type='submit' className={'btn btn-primary ' + classN}
          data-toggle='title' data-placement='right' title={title}>
          <i className='glyphicon glyphicon-plus' /> {title}
        </button>
      </form>);
  }

  /**
   * Open the modal window
   */
  open() {
    this.setState({ showModal: true });
  }

  /**
   * Close the modal window
   */
  close() {
    this.setState({ showModal: false, tableName: '', tableDescription: '', isPublic: false });
  }
}
