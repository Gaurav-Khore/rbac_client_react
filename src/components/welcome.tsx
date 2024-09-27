import { useNavigate } from "react-router-dom"

export const Welcome = () => {
    const navigate = useNavigate();
    return (
        <div style={{display: "flex",alignItems:"center",justifyContent:"center",width:"100%" , height:"100vh"}}>
        <div style={{display:"flex" , gap:"30px",flexDirection:"column",justifyContent:"center",alignItems:"center",boxShadow:" rgba(0, 0, 0, 0.24) 0px 3px 8px",width:"600px",height:"300px",backgroundColor:"rgb(197, 187, 187)"}}>
            <h1>Welcome To RBAC APP</h1>
            <div style={{display:"flex",justifyContent:"space-evenly",width:"50%"}}>
            <button style={{backgroundColor:"#2e2d2d",fontSize:"20px",padding:"10px 30px", border:"none",borderRadius:"5px",color:"white"}} onClick={ () => navigate('/login')}>Login</button>
            </div>
        </div>
        </div>
    )
}