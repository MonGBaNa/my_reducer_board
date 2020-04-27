import React, { useEffect } from 'react';
import { api } from '../api';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import {Login, Register, Home, View, Write, Modify, ProfileModify, NotFound, test, AuthRoute} from '../Routes'

const App = (props) => {
  useEffect(()=>{
    const ServerCheck = async() => {
      try {
        await api.get('/api/check');
      } catch(e) {
        const {status} = e.response;
        console.log(status);
        if(status === 500) {
          window.alert("서버가 닫혀있습니다.")
        }
        throw e;
      }
    }
    ServerCheck();
  },[])
  return (
    <>
      <Router>
        <Switch>
          <AuthRoute exact path={process.env.PUBLIC_URL + "/"} isAuth={localStorage.getItem("username") !== null} component={Home}/>
          <Route path={process.env.PUBLIC_URL + "/write"} component={Write} />
          <Route path={process.env.PUBLIC_URL + "/modify/:id"} component={Modify} />
          <Route path={process.env.PUBLIC_URL + "/view/:id"} component={View} />
          <Route path={process.env.PUBLIC_URL + "/auth/login"} component={Login} />
          <Route path={process.env.PUBLIC_URL + "/auth/register"} component={Register} />
          <Route path={process.env.PUBLIC_URL + "/profile/modify"} component={ProfileModify} />
          <Route path={process.env.PUBLIC_URL + "/notfound"} component={NotFound} />
          <Route path={process.env.PUBLIC_URL + "/test"} component={test} />
          <Redirect path="*" to={process.env.PUBLIC_URL + "/notfound"} />
        </Switch>
      </Router>
    </>
  );
}

export default App;