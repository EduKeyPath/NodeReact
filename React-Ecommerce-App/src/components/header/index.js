import React, {useEffect, useState} from "react";
import { useHistory } from "react-router-dom";
import './header.css';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
    const history = useHistory();
    const [user, setUser] = useState({});
    const cartCounter = useSelector((state) => state.cartReducer.cartCounter);

    useEffect(() => {
        let userObj = localStorage.getItem('pocBanti');
        let userData = JSON.parse(userObj || '{}') ;
        if(userData.name){
            setUser(userData);
        }
    },[])
    
    const signOut = () => {
        localStorage.removeItem('pocBanti');
        localStorage.removeItem('paymentDetails');
        localStorage.removeItem('cartItem');
        history.push("/");
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
                <div className="container-fluid">
                    <span className="navbar-brand">
                        <img src="" alt="Bootstrap" width="140" />
                    </span>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" to="/products">Products</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/customer-list">Customers</Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav mb-2 mb-lg-0">
                            <li className="me-3">
                                <Link to="/cart">
                                    <button type="button" className="btn btn-outline">
                                        <span className="material-icons-outlined">
                                            shopping_cart
                                        </span>
                                        <span className="badge bg-danger position-absolute mt-2">{cartCounter}</span>
                                    </button>
                                </Link>                          
                            </li>
                            <li className="nav-item dropdown">
                                <span className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Bootstrap" width="25" />
                                </span>
                                <ul className="dropdown-menu">
                                    {
                                        !!user.name ? 
                                        <li className="dropdown-item">
                                            {user.name}
                                            <p className="small mb-0">{user.loginId}</p>
                                        </li>: null
                                    }
                                    <li onClick={() => signOut()} className="dropdown-item c-pointer">Sign Out</li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}