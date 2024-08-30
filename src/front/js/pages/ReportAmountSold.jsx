import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import Navbar from "../component/Navbar";

import "../../styles/States.css";
import { Row } from "react-bootstrap";


const AmountSold = () => {
    const { store, actions } = useContext(Context);
    const amountsold = store.reportsList || [];
    return (
        <div>
            <h1>REPORT AMOUNT SOLD</h1>
            <div class="container">
                <div class="row">
                    <div class="col-sm">
                        One of three columns
                    </div>
                    <div class="col-sm">
                        One of three columns
                    </div>
                    <div class="col-sm">
                        One of three columns
                    </div>
                    <div class="col-sm">
                        One of three columns
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AmountSold;
