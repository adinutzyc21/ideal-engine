import React, { Component, PropTypes } from 'react';
import { Button, Modal } from 'react-bootstrap';

import ButtonAdd from './ButtonAdd.jsx';

// CriteriaHeading component - displays the header of the table
export default class FormAdd extends Component {
    /**
     * Initialize showModal to false
     */
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        };
    }

    /**
     * Define the button based on the type of add (column/row)
     * @param color the color of the button
     * @returns the html to creat the button
     */
    createButton(color) {
        var buttonHtml = [];
        if (this.props.level === 'row') { // row
            buttonHtml.push(<ButtonAdd key="button" level={this.props.level}
                name=" Add row" color={color} tooltip={this.props.tooltip}
                callback={this.addRow} />);
        }
        else { // column
            buttonHtml.push(<ButtonAdd key="button" level={this.props.level}
                name=" Add column" color={color} tooltip={this.props.tooltip}
                callback={this.addColumn} />);
        }
        return buttonHtml;
    }

    /**
     * Define the form data based on the data and level
     * @param the color of the submit button
     * @returns the html for the form
     */
    createForm(color) {
        var formHtml = [];
        var items = this.props.data;

        // column headers are unique
        if (this.props.level === 'row') {
            for (var i = 0, len = items.length; i < len; i++) {
                formHtml.push(<span key={items[i] + "_text"} className="input-text">{items[i]}:</span>);
                formHtml.push(<input key={items[i]} type="text" ref="textInput"
                    placeholder={"Type to add data for " + items[i]} />);
            }
        }
        // we have the ids for the input
        else {
            for (var i = 0, len = items.length; i < len; i++) {
                formHtml.push(<span key={items[i].id + "_text"} className="input-text">{items[i].item}:</span>);
                formHtml.push(<input key={items[i].id} type="text" ref="textInput"
                    placeholder={"Type to add data for " + items[i].item} />);
            }
        }

        return (
            <div className="new-data">
                {formHtml}
                {this.createButton(color)}
            </div>);
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
                    onClick={this.open.bind(this)}>
                    <i className='glyphicon glyphicon-plus' /> {this.props.name}
                </button>

                <div className='modal-example'>
                    <Modal className='modalStyle'
                        show={this.state.showModal}
                        onHide={this.close.bind(this)}>

                        <div className='dialogStyle'>
                            {this.createForm(color)}
                        </div>
                    </Modal>
                </div>
            </div>
        );
    }

    close() {
        this.setState({ showModal: false });
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
    // params: PropTypes.any.isRequired,
    color: PropTypes.oneOf(['white', 'blue', 'green', 'cyan', 'orange', 'red'])
};