import { FormEvent, useState } from "react";
import { addUser, loginFn, SignUpFn } from "../api";
import { Link, useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";

export const SignUp = () => {

    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [errorMessage,setErrorMessage] = useState('');

    const navigate = useNavigate();
    


    const onSubmitHandler = async (event: FormEvent<HTMLFormElement>)=> {
        event.preventDefault();
        if (!email || !password || !name) {
            window.alert("Please fill all the fileds");
            return;
        }
        const key = "gaurav";
        const hmac = CryptoJS.HmacSHA256(password,key);
        const hex = CryptoJS.enc.Hex.stringify(hmac);
        SignUpFn(name,email,hex).then(data => {
            if (data.data === null) {
                window.alert(data.errors[0].message);
                return;
            }
        });
        const data =  await loginFn(email,password);
        if (data.data === null) {
            window.alert(data.errors[0].message);
            return;
        }
        sessionStorage.setItem("token",data.data.login.token);
        sessionStorage.setItem("userID",data.data.login.id);
        navigate('/home');
    }

    return (
        <div style={{width:"100%",height:"100vh",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
        <div className="main-container">
            <h2>SignUp</h2>
            <form onSubmit={onSubmitHandler}>
            <div>
                    <label>Name</label>
                    <input type="text" value={name} className="login_input"
                    onChange={(e) => setName(e.target.value)}/>
                </div>
                <div>
                    <label>Email</label>
                    <input type="email" value={email} className="login_input"
                    onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div>
                    <label >Password</label>
                    <input type="password" value={password} className="login_input"
                    onChange={(p) => setPassword(p.target.value)}/>
                </div>
                <button type="submit">SignIN</button>
                <Link to='/login'><p>Login</p></Link>
            </form>
        </div>
        </div>
    );
}