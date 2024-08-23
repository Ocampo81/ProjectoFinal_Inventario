import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
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
            // prodname: store.prodOne.prodname,
            // brand: store.prodOne.brand,
            salesPrice: salesPrice,
            costPrice: costPrice,
            amount: amount,
            id_prod: store.prodOne.id_prod
        };

        const result = await actions.addProductentry(productData);


    };

    const handleEdit = (product) => {
        setEditMode(true);
        setEditProductId(product.id_prod);
        setProductName(product.prodname);
        setBrand(product.brand);
        setSalesPrice(product.salesPrice);
        setStock(product.stock);
        setCategory(product.category);
        setIdProduct(product.id_prod);
    };

    const handleDelete = async (id) => {
        await actions.deleteProduct(id);
        setSuccessTitle("Product Deleted");
        setSuccessMessage("The product was deleted successfully.");
        setIsSuccessAlertVisible(true);
    };

    function valida(salesprice) {
        setSuccessTitle("Atencion");
        setSuccessMessage("The salesprice Can't < than Cost price.");
        setIsSuccessAlertVisible(true);
    };

    const toggleProductDetails = (id) => {
        if (expandedProductId === id) {
            setExpandedProductId(null);
        } else {
            setExpandedProductId(id);
        }
    };

    const handleContainerClick = (id, event) => {
        if (!event.target.closest(".edit-btn") && !event.target.closest(".delete-btn")) {
            toggleProductDetails(id);
        }
    };

    const handleCancel = () => {
        setEditMode(false);
        setEditProductId(null);
        setProductName("");
        setBrand("");
        setSalesPrice("");
        setStock("");
        setCategory("");
        setIdProduct("");
    };

    const handleCategorySubmit = async () => {
        const categoryData = {
            category: newCategoryName,
            description: newCategoryDescription,
        };
        const result = await actions.addCategory(categoryData);
        if (result) {
            setIsCategoryModalOpen(false);
            setIsSuccessAlertVisible(true);
        }
    };


    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = store.products
        .sort((a, b) => a.prodname.localeCompare(b.prodname))
        .slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const nextPage = () => setCurrentPage((prevPage) => prevPage + 1);
    const prevPage = () => setCurrentPage((prevPage) => prevPage - 1);
    console.log(store.nextid_prod.ID);
    const nada = store.nextid_prod;
    console.log("nada", nada)
    return (
        <div className="productsentry-page">
            <Navbar />
            <div className="product-container">
                <h1>Product Entry</h1>
                <form className="product-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Product ID:</label>
                        <input
                            type="number"
                            // name={idProduct}
                            value={idProduct}
                            onChange={(e) => actions.getProductId(e.target.value)}

                        />
                    </div>
                    <div className="form-group">

                        <label>Product Name:</label>
                        <td>{store.prodOne ? store.prodOne.prodname : "N/A"}</td>


                    </div>
                    <div className="form-group">
                        <label>Brand:</label>
                        <td>{store.prodOne ? store.prodOne.brand : "N/A"}</td>
                    </div>
                    <div className="form-group">
                        <label>Category:</label>
                        <td>{store.prodOne ? store.prodOne.category : "N/A"}</td>
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
                            placeholder={store.prodOne.salesPrice}
                            value={salesPrice}
                            onChange={(e) => setSalesPrice(e.target.value)}

                            onKeyDown={(e) => {
                                if (salesPrice > costPrice) {
                                    console.log("OK OK  salesPrice", salesPrice, costPrice)
                                }
                                else {
                                    console.log("error salesPrice", salesPrice)
                                    valida(salesPrice)
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


                    <button type="submit">
                        Add Entry
                    </button>
                    <button type="button" onClick={handleCancel}>
                        Cancel
                    </button>

                </form>

                <div className="divider"></div> {/* Aquí está el divisor */}

            </div>
        </div>
    );
}

export default ProductsEntry;
