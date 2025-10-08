import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from 'axios';
import './login.css';

export default function Login(){
    const history = useHistory();
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [loginSuccess, setLoginSuccess] = useState('');
    const [loginErr, setLoginErr] = useState('');
    const [errorData, setErrorData] = useState({});

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoginSuccess('');
            setLoginErr('');
        },2000);
        return () => clearTimeout(timer);
    },[loginSuccess, loginErr]);

    const validateForm = () => {
        let isError = false;
        let errorObj = {...errorData};
        if(!!!userId){
            isError = true;
            errorObj.userId = 'Please enter user id';
        }
        if(!!!password){
            isError = true;
            errorObj.userPass = 'Please enter password';
        }
        setErrorData(errorObj);
        return !isError;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let isValid = validateForm();

        if(isValid){
            submitLoginForm(userId, password);
        }
    }

    const submitLoginForm = async (userId, password) => {
        try{
            const res = await axios.post("http://localhost:8080/api/auth/login", {email:userId,password:password});
            localStorage.setItem('pocBanti', JSON.stringify(res.data.customer));
            setLoginSuccess(res.data.message);
            setUserId('');
            setPassword('');
            history.push("/products");
        }catch(err){
            setLoginErr(err.response.data.message);
            console.log('Login error', err);
        }
    }

    const goToRegister = () => {
        history.push('/register');
    }

    return(
        <>
            <div className="container-fluid login-page">  
                {
                    !!loginSuccess ? 
                        <div className="position-absolute m-2 alert-wrap">
                        <div className="alert alert-success m-0" role="alert">
                            {loginSuccess}
                        </div></div> : null
                }
                {
                    !!loginErr ? 
                        <div className="position-absolute m-2 alert-wrap">
                        <div className="alert alert-danger m-0" role="alert">
                            {loginErr}
                        </div></div> : null
                } 
                <div className="row">
                    <div className="col-6 p-0">
                        <div className="left-part">
                            <img src="" alt="" title="" className="logo"></img>
                            <p>
                                POC <br/>
                                Banti Shaw
                            </p>
                        </div>
                    </div>
                    <div className="col-6 p-0">
                        <div className="right-part p-2 d-flex align-items-center justify-content-center">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    {
                                        !!errorData.userId ? 
                                            <div className="alert alert-danger m-0" role="alert">
                                                {errorData.userId}
                                            </div> : null
                                    }
                                    <label htmlFor="inputEmail" className="form-label">Email address</label>
                                    <input type="email" onChange={(e) => setUserId(e.target.value)} value={userId} 
                                        className="form-control" id="inputEmail" />
                                </div>
                                <div className="mb-3">
                                    {
                                        !!errorData.userPass ? 
                                            <div className="alert alert-danger m-0" role="alert">
                                                {errorData.userPass}
                                            </div> : null
                                    }
                                    <label htmlFor="inputPassword" className="form-label">Password</label>
                                    <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} 
                                        className="form-control" id="inputPassword" />
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                                <button type="button" onClick={goToRegister} className="btn btn-secondary ms-1">Register</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}