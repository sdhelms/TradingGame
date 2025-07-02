import React, { useState } from 'react';

export const FinancialDetails = ({ product }) => {
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

export const Market = ({ funds, onPurchase }) => {
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

export const Product = ({ product, onProductSelect, isSelected }) => {
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

export const ProductList = ({ products, onProductSelect, selectedProductId }) => {
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

export const SidePanel = ({ funds, currentView, onViewChange }) => {
    return (
        <div className="side-panel">
            <div className="player-funds">
                <h2>Your Business</h2>
                <p className="funds-amount">Available Funds: ${funds.toFixed(2)}</p>
            </div>

            <div className="navigation-menu">
                <h3>Navigation</h3>
                <ul>
                    <li
                        className={currentView === 'store' ? 'active' : ''}
                        onClick={() => onViewChange('store')}
                    >
                        Store
                    </li>
                    <li
                        className={currentView === 'market' ? 'active' : ''}
                        onClick={() => onViewChange('market')}
                    >
                        Market
                    </li>
                </ul>
            </div>
        </div>
    );
};

export const Storefront = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedShelf, setSelectedShelf] = useState(null);
    const [playerFunds, setPlayerFunds] = useState(1000);
    const [currentView, setCurrentView] = useState('store');
    const [ownedProducts, setOwnedProducts] = useState([]);
    const [shelves, setShelves] = useState([
        { id: 1, name: 'Shelf 1', productId: null, quantity: 0 },
        { id: 2, name: 'Shelf 2', productId: null, quantity: 0 },
        { id: 3, name: 'Shelf 3', productId: null, quantity: 0 },
        { id: 4, name: 'Shelf 4', productId: null, quantity: 0 },
    ]);

    const handleProductSelect = (product) => {
        setSelectedProduct(product);
        setSelectedShelf(null);
    };

    const handleShelfSelect = (shelf) => {
        setSelectedShelf(shelf);

        // If shelf has a product, select it
        if (shelf.productId) {
            const product = ownedProducts.find(p => p.id === shelf.productId);
            setSelectedProduct(product);
        } else {
            setSelectedProduct(null);
        }
    };

    const handleViewChange = (view) => {
        setCurrentView(view);
        setSelectedProduct(null);
        setSelectedShelf(null);
    };

    const handlePurchaseProduct = (product) => {
        if (playerFunds >= product.price) {
            setPlayerFunds(prevFunds => prevFunds - product.price);
            setOwnedProducts(prev => [...prev, {
                ...product,
                inventory: 10,
                isOnShelf: false
            }]);
        }
    };

    const handlePlaceOnShelf = (product, shelfId) => {
        // Update shelves
        setShelves(prev => prev.map(shelf => {
            if (shelf.id === shelfId) {
                return { ...shelf, productId: product.id, quantity: product.inventory };
            }
            return shelf;
        }));

        // Update product to mark it as on a shelf
        setOwnedProducts(prev => prev.map(p => {
            if (p.id === product.id) {
                return { ...p, isOnShelf: true, shelfId };
            }

            // If this product was previously on this shelf, mark it as not on shelf
            if (p.shelfId === shelfId) {
                return { ...p, isOnShelf: false, shelfId: null };
            }

            return p;
        }));

        setSelectedShelf(null);
    };

    const handleRemoveFromShelf = (shelfId) => {
        // Update shelf
        setShelves(prev => prev.map(shelf => {
            if (shelf.id === shelfId) {
                return { ...shelf, productId: null, quantity: 0 };
            }
            return shelf;
        }));

        // Update product
        setOwnedProducts(prev => prev.map(p => {
            if (p.shelfId === shelfId) {
                return { ...p, isOnShelf: false, shelfId: null };
            }
            return p;
        }));

        setSelectedShelf(null);
        setSelectedProduct(null);
    };

    const availableProducts = ownedProducts.filter(p => !p.isOnShelf);

    // Get products that are on shelves for the financial details
    const getProductOnShelf = (shelfId) => {
        const shelf = shelves.find(s => s.id === shelfId);
        if (!shelf || !shelf.productId) return null;
        return ownedProducts.find(p => p.id === shelf.productId);
    };

    return (
        <div className="game-container">
            <SidePanel
                funds={playerFunds}
                currentView={currentView}
                onViewChange={handleViewChange}
            />

            <div className="main-content">
                {currentView === 'store' ? (
                    <div className="storefront">
                        <h1>Your Store</h1>

                        <div className="store-layout">
                            <div className="shelves-container">
                                <h2>Store Shelves</h2>
                                <div className="shelves-grid">
                                    {shelves.map(shelf => {
                                        const productOnShelf = getProductOnShelf(shelf.id);
                                        return (
                                            <div
                                                key={shelf.id}
                                                className={`shelf ${selectedShelf?.id === shelf.id ? 'selected' : ''}`}
                                                onClick={() => handleShelfSelect(shelf)}
                                            >
                                                <h3>{shelf.name}</h3>
                                                {productOnShelf ? (
                                                    <div className="shelf-product">
                                                        <p>{productOnShelf.name}</p>
                                                        <p>Price: ${productOnShelf.price}</p>
                                                        <p>Quantity: {shelf.quantity}</p>
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleRemoveFromShelf(shelf.id);
                                                            }}
                                                            className="remove-btn"
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div className="empty-shelf">
                                                        <p>Empty Shelf</p>
                                                        {selectedProduct && !selectedProduct.isOnShelf && (
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handlePlaceOnShelf(selectedProduct, shelf.id);
                                                                }}
                                                            >
                                                                Place {selectedProduct.name} here
                                                            </button>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="inventory-section">
                                <h2>Your Inventory</h2>
                                <ProductList
                                    products={availableProducts}
                                    onProductSelect={handleProductSelect}
                                    selectedProductId={selectedProduct?.id}
                                />
                            </div>
                        </div>

                        {selectedProduct && (
                            <div className="details-panel">
                                <FinancialDetails product={selectedProduct} />
                            </div>
                        )}
                    </div>
                ) : (
                    <Market
                        funds={playerFunds}
                        onPurchase={handlePurchaseProduct}
                    />
                )}
            </div>
        </div>
    );
};

export default { FinancialDetails, Market, Product, ProductList, SidePanel, Storefront };