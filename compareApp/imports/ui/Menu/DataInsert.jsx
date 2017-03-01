import React, { Component, PropTypes } from 'react';
import { Modal } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

// DataInsert component - open modal and allow data insertion in table
export default class DataInsert extends Component {
    /**
     * Create the form for adding a new row based on the data that we have
     */
    createFormForOption() {
        var formHtml = [];
        var cols = this.props.data;

        // request the 'Option' header differently from the content
        formHtml.push(
            <span key='span_row0'>
                <span key='header_text' className='input-text form-header' >New Option Name:</span>
                <input type='text' key='header' className='form-header' placeholder='New option name' autoFocus 
                    value={this.state.header} 
                    onChange={this.handleChangeHeader}
                    ref='optionName' />
                <input type='text' key='header_score' name='score' className='form-header score-display' 
                    autoComplete='off' readOnly='true' 
                    value={this.state.optScore} 
                    ref='optionNameScore'/>
            </span>
        );

        // TODO: pagination!
        // column headers are unique, so they can be the key
        // request all the corresponding information
        if (this.state.header.trim().length !== 0) {
            for (var i = 1, len = cols.length; i < len; i++) {
                formHtml.push(
                    <span key={'span_row'+i}>
                        <span key={'label' + cols[i]._id} className='input-text'>{cols[i].name}: </span>
                        <input type='text' key={'value' + cols[i]._id}
                            placeholder={'Input ' + cols[i].name + ' for ' + this.state.header} 
                            ref={'optionValue' + i} />
                        <input type='number' key={'score' + cols[i]._id} name='score' className='input-text'
                            min='1' max='10' defaultValue='5' autoComplete='off' 
                            ref={'optionValueScore' + i} />
                    </span>
                );
            }
        }
        return formHtml;
    }

    /**
     * Insert the row data from the form into the table
     */
    addNewOption() {
        var cols = this.props.data;

        // the id of the column (is also the key in the corresponding row)
        var headerId = '';

        // is this the first column?
        var isFirst = false;

        if (cols.length !== 0) {
            // get the header id
            headerId = cols[0]._id
        }
        else {
            // create a new header id
            headerId = new Meteor.Collection.ObjectID()._str;
            isFirst = true;
        }

        // this is the data we need to insert into the row
        var rowData = {};

        // get the header name separately
        rowData[headerId] = {
            value: ReactDOM.findDOMNode(this.refs.optionName).value.trim()
        };

        // get the overall score for the option TODO: calculate it
        rowData.score = ReactDOM.findDOMNode(this.refs.optionNameScore).value.trim();


        // Find the optionValue & optionValueScore via the React ref
        for (var i = 1, len = cols.length; i < len; i++) {
            rowData[cols[i]._id] = {
                value: ReactDOM.findDOMNode(this.refs['optionValue' + i]).value.trim(),
                score: ReactDOM.findDOMNode(this.refs['optionValueScore' + i]).value.trim()
            };
        }

        // insert the data
        Meteor.call('comparison.insertRow', rowData, headerId, this.props.tableId, isFirst);
    }

    /**
     * Create the form for adding a new column based on the data that we have
     */
    createFormForCriterion() {
        var formHtml = [];
        var rows = this.props.data;

        // Input the column name separately
        formHtml.push(
            <span key='span_col'>
                <span key='header_text' className='input-text form-header'>New Criterion Name:</span>
                <input type='text' key='header' className='form-header' placeholder='New criterion name' autoFocus 
                    value={this.state.header} 
                    onChange={this.handleChangeHeader}
                    ref='colName' />
                <input type='number' key='header_score' name='score' className='form-header' 
                    min='0' max='10' defaultValue='5' autoComplete='off' 
                    ref='colName_score' />
            </span>
        );

        // we have the ids for the input, so use that as a key 
        // request all the corresponding information
        if (this.state.header.trim().length !== 0) {
            for (var i = 0, len = rows.length; i < len; i++) {
                var inputInfo = this.state.header + ' for ' + rows[i][this.props.optionIdx].value;
                formHtml.push(<span key={rows[i]._id + '_text'} className='input-text'>{inputInfo}:</span>);
                formHtml.push(<input key={rows[i]._id} type='text' ref={'textInput' + i}
                    placeholder={'Type to add data for ' + inputInfo} />);
                formHtml.push(<input type='number' name='score' key={rows[i]._id + '_score'} ref={'textInput' + i + '_score'}
                    className='input-text' min='1' max='10' defaultValue='5' autoComplete='off' />);
            }
        }
        return formHtml;
    }


    /**
     * Insert the column data from the form into the table
     * only gets triggered when there's data in the table previously
     */
    addNewCriterion() {
        var rows = this.props.data;

        var colData = {
            name: ReactDOM.findDOMNode(this.refs.colName).value.trim(),
            score: ReactDOM.findDOMNode(this.refs.colName_score).value.trim()
        }

        var colId = new Meteor.Collection.ObjectID()._str;
        Meteor.call('comparison.insertColumn', colData, colId, this.props.tableId);

        for (var i = 0, len = rows.length; i < len; i++) {
            var dataQuery = {
                value: ReactDOM.findDOMNode(this.refs['textInput' + i]).value.trim(),
                score: ReactDOM.findDOMNode(this.refs['textInput' + i + '_score']).value.trim()
            };
            Meteor.call('comparison.updateColumn', dataQuery, colId, rows[i]._id);
        }
    }
    /**
     * Initialize state variables and bind this to methods
     */
    constructor(props) {
        super(props);

        // initialize state variables
        this.state = {
            showModal: false,
            header: '',
            optScore: 5
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
        var title = '';
        switch (this.props.level) {
            case 'row':
                title = ' Add Option';
                break;
            case 'col':
                title = ' Add Criterion';
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
    open(event) {
        if(!this.props.isDisabled){
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
        var formHtml = [];
        var title=' Add';

        switch(this.props.level){
            case 'row':
                formHtml = this.createFormForOption();
                break;
            case 'col':
                formHtml = this.createFormForCriterion();
                break;
        }

        // is this button disabled
        var disabledClass = '';
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
     * Handle the submit event of the form
     * triggers addNewOption or addNewCriterion functions depending on level
     */
    handleSubmit(event) {
        event.preventDefault();

        if (this.props.level === 'row') {
            this.addNewOption();
        }
        else {
            this.addNewCriterion();
        }

        //  Close form
        this.close();
    }
}

/**
  * data: provides form input
  * level: column/row
  * optionIdx: the index of the options item in cols
  TODO: load if tableId is not defined
  */
DataInsert.propTypes = {
    data: PropTypes.array.isRequired,
    level: PropTypes.oneOf(['row', 'col']).isRequired,
    tableId: PropTypes.string,
    optionIdx: PropTypes.string,
    isDisabled: PropTypes.bool
};