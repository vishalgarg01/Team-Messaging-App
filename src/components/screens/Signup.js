import React, { useState } from 'react';
import {Link,useHistory} from 'react-router-dom';
import M from 'materialize-css';

const Signup=()=>{
    const history=useHistory(); //to navigate after success
    const [username,setUserName]=useState("");
    const [password,setPassword]=useState("");
    const [email,setEmail]=useState("");
    const [region,setRegion]=useState("");

    
    const uploadFields=()=>{
        var xhttp = new XMLHttpRequest();
        xhttp.addEventListener("load", function(response)
        {
            var data=JSON.parse(this.responseText);
            if(data.error){
                M.toast({html:data.error, classes:"#c62828 red darken-3"})
            }
            else{
                M.toast({html:data.message, classes:"#43a047 green darken-1"})
                history.push('/signin');//navigate to login page
            }            
        })
        xhttp.open("post", "http://localhost:5000/signup");
        xhttp.setRequestHeader('Content-type','application/json');
        xhttp.send(JSON.stringify({ username,password,email,region }));
    }
    return(
        <div className="mycard">
        <div className="card authcard">
           <h2>Messaging App</h2>
           <input type="text" placeholder="name" value={username} onChange={(e)=>setUserName(e.target.value)}/>
           <input type="text" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
           <input type="text" placeholder="region" value={region} onChange={(e)=>setRegion(e.target.value)}/>
           <input type="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
           
           <button className="btn #64b5f6 blue darken-1"
           onClick={()=>uploadFields()}>Signup
           </button>
           <h5>
               <Link to="/signin">Already have an Account?</Link>
           </h5>
        </div>
    </div>
    )
}
export default Signup;