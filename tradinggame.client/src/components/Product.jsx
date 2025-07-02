import React from 'react';

const Product = ({ product, onProductSelect, isSelected }) => {
    return (
        <div
            className={`product ${isSelected ? 'selected' : ''}`}
            onClick={() => onProductSelect(product)}
        >
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>
            <p>Inventory: {product.inventory} units</p>
        </div>
    );
};

export default Product;