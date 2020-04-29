import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import configureStore from './store/configureStore';
import { startSetExpenses } from './actions/expenses';
import {setTextFilter} from './actions/filters';
import getVisibleExpenses from './selectors/expenses';

import './App.css';
import DashBoard from './components/Dashboard';
import AddExpense from './components/AddExpense';
import EditExpense from './components/EditExpense';
import HelpPage from './components/Help';
import NotFoundPage from './components/NotFoundPage';
import Header from './Header';
import './firebase/firebase'


function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
            <Route path="/" component={DashBoard} exact/>
            <Route path="/create" component={AddExpense}/>
            <Route path="/edit/:id" component={EditExpense}/>
            <Route path="/help" component={HelpPage}/>
            <Route component = {NotFoundPage} />
            </Switch>
      </div>
    </Router>
    
  );
}


const store = configureStore();

// export function Jsx(){ 
//   return (
//     <Provider store = {store}>
//       <App />
//     </Provider>
//   );
// }

const jsx = (
  <Provider store={store}>
    <App />
  </Provider>
);


ReactDOM.render(<p>Loading....</p>, document.getElementById('app'));

ReactDOM.render(jsx, document.getElementById('root'));
