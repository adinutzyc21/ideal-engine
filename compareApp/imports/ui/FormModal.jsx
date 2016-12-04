import React, { Component, PropTypes } from 'react';
import { Button, Modal } from 'react-bootstrap';

import ButtonAdd from './ButtonAdd.jsx';

// CriteriaHeading component - displays the header of the table
export default class FormAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        };
    }

    handleSubmit() { }

    render() {
        var btnClass = '';
        var callback = null;
        var colors = {
            white: 'btn btn-sm btn-default',
            blue: 'btn btn-sm btn-primary',
            green: 'btn btn-sm btn-success',
            cyan: 'btn btn-sm btn-info',
            orange: 'btn btn-sm btn-warning',
            red: 'btn btn-sm btn-danger'
        };
        if (!this.props.color)
            btnClass = colors.blue;
        else
            btnClass = colors[this.props.color];

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
                                className="new-task"
                                onSubmit={this.handleSubmit.bind(this)}>
                                <input type="text" ref="textInput" placeholder="Type to add new tasks" />
                            </form>

                            <ButtonAdd level='col' name="Add" color='blue' tooltip='Add a column' callback={this.addColumn} />
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