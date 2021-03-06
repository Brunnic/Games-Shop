import React, { useEffect, Fragment } from 'react';
import { connect } from "react-redux";
import { MemoryRouter, Route, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Pagination } from "@material-ui/lab";
import { PaginationItem } from "@material-ui/lab";

import { getProducts } from "../../actions/products";
import Product from '../product/Product';

const Landing = ({ getProducts, products, loading }) => {
    useEffect(() => {
        document.title = "Games Shop"
        getProducts();
    }, [getProducts]);


    return (
        <div className="row section justify-content-end">
            {/* Categories */}
            <div className="col-md-3 categories-section">
                <ul className="list-group">
                    <div className="list-group-item list-group-item-action">Pc Games</div>
                    <div className="list-group-item list-group-item-action">Console Games</div>
                    <div className="list-group-item list-group-item-action">Gaming Pc's</div>
                    <div className="list-group-item list-group-item-action">Gaming Accessories</div>
                </ul>
            </div>
            {/* Products */}
            <div className="col-md-9 product-view">
                <div className="row row-cols-1 row-cols-md-3">
                    {
                        loading ? "Loading..." : <Fragment>
                            {products.map((product) => (
                            <Product key={product._id} product={product} />
                        ))}
                        </Fragment>

                    }
                    
                </div>
            </div>
        </div>
    )
}

Landing.propTypes = {
    products: PropTypes.arrayOf(PropTypes.object).isRequired,
    loading: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
    products: state.products.products,
    loading: state.products.loading
});

export default connect(mapStateToProps, { getProducts })(Landing);
