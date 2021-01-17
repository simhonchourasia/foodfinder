import React, { useState } from 'react';
import { LoginForm } from "./LoginForm";

function LogIn() {
    /* const adminUser = {
        email: "admin@admin.com",
        password: "admin123"
    } */

    /* RANDOM ARRAY OF USER LOGINS*/
    const users = ([
        {
            email: "testing@gmail.com",
            password: "123"
        },
        {
            email: "1@1",
            password: "123"
        },
        {
            email: "123@123.com",
            password: "321"
        }
    ]);

    const [user, setUser] = useState({email: "", password: ""});
    const [error, setError] = useState("");
    const Login = details => {
        console.log(details);

        for (let i=0; i< users.length; i++) {
            if (details.email === users[i].email && details.password === users[i].password) {
                console.log("Logged in");
                setUser({
                    email: details.email,
                    password: details.password,
                });
            } else if (i === users.length-1) {
                console.log("Details do not match");
                setError("Details do not match");
            }
        } 
    }

    const Logout = () => {
        console.log("Logout");
        setUser({email: "", password: ""});
    }
    

    return (
        <div className= "login">
            {(user.email !== "") ? (
                <div className="welcome">
                    <h2> Welcome, <span>{user.email}</span> </h2>
                    <button onClick={Logout}>Logout</button>
                </div>
            ) : (
                <LoginForm Login={Login} error={error} />
            )}
        </div>
    )
}

export default LogIn;