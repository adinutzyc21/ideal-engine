import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';
import { CSVLink } from 'react-csv'; // eslint-disable-line no-unused-vars

export default class ExportCSV extends Component {
  /**
  * Initialize state variables and bind 'this' to methods
  */
  constructor(props) {
    super(props);
    this.generateCSV = this.generateCSV.bind(this);
  }

  generateCSV() {
    const csvData = [];
    let data = [];
    const colIds = [];

    for (let i = 0, len = this.props.cols.length; i < len; i++) {
      const opt = this.props.cols[i];
      data.push(opt.name);
      colIds.push(opt._id);
      if (i === 0) {
        data.push('score');
      } else {
        data.push(opt.score);
      }
    }
    data.push('modifier');
    csvData.push(data);

    for (let i = 0, len0 = this.props.rows.length; i < len0; i++) {
      const row = this.props.rows[i];
      data = [];
      for (let j = 0, len = colIds.length; j < len; j++) {
        const val = row[colIds[j]];
        data.push(val.value);
        if (j === 0) {
          data.push(row.score);
        } else {
          data.push(val.score);
        }
      }
      data.push(row.scoreModifier);
      csvData.push(data);
    }

    return csvData;
  }
  /**
   * Display the delete button based on the parameters
   */
  render() {
    if (this.props.isDisabled) {
      return <a role='button'>{this.props.title}</a>;
    }
    return (
      <CSVLink className={this.props.className} data={this.generateCSV()} role='button'
        filename='exported.csv'>{this.props.title}
        <span className={this.props.glyphicon} />
        </CSVLink>
    );
  }
}

// TODO: documentation
ExportCSV.propTypes = {
  isDisabled: PropTypes.bool,
  rows: PropTypes.array,
  cols: PropTypes.array,
  title: PropTypes.string,
  glyphicon: PropTypes.string,
  className: PropTypes.string,
};
