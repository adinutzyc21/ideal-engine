import React, { Component, PropTypes } from 'react';
import { Button, Modal } from 'react-bootstrap';
import ReactDOM from 'react-dom';

import { Items } from '../api/items.js';

import ButtonAdd from './ButtonAdd.jsx';

// CriteriaHeading component - displays the header of the table
export default class FormAdd extends Component {
    /**
     * Initialize showModal to false
     */
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            item: "",
            option: ""
        };
        this.handleChangeItem = this.handleChangeItem.bind(this);
        this.handleChangeOption = this.handleChangeOption.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
    }

    createFormRow() {
        var formHtml = [];
        var items = this.props.data;
        var i = 0;
        // column headers are unique, so that can be the key

        // request the "Items" header differently
        formHtml.push(<span key={items[i] + "_text"} className="input-text header">New Item Name:</span>);
        formHtml.push(<input key={items[i]} type="text" ref={"textInput" + i} className="header"
            value={this.state.item} onChange={this.handleChangeItem} placeholder={"Type to add data for " + items[i]} />);

        // request all the corresponding information
        for (i = 1, len = items.length; i < len; i++) {
            formHtml.push(<span key={items[i] + "_text"} className="input-text">{this.state.item + " " + items[i]}:</span>);
            formHtml.push(<input key={items[i]} type="text" ref={"textInput" + i}
                placeholder={"Type to add data for " + this.state.item + " " + items[i]} />);
        }
        return formHtml;
    }

    handleChangeItem(event) {
        this.setState({ item: event.target.value });
    }

    createFormCol() {
        var formHtml = [];
        var items = this.props.data;
        // we have the ids for the input, so use that as a key (except for the column)

        // request the column name differently
        formHtml.push(<span key="colName_text" className="input-text header">New Column Name:</span>);
        formHtml.push(<input key="colName" type="text" ref="colName" className="header"
            value={this.state.option} onChange={this.handleChangeOption} placeholder="Type the new column name" />);

        // request all the corresponding information
        for (var i = 0, len = items.length; i < len; i++) {
            formHtml.push(<span key={items[i].id + "_text"} className="input-text">{items[i].item + " " + this.state.option}:</span>);
            formHtml.push(<input key={items[i].id} type="text" ref={"textInput" + i}
                placeholder={"Type to add data for " + items[i].item + " " + this.state.option} />);
        }
        return formHtml;
    }

    handleChangeOption(event) {
        this.setState({ option: event.target.value });
    }

    /**
     * Define the form data based on the data and level
     * @param the color of the submit button
     * @returns the html for the form
     */
    createForm(color) {
        var buttonText = " Add row";
        var formHtml = [];
        if (this.props.level === 'row') {
            formHtml = this.createFormRow();
        }
        else {
            buttonText = " Add column";
            formHtml = this.createFormCol();
        }

        return (
            <form className="new-data"
                onSubmit={this.handleSubmit}>
                {formHtml}
                <ButtonAdd key="button" level={this.props.level} name={buttonText} color={color} tooltip={this.props.tooltip} />
            </form>);
    }

    addRow() {
        var items = this.props.data;
        var query = "";

        // Find the text field via the React ref
        for (var i = 0, len = items.length; i < len; i++) {
            var textInput = "textInput" + i;
            var text = ReactDOM.findDOMNode(this.refs[textInput]).value.trim();
            query += '"' + items[i] + '": "' + text + '"';
            if (i < len - 1) {
                query += ", ";
            }
        }
        query = "{" + query + "}";

        Items.insert(JSON.parse(query));
    }

    addColumn() {
        var items = this.props.data;
        var col = ReactDOM.findDOMNode(this.refs.colName).value.trim();
        console.log(col);
        // Find the text field via the React ref
        for (var i = 0, len = items.length; i < len; i++) {
            var textInput = "textInput" + i;
            var text = ReactDOM.findDOMNode(this.refs[textInput]).value.trim();

            Items.update(items[i].id, {
                $set: { [col]: [text]}
            });
        }
    }

    handleSubmit(event) {
        event.preventDefault();

        if (this.props.level === "row") {
            this.addRow();
        }
        else {
            this.addColumn();
        }

        //  Close form
        this.close();
    }

    /**
     * 
     */
    render() {
        // set the color of the button based on the prop given
        var colors = {
            white: 'btn btn-sm btn-default',
            blue: 'btn btn-sm btn-primary',
            green: 'btn btn-sm btn-success',
            cyan: 'btn btn-sm btn-info',
            orange: 'btn btn-sm btn-warning',
            red: 'btn btn-sm btn-danger'
        };
        var color = 'blue';
        if (this.props.color) { // whatever color was passed in the props
            color = this.props.color;
        }
        btnClass = colors[color];

        return (
            <div>
                <button type='button' className={btnClass}
                    data-toggle='tooltip' data-placement='right'
                    title={this.props.tooltip}
                    onClick={this.open}>
                    <i className='glyphicon glyphicon-plus' /> {this.props.name}
                </button>

                <div className='modal-example'>
                    <Modal className='modalStyle'
                        show={this.state.showModal}
                        onHide={this.close}>

                        <div className='dialogStyle'>
                            {this.createForm(color)}
                        </div>
                    </Modal>
                </div>
            </div>
        );
    }

    close() {
        this.setState({ showModal: false, item: "", option: "" });
    }

    open() {
        this.setState({ showModal: true });
    }
}

/**
  * data: provides form input
  * level: column/row
  * name: string
  * tooltip: string
  * //params: parameters to callback function, can be undefined
  * color: color of the button
  */
FormAdd.propTypes = {
    data: PropTypes.array.isRequired,
    level: PropTypes.oneOf(['row', 'col']).isRequired,
    name: PropTypes.string,
    tooltip: PropTypes.string,
    color: PropTypes.oneOf(['white', 'blue', 'green', 'cyan', 'orange', 'red'])
};