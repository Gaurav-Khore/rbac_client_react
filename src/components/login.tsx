import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {loginFn} from '../api';
import '../css/login.css';

const Login = () => {

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const onSubmitHandler = async (e: FormEvent) => {
        e.preventDefault();
        if (!email || !password) {
            window.alert("Please fill all the details");
            // setErrorMessage("Please fill in both fileds");
            return;
        }
        const data =  await loginFn(email,password);
        if (data.data === null) {
            window.alert(data.errors[0].message);
            // setErrorMessage(data.errors[0].message);
            return;
        }
        sessionStorage.setItem("token",data.data.login.token);
        sessionStorage.setItem("userID",data.data.login.id);
        navigate('/home');
    }
    return (
        <div style={{width:"100%",height:"100vh",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
        <div className="main-container">
            <h2>Login</h2>
            <form onSubmit={onSubmitHandler}>
                <div >
                    <label>Email</label>
                    <input type="email" value={email} className="login_input"
                    onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div>
                    <label >Password</label>
                    <input type="password" value={password} className="login_input"
                    onChange={(p) => setPassword(p.target.value)}/>
                </div>
                <button style={{backgroundColor:"#2e2d2d",fontSize:"20px", border:"none",borderRadius:"5px",color:"white"}} type="submit">Login</button>
                <Link to='/signup'><p>SignUp</p></Link>
            </form>
        </div>
        </div>
    );
}

export default Login;