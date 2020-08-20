import * as actionTypes from './actions';

const initialState = {
    investmentAmount: 100000,
    availableAmount: 100000,
    investmentOptions: [
        {id: 0, investOptionId: -1, percentage: '', invalid: {option: true, percentage: true}, touched: {option: false, percentage:false}},
        {id: 1, investOptionId: -1, percentage: '', invalid: {option: true, percentage: true}, touched: {option: false, percentage:false}},
        {id: 2, investOptionId: -1, percentage: '', invalid: {option: true, percentage: true}, touched: {option: false, percentage:false}},
        {id: 3, investOptionId: -1, percentage: '', invalid: {option: true, percentage: true}, touched: {option: false, percentage:false}},
        {id: 4, investOptionId: -1, percentage: '', invalid: {option: true, percentage: true}, touched: {option: false, percentage:false}},
    ]
};

const calculateAvailableAmount = (investmentAmount, investmentOptions) => {
    let availableAmount = investmentAmount;
    for (let investOption of investmentOptions) {
        if (investOption.percentage) {
            availableAmount -= investmentAmount * investOption.percentage / 100;
        }
    }
    return availableAmount;
};

const checkValidity = (value, investmentOptions) => {
    let isValid = !isNaN(value) && value > 0 && value <= 100;

    let totalPercentage = 0;
    for (let investOption of investmentOptions) {
        if (investOption.percentage)
            totalPercentage += Number(investOption.percentage);
    }

    isValid = totalPercentage <=100 && isValid;

    return isValid;
}

const reducer = (state = initialState, action) => {
    let updatedInvestmentOptions = null;
    let index = null;
    switch (action.type) {
        case actionTypes.UPDATE_AMOUNT:
            return {
                ...state,
                investmentAmount: action.amount,
                availableAmount: calculateAvailableAmount(action.amount, state.investmentOptions),
            };
        case actionTypes.ADD_INVESTMENT_OPTION:
            const newId = state.investmentOptions[state.investmentOptions.length-1].id + 1;
            updatedInvestmentOptions = state.investmentOptions.concat({id: newId, investOptionId: -1, percentage: '', invalid: {option: true, percentage: true}, touched: {option: false, percentage:false}});
            return {
                ...state,
                investmentOptions: updatedInvestmentOptions
            };
        case actionTypes.DELETE_INVESTMENT_OPTION:
            updatedInvestmentOptions = state.investmentOptions.filter(io => io.id !== action.id);
            for (let investmentOption of updatedInvestmentOptions) {
                investmentOption.invalid.percentage = !checkValidity(investmentOption.percentage, updatedInvestmentOptions);
            }
            return {
                ...state,
                investmentOptions: updatedInvestmentOptions,
                availableAmount: calculateAvailableAmount(state.investmentAmount, updatedInvestmentOptions),
            };
        case actionTypes.UPDATE_INVESTMENT_OPTION:
            updatedInvestmentOptions = state.investmentOptions.slice();
            index = updatedInvestmentOptions.findIndex(io => io.id === action.id);
            updatedInvestmentOptions[index].investOptionId = action.optionId;
            updatedInvestmentOptions[index].touched.option = true;
            updatedInvestmentOptions[index].invalid.option = action.optionId === '-1';

            return {
                ...state,
                investmentOptions: updatedInvestmentOptions
            };
        case actionTypes.UPDATE_PERCENTAGE:
            updatedInvestmentOptions = state.investmentOptions.slice();
            index = updatedInvestmentOptions.findIndex(io => io.id === action.id);
            updatedInvestmentOptions[index].percentage = action.percentage;
            updatedInvestmentOptions[index].touched.percentage = true;
            updatedInvestmentOptions[index].invalid.percentage = !checkValidity(action.percentage, updatedInvestmentOptions);
    
            let updatedAvailableAmount = calculateAvailableAmount(state.investmentAmount, state.investmentOptions);
            return {
                ...state,
                investmentOptions: updatedInvestmentOptions,
                availableAmount: updatedAvailableAmount,
            };
        case actionTypes.ROI_TAB_SELECTED:
            updatedInvestmentOptions = state.investmentOptions.slice();
            for (let investmentOption of updatedInvestmentOptions) {
                investmentOption.touched.option = true;
                investmentOption.touched.percentage = true;
            }

            return {
                ...state,
                investmentOptions: updatedInvestmentOptions
            };
        default:
            return state;
    }
};

export default reducer;