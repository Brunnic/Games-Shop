import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";


const userNotlogged = () => {
  return (
    <Redirect to="/login" />
  );
}

const AdminRoute = ({ component: Component, isAuthenticated, loading, user, ...rest}) => (
  <Route {...rest} render={ props => loading ? "loading" : (isAuthenticated ? (user.role === "admin" ? <Component {...props}/> : <Redirect to="/unauthorized" />)  : userNotlogged())} />

)

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
  user: state.auth.user
});

export default connect(mapStateToProps, {})(AdminRoute);