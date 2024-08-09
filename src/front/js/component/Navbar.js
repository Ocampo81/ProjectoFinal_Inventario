import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Navbar.css";

const Navbar = () => {
    return (
        <div className="navbar">
            <ul>
            <li>
                <Link to="/main-menu" className="navbar-icon">
                    <i className="fas fa-home fa-2x" data-tooltip="Main Menu"></i>
                        <span className="tooltiptext">Main Menu</span>
                </Link>
            </li>
                <li>
                    <Link to="/products" className="navbar-icon">
                        <i className="fas fa-box-open fa-2x" data-tooltip="Products"></i>
                        <span className="tooltiptext">Products</span>
                    </Link>
                </li>
                <li>
                    <Link to="/clients" className="navbar-icon">
                        <i className="fas fa-users fa-2x" data-tooltip="Clients"></i>
                        <span className="tooltiptext">Clients</span>
                    </Link>
                </li>
                <li>
                    <Link to="/employees" className="navbar-icon">
                        <i className="fas fa-user-tie fa-2x" data-tooltip="Employees"></i>
                        <span className="tooltiptext">Employees</span>
                    </Link>
                </li>
                <li>
                    <Link to="/sales" className="navbar-icon">
                        <i className="fas fa-shopping-cart fa-2x" data-tooltip="Sales"></i>
                        <span className="tooltiptext">Sales</span>
                    </Link>
                </li>
                <li>
                    <Link to="/reports" className="navbar-icon">
                        <i className="fas fa-chart-line fa-2x" data-tooltip="Reports"></i>
                        <span className="tooltiptext">Reports</span>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Navbar;
