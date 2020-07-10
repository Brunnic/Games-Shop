import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";

import { addProduct } from "../../actions/products";

const AddProduct = ({ addProduct, history, loading, isAuthenticated }) => {
  const [form, setForm] = useState({title: "", desc: "", config: "", imgs: [], inStock: 0, price: 0});

  const { title, desc, config, imgs, inStock, price} = form;

  const onChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();

    const data = {
        title,
        info: {
            desc,
            config
        },
        imgs: imgs.split(","),
        inStock,
        price
    }

    console.log(data);
    
    addProduct(data, history);

  };

  return (
    <div className="container">
        {console.log("isAuthenticated", isAuthenticated)}
        {console.log("loading", loading)}
      {
          loading ? "" : (
            
                isAuthenticated ?

                <div>
                  <form onSubmit={(e) => onSubmit(e)}>
                    <div className="form-row">
                        <div className="form-group col-12">
                            <label htmlFor="title">Title of Product</label>
                            <input type="text" name="title" className="form-control" id="title" aria-describedby="title" onChange={onChange} value={title} />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="desc">Description</label>
                            <input type="text" name="desc" className="form-control" id="desc" aria-describedby="desc" onChange={onChange} value={desc} />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="config">Config (can be html)</label>
                            <input type="text" name="config" className="form-control" id="config" aria-describedby="config" onChange={onChange} value={config} />
                        </div>
                        <div className="form-group col-12">
                            <label htmlFor="imgs">Images <span>(separate images by comma ",")</span></label>
                            <input type="text" name="imgs" className="form-control" id="imgs" aria-describedby="imgs" onChange={onChange} value={imgs} />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="inStock">In Stock</label>
                            <input type="text" name="inStock" className="form-control" id="inStock" aria-describedby="inStock" onChange={onChange} value={inStock} />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="price">Price <span>(In pennies)</span></label>
                            <input type="number" min="0" name="price" className="form-control" id="price" aria-describedby="price" onChange={onChange} value={price} />
                        </div>
                    </div>
        
                    <button type="submit" className="btn btn-primary">Submit</button>
                  </form>
                </div>
                :
              <Redirect to="/login" />
                
          )
      }
    </div>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
//   role: state.auth.user.role
});

export default connect(mapStateToProps, { addProduct })(withRouter(AddProduct));