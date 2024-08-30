import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import Navbar from "../component/Navbar";
import "../../styles/ProductsEntry.css";
import SuccessAlert from "../component/SuccessAlert";

const ProductsEntry = () => {
    const { store, actions } = useContext(Context);
    const [productName, setProductName] = useState("");
    const [brand, setBrand] = useState("");
    const [costPrice, setCostPrice] = useState("");
    const [salesPrice, setSalesPrice] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [idProduct, setIdProduct] = useState("");
    const [editMode, setEditMode] = useState(false);
    const [editProductId, setEditProductId] = useState(null);
    const [expandedProductId, setExpandedProductId] = useState(null);
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState("");
    const [isSuccessAlertVisible, setIsSuccessAlertVisible] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [successTitle, setSuccessTitle] = useState("Success");
    const [newCategoryDescription, setNewCategoryDescription] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 5;

    useEffect(() => {
        actions.getProducts();
        actions.getNextProdId();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const productData = {
            salesPrice: salesPrice,
            costPrice: costPrice,
            amount: amount,
            id_prod: store.prodOne ? store.prodOne.id_prod : idProduct,
        };

        const result = await actions.addProductentry(productData);
    };

    const handleSearchProduct = async () => {
        if (idProduct === "") {
            setProductName("");
            setBrand("");
            setCategory("");
            setCostPrice("");
            setSalesPrice("");
            setAmount("");
            actions.setProdOne(null); 
        } else {
            await actions.getProductId(idProduct);
            if (store.prodOne) {
                setProductName(store.prodOne.prodname || "");
                setBrand(store.prodOne.brand || "");
                setCategory(store.prodOne.category || "");
                setCostPrice(store.prodOne.costPrice || "");
                setSalesPrice(store.prodOne.salesPrice || "");
                setAmount(store.prodOne.amount || "");
            } else {
                setProductName("");
                setBrand("");
                setCategory("");
                setCostPrice("");
                setSalesPrice("");
                setAmount("");
            }
        }
    };

    const handleCancel = () => {
        setEditMode(false);
        setEditProductId(null);
        setProductName("");
        setBrand("");
        setSalesPrice("");
        setCategory(""); 
        setCostPrice(""); 
        setAmount(""); // 
        setIdProduct("");
        actions.setProdOne(null);
    };

    return (
        <div className="productsentry-page">
            <Navbar />
            <Link to="/products-menu" className="back-button">
                <i className="fas fa-arrow-left"></i> Back
            </Link>

            <div className="product-container">
                <h1>Product Entry</h1>
                <form className="product-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Product ID:</label>
                        <div className="input-button-container">
                            <input
                                type="number"
                                value={idProduct}
                                onChange={(e) => setIdProduct(e.target.value)} 
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        handleSearchProduct();
                                    }
                                }}
                            />
                            <button type="button" onClick={handleSearchProduct}>
                                Search Product
                            </button>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Product Name:</label>
                        <span>{productName}</span>
                    </div>
                    <div className="form-group">
                        <label>Brand:</label>
                        <span>{brand}</span>
                    </div>
                    <div className="form-group">
                        <label>Category:</label>
                        <span>{category}</span>
                    </div>
                    <div className="form-group">
                        <label>Cost Price:</label>
                        <input
                            type="number"
                            placeholder="Cost Price"
                            value={costPrice}
                            onChange={(e) => setCostPrice(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Sales Price:</label>
                        <input
                            type="number"
                            placeholder={salesPrice}
                            value={salesPrice}
                            onChange={(e) => setSalesPrice(e.target.value)}
                            onKeyDown={(e) => {
                                if (salesPrice > costPrice) {
                                    console.log("OK salesPrice", salesPrice, costPrice);
                                } else {
                                    console.log("error salesPrice", salesPrice);
                                    valida(salesPrice);
                                }
                            }}
                        />
                    </div>
                    <div className="form-group">
                        <label>Amount:</label>
                        <input
                            type="number"
                            placeholder="Amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </div>

                    <div className="product-actions">
                        <button type="submit">
                            Add Entry
                        </button>
                        <button type="button" onClick={handleCancel}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductsEntry;
