import React, { Component } from 'react';

export const Product = ({product}) => {

    if (!product) {
        return <h3 className="border-bottom pb-2">Product doesn't select</h3>
    }

    return (
        <React.Fragment>
        <h3>{product.title}</h3>
        <p>{product.description}</p>
        <h4>Status: {product.availability ?
            (<span className="text-success">available</span>):
            (<span className="text-danger">out of stock</span>)}
        </h4>
        <h4 className="border-bottom pb-2">Price: {product.price}$</h4>
        </React.Fragment>
    );
}
