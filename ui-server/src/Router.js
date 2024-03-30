import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import EmployeeCreate from './components/EmployeeCreate';
import EmployeeDirectory from './components/EmployeeDirectory';
import EmployeeTable from './components/EmployeeTable';
import EmployeeSearch from './components/EmployeeSearch';

const AppRouter = () => {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={EmployeeDirectory} />
          <Route exact path="/create" component={EmployeeCreate} />
          <Route exact path="/details/:id" component={EmployeeTable} />
          <Route exact path="/serach" component={EmployeeSearch} />
        </Switch>
      </Router>
    );
  };
  
  export default RouterComponent;
