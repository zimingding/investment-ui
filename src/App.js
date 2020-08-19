import React from 'react';
import './App.css';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import InvestmentControl from './containers/InvestmentControl';
import ROISummary from './containers/ROISummary';

function App() {
    return (
        <Tabs>
            <TabList>
                <Tab>Investment Options</Tab>
                <Tab>ROI</Tab>
            </TabList>

            <TabPanel forceRender={true} >
              <InvestmentControl />
            </TabPanel>
            <TabPanel forceRender={true} >
              <ROISummary />
            </TabPanel>
        </Tabs>
    );
}

export default App;
