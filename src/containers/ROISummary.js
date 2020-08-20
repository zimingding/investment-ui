import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class ROISummary extends Component {
    state = {
        projectedReturn: '',
        totalFees: ''
    };

    calculate = () => {
        const data = {
            investmentDetails: this.props.investmentOptions.map(io => {
                return {
                    investmentOptionId: Number(io.investOptionId),
                    percentage: Number(io.percentage),
                    amount: this.props.investmentAmount * io.percentage / 100
                };
            })
        };
        
        axios.post('http://localhost:5000/investment/calculate', data)
            .then(response => {
                this.setState({
                    projectedReturn: response.data.investmentReturn,
                    totalFees: response.data.fees,
                });
            }
        );
    };

    render() {
        return (
            <React.Fragment>
                <div>
                    Projected Return In 1 Year
                    <input type="text" value={this.state.projectedReturn} readOnly="readonly"></input>
                </div>
                <div>
                    Total Fees
                    <input type="text" value={this.state.totalFees} readOnly="readonly"></input>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        investmentAmount: state.investmentAmount,
        availableAmount: state.availableAmount,
        investmentOptions: state.investmentOptions,
    };
};

export default connect(mapStateToProps, null, null, { forwardRef: true })(ROISummary);