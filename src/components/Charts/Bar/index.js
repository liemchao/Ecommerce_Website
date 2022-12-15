import React, { Component } from 'react';
import CardBasic from '../../Cards/Basic';

class ChartBar extends Component {
    render() {
        return (

            <CardBasic title="Bar Charts">
                <div className="chart-bar">
                    <canvas id="myBarChart"></canvas>
                </div>
                <hr />
                    </CardBasic>
        )
    }
}

export default ChartBar;