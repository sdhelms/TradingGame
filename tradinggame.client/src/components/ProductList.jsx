import React from 'react';
import Product from './Product';

const ProductList = ({ products, onProductSelect, selectedProductId }) => {
    if (products.length === 0) {
        return (
            <div className="product-list">
                <p>You don't have any products available. Visit the Market to purchase products.</p>
            </div>
        );
    }

    return (
        <div className="product-list">
            {products.map(product => (
                <Product
                    key={product.id}
                    product={product}
                    onProductSelect={onProductSelect}
                    isSelected={product.id === selectedProductId}
                />
            ))}
        </div>
    );
};

export default ProductList;