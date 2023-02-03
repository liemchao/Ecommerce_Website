import React, { Component } from 'react';
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

        const em = JSON.parse(localStorage.getItem("Temp"));
        const user = JSON.parse(localStorage.getItem("user"));
    
        const id = em.id
     
        fetch(`https://backup-dtv-crm.azurewebsites.net/api/v1/History/history/analyze-by-location?customerId=${id}`,
            {
                method: 'GET',
                headers: {
                    "Authorization": "Bearer " + user.token,
                    "Accept": "application/json, text/plain,",
                    "Content-type": "application/json; charset=UTF-8;",
                }
            }).then(res => res.json())
            .then((result) => {
                setItem(result.data)
              
    
            })

        const myBarChart = this.chartRef.current.getContext("2d");



        new Chart(myBarChart, {
            type: 'bar',
            data: {
                labels: ["Apartment", "Officetel", "Resort", "Shophouse"],
                datasets: [{
                    data: [1, 1, 1, 1, 1],
                    backgroundColor: ['#4e73df', '#1cc88a', '#17a673', '#1cc88a'],
                    hoverBackgroundColor: ['#2e59d9', '#17a673', '#1cc88a', '#1cc88a'],
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

            <>

                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary">{this.state.title}</h6>
                    </div>
                    <div className="card-body">
                        <div className="chart-bar">
                            <canvas id="myBarChart"
                                ref={this.chartRef}
                            >

                            </canvas>
                        </div>
                        <hr />
                    </div>
                </div>





            </>


        )
    }
}

export default ChartBar;