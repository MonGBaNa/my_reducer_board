import React, { useEffect } from 'react';
import { api } from '../api';
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
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
          <AuthRoute exact path="/" isAuth={localStorage.getItem("username") !== null} component={Home}/>
          <Route exact path="/write" component={Write} />
          <Route exact path="/modify/:id" component={Modify} />
          <Route exact path="/view/:id" component={View} />
          <Route exact path="/auth/login" component={Login} />
          <Route exact path="/auth/register" component={Register} />
          <Route exact path="/profile/modify" component={ProfileModify} />
          <Route exact path="/notfound" component={NotFound} />
          <Route exact path="/test" component={test} />
          <Redirect path="*" to="/notfound" />
        </Switch>
      </Router>
    </>
  );
}

export default App;