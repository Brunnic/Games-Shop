import React, { useEffect } from 'react';
import { connect } from "react-redux";

import { getProduct } from "../../actions/products";
import { addToCart } from "../../actions/cart";

import "./ProductInfo.css";

const ProductInfo = ({ match, product, getProduct, loading, addToCart }) => {
    let id = match.params.id
    useEffect(() => {
        console.log("getting product");
        getProduct(id);
    }, [getProduct, id]);

    if(!product) {
        return (
            <div>LOL</div>
        )
    }

    return (
        <div>
            {loading ? "Loading..." : 
            <section className="row justify-content-center section">
                <div className="col-md-9 article-info article-page rounded">
                    <div className="row">
                        <div className="col-md-4">
                            {/* Carousel */}
                            <div id="carouselExampleControls" data-ride="carousel" className="carousel slide">
                                <ol className="carousel-indicators">
                                    {product.imgs.map((img, i) => (
                                        i ===0 ? (
                                            <li key={i} data-target="#carouselExampleControls" data-slide-to={i} className="active" ></li>
                                        ) :
                                        <li key={i} data-target="#carouselExampleControls" data-slide-to={i}></li>
                                    ))}
                                </ol>
                                <div className="carousel-inner">
                                    {product.imgs.map((img, i) => (
                                        i === 0 ? (
                                            <div key={i} className="carousel-item active" data-interval="3000">
                                                <img src={img} alt="" className="d-block w-100 image-article"/>
                                            </div>
                                        ) :
                                        <div key={i} className="carousel-item" data-interval="3000">
                                            <img src={img} alt="" className="d-block w-100 image-article"/>
                                        </div>
                                    ))}
                                </div>
                                <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="sr-only">Previous</span>
                                </a>
                                <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="sr-only">Next</span>
                                </a>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <h1 className="article-title">{product.title}</h1>
                            <hr/>
                            <h3 className="article-price d-inline"> {product.price / 100} $</h3>
                            <div onClick={ () => {
                                addToCart({
                                    title: product.title,
                                    imgs: product.imgs,
                                    price: product.price,
                                    quantity: 1
                                })
                            }} className="btn btn-warning ml-3">Add To Cart</div>
                        </div>
                        <hr/>
                        <div className="col-12 mt-3 text-dark">
                            <h3>Description</h3>
                            <p className="article-desc">
                                {product.info.desc}
                            </p>
                            <hr/>
                            <h3>Config</h3>
                            <div className="article-config" dangerouslySetInnerHTML={{__html: product.info.config}}>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </section>}
        </div>
    )
}

const mapStateToProps = state => ({
    product: state.products.product,
    loading: state.products.loading
});

export default connect(mapStateToProps, { getProduct, addToCart })(ProductInfo);
