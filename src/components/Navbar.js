import React, {useState, useEffect}from 'react';
import {Link,useHistory} from 'react-router-dom';
const Navbar=(props)=>{
  var history=useHistory();

  const renderList=()=>{
    console.log(props.user)
  var token=localStorage.getItem('jwt')
    if(props.user){
      return [
        <li key="3">
           <button className="btn #c62828 red darken-3"
              onClick={()=>{
                localStorage.clear()
                history.push('/signin')
              }}>LogOut
            </button>
        </li>
      ]
    }else{
      return [
        <li key="1"><Link to="/signin">Login</Link></li>,
        <li key="2"><Link to="/signup">Signup</Link></li>
      ]
    }
  }
  return(
    
    <nav>
      <div className="nav-wrapper white">
        <Link to={"/"} className="brand-logo left">Messaging App</Link>
        <ul id="nav-mobile" className="right" >
            {renderList()}
        </ul>
      </div>
    </nav>  
  );
}
export default Navbar;