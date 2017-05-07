import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';

import { Bert } from 'meteor/themeteorchef:bert';
import { Meteor } from 'meteor/meteor';

import DeleteData from './DeleteData.jsx'; // eslint-disable-line no-unused-vars
import FormatColumn from './FormatColumn.jsx'; // eslint-disable-line no-unused-vars

/**
 * BuildHeader component - displays the header of the table given the data
 */
export default class BuildHeader extends Component {
  /**
   * Initialize state variables and bind this to methods
   */
  constructor(props) {
    super(props);

    // initialize state variables
    this.state = {
      // this is the item id we are editing
      editingId: null,

      // this is the item type we are editing
      editingType: '',

      // this is the previous value of the item
      prevValue: '',
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
    if (this.props.editOn === true && this.state.editingId === id
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

    // ELSE: display the static item, with 0 as '-' for score
    if (type === 'score' && data === '0') data = '--';
    return <span key={type + '-display'} className={type + '-display'}
        onClick={() => this.toggleEditing(id, type, data)}>
          <span className={type === 'score' ? 'details-bar' : ''}>{data}</span>
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
      const value = event.target.value;

      // update the field in Meteor
      Meteor.call('updateColumnFieldInPlace', this.state.editingId,
        this.state.editingType, value, (error) => {
          if (error) {
            Bert.alert(error.reason, 'danger', 'growl-bottom-left');
          } else {
            this.stopEditing();
            Bert.alert('Header updated!', 'success', 'growl-bottom-left');
          }
        });
    }
  }

  /**
   * Toggle editing on or off
   * @param {String} id - the id of the column
   * @param {String} type - one of 'score' or 'name'
   * @param {String} data - this is the previous value
   */
  toggleEditing(id, type, data) {
    this.setState({ editingId: id, editingType: type, prevValue: data });
  }

  /**
   * Stop editing. Triggered either by click outside or by successful change
   */
  stopEditing() {
    this.setState({ editingId: null, editingType: '', prevValue: '' });
  }

  /**
   * Construct the table header html from the cols array
   */
  buildHeaderHtml() {
    return this.props.cols.map((col) => {
      // this is the final html for our header
      const tableHeaderHtml = [];

      // is this a deletable column (all except first column)
      let colCls = '';

      // allow column deletion and formatting for all columns except the first ('Option Name') one
      if (this.props.type !== 'header') {
        // add the correct class
        colCls = 'div-delete';

        const detailsHtml = [];

        // add the score to the html
        detailsHtml.push(this.renderItemOrEditField(col._id, col.score, 'score'));

        // add dropdown menu to format the column (choose type)
        detailsHtml.push(
          <FormatColumn key='colMenu' colId={col._id} />);

        // add the data delete option to the html
        detailsHtml.push(
          <DeleteData key='del' level='col' params={col._id} />);

        tableHeaderHtml.push(detailsHtml);
      } else {
        colCls = 'header-head';
      }
      // add the column name to the html
      tableHeaderHtml.push(this.renderItemOrEditField(col._id, col.name, 'name'));

      // return a heading with column names and ButtonDeletes
      return <th key={col._id} className={colCls + ' ' + col._id}>{tableHeaderHtml}</th>;
    });
  }

  /**
   * Render the table header
   */
  render() {
    return (
      <thead className='fixed-header'>
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
BuildHeader.propTypes = {
  cols: PropTypes.array.isRequired,
  editOn: PropTypes.bool,
  scoreOn: PropTypes.bool,
  type: PropTypes.string,
};
