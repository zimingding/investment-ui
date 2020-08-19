import React, { Component } from 'react';
import axios from 'axios';

import InvestmentOption from '../components/InvestmentOption';

class InvestmentControl extends Component {
    state = {
        investmentAmount: 100000,
        availableAmount: 100000,
        options: [{id: -1, name: '--select--'}],
        investmentOptions: [
            {id: 0, investOptionId: -1, percentage: ''},
            {id: 1, investOptionId: -1, percentage: ''},
            {id: 2, investOptionId: -1, percentage: ''},
            {id: 3, investOptionId: -1, percentage: ''},
            {id: 4, investOptionId: -1, percentage: ''},
        ]
    };

    componentDidMount() {
        axios.get('http://localhost:5000/investment/options')
            .then(response => {
                this.setState({
                    options: this.state.options.concat(response.data),
                });
            });
    }

    investmentAmountChangedHandler = (event) => {
        this.setState({
            investmentAmount: event.target.value,
            availableAmount: event.target.value,
        });
    };

    deleteInvestmentOptionHandler = (id) => {
        this.setState({
            investmentOptions: this.state.investmentOptions.filter(io => io.id !== id),
        });
    };

    addInvestmentOptionHandler = () => {
        const newId = this.state.investmentOptions[this.state.investmentOptions.length-1].id + 1;
        let updatedInvestmentOptions = this.state.investmentOptions.concat({id: newId, investOptionId: -1, percentage: ''});
        this.setState({
            investmentOptions: updatedInvestmentOptions
        });
    };

    optionChangedHandler = (event, id) => {
        let updatedInvestmentOptions = this.state.investmentOptions.slice();
        const index = updatedInvestmentOptions.findIndex(io => io.id === id);
        updatedInvestmentOptions[index].investOptionId = event.target.value;
        this.setState({
            investmentOptions: updatedInvestmentOptions
        });
    };

    percentageChangedHandler = (event, id) => {
        let updatedInvestmentOptions = this.state.investmentOptions.slice();
        const index = updatedInvestmentOptions.findIndex(io => io.id === id);
        updatedInvestmentOptions[index].percentage = event.target.value;

        let updatedAvailableAmount = this.state.investmentAmount;
        for (let investOption of this.state.investmentOptions) {
            if (investOption.percentage) {
                updatedAvailableAmount -= this.state.investmentAmount * investOption.percentage / 100;
            }
                
        }

        this.setState({
            investmentOptions: updatedInvestmentOptions,
            availableAmount: updatedAvailableAmount,
        });
    };

    render() {
        const investmentOptions = this.state.investmentOptions.map(io => {
            let amount = null;
            if (io.percentage) {
                amount = this.state.investmentAmount * io.percentage / 100;
            }
            return <InvestmentOption 
                key={io.id}
                options={this.state.options}
                percentage={io.percentage}
                value={io.investOptionId}
                amount={amount}
                disabled={this.state.investmentOptions.length <= 1}
                optionChanged={(e) => this.optionChangedHandler(e, io.id)}
                percentageChanged={(e) => this.percentageChangedHandler(e, io.id)}
                clicked={() => this.deleteInvestmentOptionHandler(io.id)}
            />
        }
            );
        return (
            <React.Fragment>
                <div>
                    Investment Amount <input type="text" value={this.state.investmentAmount} onChange={this.investmentAmountChangedHandler} />
                </div>
                <div>Available Amount : {this.state.availableAmount}</div>
                {investmentOptions}
                <button onClick={this.addInvestmentOptionHandler}>Add</button>
            </React.Fragment>
        )
    }
}

export default InvestmentControl;