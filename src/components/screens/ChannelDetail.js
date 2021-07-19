import React ,{useEffect,useState} from 'react'
import { useParams ,Link} from 'react-router-dom';

export default function ChannelDetail() {
    let { channelId } = useParams();
    const [posts,setPosts]=useState([]);
    const [user,setUser]=useState([]);
    const [channels,setChannels]=useState([]);
    useEffect(()=>{
        setUser(JSON.parse(localStorage.getItem("user")))
        fetch(`http://localhost:5000/posts/${channelId}`,{
        }).then(res=>res.json())
        .then(result=>{
            setPosts(result.posts)
        })
    },[posts])
    useEffect(()=>{        
            var xhttp = new XMLHttpRequest();
            xhttp.addEventListener("load", function(response)
            {
                var result=JSON.parse(this.responseText);
                setChannels(result.channel)
            })
    
            xhttp.open("get", "http://localhost:5000/channels");
            xhttp.send();
    },[])
    const cretaePost=(event,username)=>{
        if (event.key === "Enter" && event.target.value !== "") {
            fetch(`http://localhost:5000/createPost`,{
                method:"post",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    data:event.target.value,username,channelId
                })
                
            }).then(res=>res.json())
            .then(result=>{
                setPosts([...posts, event.target.value]);
            })
            event.target.value = "";
        }
    }
    return (
        <div style={{display: "flex"}}>
            <div style={{width:"20%"}} >
                <div style={{fontSize:"20px"}}>
                    <Link to='/'>Home </Link>  
                    {"> "}Channel
                </div>
                <h2 style={{background:"orange"}}>Channels</h2>
                {
                    channels.map((item,index)=>{
                        return (
                            <div key={index}>
                                <Link to={"/channel/"+item._id} >
                                    <div style={{fontSize:"25px"}} key={index}>
                                    <i style={{color:"orange"}}>ch{index+1}</i> <span key={index}>{item.channelname}</span>
                                    <hr/>
                                    </div>
                                    <br/>
                                </Link>
                            </div>
                        )
                    })
                }
            </div>
            <div className="line"></div>
            <div>
                <div style={{margin:"10px",width:"100%"}}>
                    <h2>Posts</h2>
                    {
                        posts.map((item,index)=>{
                            return (
                                    <div className="posts" key={index}>
                                        <h6 style={{color:"red"}}><b>{item.postedBy}:</b></h6>
                                        <h5>{item.post}</h5>
                                        <hr/>
                                    </div>
                            )
                        })
                    }
                </div>
                <div className="input">
                    <hr/>
                    <input type="text" onKeyUp={event => cretaePost(event,user.username)} placeholder="Press enter to make post"></input>
                </div>
            </div>
        </div>        
    )
}
