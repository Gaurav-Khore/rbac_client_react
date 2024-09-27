
const SERVER_URL = 'http://127.0.0.1:8080/';

export const loginFn = async (email: String, password: String) => {
    const response = await fetch(SERVER_URL, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: `
                query login {
                    login(email: "${email}", password:"${password}") {
                        token
                        id
                    }
                }
            `
        })
    });
    return await response.json();
};
export const SignUpFn = async (username: String , email: String , password: String) => {
    const respose = await fetch(SERVER_URL, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: `
            mutation AssignUserRole {
                addUser(username: "${username}", email: "${email}", password: "${password}")
            }
            `
        })
    });
    return await respose.json();
}


export const getAllUsers = async () => {
    const response = await fetch(SERVER_URL, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem("token"),
        },
        body: JSON.stringify({
            query: `
            query FetchAllUser {
                fetchAllUser {
                    id
                    name
                    email
                }
                fetchAllRoles {
                    id
                    name
                }
                fetchAllPermissions {
                    id
                    action
                }
            }
            `
        })
    });
    return await response.json();
}


export const addUser = async (username: String , email: String , password: String) => {
    const respose = await fetch(SERVER_URL, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem("token"),
        },
        body: JSON.stringify({
            query: `
            mutation AssignUserRole {
                addUser(username: "${username}", email: "${email}", password: "${password}")
            }
            `
        })
    });
    return await respose.json();
}


export const addRole = async (name: String) => {
    const response = await fetch (SERVER_URL, {
        method:"POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem("token"),
        },
        body: JSON.stringify({
            query: `
            mutation AddRole {
                addRole(name: "${name}")
            }
            `
        })
    });
    return await response.json();   
}


export const getUser = async (id: String) => {
    // const num =parseInt(id, 10);
    const response = await fetch (SERVER_URL , {
        method:"POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem("token"),
        },
        body: JSON.stringify({
            query: `query FetchUser {
                fetchUser(id: "${id}") {
                    id
                    name
                    email
                }
            }`
        })
    });
    return await response.json();
}

export const getUserRolePerm = async (id: String) => {
    const response = await fetch(SERVER_URL , {
        method:"POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem("token"),
        },
        body: JSON.stringify({
            query: `
                query FetchUserRolePermission {
                    fetchUserRolePermission(id: "${id}") {
                        role
                        perm
                    }
                }
            `
        })
    });

    return await response.json();
}


export const assignRole = async (name: String,role: String) => {
    const response = await fetch (SERVER_URL , {
        method:"POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem("token"),
        },
        body: JSON.stringify({
            query: `
                mutation AssignUserRole {
                assignUserRole(username: "${name}", roles: "${role}")
            }
            `
        })
    });
    return await response.json();
} 


export const deleteAssignUserRole = async (role_name: String, user_name: String) => {
    const response = await fetch (SERVER_URL , {
        method:"POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem("token"),
        },
        body: JSON.stringify({
            query: `
                mutation DeleteUserRole {
                deleteUserRole(userName: "${user_name}", roleName: "${role_name}")
            }
            `
        })
    });
    return await response.json();
}


export const getRoleUserPerm =async (role_name: String) => {
    const response = await fetch (SERVER_URL , {
        method:"POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem("token"),
        },
        body: JSON.stringify({
            query: `
                query FetchUserRolePermission {
                fetchRoleUsers(roleName: "${role_name}") {
                    userId
                    userName
                    userEmail
                }
                fetchRoleAllPermissions(roleName: "${role_name}")
            }
            `
        })
    });
    return await response.json();
}

export const assignRolePerm = async (role_name:String , action: String) => {
    const response = await fetch (SERVER_URL , {
        method:"POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem("token"),
        },
        body: JSON.stringify({
            query: `
                mutation AssignRolePermissions {
                assignRolePermissions(name: "${role_name}", permissions: "${action}")
            }
            `
        })
    });
    return await response.json();
}

export const deleteAssignRolePerm = async (role_name:String,action:String) => {
    const response = await fetch (SERVER_URL , {
        method:"POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem("token"),
        },
        body: JSON.stringify({
            query: `
                mutation DeleteRolePermission {
                deleteRolePermission(roleName: "${role_name}", action: "${action}")
            }
            `
        })
    });
    return await response.json();
}

export const deleteUser = async (id:String) => {
    const response = await fetch (SERVER_URL , {
        method:"POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem("token"),
        },
        body: JSON.stringify({
            query: `
                mutation DeleteUser {
                deleteUser(id: "${id}")
            }
            `
        })
    });
    return await response.json();
}

export const deleteRole = async (id:String) => {
    const response = await fetch (SERVER_URL , {
        method:"POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem("token"),
        },
        body: JSON.stringify({
            query: `
                mutation DeleteRole {
                deleteRole(id: "${id}")
            }
            `
        })
    });
    return await response.json();
}

export const updatePassword = async (id:String,password:String) => {
    const response = await fetch (SERVER_URL , {
        method:"POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem("token"),
        },
        body: JSON.stringify({
            query: `
            mutation UpdatePassword {
                updatePassword(id: "${id}", passwd: "${password}")
            }
            `
        })
    });
    return await response.json();
}


export const updateRoleName = async (id:String,name:String) => {
    const response = await fetch (SERVER_URL , {
        method:"POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem("token"),
        },
        body: JSON.stringify({
            query: `
            mutation UpdateRoleName {
                updateRoleName(id: "${id}", name: "${name}")
            }
            `
        })
    });
    return await response.json();
}


export const updateUserName = async (id:String,name:String) => {
    const response = await fetch (SERVER_URL , {
        method:"POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem("token"),
        },
        body: JSON.stringify({
            query: `
            mutation UpdateUserName {
                updateUserName(id: "${id}", name:"${name}")
            }
            `
        })
    });
    return await response.json();
}

export const updateUserRoleName = async (current_role:String,new_role:String,user_id:String) => {
    const response = await fetch (SERVER_URL , {
        method:"POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem("token"),
        },
        body: JSON.stringify({
            query: `
            mutation UpdateUserRole {
                updateUserRole(currentRole: "${current_role}", newRole: "${new_role}", userId: "${user_id}")
            }
            `
        })
    });
    return await response.json();
}