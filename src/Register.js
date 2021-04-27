import axios from 'axios'
import {useEffect,useState} from 'react'
import {useHistory} from 'react-router'
import {BallClipRotateMultiple} from 'react-pure-loaders';

function Register() {
    const redirect = useHistory()
    const [usersList,setUsersList] = useState([])
    const [user_Id,setId] = useState("")
    const [name,setname] = useState("")
    const [password,setpassword] = useState("")
    const [qus,setqus] = useState("What is your school name?")
    const [ans,setans] = useState("")
    const links = []

    useEffect(() => {
        async function income(){
            let data = await axios.get('https://url-back.herokuapp.com/getted')
            setUsersList(data.data)
        }
        income()
    }, [])

    const [comment,setComment] = useState("")
    const [text_color,setColor] = useState("")
    const [btn,setbtn] = useState("btn btn-primary mt-2")
    const [load,setload] = useState(false)
    const [vis,setvis] = useState("visible")
    return (
        <div className="row m-2 d-flex justify-content-center">
            <form className="col-4" onSubmit={async (e)=>{
                e.preventDefault()
                setload(true)
                setvis("hidden")
                let msg = await axios.post('https://url-back.herokuapp.com/register',{user_Id,name,password,links,question:qus,answer:ans})
                alert(msg.data.message)
                redirect.push('/')
                }}>
                <label htmlFor="userid"> User ID : <span className={text_color}>{comment}</span></label>
                <input type="email" required className="form-control" id="userid" value={user_Id} onChange={(e)=>{
                    setId(e.target.value);
                        let check = usersList.filter((item) => item.user_Id === e.target.value)
                        if(check.length>0){
                        setComment("User Id is not available");
                        setColor("text-danger")
                        setbtn("btn btn-primary mt-2 invisible")
                        }
                        else{
                        setComment("User Id is available")
                        setColor("text-success")
                        setbtn("btn btn-primary mt-2 visible")
                        }
                        if(e.target.value.length===0)
                        setComment("")
                        }} />
                        <div>Please enter a valid email this can be used for verification, on time of password update</div>
                <label htmlFor="username"> User Name : </label>
                <input required className="form-control" id="username" value={name} onChange={(e)=>{setname(e.target.value)}}/>
                <label htmlFor="key"> Password : </label>
                <div className="d-flex" style={{justifyContent:"center"}} ><BallClipRotateMultiple loading={load} color={"#000000"}></BallClipRotateMultiple></div>
                <input required className="form-control" id="key" value={password} onChange={(e)=>{setpassword(e.target.value)}}/>
                <select className="form-control mt-2" onChange={(e)=>{setqus(e.target.value)}}>
                        <option value="What is your school name?">What is your school name?</option>
                        <option value="What is your pet name?">What is your pet name?</option>
                        <option value="What is your first phone number?">What is your first phone number?</option>
                </select>
                <label htmlFor="ans"> Answer : </label>
                <input required className="form-control" id="ans" value={ans} onChange={(e)=>{setans(e.target.value)}}/>
                <div className="d-flex justify-content-center">
                <button type="submit" className={btn} style={{visibility:vis}} >Create</button>
                </div>
            </form>
        </div>
    )
}

export default Register
