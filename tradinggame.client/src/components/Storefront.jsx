import React, { useState } from 'react';
import ProductList from './ProductList';
import FinancialDetails from './FinancialDetails';
import SidePanel from './SidePanel';
import Market from './Market';

const Storefront = () => {
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

export default Storefront;
