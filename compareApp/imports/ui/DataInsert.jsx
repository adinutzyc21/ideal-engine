import React, { Component, PropTypes } from 'react';
import { Modal } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

// CriteriaHeading component - displays the header of the table
export default class DataInsert extends Component {
    /**
     * Initialize state variables and bind this to methods
     */
    constructor(props) {
        super(props);

        // initialize state variables
        this.state = {
            showModal: false,
            btnClass: "",
            title: "",
            option: "",
            criterion: ""
        };
        // make this available in these methods
        this.handleChangeOption = this.handleChangeOption.bind(this);
        this.handleChangeCriterion = this.handleChangeCriterion.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
    }

    /**
     * Set state variables that depend on level
     */
    componentDidMount() {
        // set the color of the button based on level
        // set the name / tooltip
        if (this.props.level === "col") {
            this.setState({
                btnClass: 'btn btn-sm btn-primary',
                title: 'Add Criterion'
            });
        }
        else {
            this.setState({
                btnClass: 'btn btn-sm btn-info',
                title: 'Add Option'
            });
        }
    }

    /**
     * Define the form data based on the data and level
     * @returns the html for the form
     */
    createForm() {
        var formHtml = [];
        if (this.props.level === 'row') {
            formHtml = this.createFormRow();
        }
        else {
            formHtml = this.createFormColumn();
        }

        return (
            <form className="new-data"
                onSubmit={this.handleSubmit}>
                {formHtml}

                <button key="button" type='submit' className={this.state.btnClass}
                    data-toggle='tooltip' data-placement='right' title={this.state.title}>
                    <i className='glyphicon glyphicon-plus' />{this.state.title}
                </button>
            </form>);
    }

    /**
     * Create the form for adding a new row based on the data that we have
     */
    createFormRow() {
        var formHtml = [];
        var rows = this.props.data;

        // request the "Option" header differently
        formHtml.push(<span key="header_text" className="input-text header">New Option Name:</span>);
        formHtml.push(<input key="header" type="text" ref="textInput0" className="header"
            value={this.state.option} onChange={this.handleChangeOption} placeholder="Type to add new option name" />);

        // column headers are unique, so that can be the key
        // request all the corresponding information
        for (var i = 1, len = rows.length; i < len; i++) {
            var inputInfo = rows[i];
            if (this.state.option.trim().length !== 0) {
                inputInfo = rows[i] + " for " + this.state.option;
            }
            formHtml.push(<span key={rows[i] + "_text"} className="input-text">{inputInfo}:</span>);
            formHtml.push(<input key={rows[i]} type="text" ref={"textInput" + i}
                placeholder={"Type to add data for " + inputInfo} />);
        }

        return formHtml;
    }

    /**
     * Create the form for adding a new column based on the data that we have
     */
    createFormColumn() {
        var formHtml = [];
        var cols = this.props.data;

        // request the column name differently
        formHtml.push(<span key="header_text" className="input-text header">New Criterion Name:</span>);
        formHtml.push(<input key="header" type="text" ref="colName" className="header"
            value={this.state.criterion} onChange={this.handleChangeCriterion} placeholder="Type the new criteria name" />);

        // we have the ids for the input, so use that as a key 
        // request all the corresponding information
        for (var i = 0, len = cols.length; i < len; i++) {
            var inputInfo = cols[i].name;
            if (this.state.criterion.trim().length !== 0) {
                inputInfo = this.state.criterion + " for " + cols[i].name;
            }
            formHtml.push(<span key={cols[i].id + "_text"} className="input-text">{inputInfo}:</span>);
            formHtml.push(<input key={cols[i].id} type="text" ref={"textInput" + i}
                placeholder={"Type to add data for " + inputInfo} />);
        }
        return formHtml;
    }

    /**  
     * Change the option name in the form dynamically
     */
    handleChangeOption(event) {
        this.setState({ option: event.target.value });
    }

    /** 
     * Change the criterion name in the form dynamically 
     */
    handleChangeCriterion(event) {
        this.setState({ criterion: event.target.value });
    }

    /**
     * Handle the submit event of the form
     * triggers insertRow or insertColumn functions depending on level
     */
    handleSubmit(event) {
        event.preventDefault();

        if (this.props.level === "row") {
            this.insertRow();
        }
        else {
            this.insertColumn();
        }

        //  Close form
        this.close();
    }

    /**
     * 
     */
    render() {
        // if there's no data
        if (this.props.hasNoData && this.props.level === "col") {
            return <li><a className="disabled">{this.state.title}</a></li>
        }

        return (
            <li>
                <a role="button" onClick={this.open}>{this.state.title}</a>

                <div className='modal-example'>
                    <Modal className='modalStyle'
                        show={this.state.showModal}
                        onHide={this.close}>

                        <div className='dialogStyle'>
                            {this.createForm()}
                        </div>
                    </Modal>
                </div>
            </li>
        );
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
        this.setState({ showModal: false, option: "", criterion: "" });
    }

    /**
     * Insert the row data from the form into the table
     */
    insertRow() {
        var rows = this.props.data;
        var query = {};

        // get the header separately
        query['Option'] = ReactDOM.findDOMNode(this.refs.textInput0).value.trim();

        // Find the text field via the React ref
        for (var i = 1, len = rows.length; i < len; i++) {
            var textInput = "textInput" + i;
            var text = ReactDOM.findDOMNode(this.refs[textInput]).value.trim();
            query[rows[i]] = text;
        }
        Meteor.call('comparison.insertRow', query);
    }

    /**
     * Insert the column data from the form into the table
     * only gets triggered when there's data in the table previously
     */
    insertColumn() {
        var cols = this.props.data;
        var col = ReactDOM.findDOMNode(this.refs.colName).value.trim();

        for (var i = 0, len = cols.length; i < len; i++) {
            var textInput = "textInput" + i;
            var text = ReactDOM.findDOMNode(this.refs[textInput]).value.trim();
            Meteor.call('comparison.insertColumn', col, { "id": cols[i].id, "text": text });
        }
    }
}

/**
  * data: provides form input
  * level: column/row
  * hasNoData: is there data already in the database
  */
DataInsert.propTypes = {
    data: PropTypes.array.isRequired,
    level: PropTypes.oneOf(['row', 'col']).isRequired,
    hasNoData: PropTypes.bool.isRequired
};