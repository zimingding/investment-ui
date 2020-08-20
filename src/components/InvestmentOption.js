import React from 'react';
import styles from './InvestmentOption.module.css'

const investmentOption = (props) => {
    const options = props.options.map(x => <option key={x.id} value={x.id}>{x.name}</option>)
    
    let optionInputClasses = [styles.InputElement];
    let percentageInputClasses = [styles.InputElement];
    if (props.invalid.percentage && props.touched.percentage) {
        percentageInputClasses.push(styles.Invalid);
    }
    if (props.invalid.option && props.touched.option) {
        optionInputClasses.push(styles.Invalid);
    }

    return (
        <div className={styles.Input}>
            <select className={optionInputClasses.join(' ')} value={props.value} onChange={props.optionChanged}>
                {options}
            </select>
            <input className={percentageInputClasses.join(' ')} type="text" onChange={props.percentageChanged} value={props.percentage} placeholder="%"/>
            {props.amount}
            <button className={styles.Button} onClick={props.clicked} disabled={props.disabled}>Delete</button>
    </div>
    );

};

export default investmentOption;