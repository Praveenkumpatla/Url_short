import axios from 'axios';
import {useState} from 'react';
import {Link,useHistory} from 'react-router-dom';
import {BallClipRotateMultiple} from 'react-pure-loaders';

function Login() {
    const redirect = useHistory()
    const [user,setuser] = useState("")
    const [pass,setpass] = useState("")
    const [load,setload] = useState(false)
    return (
        <div className="row m-2 d-flex justify-content-center">
            <form className="col-4" onSubmit={async (e)=>{
                setload(true)
                e.preventDefault()
                let check = await axios.post('https://url-back.herokuapp.com/check',{user,pass})
                if(check.data.msg==="Please enter valid details"){
                alert(check.data.msg)
                setload(false)}
                else{
                    window.localStorage.setItem("url_token",check.data.msg)
                    redirect.push(`/Dashboard/${check.data.msg}`)}
            }}>
                <div className="m-2 text-right">New user <Link to="/register" className="btn-sm btn-success">Sign up</Link>  here
                </div>
                <label htmlFor="userid"> User ID : </label>
                <input className="form-control" value={user} id="userid" onChange={(e)=>{setuser(e.target.value)}}/>
                <label htmlFor="key"> Password : </label>
                <div className="d-flex" style={{justifyContent:"center"}} ><BallClipRotateMultiple loading={load} color={"#000000"}></BallClipRotateMultiple></div>
                <input className="form-control" type="password" value={pass} id="key" onChange={(e)=>{setpass(e.target.value)}}/>
                <span onClick={()=>{console.log(user);if(user!==""){ redirect.push(`Forgot/${user}`)}else{alert("Please enter user Id")}}} className="text-light" style={{textDecoration:"none",cursor:"pointer"}}>Forgot password</span>
                <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-primary mt-2">Log in</button>
                </div>
            </form>
        </div>
    )
}

export default Login

