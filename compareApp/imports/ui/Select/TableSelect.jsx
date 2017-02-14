import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Spinner from 'react-spinkit';

import { Tables } from '../../api/tables.js'

import TableDelete from "./TableDelete.jsx"
import TableLoad from "./TableLoad.jsx"
import MenuBar from "../Menu/MenuBar.jsx"

// Column component - represents columns in the table
class TableSelect extends Component {
    
    render() {
        // this is the html that gets rendered
        var html = [];

        // While the data is loading, show a spinner
        if (this.props.loading) {
            html.push(
                <div key="row">
                    Loading data...
                    <Spinner spinnerName='three-bounce' />
                </div>
            );
        }

        // If the data is empty, say that there is no data available 
        else if (this.props.tables.length === 0) {
            html.push(
                <div key="row">No tables available. Use the menu to add/import data.</div>
            );
        }

        // Otherwise, create the table display
        else {
            var html2 = [];
            for (var i = 0, len = this.props.tables.length; i < len; i++) {
                var cls = "private";
                var spanCls = "glyphicon glyphicon-eye-close";
                var title = "This is a private table";
                if (this.props.tables[i].isPublic === true) {
                    cls = "public";
                    spanCls = "glyphicon glyphicon-eye-open";
                    title = "This is a public table";
                }

                html2.push(
                    <div key={this.props.tables[i]._id} className="col-xs-6 col-md-3">
                        <div className={"thumbnail " + cls}>
                            <div className="caption">
                                <span className={spanCls} title={title}></span>
                                <h3>{this.props.tables[i].name}</h3>
                                <p>{this.props.tables[i].description}</p>
                            </div>
                            <div>
                                <TableLoad key="load" id={this.props.tables[i]._id} name={this.props.tables[i].name} />
                                <TableDelete key="del" id={this.props.tables[i]._id} name={this.props.tables[i].name} />
                            </div>
                        </div>
                    </div>
                );
            }

            html.push(
                <div key="row" className="row">
                    {html2}
                </div>
            );
        }

        return (
            <div className='react-bs-container-body'>
                <div className='table-container table-container-no-data'>
                    <MenuBar/>
                    {html}
                </div>
            </div>
        );
    }
}

TableSelect.propTypes = {
    loading: PropTypes.bool,
    user: PropTypes.object,
    tables: PropTypes.array,
};

export default createContainer(({ params }) => {
    const user = Meteor.user();

    const subscription = Meteor.subscribe('tables');
    var loading = !subscription.ready();
    var tables;

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
        user, tables, loading
    };
}, TableSelect);