import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import Navbar from "../component/Navbar";

import "../../styles/States.css";
import { Row } from "react-bootstrap";

const States = () => {
    const { store, actions } = useContext(Context);
    const states = store.statesList || [];
    return (

        <div className="states-page">
            <Navbar />
            <div className="states-container">
                <div className="row">
                    <h1>States</h1>
                    <p>This is the States view.</p>
                    <button type="button"
                        onClick={() => { actions.getToken() }}
                    >
                        load external API states
                    </button>
                </div>
            </div>
            <div className="states-container">

                <h1>States List</h1>
                <ul className="state-list">
                    {states.length > 0 ? (
                        states.map((state, index) => (
                            <li key={index} className="client-item">
                                <p><strong>State Name:</strong> {state}</p>

                            </li>
                        ))
                    ) : (
                        <li>No States available</li>
                    )}
                </ul>

            </div>
        </div>

    );
};

export default States;
