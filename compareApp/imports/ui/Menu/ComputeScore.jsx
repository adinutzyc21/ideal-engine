import React, { Component, PropTypes } from 'react';
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
        var cols = this.props.cols;
        var rows = this.props.rows;

        var maxScore = 0;
        var score = [];
        //for all rows i
        for (var i = 0, lenR = rows.length; i < lenR; i++) {
            score[i] = 0;
            // for all columns j
            for (var j = 1, lenC = cols.length; j < lenC; j++) {
                score[i] += rows[i][cols[j]._id].score * cols[j].score;
            }
            if (score[i] > maxScore) maxScore = score[i];
        }
        for (var i = 0, lenR = rows.length; i < lenR; i++) {
            score[i] = Math.round(score[i] / maxScore * 100) / 10;
            Meteor.call('comparison.writeScores', this.props.optionIdx, rows[i]._id, score[i]);
        }
    }

    render() {
        return (
            <ul className="nav navbar-nav">
                <li>
                    <a role="button" title="Score Comparison!" onClick={this.scoreOptions}>
                        <span className="glyphicon glyphicon-play green"></span>
                    </a>
                </li>
            </ul>
        );
    }
}

ComputeScore.propTypes = {
    cols: PropTypes.array.isRequired,
    rows: PropTypes.array.isRequired,
    optionIdx: PropTypes.string
};