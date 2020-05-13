import React from 'react';
import {
  Router,
  Route,
  Switch
} from 'react-router-dom';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { createBrowserHistory } from 'history'
import configureStore from './store/configureStore';
import { startSetExpenses } from './actions/expenses';
import {login, logout} from './actions/auth';
import getVisibleExpenses from './selectors/expenses';
import './style/styles.scss';
import './App.css';
import DashBoard from './components/Dashboard';
import AddExpense from './components/AddExpense';
import EditExpense from './components/EditExpense';
import NotFoundPage from './components/NotFoundPage';
import LoadingPage from'./components/LoadingPage';
import './firebase/firebase'
import Login from './components/Login';
import {firebase}  from './firebase/firebase';
import PrivateRoute from './routers/PrivateRoute';
import PublicRoute from './routers/PublicRoute';


export const history = createBrowserHistory()

function App() {
  return (
    <Router history={history}>
      <div className="App">
        <Switch>
            <PublicRoute path="/" component={Login} exact/>
            <PrivateRoute path="/dashboard" component={DashBoard} exact/>
            <PrivateRoute path="/create" component={AddExpense}/>
            <PrivateRoute path="/edit/:id" component={EditExpense}/>
            <Route component = {NotFoundPage} />
            </Switch>
      </div>
    </Router>
  );
}


const store = configureStore();

const jsx = (
  <Provider store={store}>
    <App />
  </Provider>
);

let hasRendered = false;
const renderApp = () =>{
  if(!hasRendered){
    ReactDOM.render(jsx, document.getElementById('app'));
    hasRendered = true;
  }
}

ReactDOM.render(<LoadingPage />, document.getElementById('app'));



firebase.auth().onAuthStateChanged((user) => {
  if(user){
    store.dispatch(login(user.uid));
    store.dispatch(startSetExpenses()).then(() =>{
      renderApp();
      if(history.location.pathname === '/'){
        history.push('/dashboard');
      }
  });
  }else{
    store.dispatch(logout());
    renderApp();
    history.push('/');
  }
});