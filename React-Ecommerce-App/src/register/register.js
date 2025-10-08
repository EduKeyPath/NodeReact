import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorAlert, setErrorAlert] = useState(false);
    const [registrationSuccess, setRegisterSuccess] = useState('');
    const [registrationFail, setRegisterFail] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
            setErrorAlert(false);
            setRegisterSuccess('');
            setRegisterFail('');
        },2000);
        return () => clearTimeout(timer);
    },[errorAlert, registrationSuccess, registrationFail]);
    
    const handleRegister = (e) => {
        e.preventDefault();
        const hasFormError = validateForm();
        if(!hasFormError){
            let data = {
                'name' : name,
                'email' : email,
                'password' : password
            }
            submitRegsiterForm(data);
        }
    }
    
    const validateForm = () => {
        let formError = false;
        if(password !== confirmPassword){
            setErrorAlert(true);
            formError = true;
        }
        return formError;
    }

    const submitRegsiterForm = async (regData) => {
        try{
            const res = await axios.post("http://localhost:8080/api/auth/register", {...regData});
            setRegisterSuccess(res.data.message);
            clearForm();
        }catch(err){
            setRegisterFail(err.response.data.message);
            console.log("Error: ", err);
        }
    }
    
    const clearForm = () => {
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    }
    const history = useHistory();
    const backToLogin = () => {
        history.push('/');
    }

    return (
        <>
            <div className="container-fluid login-page">
                {
                    !!registrationSuccess ? 
                    <div className="position-absolute m-2 alert-wrap">
                        <div className="alert alert-success m-0" role="alert">
                            {registrationSuccess}
                        </div>
                    </div>
                    : null
                }
                {
                    !!registrationFail ?
                    <div className="position-absolute m-2 alert-wrap">
                        <div className="alert alert-danger m-0" role="alert">
                            {registrationFail}
                        </div>
                    </div> : null
                }
                <div className="row">
                    <div className="col-6 p-0">
                        <div className="left-part">
                            <img src="" alt="" title="" className="logo"></img>
                            <p>
                                POC <br />
                                Banti Shaw
                            </p>
                        </div>
                    </div>
                    <div className="col-6 p-0">
                        <div className="right-part p-2 d-flex align-items-center justify-content-center">
                            <form onSubmit={handleRegister}>
                                <div className="mb-3">
                                    <label htmlFor="customerName" className="form-label">Name</label>
                                    <input type="text" onChange={(e) => setName(e.target.value)} value={name}
                                        className="form-control" id="customerName" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="customerEmail" className="form-label">Email address</label>
                                    <input type="email" onChange={(e) => setEmail(e.target.value)} value={email}
                                        className="form-control" id="customerEmail" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="customerPassword" className="form-label">Password</label>
                                    <input type="password" onChange={(e) => setPassword(e.target.value)} value={password}
                                        className="form-control" id="customerPassword" required />
                                </div>
                                {
                                    !!errorAlert ?
                                    <div className="alert alert-danger m-0" role="alert">
                                        Passwords doest not match
                                    </div> : null
                                }
                                <div className="mb-3">
                                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                                    <input type="password" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword}
                                        className="form-control" id="confirmPassword" required />
                                </div>
                                <button type="submit" className="btn btn-primary">Register</button>
                                <button type="button" onClick={backToLogin} className="btn btn-outline ms-3">Back to login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}