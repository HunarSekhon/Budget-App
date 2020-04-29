import {createStore, combineReducers} from 'redux';
import uuid from 'uuid';
import { start } from 'repl';

const addExpense = (
    {
        description ='', 
        note = '', 
        amount =0, 
        createdAt = 0
    } = {}
) => ({
    type:'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt
    }
});


const removeExpense =({id} = {}) => ({
    type:'REMOVE_EXPENSE',
    id
})

const editExpense =(id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
})

const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
});

const sortByDate = () => ({
    type: 'SORT_BY_DATE'
});

const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
});

const setStartDate = (startDate) => ({
    type: 'SET_START_DATE',
    startDate
});

const setEndDate = (endDate) => ({
    type: 'SET_END_DATE',
    endDate
});


const expenseReducerDefaultState = [];

const expensesReducer = (state = expenseReducerDefaultState, action) => {
    switch(action.type) {
        case 'ADD_EXPENSE':
            return [
                ...state,
                action.expense
            ];
        case 'REMOVE_EXPENSE':
            return state.filter(({id}) => id !== action.id);
        case EDIT_EXPENSE:
            return state.map((expense) => {
                if (expense.id === action.id) {
                    return {
                        ...expense,
                        ...action.updates
                    };
                };
            });    
        default:
            return state;
    }
};

const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    stateDate: undefined,
    endDate: undefined
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch(action.type) {
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            };
        case 'SORT_BY_AMOUNT':
        return {
            ...state,
            sortBy: 'amount'
        };
        case 'SORT_BY_DATE':
        return {
            ...state,
            sortBy: 'date'
        };
        case 'SET_START_DATE':
        return {
            ...state,
            startDate: action.startDate
        };
        case 'SET_END_DATE':
        return {
            ...state,
            startDate: action.endDate
        }
        default:
            return state;
    }
};
const getVisibleExpenses = (expenses, {text, sortBy, stateDate, endDate}) => {
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;;
        const textMatch = expense.description.includes.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a,b) => {
        if(sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1;
        } else if(sortBy === 'amount'){
            return a.amount < b.amount ? 1 : -1;
        }
    });
};

const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
);

store.subscribe(()=> {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(store.getState(visibleExpenses));
});

const expenseOne = store.dispatch(addExpense({description: 'Rent', amount:100, createdAt = -21000}));

store.dispatch(removeExpense({id: expenseOne.expense.id}));

store.dispatch(editExpense(expenseOne.expense.id, {amount}));

store.dispatch(getTextFilter('rent'));
store.dispatch(setTextFilter());

store.dispatch(sortByAmount());
store.dispatch(sortByDate());

store.dispatch(setStartDate(125));
store.dispatch(setStartDate());

store.dispatch(setEndDate(1250));


console.log(store.getState());

const demoStare = {
    expenses: [{
        id: 'adfdfasdf',
        description: 'January Rent',
        note: 'This was the final ',
        amount: 600,
        createdAt: 0
    }],
    filters:{
        text: 'rent',
        sortBy: 'amount', 
        startDate: undefined,
        endDate: undefined
    }
};

const user = {
    name: 'Hunar',
    age: 24
};