import React from "react";
import Navbar from "../component/Navbar";
import "../../styles/MainMenu.css";

const MainMenu = () => {
  return (
    <div className="main-menu">
      <Navbar />
      <div className="menu-container">
        <div className="menu-grid">
          <div className="menu-item">
            <i className="fas fa-box-open fa-3x menu-icon"></i>
            <h2>Productos</h2>
            <p>Registra tus productos</p>
          </div>
          <div className="menu-item">
            <i className="fas fa-users fa-3x menu-icon"></i>
            <h2>Personal</h2>
            <p>Ten el control de tu personal</p>
          </div>
          <div className="menu-item">
            <i className="fas fa-cog fa-3x menu-icon"></i>
            <h2>Configuración</h2>
            <p>Configura tus opciones básicas</p>
          </div>
          <div className="menu-item">
            <i className="fas fa-tags fa-3x menu-icon"></i>
            <h2>Categoría de productos</h2>
            <p>Asigna categorías a tus productos</p>
          </div>
          <div className="menu-item">
            <i className="fas fa-boxes fa-3x menu-icon"></i>
            <h2>Marca de productos</h2>
            <p>Gestiona tus marcas</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;

