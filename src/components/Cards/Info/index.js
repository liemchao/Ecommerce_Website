import React, { Component } from 'react';

class CardInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: this.props.value,
            title: this.props.title,
            icon: 'fas fa-calendar fa-2x text-gray-200',
            color: 'primary',
            cardClass: '',
            titleClass:'',
            com :this.props.com,
        }
    }

    componentDidMount() {
        this.setState({cardClass: `card border-left-${this.props.color} shadow h-200 `})
        this.setState({icon: `fas fa-${this.props.icon} fa-2x text-gray-200`})
        this.setState({titleClass: `text-xs font-weight-bold text-${this.props.color} text-uppercase mb-1`})
    }

    render() {
        return (
            <div className="col-xl-10 col-md-4 mb-2">
                <div className={this.state.cardClass}>
                    <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                                <div className={this.state.titleClass}>{this.props.title}</div>
                                <div className="h5 mb-0 font-weight-bold text-gray-800">{this.state.value}{this.state.com}</div>
                            </div>
                            <div className="col-auto">
                                <i className={this.state.icon}></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CardInfo;