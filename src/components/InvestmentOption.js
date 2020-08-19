import React from 'react';
import styles from './InvestmentOption.module.css'

const investmentOption = (props) => {
    const options = props.options.map(x => <option value={x.id}>{x.name}</option>)

    return (
        <div className={styles.Input}>
            <select>
                {options}
            </select>
            <input className={styles.InputElement} type="text" onchange={props.changed} value={props.percentage}/>
            <button onClick={props.clicked}>Delete</button>
    </div>
    );

};

export default investmentOption;