import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';
import Spinner from 'react-spinkit'; // eslint-disable-line no-unused-vars

import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Link } from 'react-router'; // eslint-disable-line no-unused-vars

import { Tables } from '../../api/tables/tables.js';


// Column component - represents columns in the table
class SelectTable extends Component {
  /**
   * Delete a table given its id
   * @param id the id of the table
   */
  deleteTable(id) {
    Meteor.call('removeTable', id);
  }

  render() {
    // this is the html that gets rendered
    const html = [];
    // While the data is loading, show a spinner
    if (this.props.loading) {
      html.push(
        <div key='row'>
          <span>Loading data...</span>
          <Spinner spinnerName='three-bounce' />
        </div>);

      // If the data is empty, say that there is no data available
    } else if (this.props.tables.length === 0) {
      html.push(
        <div key='row'>No tables available. Use the menu to add/import data.</div>);

      // Otherwise, create the table display
    } else {
      const html2 = [];
      for (let i = 0, len = this.props.tables.length; i < len; i++) {
        let cls = 'private';
        let spanCls = 'glyphicon glyphicon-eye-close';
        let title = 'This is a private table';
        if (this.props.tables[i].isPublic === true) {
          cls = 'public';
          spanCls = 'glyphicon glyphicon-eye-open';
          title = 'This is a public table';
        }

        html2.push(
          <div key={this.props.tables[i]._id} className='col-xs-6 col-md-3'>
            <div className={'thumbnail ' + cls}>
              <div className='caption'>
                <span className={spanCls} title={title}></span>
                <h3>{this.props.tables[i].name}</h3>
                <p>{this.props.tables[i].description}</p>
              </div>
              <div>
                <Link to={'/DisplayTable/' + this.props.tables[i]._id + '?name=' +
                  this.props.tables[i].name}
                  role='button' data-toggle='tooltip'
                  title={'Load "' + this.props.tables[i].name + '"'}
                  className={'btn btn-success glyphicon glyphicon-ok'} />
                <a role='button' data-toggle='tooltip'
                  title={'Delete "' + this.props.tables[i].name + '"'}
                  className={'btn btn-danger glyphicon glyphicon-trash'}
                  onClick={() => { this.deleteTable(this.props.tables[i]._id); }} />
              </div>
            </div>
          </div>);
      }

      html.push(
        <div key='row' className='row'>
          {html2}
        </div>);
    }

    return (
      <div className='table-container-no-data'>
        {html}
      </div>
    );
  }
}

export default createContainer(({ params }) => { // eslint-disable-line no-unused-vars
  const user = Meteor.user();

  const subscription = Meteor.subscribe('tables');
  let loading = !subscription.ready();
  let tables;

  if (user === null || user === undefined) {
    tables = Tables.find({ isPublic: true }).fetch();
  } else {
    tables = Tables.find({ $or: [{ isPublic: true }, { owner: user.username }] },
      { sort: { isPublic: 1, lastModified: -1 } }).fetch();
  }
  if (user === undefined) {
    loading = true;
  }

  return {
    user, tables, loading,
  };
}, SelectTable);

SelectTable.propTypes = {
  loading: PropTypes.bool.isRequired,
  user: PropTypes.object,
  tables: PropTypes.array.isRequired,
};
