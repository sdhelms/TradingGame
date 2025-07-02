import React from 'react';

const SidePanel = ({ funds, currentView, onViewChange }) => {
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

export default SidePanel;