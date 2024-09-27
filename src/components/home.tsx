import { FormEvent, useEffect, useState } from "react";
import { getAllUsers, getUser, updatePassword, updateUserName } from "../api";
import '../css/home.css'
import { Col, Container, Row } from "react-bootstrap";
import {ProfileDisplay } from "./profile";
import { Dashboard } from "./dashboard";
import Popup from "./popups";
import CryptoJS from "crypto-js";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
  const [userData, setUserData] = useState<any | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [password, setPassword] = useState('');
  const [name,setName]= useState('');
  const navigate = useNavigate();
  useEffect(() => {
    const user_id = sessionStorage.getItem("userID");
    getUser(user_id!).then((data) => {
      if (data.data === null) {
        // setErrorMessage("You are not authorized");
        return;
      }
      setUserData(data.data.fetchUser);
    });
  }, [])
  function UpdateUserHandler(event: FormEvent): void {
    event.preventDefault();
    const id = userData.id;
    const key = "gaurav";
    const hmac = CryptoJS.HmacSHA256(password, key);
    const hex = CryptoJS.enc.Hex.stringify(hmac);
    setShowPopup(false);
    if (password !== null) {
      updatePassword(id, hex).then(data => {
        if (data.data === null) {
          window.alert(data.errors[0].message);
          return;
        }
      });
    }
    if (name!==null) {
      updateUserName(id,name).then(data => {
        if (data.data===null) {
          window.alert(data.errors[0].message);
          return;
        }
      });
    }
    window.location.reload();

  }

  return (
    <div>
      <div className="navBar" style={{ width: "100%", borderBottom: "1px solid rgb(214, 211, 211)" }}>
        <button style={{ background: "transparent", border: "none", float: "right" }} onClick={() => {
          sessionStorage.clear();
          navigate("/")
        }}>LogOut</button>
      </div>

      <div>
        <Container fluid className="vh-100 vw-100 d-flex flex-column">
          <Row className="flex-grow-1">
            <Col md={3} className="d-flex align-items-center justify-content-center p-0">
              {/* Content for the first column */}
              <div className="content-box">
                {userData ? (
                  <div>
                    <ProfileDisplay name={userData.name} email={userData.email} />
                    <div className="header-with-button" style={{ justifyContent: "center" }}>
                      <button onClick={() => setShowPopup(true)}>Update User</button>
                    </div>
                  </div>
                ) : (
                  <p>No Data Found</p>
                )
                }
              </div>
            </Col>
            <Col md={9} className="d-flex align-items-center justify-content-center p-0">
              {/* Content for the second column */}
              <div className="content-box">
                <h1>Dashboard</h1>
                <Dashboard />
              </div>
            </Col>
          </Row>
        </Container>
        {showPopup && (
          <Popup showPopup={showPopup} title="Update User" setShowPopup={setShowPopup}>
            <form onSubmit={UpdateUserHandler}>
            <div style={{ display: "flex", justifyContent: "space-evenly", paddingTop: "10px" }}>
                <label style={{ fontWeight: "bold", fontSize: "15px", paddingRight: "10px" }}>Name:</label>
                <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-evenly", paddingTop: "10px" }}>
                <label style={{ fontWeight: "bold", fontSize: "15px", paddingRight: "10px" }}>Password:</label>
                <input type="text" name="name" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div style={{ display: "flex", justifyContent: "center", width: "100%", padding: "10px" }}>
                <button style={{ width: "25%", backgroundColor: "#afadad", fontWeight: "bold" }} type="submit">Submit</button>
              </div>
            </form>
          </Popup>
        )}
      </div>
    </div>
    // <div className="container">
    //   <h1>Roles, Users, and Permissions</h1>


    //   <div className="section users">
    //     <h2>Users</h2>
    //     <table>
    //   <thead>
    //     <tr>
    //       <th>ID</th>
    //       <th>Email</th>
    //       <th>Name</th>
    //     </tr>
    //   </thead>
    //   <tbody>
    //     {allUsers.map((user) => (
    //       <tr key={user.id}>
    //         <td>{user.id}</td>
    //         <td>{user.email}</td>
    //         <td>{user.name}</td>
    //       </tr>
    //     ))}
    //   </tbody>
    // </table>
    //   </div>

    //   <div className="section roles">
    //     <h2>Roles</h2>
    //     <ul>
    //       {allUsers.map((role, index) => (
    //         <li key={index}>{role.name}</li>
    //       ))}
    //     </ul>
    //   </div>

    //   <div className="section permissions">
    //     <h2>Permissions</h2>
    //     <ul>
    //       {allUsers.map((permission, index) => (
    //         <li key={index}>{permission.name}</li>
    //       ))}
    //     </ul>
    //   </div>
    // </div>
  );
}

export default HomePage;