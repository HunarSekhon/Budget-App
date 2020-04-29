import React from 'react';
import ExpenseList from './ExpenseList';
import ExpenseListFilters from './ExpenseListFilters'
import ExpensesSummary from './ExpensesSummary';

const Dashboard = () => (
    <>
    <h1>
        <ExpensesSummary />
        <ExpenseListFilters />
        <ExpenseList />
    </h1>
    </>
);

export default Dashboard;