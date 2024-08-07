import React from "react";
import Navbar from "../component/Navbar";
import "../../styles/MainMenu.css";
import { Link } from "react-router-dom";

const MainMenu = () => {
  return (
    <div className="main-menu">
      <Navbar />
      <div className="menu-container">
        <div className="menu-grid">
          <Link to="/products" className="menu-item">
            <i className="fas fa-box-open fa-3x menu-icon"></i>
            <h2>Products</h2>
            <p>Manage your products</p>
          </Link>
          <Link to="/clients" className="menu-item">
            <i className="fas fa-users fa-3x menu-icon"></i>
            <h2>Clients</h2>
            <p>Manage your clients</p>
          </Link>
          <Link to="/employees" className="menu-item">
            <i className="fas fa-user-tie fa-3x menu-icon"></i>
            <h2>Employees</h2>
            <p>Manage your employees</p>
          </Link>
          <Link to="/sales" className="menu-item">
            <i className="fas fa-shopping-cart fa-3x menu-icon"></i>
            <h2>Sales</h2>
            <p>Manage your sales</p>
          </Link>
          <Link to="/reports" className="menu-item">
            <i className="fas fa-chart-line fa-3x menu-icon"></i>
            <h2>Reports</h2>
            <p>Generate reports</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
