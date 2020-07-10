import React from 'react';
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { logout } from "../../actions/auth";

const reload = () => {
    window.location.reload();
}

const Dropdown = ({ email, history, logout, user }) => (
    <div className="navbar-nav mr-auto">
        <div className="dropdown">
        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
            <i className="far fa-user mr-1"></i>{email}
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <Link to="#" className="dropdown-item">Profile</Link>
            <Link to="#" className="dropdown-item">Wishlist</Link>
            {user.role === "admin" ? <Link to="/admin/dashboard" className="dropdown-item">Admin Dashboard</Link> : ""}
            <div onClick={(e) => {
                        logout(history, reload);
                    }} className="dropdown-item">Disconnect</div>
        </div>
        </div>
    </div>
);

const AuthItems = () => (
    <ul className="navbar-nav ml-auto">
        <li className="nav-item">
            <Link to="/login" className="nav-link">Log In</Link>
        </li>
        <li className="nav-item">
            <Link to="/register" className="nav-link">Register</Link>
        </li>
    </ul>
)

const Navbar = ({ loading, isAuthenticated, user, history, logout, cart }) => {
    return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <Link className="navbar-brand" to="/">Games Shop</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                    <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="#">Games</Link>
                </li>
                
            </ul>
            <form className="form-inline mr-auto">
                <input className="form-control mr-sm-2 search-box" type="search" placeholder="Search for games" aria-label="Search"/>
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
            {/* User Auth */}
            {/* <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link to="/login" className="nav-link">Log In</Link>
                </li>
                <li className="nav-item">
                    <Link to="/register" className="nav-link">Register</Link>
                </li>
            </ul> */}
            {
                loading ? "Loading..." : (isAuthenticated ? 
                        <Dropdown email={user.email} history={history} logout={logout} user={user} />
                        :
                        <AuthItems />
                    )
                
            }
            <ul className="navbar-nav mr-auto">
                <li className="navitem cart-item">
                    <Link to="/cart" className="nav-link"><i className="fas fa-shopping-cart"></i> Cart {!cart.loading ? cart.cart.length : ""} </Link>
                </li>
            </ul>
        </div>
    </nav>
    )
}

const mapStateToProps = state => ({
    loading: state.auth.loading,
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated,
    cart: state.cart
});

export default connect(mapStateToProps, { logout })(withRouter(Navbar));
