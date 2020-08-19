import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import InvestmentControl from './containers/InvestmentControl';
import ROISummary from './containers/ROISummary';

class Layout extends Component {
    constructor(props) {
        super(props);
        this.child = React.createRef();
      }

    tabSelectedHandler = (tabIndex) => {
        if (tabIndex === 1) {
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
                  <InvestmentControl />
                </TabPanel>
                <TabPanel forceRender={true} >
                  <ROISummary ref={this.child} />
                </TabPanel>
            </Tabs>
        );
    }
}

export default Layout;