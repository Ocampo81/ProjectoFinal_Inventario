import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import Navbar from "../component/Navbar";
import "../../styles/ReportAmountSold.css";

const ReportAmountSold = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getAmountSold();
    }, []);

    return (
        <div className="report-amount-sold">
            <Navbar />
            <div className="report-container">
                <h1>Report: Amount Sold</h1>
                <table className="report-table">
                    <thead>
                        <tr>
                            <th>Product ID</th>
                            <th>Product Name</th>
                            <th>Amounts Sold</th>
                            <th>Avg Selling Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {store.reportsList && store.reportsList.length > 0 ? (
                            store.reportsList.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.id_prod}</td>
                                    <td>{item.prodname}</td>
                                    <td>{item["Amounts Sold"]}</td>
                                    <td>{parseFloat(item["Avg Selling Price"]).toFixed(2)}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">No data available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ReportAmountSold;
