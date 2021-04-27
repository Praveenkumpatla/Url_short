import axios from 'axios'
import {useEffect,useState} from 'react'
import {useHistory,useParams,Link} from 'react-router-dom'
import {BallClipRotateMultiple} from 'react-pure-loaders';

function Forgot() {
    const redirect = useHistory()
    const ids = useParams()
    const person = ids.id
    const [usersList,setUsersList] = useState("")
    const [user_Id,setId] = useState(person)
    const [name,setname] = useState("")
    const [password,setpassword] = useState("")
    const [qus,setqus] = useState("What is your school name?")
    const [ans,setans] = useState("")
    const links = []

    useEffect(() => {
        async function income(){
            let msg = await axios.post('https://url-back.herokuapp.com/sendmail',{user:person})
            console.log(msg.data)
            let data = await axios.post('https://url-back.herokuapp.com/checked',{user:person})
            setUsersList(data.data.msg)
        }
        income()
    }, [])
    const [comment,setComment] = useState("")
    const [text_color,setColor] = useState("")
    const [btn,setbtn] = useState("btn btn-primary mt-2")
    const [load,setload] = useState(false)
    const [vis,setvis] = useState("visible")
    if(usersList === ""){
    return (
        <div className="row m-5 d-flex justify-content-center">
            <BallClipRotateMultiple loading={true} color={"#000000"}></BallClipRotateMultiple>
        </div>)
    }
    else if(usersList === "No user found with User_Id"){
        return (<>
        <div className="m-5 d-flex justify-content-center">
            <div className="text-light">No user found with User_Id</div><br/>
            <Link to="/" className="btn-sm ml-1 btn-primary">Back to Home</Link>
        </div>
        </>)
    }
    else
    return (
        <div className="row m-2 d-flex justify-content-center">
            <form className="col-4" onSubmit={async (e)=>{
                e.preventDefault()
                if(ans === usersList.verifi){
                setload(true)
                setvis("hidden")
                let msg = await axios.post('https://url-back.herokuapp.com/updatepass',{user_Id,password})
                alert(msg.data.message)
                redirect.push('/')
                }
                else{
                    alert("Wrong verification code")
                }
                }}>
                <label htmlFor="userid"> User ID : <span className={text_color}>{comment}</span></label>
                <input readOnly required className="form-control" id="userid" value={user_Id} />
                <label htmlFor="key">New Password : </label>
                <div className="d-flex" style={{justifyContent:"center"}} ><BallClipRotateMultiple loading={load} color={"#000000"}></BallClipRotateMultiple></div>
                <input required className="form-control" id="key" value={password} onChange={(e)=>{setpassword(e.target.value)}}/>
                <label htmlFor="ans"> Enter verification code sent to registered mail: </label>
                <input required className="form-control" id="ans" value={ans} onChange={(e)=>{setans(e.target.value)}}/>
                <div className="d-flex justify-content-center">
                <button type="submit" className={btn} style={{visibility:vis}} >Update</button>
                </div>
            </form>
        </div>
    )
}

export default Forgot
