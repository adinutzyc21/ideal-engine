import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';

import { Bert } from 'meteor/themeteorchef:bert';
import { Meteor } from 'meteor/meteor';

import DataDelete from '../menu/DataDelete.jsx'; // eslint-disable-line no-unused-vars
import ColumnTypeMenu from '../menu/ColumnTypeMenu.jsx'; // eslint-disable-line no-unused-vars

/**
 * TableHeading component - displays the header of the table given the data
 */
export default class TableHeading extends Component {
  /**
   * Initialize state variables and bind this to methods
   */
  constructor(props) {
    super(props);

    // initialize state variables
    this.state = {
      // only allow edit in place if this is true
      // TODO: add a menu button to toggle this
      editInPlace: true,

      // this is the item id we are editing
      editingId: null,

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
 * Either render the static item (col name / score) or render the edit field
 * @param {String} id - the id of the column
 * @param {String} data - what we're displaying (column name or column score)
 * @param {String} type - one of 'score' or 'name'
 */
  renderItemOrEditField(id, data, type) {
    // IF: display the edit fields
    if (this.state.editInPlace === true && this.state.editingId === id
      && this.state.editingType === type) {
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

      // else: changing text (name)
      } else if (type === 'name') {
        return <input type='text' autoFocus
          key={type + '-editing'}
          onKeyDown={this.handleEditField}
          onBlur={this.stopEditing}
          className={type + '-editing'}
          name={type}
          defaultValue={data}
        />;
      }
    }

    // ELSE: display the static item
    return <span key={type + '-display'} className={type + '-display'}
        onClick={() => this.toggleEditing(id, type)}> {data} </span>;
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

      // update the field in Meteor
      Meteor.call('comparison.updateColumnFieldInPlace', this.state.editingId,
        this.state.editingType, target.value, (error) => {
          if (error) {
            Bert.alert(error.reason, 'danger');
          } else {
            this.stopEditing();
            Bert.alert('Record updated!', 'success');
          }
        });
    }
  }

  /**
   * Toggle editing on or off
   * @param {String} id - the id of the column
   * @param {String} type - one of 'score' or 'name'
   */
  toggleEditing(id, type) {
    this.setState({ editingId: id, editingType: type });
  }

  /**
   * Stop editing. Triggered either by click outside or by successful change
   */
  stopEditing() {
    this.setState({ editingId: null, editingType: '' });
  }

  /**
   * Construct the table header html from the cols array
   */
  buildHeaderHtml() {
    return this.props.cols.map((col, idx) => {
      // this is the final html for our header
      const tableHeaderHtml = [];

      // is this a deletable column (all except first column)
      let deletableCol = '';

      // allow column deletion for all columns except the first ('Option Name') one
      if (idx !== 0) {
        // add the correct class
        deletableCol = 'div-delete';

        // add the score to the html
        tableHeaderHtml.push(this.renderItemOrEditField(col._id, col.score, 'score'));

        // add dropdown menu to format the column (choose type)
        tableHeaderHtml.push(
          <ColumnTypeMenu key='colMenu' colId={col._id} />);

        // add the data delete option to the html
        tableHeaderHtml.push(
          <DataDelete key='del' level='col' params={col._id} />);
      }
      // add the column name to the html
      tableHeaderHtml.push(this.renderItemOrEditField(col._id, col.name, 'name'));

      // return a heading with column names and ButtonDeletes
      return <th key={col._id} className={deletableCol + ' ' + col._id}>{tableHeaderHtml}</th>;
    });
  }

  /**
   * Render the table header
   */
  render() {
    return (
      <thead>
        <tr>
          {this.buildHeaderHtml()}
        </tr>
      </thead>
    );
  }
}
/**
 * The properties retrieved in this component:
 * cols {Array} - the data in the Mongo Cols table
 */
TableHeading.propTypes = {
  cols: PropTypes.array.isRequired,
};
