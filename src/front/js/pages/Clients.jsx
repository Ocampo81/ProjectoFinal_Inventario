import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import Navbar from "../component/Navbar";
import "../../styles/Clients.css";

const Clients = () => {
    const { store, actions } = useContext(Context);
    const [expandedClientId, setExpandedClientId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const clientsPerPage = 10;

    useEffect(() => {
        actions.getCustomer();
    }, []);

    const toggleClientDetails = (id) => {
        if (expandedClientId === id) {
            setExpandedClientId(null);
        } else {
            setExpandedClientId(id);
        }
    };

    const indexOfLastClient = currentPage * clientsPerPage;
    const indexOfFirstClient = indexOfLastClient - clientsPerPage;
    const currentClients = store.customers.slice(indexOfFirstClient, indexOfLastClient);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const nextPage = () => setCurrentPage((prevPage) => prevPage + 1);
    const prevPage = () => setCurrentPage((prevPage) => prevPage - 1);

    return (
        <div className="clients-page">
            <Navbar />
            <div className="client-container">
                <h1>Clients List</h1>
                <div className="client-list">
                    {currentClients.map((client, index) => (
                        <div key={index} className="client-item">
                            <div
                                className="client-header"
                                onClick={() => toggleClientDetails(client.nit)}
                            >
                                <span>{client.nit}</span>
                            </div>
                            {expandedClientId === client.nit && (
                                <div className="client-details">
                                    <p><strong>Phone:</strong> {client.phone}</p>
                                    <p><strong>Date:</strong> {client.date}</p>
                                    <p><strong>Address:</strong> {client.address}</p>
                                    <p><strong>City:</strong> {client.city}</p>
                                    <p><strong>Country:</strong> {client.country}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <div className="pagination-container">
                    <button
                        onClick={prevPage}
                        className="prev-page-button"
                        disabled={currentPage === 1}
                    >
                        Previous Page
                    </button>
                    <div className="pagination-buttons">
                        {Array.from({ length: Math.ceil(store.customers.length / clientsPerPage) }, (_, index) => (
                            <button
                                key={index}
                                onClick={() => paginate(index + 1)}
                                className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={nextPage}
                        className="next-page-button"
                        disabled={currentPage >= Math.ceil(store.customers.length / clientsPerPage)}
                    >
                        Next Page
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Clients;
