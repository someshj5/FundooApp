import React from 'react';
import Dashboard from './components/DashboardComponent'
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from './components/Login';
import Registration from './components/Registration';

function App(){

  return(

    <div>
     <Router>
       <Route path="/dashboard" exact component={Dashboard} />
       <Route path = "/login" exact component={Login}/>
       <Route path = "/signup" exact component={Registration}/>
     </Router>
    </div>
  )
}

export default App;
// Hi I'm just comment
