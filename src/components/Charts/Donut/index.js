import React, { Component } from 'react';
import Chart from "chart.js";

import CardBasic from '../../Cards/Basic';

class ChartDonut extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: this.props.title,
        }
    }
    chartRef = React.createRef();

    componentDidMount() {

        const myPieChart = this.chartRef.current.getContext("2d");
        console.log(this.chartRef);
        this.setState({ title: this.props.title ? this.props.title : 'Basic Card Example' });
        

        new Chart(myPieChart, {
            type: 'doughnut',
            data: {
                labels: ["Direct", "Referral", "Social"],
                datasets: [{
                    data: [55, 30, 15],
                    backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc'],
                    hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'],
                    hoverBorderColor: "rgba(234, 236, 244, 1)",
                }],
            },
            options: {
                maintainAspectRatio: false,
                tooltips: {
                    backgroundColor: "rgb(255,255,255)",
                    bodyFontColor: "#858796",
                    borderColor: '#dddfeb',
                    borderWidth: 1,
                    xPadding: 15,
                    yPadding: 15,
                    displayColors: false,
                    caretPadding: 10,
                },
                legend: {
                    display: false
                },
                cutoutPercentage: 80,
            },
        });
    }

    render() {
        return (
            <CardBasic title={this.state.title}>
                 <div className="chart-pie pt-4">
                        <canvas id="myPieChart" ref={this.chartRef}></canvas>
                    </div>
                    <hr />
                  
            </CardBasic>
        )
    }
}

export default ChartDonut;