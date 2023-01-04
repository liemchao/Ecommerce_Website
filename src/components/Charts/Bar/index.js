import React, { Component } from 'react';
import CardBasic from '../../Cards/Basic';
import Chart from "chart.js";


class ChartBar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            title: this.props.title,
        }
    }
    chartRef = React.createRef();

    componentDidMount() {

        const myBarChart = this.chartRef.current.getContext("2d");
        this.setState({ title: this.props.title ? this.props.title : 'Basic Card Example' });
        

        new Chart(myBarChart, {
            type: 'bar',
            data: {
                labels: ["Apartment", "Officetel","Resort","Shophouse"],
                datasets: [{
                    data: [1, 1, 1, 1, 1],
                    backgroundColor: ['#4e73df', '#1cc88a', '#17a673','#1cc88a'],
                    hoverBackgroundColor: ['#2e59d9', '#17a673','#1cc88a','#1cc88a'],
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
                // cutoutPercentage: 80,
            },
        });
    }


    render() {
        return (

            <CardBasic title={this.state.title}>
                <div className="chart-bar">
                    <canvas id="myBarChart"
                    ref={this.chartRef}
                    >
                     
                    </canvas>
                </div>
                <hr />
                    </CardBasic>
        )
    }
}

export default ChartBar;