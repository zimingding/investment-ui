import React from 'react';
import styles from './InvestmentOption.module.css'

const investmentOption = (props) => {
    const options = props.options.map(x => <option key={x.id} value={x.id}>{x.name}</option>)

    return (
        <div className={styles.Input}>
            <select value={props.value} onChange={props.optionChanged}>
                {options}
            </select>
            <input className={styles.InputElement} type="text" onChange={props.percentageChanged} value={props.percentage} placeholder="%"/>
            {props.amount}
            <button onClick={props.clicked} disabled={props.disabled}>Delete</button>
    </div>
    );

};

export default investmentOption;