import { FormEvent, useEffect, useState } from "react";
import { addRole, addUser, deleteRole, deleteUser, getAllUsers, getUser, updateRoleName } from "../api";
import '../css/dashboard.css'
import Popup from "./popups";
import { Navigate, useNavigate, NavLink, Link } from "react-router-dom";
import CryptoJS from 'crypto-js';
export const Dashboard = () => {

    const [allUser, setAllUser] = useState<any[]>([]);
    const [allRoles, setAllRoles] = useState<any[]>([]);
    const [allPerm, setAllPermi] = useState<any[]>([]);
    const [showUserPopup, setShowUserPopup] = useState(false);
    const [showRolePopup, setShowRolePopup] = useState(false);
    const [showUpateRolePopup, setShowUpdateRolePopup] = useState(false);
    const [newName, setNewName] = useState('');

    // add user variables
    const [email, setEamil] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    // add roles variables
    const [role_name, setRoleName] = useState('');
    const [roleId, setRoleId] = useState('');

    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        getAllUsers().then(data => {
            if (data.data === null) {
                setErrorMessage(data.errors[0].message);
                return;
            }
            setAllUser(data.data.fetchAllUser);
            setAllRoles(data.data.fetchAllRoles);
            setAllPermi(data.data.fetchAllPermissions);
        });
    }, []);

    const AddUserHandler = async (e: FormEvent) => {
        e.preventDefault();
        const key = "gaurav";
        const hmac = CryptoJS.HmacSHA256(password, key);
        const hex = CryptoJS.enc.Hex.stringify(hmac);
        let data = await addUser(name, email, hex);
        setShowUserPopup(false);
        if (data.data === null) {
            window.alert(data.errors[0].message);
            return;
        }
        getAllUsers().then(data => {
            if (data.data === null) {
                setErrorMessage(data.errors[0].message);
                return;
            }
            setAllUser(data.data.fetchAllUser);
            setAllRoles(data.data.fetchAllRoles);
            setAllPermi(data.data.fetchAllPermissions);
        });
    }

    const AddRoleHandler = async (e: FormEvent) => {
        e.preventDefault();
        let data = await addRole(role_name);
        setShowRolePopup(false);

        if (data.data == null) {
            window.alert(data.errors[0].message);
            return;
        }
        getAllUsers().then(data => {
            if (data.data === null) {
                setErrorMessage(data.errors[0].message);
                return;
            }
            setAllUser(data.data.fetchAllUser);
            setAllRoles(data.data.fetchAllRoles);
            setAllPermi(data.data.fetchAllPermissions);
        });
    }

    function deleteUserHandler(id: any): void {
        deleteUser(id).then(data => {
            if (data.data === null) {
                window.alert(data.errors[0].message);
                // setErrorMessage(data.errors[0].message);
                return;
            }
        });
        getAllUsers().then(data => {
            if (data.data === null) {
                setErrorMessage(data.errors[0].message);
                return;
            }
            setAllUser(data.data.fetchAllUser);
            setAllRoles(data.data.fetchAllRoles);
            setAllPermi(data.data.fetchAllPermissions);
        });
    }

    function deleteRoleHandler(): void {
        const id = roleId;
        setShowUpdateRolePopup(false);
        deleteRole(id).then(data => {
            if (data.data === null) {
                window.alert(data.errors[0].message);
                return;
            }
        });
        getAllUsers().then(data => {
            if (data.data === null) {
                setErrorMessage(data.errors[0].message);
                return;
            }
            setAllUser(data.data.fetchAllUser);
            setAllRoles(data.data.fetchAllRoles);
            setAllPermi(data.data.fetchAllPermissions);
        });
    }

    const updateRoleHandler = (e: FormEvent) => {
        e.preventDefault();
        const id = roleId;
        setShowUpdateRolePopup(false);
        updateRoleName(id, newName).then(data => {
            if (data.data === null) {
                window.alert(data.errors[0].message);
            }
        });
        getAllUsers().then(data => {
            if (data.data === null) {
                setErrorMessage(data.errors[0].message);
                return;
            }
            setAllUser(data.data.fetchAllUser);
            setAllRoles(data.data.fetchAllRoles);
            setAllPermi(data.data.fetchAllPermissions);
        });
    }

    return (
        <div className="table-container">
            {errorMessage ? (
                <p>{errorMessage}</p>
            ) : (
            <><div className="dashboard-tile">
                        <div className="header-with-button">
                            <h3>Users</h3>
                            <button onClick={() => setShowUserPopup(true)}>Add</button>
                        </div>
                        <table className="dashboard-table">
                            <thead>
                                <tr>
                                    <th>Sr No.</th>
                                    <th>NAME</th>
                                    <th>EMAIL</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {allUser.map((user,index) => (
                                    <tr key={index}>
                                        <td> <Link to={`/userInfo/${user.id}`}>{index+1}</Link></td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td><button style={{ background: "transparent", border: "none", float: "right" }} onClick={() => deleteUserHandler(user.id)}><img src="../../public/bin.png" alt="delete" style={{ width: "20px", height: "20px" }} /></button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div><div className="dashboard-tile">
                            <div className="header-with-button">
                                <h3>Roles</h3>
                                <button onClick={() => setShowRolePopup(true)}>Add</button>
                            </div>
                            <table className="dashboard-table">
                                <thead>
                                    <tr>
                                        <th>Sr No.</th>
                                        <th>NAME</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allRoles.map((role,index) => (
                                        <tr key={index}>
                                            <td><Link to={`/roleInfo/${role.name}`}>{index+1}</Link></td>
                                            <td>{role.name}</td>
                                            <td><button style={{ background: "transparent", border: "none", float: "right" }} onClick={() => {
                                                setShowUpdateRolePopup(true);
                                                setRoleId(role.id);
                                            } }><img src="../../public/dots.png" alt="dots" style={{ width: "20px", height: "20px" }} /></button></td>
                                            {/* <td><button onClick={() => deleteRoleHandler(role.id)}>D</button></td> */}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                        </div><div className="dashboard-tile">
                            <div className="header-with-button">
                                <h3>Permissions</h3>
                            </div>
                            <table className="dashboard-table">
                                <thead>
                                    <tr>
                                        <th>Sr No.</th>
                                        <th>ACTION</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allPerm.map((perm,index) => (
                                        <tr key={index}>
                                            <td>{index+1}</td>
                                            <td>{perm.action}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div></>
            )}
            {showUserPopup && (
                <Popup showPopup={showUserPopup} title="Add New User" setShowPopup={setShowUserPopup}>
                    <form onSubmit={AddUserHandler} style={{ display: "flex", flexDirection: "column", paddingTop: "10px",alignItems:"start",justifyContent:"space-evenly",gap:"10px"}}>
                        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                        <label style={{ fontWeight: "bold", fontSize: "25px",paddingRight:"50px"}}>Name:</label>
                        <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                        <label style={{ fontWeight: "bold", fontSize: "25px" ,paddingRight:"56px"}}>Email:</label>
                        <input type="email" name="email" value={email} onChange={(e) => setEamil(e.target.value)} />
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                        <label style={{ fontWeight: "bold", fontSize: "25px" ,paddingRight:"10px"}}>Password:</label>
                        <input type="password" name="passowrd" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div style={{ display: "flex", justifyContent: "center", width: "100%", padding: "10px" }}>
                            <button style={{ width: "25%", backgroundColor: "#afadad", fontWeight: "bold" }} type="submit">Submit</button>
                        </div>
                    </form>
                </Popup>
            )}
            {showRolePopup && (
                <Popup showPopup={showRolePopup} title="Add New Role" setShowPopup={setShowRolePopup}>
                    <form onSubmit={AddRoleHandler} style={{ display: "flex", flexDirection: "column", paddingTop: "10px" }}>
                        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                            <label style={{ fontWeight: "bold", fontSize: "25px" }}>Name:</label>
                            <input type="text" name="name" value={role_name} onChange={(e) => setRoleName(e.target.value)} />
                        </div>
                        <div style={{ display: "flex", justifyContent: "center", width: "100%", padding: "10px" }}>
                            <button style={{ width: "25%", backgroundColor: "#afadad", fontWeight: "bold" }} type="submit">Submit</button>
                        </div>
                    </form>
                </Popup>
            )}
            {showUpateRolePopup && (
                <div className="popup">
                    <div className="popup-content" style={{ position: "relative" }}>
                        <div style={{ position: "absolute", right: "0", top: "0", cursor: "pointer", paddingRight: "10px" }}>
                            <p onClick={() => setShowUpdateRolePopup(false)} style={{ fontWeight: "bold" }}>X</p>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid black" }}>
                            <h1>Update Role</h1>
                            <button style={{ background: "transparent", border: "none", float: "right" }} onClick={() => deleteRoleHandler()}><img src="../../public/bin.png" alt="delete" style={{ width: "20px", height: "20px" }} /></button>
                        </div>
                        <div>
                            <form style={{ display: "flex", flexDirection: "column", paddingTop: "10px" }} onSubmit={updateRoleHandler}>
                                <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                                    <label style={{ fontWeight: "bold", fontSize: "25px" }}>New Name:</label>
                                    <input type="text" name="name" value={newName} onChange={(e) => setNewName(e.target.value)} />
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
    );
}