import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import Navbar from "../component/Navbar";
import "../../styles/PruebaSales_.css";

const PruebaSales = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const params = useParams();

    const [idprod, setIdprod] = useState("");
    const [amount, setAmount] = useState(0);
    const [unitPrice, setUnitPrice] = useState(0);
    const [listSales, setListSales] = useState([]);
    const [prodDetails, setProdDetails] = useState({
        prodname: "",
        category: "",
        brand: "",
        salesPrice: 0
    });

    const defaultProdDetails = {
        prodname: "",
        category: "",
        brand: "",
        salesPrice: 0
    };

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

    const handleAddProduct = () => {
        if (!idprod || idprod.trim() === "") {
            alert("Por favor, ingresa un ID de producto válido antes de agregar.");
            return;
        }

        if (!store.prodOne || !store.prodOne.id_prod) {
            alert("Producto no encontrado. Por favor, asegúrate de que el ID de producto sea correcto.");
            return;
        }

        const validAmount = parseFloat(amount);
        if (isNaN(validAmount) || validAmount <= 0) {
            alert("La cantidad debe ser un número mayor a cero.");
            return;
        }

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

        setListSales(listSales_prev => [...listSales_prev, salesData]);

        setIdprod('');
        setAmount(0);
        setUnitPrice(0);

        setProdDetails(defaultProdDetails);
    };

    const handleProductChange = async (productId) => {
        setIdprod(productId);
        if (productId.trim() === "") {
            setProdDetails(defaultProdDetails);
        } else {
            await actions.getProductId(productId);
            if (store.prodOne) {
                setProdDetails({
                    prodname: store.prodOne.prodname || "",
                    category: store.prodOne.category || "",
                    brand: store.prodOne.brand || "",
                    salesPrice: store.prodOne.salesPrice || 0
                });
            } else {
                setProdDetails(defaultProdDetails);
            }
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (idprod && store.prodOne && store.prodOne.id_prod && amount > 0) {
            handleAddProduct();
        }

        const success = await actions.postAddSalesBatch(listSales);
        if (success) {
            setListSales([]);
            setIdprod('');
            setAmount(0);
            setUnitPrice(0);
            setProdDetails(defaultProdDetails);
            navigate("/PruebaSales");

        } else {
            console.error("Error al enviar la factura");
        }
    };

    return (
        <section className="text-center text-lg-start">
            <Navbar />
            <div className="sales-page">
                <div className="main-content">
                    <div className="invoice-container">
                        <div className="invoice-header">
                            <div className="company-info">
                                <h2>{store.customer ? `${store.customer.name} ${store.customer.lastName}` : "Name LastName"}</h2>
                                <p>{store.customer ? store.customer.phone : "+57 000 000 0000"}</p>
                                <p>{store.customer ? store.customer.email : "ejemplo@ejemplo.com"}</p>
                                <p>{store.customer ? `NIT: ${store.customer.nit}` : "NIT no disponible"}</p>
                                <p>{store.customer ? `${store.customer.address}, ${store.customer.city}, ${store.customer.country}` : "Dirección no disponible"}</p>
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
                                                onChange={(e) => handleProductChange(e.target.value)}
                                                placeholder="Product ID"
                                            />
                                        </td>
                                        <td>{prodDetails.prodname || "N/A"}</td>
                                        <td>{prodDetails.category || "N/A"}</td>
                                        <td>{prodDetails.brand || "N/A"}</td>
                                        <td>
                                            <input
                                                type="number"
                                                value={amount}
                                                onChange={(e) => setAmount(e.target.value)}
                                                required
                                            />
                                        </td>
                                        <td>{prodDetails.salesPrice || 0}</td>
                                        <td>{!isNaN(amount * prodDetails.salesPrice) ? amount * prodDetails.salesPrice : "0"}</td>
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
            </div>
        </section>
    );
};

export default PruebaSales;
