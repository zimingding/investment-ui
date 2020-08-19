import React, { Component } from 'react';

import InvestmentOption from '../components/InvestmentOption';

class InvestmentControl extends Component {
    state = {
        investmentAmount: 100000,
        availableAmount: 100000,
        investmentOptions: [
            {id: 0, investOptionId: null, percentage: 0},
            {id: 1, investOptionId: null, percentage: 0},
            {id: 2, investOptionId: null, percentage: 0},
            {id: 3, investOptionId: null, percentage: 0},
            {id: 4, investOptionId: null, percentage: 0},
        ]
    };

    investmentAmountChangedHandler = (event) => {
        this.setState({
            investmentAmount: event.target.value,
            availableAmount: event.target.value,
        });
    }

    render() {
        const investOptions = [
            {id: 1, name: 'Cash investments'},
            {id: 2, name: 'Fixed interest'},
            {id: 3, name: 'Shares'}
        ];

        const investmentOptions = this.state.investmentOptions.map(io => 
            <InvestmentOption 
                key={io.id} 
                options={investOptions} 
                percentage={io.percentage} 
            />);
        return (
            <React.Fragment>
                <div>
                    Investment Amount <input type="text" value={this.state.investmentAmount} onChange={this.investmentAmountChangedHandler} />
                </div>
                <div>Available Amount : {this.state.availableAmount}</div>
                {investmentOptions}
            </React.Fragment>
        )
    }
}

export default InvestmentControl;