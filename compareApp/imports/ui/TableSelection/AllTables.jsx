import React, { Component, PropTypes } from 'react';

import Spinner from 'react-spinkit';

import TableDelete from "./TableDelete.jsx"

// Column component - represents columns in the table
export default class AllTables extends Component {

    render() {
        // While the data is loading, show a spinner
        if (this.props.loading) {
            return (
                <div className='table-container table-container-no-data'>
                    <div>
                        Loading data...
                        <Spinner spinnerName='three-bounce' />
                    </div>
                </div>
            );
        }
        // If the data is empty, show that there is no data available 
        else if (this.props.tables.length === 0) {
            return (
                <div className='table-container table-container-no-data'>
                    <div>No tables available. Use the menu to add/import data.</div>
                </div>
            );
        }

        var html = [];
        for (var i = 0, len = this.props.tables.length; i < len; i++) {
            var cls = "private";
            var spanCls = "glyphicon glyphicon-eye-close";
            var title = "This is a private scene";
            if (this.props.tables[i].isPublic === true) {
                cls = "public";
                spanCls = "glyphicon glyphicon-eye-open";
                title = "This is a public scene";
            }
            html.push(
                <div key={this.props.tables[i]._id} className="col-xs-6 col-md-3">
                    <div className={"thumbnail " + cls}>
                        <div className="caption">
                            <span className={spanCls} title={title}></span>
                            <h3>{this.props.tables[i].name}</h3>
                            <p>{this.props.tables[i].description}</p>
                        </div>
                        <div>
                            <a role="button" className="btn btn-success glyphicon glyphicon-ok" />
                            <TableDelete key="del" params={this.props.tables[i]._id} />
                        </div>
                    </div>
                </div>);
        }

        return (
            <div className='table-container table-container-no-data'>
                <div className="row">
                    {html}
                </div>
            </div>
        );
    }
}

/**
  * 
  */
AllTables.propTypes = {
    tables: PropTypes.array,
    loading: PropTypes.bool
};