import React from 'react';

const Market = ({ funds, onPurchase }) => {
    const availableProducts = [
        { id: 1, name: 'Basic Widget', price: 50, margin: 0.3, estimatedSales: 20 },
        { id: 2, name: 'Premium Widget', price: 120, margin: 0.4, estimatedSales: 12 },
        { id: 3, name: 'Economy Gadget', price: 30, margin: 0.25, estimatedSales: 35 },
        { id: 4, name: 'Luxury Item', price: 250, margin: 0.5, estimatedSales: 8 },
    ];

    return (
        <div className="market">
            <h2>Product Market</h2>
            <p>Here you can purchase new products to sell in your store.</p>

            <div className="product-grid">
                {availableProducts.map(product => (
                    <div key={product.id} className="market-product">
                        <h3>{product.name}</h3>
                        <p>Cost: ${product.price}</p>
                        <p>Margin: {(product.margin * 100).toFixed(0)}%</p>
                        <p>Est. Monthly Sales: {product.estimatedSales}</p>
                        <button
                            onClick={() => onPurchase(product)}
                            disabled={funds < product.price}
                        >
                            Purchase
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Market;