import React from 'react';

const FinancialDetails = ({ product }) => {
    return (
        <div className="financial-details">
            <h2>Financial Details</h2>
            <p>Product: {product.name}</p>
            <p>Price: ${product.price}</p>
            <p>Profit Margin: {(product.margin * 100).toFixed(2)}%</p>
            <p>Estimated Monthly Sales: {product.estimatedSales} units</p>
            <p>Estimated Monthly Revenue: ${(product.price * product.estimatedSales).toFixed(2)}</p>
            <p>Estimated Monthly Profit: ${(product.price * product.margin * product.estimatedSales).toFixed(2)}</p>
        </div>
    );
};

export default FinancialDetails;