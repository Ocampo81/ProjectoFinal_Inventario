import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import Navbar from "../component/Navbar";
import "../../styles/Clients.css"; 

const Clients = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getCustomers();
    }, []);

    const customers = store.customers || [];

    return (
        <div className="clients-page">
            <Navbar />
            <div className="client-container">
                <h1>Clients List</h1>
                <ul className="client-list">
                    {customers.length > 0 ? (
                        customers.map((customer, index) => (
                            <li key={index} className="client-item">
                                <p><strong>NIT:</strong> {customer.nit}</p>
                                <p><strong>Phone:</strong> {customer.phone}</p>
                                <p><strong>Date:</strong> {customer.date}</p>
                                <p><strong>Address:</strong> {customer.address}</p>
                                <p><strong>City:</strong> {customer.city}</p>
                                <p><strong>Country:</strong> {customer.country}</p>
                            </li>
                        ))
                    ) : (
                        <li>No clients available</li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Clients;
