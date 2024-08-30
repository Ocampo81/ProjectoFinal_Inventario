import React from "react";
import Navbar from "../component/Navbar";
import "../../styles/MainMenu.css";
import { Link } from "react-router-dom";

const MainMenu = () => {
  if (localStorage.getItem('profile') == '1') {
    return (
      <div className="main-menu">
        <Navbar />
        <div className="menu-container">
          <div className="menu-grid">
            <Link to="/products-menu" className="menu-item"> 
              <i className="fas fa-box-open fa-3x menu-icon"></i>
              <h2>Products</h2>
              <p>Manage your products</p>
            </Link>
            <Link to="/clients" className="menu-item">
              <i className="fas fa-users fa-3x menu-icon"></i>
              <h2>Clients</h2>
              <p>Manage your clients</p>
            </Link>
            <Link to="/PruebaSales" className="menu-item">
              <i className="fas fa-shopping-cart fa-3x menu-icon"></i>
              <h2>Sales</h2>
              <p>Manage your sales</p>
            </Link>
            <Link to="/reports" className="menu-item">
              <i className="fas fa-chart-line fa-3x menu-icon"></i>
              <h2>Reports</h2>
              <p>Generate reports</p>
            </Link>
            <Link to="/user-approval" className="menu-item">
              <i className="fas fa-user-check fa-3x menu-icon"></i>
              <h2>User Approval</h2>
              <p>Approve new users</p>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  else if (localStorage.getItem('profile') == '2') {
    return (
      <div className="main-menu">
        <Navbar />
        <div className="menu-container">
          <div className="menu-grid">
            <Link to="/PruebaSales" className="menu-item">
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
  }
  else if (localStorage.getItem('profile') == '3') {
    return (
      <div className="main-menu">
        <Navbar />
        <div className="menu-container">
          <div className="menu-grid">
            <Link to="/products-menu" className="menu-item"> 
              <i className="fas fa-box-open fa-3x menu-icon"></i>
              <h2>Products</h2>
              <p>Manage your products</p>
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
  }
};

export default MainMenu;
