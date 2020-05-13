import React from 'react';
import {connect} from 'react-redux';
import {startLogin} from '../actions/auth';

export const Login = ({startLogin}) => (
    <div className="box-layout">
        <div className="box-layout__box">
            <div className="box-layout__text">
                <h1>
                    BudgetApp
                </h1>
            </div>
            <div className="google-btn">
            <div className="google-icon-wrapper">
                <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/>
            </div>
            <p className="btn-text"><b onClick={startLogin}>Sign in with google</b></p>
        </div>
        </div>
    </div>
);

const mapDispatchToProps = (dispatch) => ({
    startLogin: () => dispatch(startLogin())
});

export default connect(undefined, mapDispatchToProps)(Login)