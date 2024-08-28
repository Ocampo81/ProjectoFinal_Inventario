import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

const States = () => {
    const { store, actions } = useContext(Context);
    return (
        <div>
            <h1>States</h1>
            <p>This is the States view.</p>
            <button type="button" onClick={actions.getToken}>
                Token
            </button>
            <button type="button" onClick={actions.getStates(localStorage.getItem('apiToken'))}>
                States
            </button>

        </div>
    );
};

export default States;
