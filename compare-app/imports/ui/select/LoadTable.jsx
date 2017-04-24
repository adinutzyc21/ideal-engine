import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import DisplayTable from '../display/DisplayTable.jsx'; // eslint-disable-line no-unused-vars

// LoadTable component - use to load the selected table
export default class LoadTable extends Component {
  /**
   * Initialize state variables and bind this to methods
   */
  constructor(props) {
    super(props);

    // make this available in these methods
    this.loadTable = this.loadTable.bind(this);
  }

  loadTable() {
    ReactDOM.render(<DisplayTable tableId={this.props.id} />, document.getElementById('app-container'));
  }

  /**
   * Display the delete button based on the parameters
   */
  render() {
    // set the callback depending on the type of delete (row/col)
    let title = 'Load Table ';
    if (this.props.name !== undefined) {
      title += this.props.name;
    }

    // display the button
    return (
      <a role='button' data-toggle='tooltip' title={title}
        className={'btn btn-success glyphicon glyphicon-ok'}
        onClick={this.loadTable} >
      </a>
    );
  }
}

LoadTable.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
};
