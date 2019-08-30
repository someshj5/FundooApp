import React from 'react';
import Dashboard from './components/DashboardComponent'
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from './components/Login';
import Registration from './components/Registration';
import ResetPassword from './components/ResetPassword';

function App(){

  return(

    <div>
     <Router>
       <Route path="/dashboard" exact component={Dashboard} />
       <Route path = "/login" exact component={Login}/>
       <Route path = "/signup" exact component={Registration}/>
       <Route path = "/resetpassword" exact component={ResetPassword}/>
     </Router>
    </div>
  )
}

export default App;
