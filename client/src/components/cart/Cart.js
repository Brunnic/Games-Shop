import React, { Fragment, useEffect, useState } from 'react';
import { connect } from "react-redux";

import { getCart, addToCart } from "../../actions/cart";

const Cart = ({ cart, getCart, addToCart }) => {
    useEffect(() => {
        getCart();
    }, [getCart]);

    const [quantities, setQuantities] = useState({ qt: [] });

    var totalPrice = 0;

    useEffect(() => {
        if(!cart.loading) {
            setQuantities({ qt: cart.cart.map((product) => product.quantity )})
        }
    }, [cart.cart, cart.loading])

    function onChange (e) {
        let qts = [...quantities.qt];
        qts[this] = e.target.value;
        setQuantities({ qt: qts })
    }


    return (
        <div className="row section">
            {cart.loading ? "Loading..." 
            :
            <Fragment>
                <h3>Cart ({cart.cart.length} items) </h3>
                <table className="table table-striped table-dark">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Article</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Price</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.cart.map((product, i) => (
                            <tr key={product.title} >
                                <td > {product.title} </td>
                                <td> {quantities.qt.map((qt, i2) => {
                                    if(i === i2) {
                                        return <input key={i2} type="Number" min="1" value={qt} onChange={onChange.bind(i2)} />
                                    }
                                })} </td>
                                <td> {product.price / 100 * product.quantity} $ </td>
                                <td className="btn btn-warning" onClick={(e) => {
                                    quantities.qt.forEach((qt, i2) => {
                                        if(i === i2) {
                                            addToCart({
                                                title: product.title,
                                                imgs: product.imgs,
                                                price: product.price,
                                                quantity: qt,
                                            });
                                        }
                                    })
                                    window.location.reload();
                                }} >Save</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <hr/>
                <div className="payment col-12">
                    <h3> Total: {cart.cart.forEach((product) => {
                        totalPrice += product.price / 100 * product.quantity;
                    })} {totalPrice} $</h3>
                    <div className="btn btn-warning">Checkout</div>
                </div>
            </Fragment>
        }
        </div>
    )
}

const mapStateToProps = state => ({
    cart: state.cart
});

export default connect(mapStateToProps, { getCart, addToCart })(Cart);
