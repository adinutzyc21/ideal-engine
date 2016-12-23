import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Modal } from 'react-bootstrap';
import ReactDOM from 'react-dom';

// ButtonDelete component - use to add a delete button and perform delete operations
export default class TableCreate extends Component {
    /**
    * Initialize state variables and bind this to methods
    */
    constructor(props) {
        super(props);

        // initialize state variables
        this.state = {
            showModal: false,
            tableName: ""
        };
        // make this available in these methods
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeTableName = this.handleChangeTableName.bind(this);
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
    }

    /** 
     * Change the criterion name in the form dynamically 
     */
    handleChangeTableName(event) {
        this.setState({ tableName: event.target.value });
    }

    /**
     * Handle the submit event of the form
     * triggers insertRow or insertColumn functions depending on level
     */
    handleSubmit(event) {
        event.preventDefault();

        // var cols = this.props.data;
        // var query = {};

        // var headerId = "";
        // if (cols.length !== 0) {
        //     headerId = cols[0]._id
        // }
        // else {
        //     headerId = new Meteor.Collection.ObjectID()._str;
        //     Meteor.call('comparison.insertFirstColumn', headerId);
        // }

        // query.score = ReactDOM.findDOMNode(this.refs.textInput0_score).value.trim();
        // // get the header separately
        // query[headerId] = {
        //     value: ReactDOM.findDOMNode(this.refs.textInput0).value.trim()
        // };

        // // Find the text field via the React ref
        // for (var i = 1, len = cols.length; i < len; i++) {
        //     query[cols[i]._id] = {
        //         value: ReactDOM.findDOMNode(this.refs["textInput" + i]).value.trim(),
        //         score: ReactDOM.findDOMNode(this.refs["textInput" + i + "_score"]).value.trim()
        //     };
        // }
        // Meteor.call('comparison.insertRow', query);

        //  Close form
        this.close();
    }

    /**
     * Display the delete button based on the parameters
     */
    render() {

        // display the button
        return (
            <a role="button" onClick={this.open}>New Table

                <div className='modal-example'>
                    <Modal className='modalStyle'
                        show={this.state.showModal}
                        onHide={this.close}>

                        <div className='dialogStyle'>
                            {this.createForm("New Table")}
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
        var classN = "";
        if (this.state.tableName.trim().length === 0) {
            classN = "disabled";
        }

        return (
            <form className="new-table"
                onSubmit={this.handleSubmit}>
                <div className="content-form">
                    <span key="header_text" className="input-text form-header">New Table Name:</span>
                    <input key="table_name" type="text" ref="tableName" className="form-header"
                        value={this.state.criterion} onChange={this.handleChangeTableName} autoFocus />
                    <span key="description_text" className="input-text form-header">Short Description:</span>
                    <textarea key="table_description" ref="tableDescription" id="tableDescription" rows="3" cols="40"></textarea>
                </div>
                <button key="button" type='submit' className={'btn btn-primary ' + classN}
                    data-toggle='title' data-placement='right' title={title}>
                    <i className='glyphicon glyphicon-plus' />{title}
                </button>
            </form>);
    }

    /**
     * Open the modal window
     */
    open(event) {
        this.setState({ showModal: true });
    }

    /**
     * Close the modal window
     */
    close() {
        this.setState({ showModal: false, tableName: "" });
    }
}
