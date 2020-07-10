import React, { useEffect } from 'react';
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { getUser } from "./actions/auth"; 
import { getCart } from "./actions/cart";
import { getProducts } from "./actions/products";

import store from "./store";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/LoginForm.component";
import Register from "./components/auth/RegisterForm.component";
import AddProduct from './components/product/AddProduct';
import ProductInfo from './components/product/ProductInfo';
import Cart from './components/cart/Cart';
import Dashboard from './components/admin/Dashboard';

import AdminRoute from "./utils/AdminRoute";

import './App.css';
import Testing from './components/Testing';

function App() {
  useEffect(() => {
    store.dispatch(getUser());
  }, []);

  useEffect(() => {
    store.dispatch(getCart());
  }, []);

  useEffect(() => {
    store.dispatch(getProducts());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <div className="container">
          <Route path="/" exact component={Landing} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/product/:id" exact component={ProductInfo} />
          <Route path="/cart" exact component={Cart} />
          <Route path="/test" exact component={Testing} />
          <AdminRoute path="/admin/dashboard" exact component={Dashboard} />
          <AdminRoute path="/admin/addproduct" exact component={AddProduct} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
