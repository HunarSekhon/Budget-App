import React from 'react';
import {
    NavLink
} from 'react-router-dom';

import {connect} from 'react-redux';
import {startLogout} from './actions/auth'

export const Header = ({startLogout}) => (
    <header>
        <h1>Budget-App</h1>
            <NavLink to = "/dashboard" activeClassName="is-active" >Dashboard</NavLink>
            <NavLink to = "/create" activeClassName="is-active">Add Expense</NavLink>
            <button onClick={startLogout}>Logout</button>
    </header>
);

const mapDispatchToProps = (disppatch) =>({
    startLogout: () => disppatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Header);