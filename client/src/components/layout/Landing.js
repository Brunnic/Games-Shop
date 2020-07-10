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
        <MemoryRouter initialEntries={["/"]} initialIndex={0} >
            <Route>
                {({location}) => {
                    const query = new URLSearchParams(location.search);
                    const page = parseInt(query.get("page") || "1", 10);
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
                                <Pagination page={page} count={Math.ceil(products.length / 25)} renderItem={(item) => (
                                    <PaginationItem
                                        component={Link}
                                        to={`/${item.page === 1 ? "" : `?page=${item.page}`}`}
                                        {...item}
                                        />
                                  )} />
                            </div>
                        </div>
                    )
                }}
            </Route>
        </MemoryRouter>
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
