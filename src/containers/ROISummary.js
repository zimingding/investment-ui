import React, { Component } from 'react';

class ROISummary extends Component {

    state = {
        projectedReturn: 0,
        totalFees: 0
    };

    render() {
        return (
            <React.Fragment>
                <div>
                    Projected Return In 1 Year
                    <input type="text" value={this.state.projectedReturn}></input>
                </div>
                <div>
                    Total Fees
                    <input type="text" value={this.state.totalFees}></input>
                </div>
            </React.Fragment>
        );
    }
}

export default ROISummary;