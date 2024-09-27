import { FormEvent, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom"
import { assignRolePerm, deleteAssignRolePerm, getRoleUserPerm } from "../api";
import Popup from "./popups";
import '../css/roleInfo.css'

export const RoleInfo = () => {
    const params = useParams();
    const [errorMessage, setErrorMessage] = useState("");
    const [roleUser, setRoleUser] = useState<any[]>([]);
    const [rolePerm, setRolePerm] = useState<any[]>([]);
    const [showPopup, setShowPopup] = useState(false);
    const [action, setAction] = useState('');
    const [tableErrorMessage, setTableErrorMessage] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const role_name = params.roleName;
        getRoleUserPerm(role_name!).then(data => {
            if (data.data === null) {
                setErrorMessage(data.errors[0].message);
                return;
            }
            setRoleUser(data.data.fetchRoleUsers);
            setRolePerm(data.data.fetchRoleAllPermissions);
        })
    }, [])


    function AddPermissionHandler(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        const role_name = params.roleName;
        assignRolePerm(role_name!, action).then((data) => {
            setShowPopup(false);
            if (data.data === null) {
                window.alert(data.errors[0].message);
                return;
            }
        });
        getRoleUserPerm(role_name!).then(data => {
            if (data.data === null) {
                setErrorMessage(data.errors[0].message);
                return;
            }
            setRoleUser(data.data.fetchRoleUsers);
            setRolePerm(data.data.fetchRoleAllPermissions);
        });
    }

    function deleteAssignedRole(data: any): void {
        const role_name = params.roleName;
        deleteAssignRolePerm(role_name!, data).then(data => {
            if (data.data === null) {
                window.alert(data.errors[0].message);
                return;
            }
        });
        getRoleUserPerm(role_name!).then(data => {
            if (data.data === null) {
                setErrorMessage(data.errors[0].message);
                return;
            }
            setRoleUser(data.data.fetchRoleUsers);
            setRolePerm(data.data.fetchRoleAllPermissions);
        });
    }

    return (
        <div className="detail-container" style={{ width: "100%" }}>
            <div className="navBar" style={{ width: "100%", borderBottom: "1px solid rgb(214, 211, 211)" }}>
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
                                    <h2>Role :- {params.roleName}</h2>
                                </div>
                            </Col>
                            <Col md={9} className="d-flex align-items-center justify-content-center p-0">
                                {/* Content for the second column */}
                                <div className="content-box" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                                    <h1>Dashboard</h1>
                                    <div className="dashboard-tile">
                                        <div className="header-with-button">
                                            <h3>Assigned Users</h3>
                                        </div>
                                        <table className="dashboard-table">
                                            <thead>
                                                <tr>
                                                    <th>Sr No.</th>
                                                    <th>UserName</th>
                                                    <th>Email</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {roleUser.map((data,index) => (
                                                    <tr key={index}>
                                                        <td> {index+1}</td>
                                                        <td>{data.userName}</td>
                                                        <td>{data.userEmail}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="dashboard-tile">
                                        <div className="header-with-button">
                                            <h3>Assigned Permissions</h3>
                                            <button onClick={() => setShowPopup(true)}>Add</button>
                                        </div>
                                        <table className="dashboard-table">
                                            <thead>
                                                <tr>
                                                    <th>Sr No.</th>
                                                    <th>Permission</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {rolePerm.map((data, index) => (
                                                    <tr key={index}>
                                                        <td> {index + 1}</td>
                                                        <td>{data}</td>
                                                <td><button style={{ background: "transparent", border: "none", float: "right" }} onClick={() => deleteAssignedRole(data)}><img src="../../public/bin.png" alt="delete" style={{ width: "20px", height: "20px" }} /></button></td>
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
                    <Popup showPopup={showPopup} title="Add New Permission" setShowPopup={setShowPopup}>
                        <form onSubmit={AddPermissionHandler} style={{ display: "flex", flexDirection: "column", paddingTop: "10px", alignItems: "start", justifyContent: "space-evenly", gap: "10px" }}>
                            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                                <label style={{ fontWeight: "bold", fontSize: "25px", paddingRight: "10px" }}>Permission:</label>
                                <input type="text" name="name" value={action} onChange={(e) => setAction(e.target.value)} />
                            </div>
                            <div style={{ display: "flex", justifyContent: "center", width: "100%", padding: "10px" }}>
                                <button style={{ width: "25%", backgroundColor: "#afadad", fontWeight: "bold" }} type="submit">Submit</button>
                            </div>
                        </form>
                    </Popup>
                )}
            </div>
        </div>
    )
}