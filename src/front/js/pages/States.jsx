import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import Navbar from "../component/Navbar";
import "../../styles/States.css";

const States = () => {
    const { store, actions } = useContext(Context);
    const states = store.statesList || [];
    const [currentPage, setCurrentPage] = useState(1);
    const statesPerPage = 10;

    const indexOfLastState = currentPage * statesPerPage;
    const indexOfFirstState = indexOfLastState - statesPerPage;
    const currentStates = states.slice(indexOfFirstState, indexOfLastState);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const nextPage = () => setCurrentPage((prevPage) => prevPage + 1);
    const prevPage = () => setCurrentPage((prevPage) => prevPage - 1);

    return (
        <div className="states-page">
            <Navbar />
            <div className="states-container">
                <h1>States</h1>
                <p>This is the States view.</p>
                <button 
                    type="button"
                    className="next-page-button"
                    onClick={() => { actions.getToken() }}
                >
                    load external API states
                </button>

                <hr />

                <h1>States List</h1>
                <ul className="state-list">
                    {currentStates.length > 0 ? (
                        currentStates.map((state, index) => (
                            <li key={index} className="client-item">
                                <p><strong>State Name:</strong> {state}</p>
                            </li>
                        ))
                    ) : (
                        <li>No States available</li>
                    )}
                </ul>

                <div className="pagination-container">
                    <button
                        onClick={prevPage}
                        className="prev-page-button"
                        disabled={currentPage === 1}
                    >
                        Previous Page
                    </button>
                    <div className="pagination-buttons">
                        {Array.from({ length: Math.ceil(states.length / statesPerPage) }, (_, index) => (
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
                        disabled={currentPage >= Math.ceil(states.length / statesPerPage)}
                    >
                        Next Page
                    </button>
                </div>
            </div>
        </div>
    );
};

export default States;
