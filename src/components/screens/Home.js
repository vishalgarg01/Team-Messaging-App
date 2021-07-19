import React,{ useState,useEffect,useRef} from 'react';

import {Link} from 'react-router-dom';

import M from 'materialize-css';

const Home=()=>{
    const CreateModal =useRef(null)
    const SelectTags =useRef(null)
    const [channels,setChannels]=useState([]);
    const [channelname,setChannelName]=useState("");
    const [description,setDescriptions]=useState("");
    const [tags,setTags]=useState([]);
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    useEffect(()=>{
        getChannels();
    },[])
    useEffect(()=>{
        M.Modal.init(CreateModal.current)
        M.FormSelect.init(SelectTags.current)
    },[])
    const createChannel=()=>{
        var xhttp = new XMLHttpRequest();
        xhttp.addEventListener("load", function(response)
        {
            var data=JSON.parse(this.responseText);
            if(data.error){
                M.toast({html:data.error, classes:"#c62828 red darken-3"})
            }
            else{
                M.toast({html:"successfully added", classes:"#43a047 green darken-1"})
                toggle()
                setChannelName("");
                setDescriptions("");
                getChannels();
            }
        })
        xhttp.open("post", "http://localhost:5000/create_channel");
        xhttp.setRequestHeader('Content-type','application/json');
        xhttp.send(JSON.stringify({ channelname,description,tags }));
        tags.length = 0;

    }
    const getChannels=()=>{
        
        var xhttp = new XMLHttpRequest();
        xhttp.addEventListener("load", function(response)
        {
            var result=JSON.parse(this.responseText);
            setChannels(result.channel)
        })

        xhttp.open("get", "http://localhost:5000/channels");
        xhttp.send();
    }
    const addTags = event => {
        setTags([...tags, event.target.value]);
        event.target.value = "";
    }
    const removeTags = index => {
        setTags([...tags.filter(tag => tags.indexOf(tag) !== index)]);
    };
    
    return(
        <>
        <button data-target="modal1" className=" modal-trigger btn blue" style={{margin:"50px 0 0 20px"}}>create Channel</button>
        <div className="HomeLayout">
        {
            channels.map((item,index)=>{
                return (
                    <div className="card home-card" key={index}>
                        <Link to={"/channel/"+item._id} >
                            <div className="card-content">
                                <h4><u>{item.channelname}</u></h4>
                                <h5>{item.description}</h5>
                                {
                                    item.tags.map((tag,index)=>{
                                        return (
                                        <span key={index} className=" badge grey middle" style={{color:"black"}}>{tag} </span>
                                        )
                                    })
                                }
                            </div>
                        </Link>
                    </div>
                )
            })
        }
        </div>
        <div id="modal1" className="modal" ref={CreateModal} >
          <div className="modal-content">
            <input type="text" placeholder="Channel name" value={channelname} onChange={(e)=>setChannelName(e.target.value)}/>
            <input type="text" placeholder="description" value={description} onChange={(e)=>setDescriptions(e.target.value)}/>
            <div className="input-field col s12">
                <select ref={SelectTags} onChange={(e)=>{addTags(e)}}>
                    <option >Select Tags</option>
                    <option value="React">React</option>
                    <option value="Node">Node</option>
                    <option value="Angular">Angular</option>
                    <option value="Web Development">Web Development</option>
                </select>
                <label>Tags</label>
                <ul> 
                    {tags.map((tag, index) => (
                        <span className=" badge left" key={index}>{tag}
                            <i className="material-icons close"  onClick={() => removeTags(index)}>close</i>
                        </span>
                    ))}
                </ul>       
            </div>
          </div>
          <div className="modal-footer">
            <button className="modal-close btn-flat" onClick={()=>createChannel()}>Create Channel</button>
            <button className="modal-close btn-flat">close</button>
          </div>
        </div>
        
        </>
    )
}


export default Home;