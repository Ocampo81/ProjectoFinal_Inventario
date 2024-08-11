import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import Navbar from "../component/Navbar";

const Clients = () => {
    return (
        <div className="clients-page">
            <Navbar />
            <div className="client-container">
                <h1>This is the Clients View</h1>
            </div>
        </div>
    );
};

export default Clients;