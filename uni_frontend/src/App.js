import React, { Component } from 'react';
import { BrowserRouter as Router,Route,Switch,Redirect} from 'react-router-dom';
import {browserHistory} from "react-router";
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AddDetails from './components/AddDetails';
import View from './components/View';
import EditDetails from './components/EditDetails'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      University_Data:[]
    }
  }

  render() {
    return (
      <div>
        
        <Router history={browserHistory} >
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path='/dashboard' component={Dashboard} />
            <Route path='/add' render={(props)=>(<AddDetails {...props}  />)} />
            <Route path='/view' render={()=>(<View University_Data={this.state.University_Data} />)} />
            <Route path="/edit/:id" render={(props)=>(
         <EditDetails  {...props} />
       )}/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
