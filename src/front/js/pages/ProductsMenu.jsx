import React from "react";
import Navbar from "../component/Navbar";
import { Link } from "react-router-dom";
import "../../styles/ProductsMenu.css";

const ProductsMenu = () => {
    return (
        <div className="products-menu">
            <Navbar />
            <div className="menu-container">
                <div className="menu-grid">
                    <Link to="/products" className="menu-item">
                        <i className="fas fa-box-open fa-3x menu-icon"></i>
                        <h2>Products Management</h2>
                        <p>Manage your products</p>
                    </Link>
                    <Link to="/products-entry" className="menu-item">
                        <i className="fas fa-plus fa-3x menu-icon"></i>
                        <h2>Products Entry</h2>
                        <p>Enter new products</p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProductsMenu;
