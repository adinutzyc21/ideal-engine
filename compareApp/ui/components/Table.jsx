import React, { Component, PropTypes } from 'react';

// Column component - represents columns in the table
export default class Table extends Component {
  setHtmlHead(data) {
    var html = "";
    for (var property in data) {
      if (data.hasOwnProperty(property)) {
        html += "<th>" + data[property] + "</th>";
      }
    }
    return "<tr>"+html+"</tr>";
  }

  setHtmlBody(data) {
    var html = "";
    for (var i = 0, len = data.length; i < len; i++) {
      var row = data[i];
      html+="<tr>";
      for (var property in row) {
        if (row.hasOwnProperty(property)) {
          html += "<td>" + row[property] + "</td>";
        }
      }
      html+="</tr>";
    }
    return html;
  }

  render() {
    return (
      <table className='table table-bordered'>
        <thead dangerouslySetInnerHTML={{ __html: this.setHtmlHead(this.props.data[0]) }} />
        <tbody dangerouslySetInnerHTML={{ __html: this.setHtmlBody(this.props.data.slice(1), "td") }} />
      </table>
    );
  }
}


/**
  * data: data
  */
Table.propTypes = {
  data: React.PropTypes.any.isRequired,
};