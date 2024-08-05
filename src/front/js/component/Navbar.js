import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Navbar.css";

const Navbar = () => {
    return (
        <div className="navbar">
            <ul>
                <li>
                    <Link to="/create-product">Crear productos</Link>
                </li>
                <li>
                    <Link to="/view-inventory">Ver inventario</Link>
                </li>
            </ul>
        </div>
    );
};

export default Navbar;
