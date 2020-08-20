import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import styles from './ROISummary.module.css';

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
                <fieldset>
                    <legend>ROI</legend>
                    <div className={styles.Container}>
                        <div className={styles.Column}>
                            Projected Return In 1 Year
                            <input className={styles.InputElement} type="text" value={this.state.projectedReturn} readOnly="readonly"></input>
                        </div>
                        <div className={styles.Column}>
                            Total Fees
                            <input className={styles.InputElement} type="text" value={this.state.totalFees} readOnly="readonly"></input>
                        </div>
                    </div>
                </fieldset>
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