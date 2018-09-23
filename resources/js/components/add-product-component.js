import React, { Component } from 'react'

export class AddProduct extends Component {
    constructor(props) {
        super(props)

        this.state = {
            newProduct : {
                title: '',
                description: '',
                price: ''
            }
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange  = this.handleInputChange.bind(this);
    };

    handleInputChange(event) {
        const target = event.target;
        const value  = target.value;
        const name   = target.name;
        const { newProduct } = this.state;

        newProduct[name] = value;

        this.setState({
            newProduct: newProduct
        });
    }

    handleSubmit() {
        const {addNewProduct} = this.props;
        const {newProduct} = this.state;
        const description = this.refs.description;

        addNewProduct(newProduct);

        this.setState({
            newProduct : {
                title: '',
                description: '',
                price: ''
            }
        });
        description.value = "";
    }

    render() {
        const {title, description, price} = this.state.newProduct;
        console.log(title, description, price);
        return (
            <form className="pt-3">
                <h5>Add Product</h5>
                <div className="form-row align-items-center">
                    <div className="col-sm-6 my-1">
                        <label className="sr-only" htmlFor="inlineFormInputName">Title</label>
                        <input type="text" name="title" className="form-control" id="inlineFormInputName"  onChange={this.handleInputChange} placeholder="Enter Title" value={title}/>
                    </div>
                    <div className="col-sm-6 my-1">
                        <label className="sr-only" htmlFor="inlineFormInputGroupUsername">Price</label>
                        <div className="input-group">
                            <input type="text" name="price" className="form-control" id="inlineFormInputGroupUsername"  onChange={this.handleInputChange} placeholder="Enter Price" value={price}/>
                        </div>
                    </div>
                    <div className="col-sm-12 my-1">
                        <label className="sr-only" htmlFor="inlineFormInputGroupUsername">Description</label>
                        <div className="input-group">
                            <textarea ref="description" className="form-control" id="exampleFormControlTextarea1" placeholder="Enter Description" name="description"  onChange={this.handleInputChange} >
                            {description}
                            </textarea>
                        </div>
                    </div>
                    <div className="col-auto my-1">
                        <button type="button" className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>
                    </div>
                </div>
            </form>
        )
    }
}
