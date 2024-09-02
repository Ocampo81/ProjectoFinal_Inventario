import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "../../styles/Navbar.css";
import { Context } from "../store/appContext";

const Navbar = () => {
    const { store, actions } = useContext(Context);
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);

    const handleProfileClick = () => {
        setShowProfileDropdown(!showProfileDropdown);
    };

    const handleLogout = () => {
        actions.logout();
    };

    if (!store.user) {
        return null;
    }

    const profile = store.user.profile;

    return (
        <div className="navbar">
            <ul>
                <li className="user-button" onClick={handleProfileClick}>
                    <button className="navbar-icon">
                        <i className="fas fa-user fa-lg"></i>
                        <span className="tooltiptext">User Profile</span>
                    </button>
                    {showProfileDropdown && (
                        <div className="profile-dropdown">
                            <p>Email: {store.user.email}</p>
                            <p>First Name: {store.user.name}</p> 
                            <p>Last Name: {store.user.lastName}</p> 
                            <Link to="/profile" className="view-profile-link">
                                View Profile
                            </Link>
                            <button className="logout-button" onClick={handleLogout}>
                                Logout
                            </button>
                        </div>
                    )}
                </li>
                <li className="home-button">
                    <Link to="/main-menu" className="navbar-icon">
                        <i className="fas fa-home fa-lg" data-tooltip="Main Menu"></i>
                        <span className="tooltiptext">Main Menu</span>
                    </Link>
                </li>

                {profile === 1 && (
                    <>
                        <li>
                            <Link to="/products-menu" className="navbar-icon">
                                <i className="fas fa-box-open fa-lg"></i>
                                <span className="tooltiptext">Products</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/clients" className="navbar-icon">
                                <i className="fas fa-users fa-lg"></i>
                                <span className="tooltiptext">Clients</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/sales" className="navbar-icon">
                                <i className="fas fa-shopping-cart fa-lg"></i>
                                <span className="tooltiptext">Sales</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/reports" className="navbar-icon">
                                <i className="fas fa-chart-line fa-lg"></i>
                                <span className="tooltiptext">Reports</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/user-approval" className="navbar-icon">
                                <i className="fas fa-user-check fa-lg"></i>
                                <span className="tooltiptext">User Approval</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/product-client-report" className="navbar-icon"> {/* Nueva opción para admin */}
                                <i className="fas fa-box-open fa-lg"></i>
                                <span className="tooltiptext">Product Client Report</span>
                            </Link>
                        </li>
                    </>
                )}
                {profile === 2 && (
                    <>
                        <li>
                            <Link to="/sales" className="navbar-icon">
                                <i className="fas fa-shopping-cart fa-lg"></i>
                                <span className="tooltiptext">Sales</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/reports" className="navbar-icon">
                                <i className="fas fa-chart-line fa-lg"></i>
                                <span className="tooltiptext">Reports</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/product-client-report" className="navbar-icon"> {/* Nueva opción para sales */}
                                <i className="fas fa-box-open fa-lg"></i>
                                <span className="tooltiptext">Product Client Report</span>
                            </Link>
                        </li>
                    </>
                )}
                {profile === 3 && (
                    <>
                        <li>
                            <Link to="/products" className="navbar-icon">
                                <i className="fas fa-box-open fa-lg"></i>
                                <span className="tooltiptext">Products</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/reports" className="navbar-icon">
                                <i className="fas fa-chart-line fa-lg"></i>
                                <span className="tooltiptext">Reports</span>
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </div>
    );
};

export default Navbar;
