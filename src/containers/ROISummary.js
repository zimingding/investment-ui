import React, { Component } from 'react';
import { connect } from 'react-redux';

class ROISummary extends Component {
    state = {
        projectedReturn: '',
        totalFees: ''
    };

    calculate = () => {
        console.log('fetch result ...', this.props.investmentAmount, this.props.investmentOptions);
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