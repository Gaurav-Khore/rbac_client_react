import { FormEvent, useEffect, useState } from "react";
import { Col, Container, Navbar, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom"
import { assignRole, deleteAssignUserRole, getUser, getUserRolePerm, updateUserRoleName } from "../api";
import { ProfileDisplay } from "./profile";
import Popup from "./popups";

export const UserInfo = () => {
    const params = useParams();
    const [userData, setUserData] = useState<any | null>(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [ShowUpdateUserRolePopup, setShowUpdateUserRolePopup] = useState(false);
    const [rolePerm, setRolePerm] = useState<any[]>([]);
    const [showPopup, setShowPopup] = useState(false);
    const [role, setRole] = useState('');
    const [newRole,setNewRole]=useState('');
    const [deleteRole,setDeleteRole]=useState('');
    const navigate = useNavigate();

    useEffect(() => {
        getUser(params.userID!).then((data) => {
            if (data.data === null) {
                setErrorMessage("You are not authorized");
                return;
            }
            setUserData(data.data.fetchUser);
        });
        getUserRolePerm(params.userID!).then((data) => {
            if (data.data === null) {
                window.alert(data.errors[0].message);
            }
            setRolePerm(data.data.fetchUserRolePermission);
        })
    }, [])
    function AsignRoleHandler(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        assignRole(userData.name, role).then((data) => {
            if (data.data === null) {
                window.alert(data.errors[0].message);
            }
        });
        setShowPopup(false);
        getUserRolePerm(params.userID!).then((data) => {
            if (data.data === null) {
                window.alert(data.errors[0].message);
            }
            setRolePerm(data.data.fetchUserRolePermission);
        })
    }

    function deleteAssignedRole(): void {
        setShowUpdateUserRolePopup(false);
        deleteAssignUserRole(deleteRole,userData.name).then(data => {
            if (data.data == null) {
                window.alert(data.errors[0].message);
                return;
            }
        });
        getUserRolePerm(params.userID!).then((data) => {
            if (data.data === null) {
                window.alert(data.errors[0].message);
            }
            setRolePerm(data.data.fetchUserRolePermission);
        })
    }

    function updateUserRoleHandler(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        setShowUpdateUserRolePopup(false);
        updateUserRoleName(deleteRole,newRole,userData.id).then(data => {
            if (data.data == null) {
                window.alert(data.errors[0].message);
                return;
            }
        });
        getUserRolePerm(params.userID!).then((data) => {
            if (data.data === null) {
                window.alert(data.errors[0].message);
            }
            setRolePerm(data.data.fetchUserRolePermission);
        })
    }

    return (
        <div className="detail-container" style={{width:"100%"}}>
            <div className="navBar" style={{width:"100%" , borderBottom:"1px solid rgb(214, 211, 211)"}}>
            <button style={{ background: "transparent", border: "none", float: "right" }} onClick={() => {
                                    navigate("/home")
                                }}><img src="../../public/home.png" alt="dots" style={{ width: "40px", height: "40px" }} /></button>
            </div>
        <div>
            {errorMessage ? (
                    <h1 style={{ textAlign: "center" }}>{errorMessage}</h1>
            ) : (
                <Container fluid className="vh-100 vw-100 d-flex flex-column">
                    <Row className="flex-grow-1">
                        <Col md={3} className="d-flex align-items-center justify-content-center p-0">
                            {/* Content for the first column */}
                            <div className="content-box">
                                {userData ? (
                                    <ProfileDisplay name={userData.name} email={userData.email} />
                                ) : (
                                    <p>No Data Found</p>
                                )
                                }
                            </div>
                        </Col>
                        <Col md={9} className="d-flex align-items-center justify-content-center p-0">
                            {/* Content for the second column */}
                            <div className="content-box" style={{display:"flex",flexDirection:"column" , gap:"10px"}}>
                            <h1>Dashboard</h1>
                            <div className="dashboard-tile">
                                <div className="header-with-button">
                                    <h3>Role Details</h3>
                                    <button onClick={() => setShowPopup(true)}>Assign</button>
                                </div>
                                <table className="dashboard-table">
                                    <thead>
                                        <tr>
                                            <th>No.</th>
                                            <th>Role</th>
                                            <th>ACTION</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rolePerm.map((data,index) => (
                                            <tr key={index}>
                                                <td>{index+1}</td>
                                                <td> {data.role}</td>
                                                <td>{data.perm?.join(", ")}</td>
                                                <td><button style={{ background: "transparent", border: "none", float: "right" }} onClick={() => {
                                                setShowUpdateUserRolePopup(true);
                                                setDeleteRole(data.role);
                                            } }><img src="../../public/dots.png" alt="dots" style={{ width: "20px", height: "20px" }} /></button></td>
                                                {/* <td><button style={{ background: "transparent", border: "none", float: "right" }} onClick={() => deleteAssignedRole(data.role,userData.name)}><img src="../../public/bin.png" alt="delete" style={{ width: "20px", height: "20px" }} /></button></td> */}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            )
            }

            {showPopup && (
                <Popup showPopup={showPopup} title="Assign Role" setShowPopup={setShowPopup}>
                    <form onSubmit={AsignRoleHandler}  style={{ display: "flex", flexDirection: "column", paddingTop: "10px",alignItems:"start",justifyContent:"space-evenly",gap:"10px"}}>
                        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                        <label style={{ fontWeight: "bold", fontSize: "25px" ,paddingRight:"10px"}}>Name:</label>
                        <input type="text" name="name" value={role} onChange={(e) => setRole(e.target.value)} />
                        </div>
                        <div style={{ display: "flex", justifyContent: "center", width: "100%", padding: "10px" }}>
                            <button style={{ width: "25%", backgroundColor: "#afadad", fontWeight: "bold" }} type="submit">Submit</button>
                        </div>
                    </form>
                </Popup>
            )}
            {ShowUpdateUserRolePopup && (
                <div className="popup">
                    <div className="popup-content" style={{ position: "relative" }}>
                        <div style={{ position: "absolute", right: "0", top: "0", cursor: "pointer", paddingRight: "10px" }}>
                            <p onClick={() => setShowUpdateUserRolePopup(false)} style={{ fontWeight: "bold" }}>X</p>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid black" }}>
                            <h1>Update Role</h1>
                            <button style={{ background: "transparent", border: "none", float: "right" }} onClick={() => deleteAssignedRole()}><img src="../../public/bin.png" alt="delete" style={{ width: "20px", height: "20px" }} /></button>
                        </div>
                        <div>
                            <form style={{ display: "flex", flexDirection: "column", paddingTop: "10px" }} onSubmit={updateUserRoleHandler}>
                                <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                                    <label style={{ fontWeight: "bold", fontSize: "25px" }}>New Name:</label>
                                    <input type="text" name="name" value={newRole} onChange={(e) => setNewRole(e.target.value)} />
                                </div>
                                <div style={{ display: "flex", justifyContent: "center", width: "100%", padding: "10px" }}>
                                    <button style={{ width: "25%", backgroundColor: "#afadad", fontWeight: "bold" }} type="submit">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>

            )}
        </div>
        </div>
    );
}