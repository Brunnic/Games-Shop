import React, { Fragment } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Dashboard = ({ user, loading }) => {
    return (
        <div className="row">
            {loading ? "Loading..." :
                <Fragment>
                    <h1 className="text-center col-12"> {user.email} </h1>
                    <div className="col-md-6">
                        <Link className="btn btn-success" to="/admin/addproduct">Add Product</Link>
                    </div>
                </Fragment>
            }
        </div>
    )
}

const mapStateToProps = state => ({
    user: state.auth.user,
    loading: state.auth.loading
})

export default connect(mapStateToProps)(Dashboard);
