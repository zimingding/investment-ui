import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import InvestmentOption from '../components/InvestmentOption';
import * as actionTypes from '../store/actions';

class InvestmentControl extends Component {
    state = {
        options: [{id: -1, name: '--select--'}],
    };

    componentDidMount() {
        axios.get('http://localhost:5000/investment/options')
            .then(response => {
                this.setState({
                    options: this.state.options.concat(response.data),
                });
            });
    }

    render() {
        const investmentOptions = this.props.investmentOptions.map(io => {
            let amount = null;
            if (io.percentage) {
                amount = this.props.investmentAmount * io.percentage / 100;
            }
            return <InvestmentOption 
                key={io.id}
                options={this.state.options}
                percentage={io.percentage}
                value={io.investOptionId}
                amount={amount}
                disabled={this.props.investmentOptions.length <= 1}
                optionChanged={(e) => this.props.onUpdateInvestmentOption(e, io.id)}
                percentageChanged={(e) => this.props.onUpdatePercentage(e, io.id)}
                clicked={() => this.props.onDeleteInvestmentOption(io.id)}
            />
        });
        
        return (
            <React.Fragment>
                <div>
                    Investment Amount <input type="text" value={this.props.investmentAmount} onChange={this.props.onUpdateAmount} />
                </div>
                <div>Available Amount : {this.props.availableAmount}</div>
                {investmentOptions}
                <button onClick={this.props.onAddInvestmentOption}>Add</button>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        investmentAmount: state.investmentAmount,
        availableAmount: state.availableAmount,
        investmentOptions: state.investmentOptions,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onUpdateAmount: (e) => dispatch({type: actionTypes.UPDATE_AMOUNT, amount: e.target.value}),
        onAddInvestmentOption: () => dispatch({type: actionTypes.ADD_INVESTMENT_OPTION}),
        onDeleteInvestmentOption: (id) => dispatch({type: actionTypes.DELETE_INVESTMENT_OPTION, id: id}),
        onUpdateInvestmentOption: (e, id) => dispatch({type: actionTypes.UPDATE_INVESTMENT_OPTION, id: id, optionId: e.target.value}),
        onUpdatePercentage: (e, id) => dispatch({type: actionTypes.UPDATE_PERCENTAGE, id: id, percentage: e.target.value}),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(InvestmentControl);