import React from "react";
import {
    Switch,
    Route,
    useLocation
} from "react-router-dom";

import Login from './login';
import Register from './register/register';
import Header from './components/header';
import ProductDetailsPage from './components/product-details';
import CartPage from './components/cart';
import CustomerList from './components/customer-list/customer-list';
import ProductListGraphQL from './components/product-list/ProductListGraphQL';

function Routes() {
    let location = useLocation();
    let locStr = location.pathname.split(',');

    return (
        <>
            {
                !!locStr && (locStr[0] === '/' || locStr[0] === '/register') ?
                null : <Header />
            }
            
            <Switch>
                <Route exact path="/">
                    <Login />
                </Route>
                <Route path="/register">
                    <Register />
                </Route>
                <Route path="/customer-list">
                    <CustomerList />
                </Route>
                <Route path="/products">
                    <ProductListGraphQL />
                </Route>
                <Route path="/product-details/:pId">
                    <ProductDetailsPage />
                </Route>
                <Route path="/cart">
                    <CartPage />
                </Route>
            </Switch>
        </>
    );
}

export default Routes;
