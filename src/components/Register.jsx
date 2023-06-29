import { useRef, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
import { Link, useNavigate } from "react-router-dom";

import styles  from "./css/Form.module.css"

const Register = () => {
    const REGISTER_URL = '/auth/register'

    const navigate = useNavigate();

    const { setAuth } = useAuth();

    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordMatchRef = useRef()

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            username: usernameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            passwordMatchRef: passwordMatchRef.current.value,
        };

        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify(data),
                {
                    headers: {'Content-Type': 'application/json'}
                }
            );

            if ( response.status = 200) {
                const token = response.data;
                setAuth(token)
    
                navigate('../main', { replace: true });
            }
            
        } catch (err) {
                        
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.formWrapper}>
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username"> Username: </label>
                    <input type="text" id="username" autoComplete="off" required ref={usernameRef}/>

                    <label htmlFor="email"> Email: </label>
                    <input type="email" id="email" autoComplete="off" required ref={emailRef}/>

                    <label htmlFor="password"> Password: </label>
                    <input type="password" id="password" autoComplete="off" required ref={passwordRef}/>

                    <label htmlFor="passwordMatch"> Confirm Password: </label>
                    <input type="password" id="passwordMatch" autoComplete="off" required ref={passwordMatchRef}/>

                    <button>Sign Up</button>
                </form>
                <p>
                    Already registered?<br />
                    <span className="line">
                        <Link to="../login">Sign In</Link>
                    </span>
                </p>
            </div>
        </div>
    )
}

export default Register