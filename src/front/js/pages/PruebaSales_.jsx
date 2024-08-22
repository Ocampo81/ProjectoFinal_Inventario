import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import Navbar from "../component/Navbar";
import "../../styles/PruebaSales_.css";

const PruebaSales = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        let isMounted = true;

        async function fetchData() {
            if (isMounted) {
                await actions.getSalesNextId();
                await actions.getOneCustomer(localStorage.getItem('userId'));
            }
        }

        fetchData();

        return () => {
            isMounted = false;
        };
    }, []);

    const [idprod, setIdprod] = useState();
    const [amount, setAmount] = useState(0);
    const [unitPrice, setUnitPrice] = useState(0);
    const [listSales, setListSales] = useState([]);

    const handleAddProduct = () => {
        const validAmount = parseFloat(amount) || 0;
        const validUnitPrice = parseFloat(store.prodOne.salesPrice) || 0;
    
        const salesData = {
            idsales: store.nextid ? store.nextid.ID : null,
            iduser: localStorage.getItem('userId'),
            nit: store.customer ? store.customer.nit : null,
            amount: validAmount,
            unitPrice: validUnitPrice,
            id_prod: store.prodOne.id_prod,
            prodname: store.prodOne.prodname,
            category: store.prodOne.category,
            brand: store.prodOne.brand,
            subtotal: validAmount * validUnitPrice
        };
    
        setListSales(listSales.concat([salesData]));
        console.log("valor de SALE-salesData", salesData);
        console.log("****** valor de listSales", listSales);
    
        // Reset fields after adding product to the list
        setIdprod('');
        setAmount(0);
        setUnitPrice(0);
    };    

    const handleSubmit = async (event) => {
        event.preventDefault();

        const success = await actions.postAddSalesBatch(listSales);
        if (success) {
            console.log("Factura enviada correctamente");
            setListSales([]); // Clear the list after submission
        } else {
            console.error("Error al enviar la factura");
        }
    };

    return (
        <section className="text-center text-lg-start">
            <Navbar />
            <div className="sales-page">
                <div className="invoice-container">
                    <div className="invoice-header">
                        <div className="company-info">
                            <h2>Company Name</h2>
                            <p>+57 300 300 300</p>
                            <p>ejemplo@ejemplo.com</p>
                            <p>USA</p>
                        </div>
                        <div className="invoice-title">
                            <h1>INVOICE</h1>
                            <p># {store.nextid ? store.nextid.ID : "N/A"}</p>
                        </div>
                    </div>
                    
                    <div className="customer-info">
                        {store.customer ? (
                            <>
                                <h3>Customer Name: {store.customer.name} {store.customer.lastName}</h3>
                                <p>Mobile: {store.customer.phone}</p>
                                <p>Email: {store.customer.email}</p>
                                <p>Address: {store.customer.address}, {store.customer.city} - {store.customer.country}</p>
                            </>
                        ) : (
                            <h3>Customer information not available</h3>
                        )}
                    </div>
                    
                    <form className="sales-form" onSubmit={handleSubmit}>
                        <table className="invoice-table">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Product Name</th>
                                    <th>Category Name</th>
                                    <th>Brand Name</th>
                                    <th>Amount</th>
                                    <th>Unit Price</th>
                                    <th>Sub Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listSales.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.id_prod}</td>
                                        <td>{item.prodname}</td>
                                        <td>{item.category}</td>
                                        <td>{item.brand}</td>
                                        <td>{item.amount}</td>
                                        <td>{item.unitPrice}</td>
                                        <td>{!isNaN(item.amount * item.unitPrice) ? item.amount * item.unitPrice : "0"}</td>
                                    </tr>
                                ))}
                                <tr>
                                    <td>
                                        <input
                                            type="number"
                                            value={idprod}
                                            onChange={(e) => actions.getProductId(e.target.value)}
                                            placeholder="Product ID"
                                        />
                                    </td>
                                    <td>{store.prodOne ? store.prodOne.prodname : "N/A"}</td>
                                    <td>{store.prodOne ? store.prodOne.category : "N/A"}</td>
                                    <td>{store.prodOne ? store.prodOne.brand : "N/A"}</td>
                                    <td>
                                        <input
                                            type="number"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            required
                                        />
                                    </td>
                                    <td>{store.prodOne ? store.prodOne.salesPrice : 0}</td>
                                    <td>{!isNaN(amount * store.prodOne.salesPrice) ? amount * store.prodOne.salesPrice : "0"}</td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="invoice-actions">
                            <button type="button" className="btn btn-primary btn-block mb-4" onClick={handleAddProduct}>
                                Next
                            </button>
                            <button type="submit" className="btn btn-success btn-block mb-4">
                                Send Invoice
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default PruebaSales;
