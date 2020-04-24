import React, { useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import {Login, Register, Home, View, Write, Modify, ProfileModify, FindUser, NotFound, test} from '../Routes'

const App = (props) => {
  useEffect(()=>{
    const ServerCheck = async() => {
      try {
        await axios.get('/api/check');
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
    console.log(props)
  },[])
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/write" component={Write} />
          <Route path="/modify/:id" component={Modify} />
          <Route path="/view/:id" component={View} />
          <Route path="/auth/login" component={Login} />
          <Route path="/auth/register" component={Register} />
          <Route path="/profile/modify" component={ProfileModify} />
          <Route path="/notfound" component={NotFound} />
          <Route path="/test" component={test} />
          <Redirect path="*" to="/notfound" />
        </Switch>
      </Router>
    </>
  );
}

export default App;