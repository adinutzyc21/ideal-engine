import React, { Component, PropTypes } from 'react';

import Button from './Button.jsx';

import createFragment from 'react-addons-create-fragment'

// Column component - represents columns in the table
export default class TableDisplay extends Component {
  setHtmlHead(data) {
    var html = [];
    for (var property in data) {
        if (data.hasOwnProperty(property)) {
            html.push(<th key={property}>{data[property]}</th>);
        }
    }
    
    //html.push(<th key="addColumn"><Button type='add' level='col' tooltip='Add a column' callback={this.addColumn}/></th>);

    return html;
}

  // setHtmlBody(data) {
  //   var html = [];
  //   for (var i = 0, len = data.length; i < len; i++) {
  //     var row = data[i];
  //     var rowHtml = [];
  //     for (var property in row) {
  //       if (row.hasOwnProperty(property)) {
  //         rowHtml.push(<td key={property}>{row[property]}</td>);
  //       }
  //     }
  //   }
  //   return html;
  // }

  render() {
    return (
      {/*
      <table className='table table-bordered'>
        <thead>
          <tr>
              {this.setHtmlHead(this.props.data[0])}
          </tr>
        </thead>
      </table>
      */}
      
    );
  }
}
/*
<thead>{this.setHtmlHead(this.props.data[0])}</thead>
<tbody dangerouslySetInnerHTML={{ __html: this.setHtmlBody(this.props.data.slice(1), "td") }} />
*/

/**
  * data: data
  */
TableDisplay.propTypes = {
  data: React.PropTypes.any.isRequired,
};