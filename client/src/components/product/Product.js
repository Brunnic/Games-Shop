import React from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Popup from "react-popup";

import { addToCart } from "../../actions/cart";

const Product = ({ product, addToCart }) => {
    return (
        <div className="col mb-4">
            <Link to={`/product/${product._id}`} className="card product-card">
                <img src={product.imgs[0]} alt="Product" className="card-img-top" style={{height: "12rem"}}/>
                <div className="cardbody">
                <h5 className="card-title">{product.title}</h5>
                    <p className="card-text"> {
                        product.info.desc.length < 23 ? product.info.desc : product.info.desc.substring(0, 20) + "..."
                    } </p>
                </div>
                <span className="price-tag ml-auto">{product.price / 100}$</span>
                <div onClick={(e) => {
                    e.preventDefault();
                    Popup.alert("Added To Cart successfully");
                    addToCart({
                        title: product.title,
                        imgs: product.imgs,
                        price: product.price,
                        quantity: 1
                    })
                }} className="btn btn-primary">Add To Cart</div>
            </Link>
        </div>
    )
}

export default connect(null, { addToCart })(Product);
