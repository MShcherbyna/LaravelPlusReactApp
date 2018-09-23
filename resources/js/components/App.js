import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Product} from './product-component';
import {AddProduct} from './add-product-component';
import Pagination from "react-js-pagination";

export default class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            products: [],
            currentProduct: null
        }

        this.handleAddProduct = this.handleAddProduct.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
    }

    componentDidMount() {
        fetch('/api/products').then(response => {
            return response.json();
        }).then(products => {
            this.setState({ products });
        });
    }

    handleAddProduct(product) {
        product.price = Number(product.price);
        product.availability = true;

        fetch('api/products', {
            method:'post',
            /* headers are important*/
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },

            body: JSON.stringify(product)
        })
        .then(response => {
            return response.json();
        })
        .then( data => {
            //update the state of products and currentProduct
            this.setState((prevState)=> ({
                products: prevState.products.concat(data),
                currentProduct : data
            }))
        })
    }

    renderProducts() {
        const { products } = this.state;

        return products.map(product => {
            return (
                <React.Fragment>
                <li className="list-group-item d-flex justify-content-between align-items-center" key={product.id}>
                    {product.title}
                    <div className="control-elem">
                        <span className="badge badge-danger badge-pill" onClick={() => this.deleteProduct(product.id)}>delete</span>
                        {/* <span className="badge badge-warning badge-pill" onClick={() => this.deleteProduct(product.id)}>update</span> */}
                        <span className="badge badge-primary badge-pill" onClick={() => this.handleClick(product)}>show more</span>
                    </div>
                </li>
                </React.Fragment>
            );
        })
    }

    handleClick(product) {
        this.setState({currentProduct: product});
    }

    deleteProduct(productId) {
        const { products } = this.state;

        fetch('/api/products/' + productId,{
            method:'delete',
        }).then(response => {
            products.find((product, key) => {
                if (product !== undefined) {
                    if (product.id == productId) {
                        products.splice(key, 1);
                        return true;
                    }
                }
            });
            this.setState({
                products:products
            });
        });

    }

    render() {
        return (
            <div className="row">
                <div className="col-md-6">
                    <h3>All products:</h3>
                    <ul className="list-group">
                        {this.renderProducts()}
                    </ul>
                </div>
                <div className="col-md-6 pt-5">
                    <Product  product={this.state.currentProduct}/>
                    <AddProduct addNewProduct={this.handleAddProduct}/>
                </div>
            </div>
        );
    }
}

if (document.getElementById('root')) {
    ReactDOM.render(<App />, document.getElementById('root'));
}
