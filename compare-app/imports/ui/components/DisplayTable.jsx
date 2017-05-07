import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';

import BuildHeader from './comparison/BuildHeader.jsx'; // eslint-disable-line no-unused-vars
import BuildRow from './comparison/BuildRow.jsx'; // eslint-disable-line no-unused-vars

/**
 * DisplayTable component - either display the loaded table or a no data message
 */
export class DisplayTable extends Component {
  /**
   * Initialize state variables and bind this to methods
   */
  constructor(props) {
    super(props);

    // make this available in these methods
    this.updateDimensions = this.updateDimensions.bind(this);
    this.scrollDivsTogether = this.scrollDivsTogether.bind(this);
  }

  /**
   * Update dimensions to set table-container height correctly based on the window size
   */
  updateDimensions() {
    let height = $(window).height() - 120;
    if (height < 150) height = 150;

    $('#table-container').css('max-height', height + 'px');
    $('#table-container').css('min-height', height + 'px');
    $('#table-container').css('height', height + 'px');

    $('.scroll-content').css('height', (height - 62) + 'px');
    $('#options-column').css('height', height + 'px');
  }

  /**
   * Make the options-column and options-contents divs scroll together
   */
  scrollDivsTogether() {
    const opt = $('#options-column>table>tbody.scroll-content');
    const cont = $('#options-contents>table>tbody.scroll-content');

    let lastScroll = 0;
    opt.scroll(function () {
      const el = $(this);
      const scroll = el.scrollTop();
      const round = lastScroll < scroll ? Math.ceil : Math.floor;
      lastScroll = round(scroll / 16) * 16;
      el.scrollTop(lastScroll);
      cont.scrollTop(lastScroll);
    });
    cont.scroll(function () {
      const el = $(this);
      const scroll = el.scrollTop();
      const round = lastScroll < scroll ? Math.ceil : Math.floor;
      lastScroll = round(scroll / 16) * 16;
      el.scrollTop(lastScroll);
      opt.scrollTop(lastScroll);
    });
  }

  /**
   * Add the necessary event listeners
   */
  componentWillMount() {
    this.updateDimensions();
  }
  componentDidMount() {
    this.updateDimensions();

    window.addEventListener('resize', this.updateDimensions);
    const self = this;
    Array.from(document.getElementsByClassName('scroll-content')).forEach((element) => {
      element.addEventListener('scroll', self.scrollDivsTogether);
    });
  }
  componentDidUpdate() {
    this.updateDimensions();

    window.addEventListener('resize', this.updateDimensions);
    const self = this;
    Array.from(document.getElementsByClassName('scroll-content')).forEach((element) => {
      element.addEventListener('scroll', self.scrollDivsTogether);
    });
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
    const self = this;
    Array.from(document.getElementsByClassName('scroll-content')).forEach((element) => {
      element.removeEventListener('scroll', self.scrollDivsTogether);
    });
  }

  /**
   * Render the table
   */
  render() {
    // this is the final html for our table
    const tableContainerHtml = [];

    // if the data is empty, the html is no data available info
    if (this.props.rows.length === 0) {
      // clear the residual columns
      Meteor.call('clearTable', this.props.params.tableId);

      tableContainerHtml.push(
        <div key='table-container' id='table-container' className='table-container-no-data'>
          <span>No data available. Use the menu to add data.</span>
        </div>);

      // the html is the loaded table
    } else {
      // split the columns up on first vs rest
      const firstColData = this.props.cols[0];
      const restCols = this.props.cols.slice(1);

      // split the rows up on first column rows vs rest
      const firstColRows = this.props.rows.map(row => ({
        _id: row._id,
        [firstColData._id]: row[firstColData._id],
        score: row.score,
        scoreModifier: row.scoreModifier,
      }));

      const restColRows = this.props.rows.map((row) => {
        const rowColObj = {};

        Object.keys(row).forEach((key) => {
          if (key !== firstColData._id) {
            rowColObj[key] = row[key];
          }
        });
        return rowColObj;
      });


      tableContainerHtml.push(
        <div key='table-container' id='table-container'>
          {/* This displays only the options column to the left with corresponding header*/}
          <div id='options-column'>
            <table key='table1'>
              {/* Need a header of type BuildHeader */}
              <BuildHeader key='heading1' type='header' cols={[firstColData]}
                editOn={this.props.editOn} scoreOn={this.props.scoreOn} />
              {/* Need a bunch of rows of type BuildRow*/}
              <BuildRow key='row1' type='header' rows={firstColRows} cols={[firstColData]}
                editOn={this.props.editOn} scoreOn={this.props.scoreOn} />
            </table>
          </div>
          {/* This displays the rest of the table, including the headers*/}
          <div id='options-contents'>
            <table key='table2'>
              {/* Need a header of type BuildHeader */}
              <BuildHeader key='heading2' type='content' cols={restCols}
                editOn={this.props.editOn} scoreOn={this.props.scoreOn} />
              {/* Need a bunch of rows of type BuildRow*/}
              <BuildRow key='row2' type='content' rows={restColRows} cols={restCols}
                editOn={this.props.editOn} scoreOn={this.props.scoreOn} />
            </table>
          </div>
        </div>);
    }

    // display the constructed HTML
    return (
      <div className='react-bs-container-body'>
        {tableContainerHtml}
      </div>
    );
  }
}

/**
 * The properties retrieved in this component:
 * rows {Array} - the data in the Mongo Rows table
 * cols {Array} - the data in the Mongo Cols table
 * TODO:
 */
DisplayTable.propTypes = {
  rows: PropTypes.array,
  cols: PropTypes.array,
  editOn: PropTypes.bool,
  scoreOn: PropTypes.bool,
};
