import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import axios from 'axios';
import {BallClipRotateMultiple} from 'react-pure-loaders';

function Dash() {
    const redirect = useHistory()
    const ids = useParams()
    const person = ids.id
    const [userdata,setUserdata] = useState([])
    const [names,setname] = useState("")
    useEffect(() => {
        async function fact(){
            let access = await axios.post('https://url-back.herokuapp.com/',{person})
            setname(access.data[0].name)
            setUserdata(access.data[0].links)
        }
        fact()
    }, [person])
    const [url,seturl] = useState("")
    const [vis,setvis] = useState("visible")
    const [siv,setsiv] = useState("hidden")
    var send = {"id":person,url}
    if(person === window.localStorage.getItem("url_token")){
    return (
        <div className="row m-2" style={{backgroundColor:"skyblue"}}>
            <table className="table">
            <thead className="thead-dark">
                    <tr><th style={{textAlign:"center"}}>Welcome {names} <span style={{cursor:"pointer"}} className="btn-sm btn-danger float-right" onClick={()=>{window.localStorage.removeItem("url_token"); redirect.push("/");}}>Logout</span></th></tr>
                </thead>
            </table>
            <input className="form-control offset-1 col-8 mt-1" value={url} onChange={(e)=>{seturl(e.target.value)}} /><span style={{visibility:vis}} className="btn btn-primary m-1" onClick={async ()=>{
                setvis("hidden")
                setsiv("visible")
                seturl("")
                let res = await axios.post('https://url-back.herokuapp.com/shortener',send)
                setUserdata(res.data[0].links)
                setsiv("hidden")
                setvis("visible")
            }}>short</span><span style={{visibility:siv}} className="mt-4" ><BallClipRotateMultiple loading={true} color={"#000000"}></BallClipRotateMultiple></span><div className="col-3"></div>
            <table className="table" style={{backgroundColor:"skyblue"}}>
                <thead className="thead-dark">
                    <tr><th>Original Link</th><th>Shorted Link</th></tr>
                </thead>
                <tbody>
            {
                userdata.map((item,index) => {
                    let dum = item.split(" ")
                    return <tr key={index} style={{color:"white"}}><td><a href={dum[0]}>{dum[0]}</a></td><td><a href={dum[1]}>{dum[1]}</a></td></tr>})
            }
            </tbody>
            </table>
        </div>
    )}
    else{
    return redirect.push("/")}
}

export default Dash
