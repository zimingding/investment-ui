import * as actionTypes from './actions';

const initialState = {
    investmentAmount: 100000,
    availableAmount: 100000,
    investmentOptions: [
        {id: 0, investOptionId: -1, percentage: ''},
        {id: 1, investOptionId: -1, percentage: ''},
        {id: 2, investOptionId: -1, percentage: ''},
        {id: 3, investOptionId: -1, percentage: ''},
        {id: 4, investOptionId: -1, percentage: ''},
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
            updatedInvestmentOptions = state.investmentOptions.concat({id: newId, investOptionId: -1, percentage: ''});
            return {
                ...state,
                investmentOptions: updatedInvestmentOptions
            };
        case actionTypes.DELETE_INVESTMENT_OPTION:
            updatedInvestmentOptions = state.investmentOptions.filter(io => io.id !== action.id);
            return {
                ...state,
                investmentOptions: updatedInvestmentOptions,
                availableAmount: calculateAvailableAmount(state.investmentAmount, updatedInvestmentOptions),
            };
        case actionTypes.UPDATE_INVESTMENT_OPTION:
            updatedInvestmentOptions = state.investmentOptions.slice();
            index = updatedInvestmentOptions.findIndex(io => io.id === action.id);
            updatedInvestmentOptions[index].investOptionId = action.optionId;
            return {
                ...state,
                investmentOptions: updatedInvestmentOptions
            };
        case actionTypes.UPDATE_PERCENTAGE:
            updatedInvestmentOptions = state.investmentOptions.slice();
            index = updatedInvestmentOptions.findIndex(io => io.id === action.id);
            updatedInvestmentOptions[index].percentage = action.percentage;
    
            let updatedAvailableAmount = calculateAvailableAmount(state.investmentAmount, state.investmentOptions);
            return {
                ...state,
                investmentOptions: updatedInvestmentOptions,
                availableAmount: updatedAvailableAmount,
            };
        default:
            return state;
    }
};

export default reducer;