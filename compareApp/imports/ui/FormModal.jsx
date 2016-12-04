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

    // handleSubmit(event) {
    //     event.preventDefault();

    //     // Find the text field via the React ref
    //     const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    //     Tasks.insert({
    //         text,
    //         createdAt: new Date(), // current time
    //     });

    //     // Clear form
    //     ReactDOM.findDOMNode(this.refs.textInput).value = '';
    // }

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

        // Define the button based on the type of add (column/row)
        var buttonHtml = [];
        if (this.props.level === 'row') { // row
            buttonHtml.push(<ButtonAdd key="button" level={this.props.level} name=" Add row" color={color} tooltip={this.props.tooltip} callback={this.addRow} />);
        }
        else { // column
            buttonHtml.push(<ButtonAdd key="button" level={this.props.level} name=" Add column" color={color} tooltip={this.props.tooltip} callback={this.addColumn} />);
        }

        // Define the form data based on the data and level
        var formHtml = [];
        for (var i = 0, len = this.props.data.length; i < len; i++) {
            formHtml.push(<span key={this.props.data[i] + "0"} className="input-text">{this.props.data[i]}:</span>);
            formHtml.push(<input key={this.props.data[i]} type="text" ref="textInput" placeholder={"Type to add data for " + this.props.data[i]} />);
        }

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
                            <form
                                className="new-data"
                                onSubmit={this.handleSubmit.bind(this)}>
                                {formHtml}
                            </form>
                            {buttonHtml}
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