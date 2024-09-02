import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import Navbar from "../component/Navbar";
import "../../styles/ReportAmountSold.css";

const ProductClientReport = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getProductClient();
    }, []);

    return (
        <div className="report-amount-sold">
            <Navbar />
            <div className="report-container">
                <h1>Report: Products by Client</h1>
                <table className="report-table">
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {store.reportsList && store.reportsList.length > 0 ? (
                            store.reportsList.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.prodname}</td>
                                    <td>{item.date}</td>
                                    <td>{item.amount}</td>
                                    <td>{parseFloat(item.totalPrice).toFixed(2)}</td>
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

export default ProductClientReport;
