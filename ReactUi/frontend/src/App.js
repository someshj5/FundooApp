import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import ResetPassword from './components/ResetPassword';
import DashboardPage from './pages/DashboardPage';
import RegistrationPage from './pages/RegistrationPage';
import LoginPage from './pages/LoginPage';

function App(){

  return(

    <div>
     <Router>
       <Route path="/dashboard" exact component={DashboardPage} />
       <Route path = "/login" exact component={LoginPage}/>
       <Route path = "/signup" exact component={RegistrationPage}/>
       <Route path = "/resetpassword" exact component={ResetPassword}/>
     </Router>
    </div>
  )
}

export default App;
