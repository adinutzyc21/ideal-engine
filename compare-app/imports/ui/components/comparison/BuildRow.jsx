import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';

import { Bert } from 'meteor/themeteorchef:bert';
import { Meteor } from 'meteor/meteor';

import DeleteData from './DeleteData.jsx'; // eslint-disable-line no-unused-vars

/**
 * BuildRow component - displays the contents of the table given the data
 */
export default class BuildRow extends Component {
  /**
   * Initialize state variables and bind this to methods
   */
  constructor(props) {
    super(props);

    // initialize state variables
    this.state = {
      // this is the item id we are editing (row and col)
      editingColId: null,
      editingRowId: null,

      // this is the item type we are editing
      editingType: '',
    };

    // make this available in these methods
    this.handleEditField = this.handleEditField.bind(this);
    this.renderItemOrEditField = this.renderItemOrEditField.bind(this);
    this.stopEditing = this.stopEditing.bind(this);
    this.toggleEditing = this.toggleEditing.bind(this);
  }

  /**
   * Either render the static item (row data / score) or render the edit field
   * @param {String} row - the row (we need _id and score and)
   * @param {String} col - the column (we need _id and score)
   * @param {String} data - what we're displaying (row data or row score)
   * @param {String} type - one of 'score' or 'option' or 'data'
   */
  renderItemOrEditField(row, col, data, type) {
    // IF: display the edit fields
    if (this.props.editEnabled === true && this.state.editingRowId === row._id
      && this.state.editingColId === col._id && this.state.editingType === type) {
      // if: changing a number (score)
      if (type === 'score') {
        return <input type='number' autoFocus
          min='0' max='10' autoComplete='off'
          key={type + '-editing'}
          onKeyDown={this.handleEditField}
          onBlur={this.stopEditing}
          className={type + '-editing'}
          name={type}
          defaultValue={data}
        />;

        // else: changing text (option)
      } else if (type === 'option') {
        return <input type='text' autoFocus
          key={type + '-editing'}
          onKeyDown={this.handleEditField}
          onBlur={this.stopEditing}
          className={type + '-editing'}
          name={type}
          defaultValue={data}
        />;

        // else: changing text (data)
      } else if (type === 'data') {
        return <div key={type + '-editing-key'}
          className={type + '-editing'}>
          <textarea autoFocus
            key={type + '-editing'}
            onKeyDown={this.handleEditField}
            onBlur={this.stopEditing}
            name={type}
            defaultValue={data}>
          </textarea></div>;
      }
    }

    // ELSE: display the static item

    // should the score be hidden
    let hiddenCls = '';

    // the row type is 'score'
    if (type === 'score') {
      if (data === '0' || col.score === '0') {
        data = '--';
      }
      if (col.score === '0' || row[col._id].value === '') {
        hiddenCls = 'no-display';
      }

    // the type is 'option' or 'data' and data is empty
    } else if (data === '') {
      data = '--';
      // this cell is empty, make its score 0
      if (row[col._id].value === '' && row[col._id].score !== '0') {
        Meteor.call('comparison.updateRowFieldInPlace', row._id, col._id, 'score', '0');
      }
    }

    return <span key={type + '-display'} className={type + '-display'}
      onClick={() => this.toggleEditing(row._id, col._id, type)}>
        <span className={hiddenCls + ' ' +
          (type === 'score' ? 'details-bar' : '')}>{data}</span>
      </span>;
  }

  /**
   * Save the data to the database on ENTER
   * @param {Object} event - the event handled
   */
  handleEditField(event) {
    // if the key pressed was ENTER
    // TODO: probably need something better than enter here for multiline
    // for example a v and x button appearing below on the right like in JIRA
    if (event.keyCode === 13) {
      const target = event.target;

      // let 'type' match Mongo options
      let type = this.state.editingType;
      if (type === 'data' || type === 'option') type = 'value';

      // update the field in Meteor
      Meteor.call('comparison.updateRowFieldInPlace', this.state.editingRowId,
        this.state.editingColId, type, target.value, (error) => {
          if (error) {
            Bert.alert(error.reason, 'danger', 'fixed-bottom');
          } else {
            this.stopEditing();
            Bert.alert('Cell updated!', 'success', 'fixed-bottom');
          }
        });
    }
  }

  /**
   * Toggle editing on or off
   * @param {String} rowId - the id of the row
   * @param {String} colId - the id of the column
   * @param {String} type - one of 'score' or 'option' or 'data'
   */
  toggleEditing(rowId, colId, type) {
    this.setState({ editingRowId: rowId, editingColId: colId, editingType: type });
  }

  /**
   * Stop editing. Triggered either by click outside or by successful change
   */
  stopEditing() {
    this.setState({ editingRowId: null, editingColId: null, editingType: '' });
  }

  /**
   * Display one row of data in the correct columns
   * @param {Array} row - a row of data
   */
  buildRowHtml(row) {
    // for each column
    return this.props.cols.map((col, idx) => {
      // this is the final html for our table data
      const tableDataHtml = [];

      // is this a deletable header row (basically the first row)
      let rowClass = '';

      // if the current column is populated in the row
      if (row[col._id]) {
        // IF: it's the first column,  display cell as header and allow deletion
        if (idx === 0) {
          // add the correct class
          rowClass = 'secondary-heading div-delete';

          // add the score to the html
          tableDataHtml.push(this.renderItemOrEditField(row, col, row.score, 'score'));

          // add the data delete option to the html
          tableDataHtml.push(
            <DeleteData key='del' level='row' params={row._id} />);

          // add the 'option' to the html
          tableDataHtml.push(this.renderItemOrEditField(row, col, row[col._id].value, 'option'));

          // ELSE: if it's not the first column, no delete button or special formatting
        } else {
          // add the score to the html
          tableDataHtml.push(this.renderItemOrEditField(row, col, row[col._id].score, 'score'));

          // add the 'data' to the html
          tableDataHtml.push(this.renderItemOrEditField(row, col, row[col._id].value, 'data'));
        }
      }
      // return a row with data and ButtonDeletes
      return <td key={col._id} className={rowClass + ' ' + row._id + ' ' + col._id}>
        {tableDataHtml}</td>;
    });
  }

  /**
   * Render all of the rows in the table in appropriate tags
   */
  render() {
    const self = this;
    return <tbody>
      {this.props.rows.map(row => (
        <tr key={row._id}>
          {self.buildRowHtml(row)}
        </tr>
      ))}
    </tbody>;
  }
}

BuildRow.propTypes = {
  cols: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  editEnabled: PropTypes.bool,
};
