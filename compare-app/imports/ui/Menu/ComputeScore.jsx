import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';

// Column component - represents columns in the table
export default class ComputeScore extends Component {
  /**
   * Initialize state variables and bind this to methods
   */
  constructor(props) {
    super(props);

    // make this available in these methods
    this.scoreOptions = this.scoreOptions.bind(this);
  }

  /**
   * for all rows calculate row[i][0].score
   * = sum(for all columns j>=1) row[i][j].score*col[j].score
   */
  scoreOptions() {
    const cols = this.props.cols;
    const rows = this.props.rows;

    let maxScore = 0;
    const score = [];
    // for all rows i
    for (let i = 0, lenR = rows.length; i < lenR; i++) {
      score[i] = 0;
      // for all columns j
      for (let j = 1, lenC = cols.length; j < lenC; j++) {
        score[i] += rows[i][cols[j]._id].score * cols[j].score;
      }
      if (score[i] > maxScore) maxScore = score[i];
    }
    for (let i = 0, lenR = rows.length; i < lenR; i++) {
      score[i] = Math.round((score[i] * 100) / maxScore) / 10;
      Meteor.call('comparison.updateRowInsertScore', rows[i]._id, score[i]);
    }
  }

  render() {
    return (
      <ul className='nav navbar-nav'>
        <li>
          <a role='button' title='Score Comparison!' className='green'
            onClick={this.scoreOptions}>
            <span className='glyphicon glyphicon-play'></span> Run
                    </a>
        </li>
      </ul>
    );
  }
}

ComputeScore.propTypes = {
  cols: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  optionIdx: PropTypes.string,
};
