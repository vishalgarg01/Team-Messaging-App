import React, { useEffect,useState} from 'react';
import './App.css';
import { Route, Switch,useHistory } from "react-router-dom"
import Navbar from './components/Navbar';
import Home from './components/screens/Home';
import Login from './components/screens/Login';
import Signup from './components/screens/Signup';
import ChannelDetail from './components/screens/ChannelDetail';

function App() {
  var history=useHistory();
  const [isLoggedin,setIsLoggedin]=useState("");
  useEffect(()=>{
    const user=JSON.parse(localStorage.getItem("user"))
    if(user){
      setIsLoggedin(true);
      history.push('/')
    }else{
      setIsLoggedin(false);
      history.push('/signin')
    }
    console.log(isLoggedin)
  },[isLoggedin])
  return (
    <div className="App">
      <Navbar user={isLoggedin} />
      <Switch>
        <Route  path="/signin">
          <Login/>
        </Route>
        <Route  path="/signup">
          <Signup/>
        </Route>
        <Route exact path="/">
          <Home/>
        </Route>  
        <Route path="/channel/:channelId" >
          <ChannelDetail />
        </Route>

      </Switch>
    </div>
  );
}

export default App;
