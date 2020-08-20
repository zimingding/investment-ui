import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { connect } from 'react-redux';

import InvestmentControl from './containers/InvestmentControl';
import ROISummary from './containers/ROISummary';
import * as actionTypes from './store/actions';

class Layout extends Component {
    state = {
        error: null
    };

    constructor(props) {
        super(props);
        this.child = React.createRef();
      }

    tabSelectedHandler = (tabIndex) => {
        if (tabIndex === 1) {
            this.props.onTabSelect();

            if (this.props.availableAmount !== 0) {
                this.setState({
                    error: 'Investment option should add up to 100 percent',
                })
                return false;
            }

            for (let investmentOption of this.props.investmentOptions) {
                if (investmentOption.invalid.option || investmentOption.invalid.percentage) {
                    return false;
                }
            }

            this.child.current.calculate();
        }
    };
    
    render() {
        return (
            <Tabs onSelect={this.tabSelectedHandler}>
                <TabList>
                    <Tab>Investment Options</Tab>
                    <Tab>ROI</Tab>
                </TabList>
    
                <TabPanel forceRender={true} >
                  <InvestmentControl error={this.state.error}/>
                </TabPanel>
                <TabPanel forceRender={true} >
                  <ROISummary ref={this.child} />
                </TabPanel>
            </Tabs>
        );
    }
}

const mapStateToProps = state => {
    return {
        investmentOptions: state.investmentOptions,
        availableAmount: state.availableAmount,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onTabSelect: () => dispatch({type: actionTypes.ROI_TAB_SELECTED})
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);