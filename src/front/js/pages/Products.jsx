import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import Navbar from "../component/Navbar";
import "../../styles/Products.css";
import SuccessAlert from "../component/SuccessAlert";

const Products = () => {
    const { store, actions } = useContext(Context);
    const [productName, setProductName] = useState("");
    const [brand, setBrand] = useState("");
    const [salesPrice, setSalesPrice] = useState("");
    const [stock, setStock] = useState("");
    const [category, setCategory] = useState("");
    const [idProduct, setIdProduct] = useState("");
    const [editMode, setEditMode] = useState(false);
    const [editProductId, setEditProductId] = useState(null);
    const [expandedProductId, setExpandedProductId] = useState(null);
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState("");
    const [isSuccessAlertVisible, setIsSuccessAlertVisible] = useState(false);
    const [newCategoryDescription, setNewCategoryDescription] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 5;

    useEffect(() => {
        actions.getProducts();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const productData = {
            prodname: productName,
            brand: brand,
            salesPrice: salesPrice,
            stock: stock,
            category: category,
            id_prod: idProduct
        };
    
        if (editMode) {
            await actions.updateProduct(editProductId, productData);
            setEditMode(false);
            setEditProductId(null);
        } else {
            const result = await actions.addProduct(productData);
            if (result === "Category doesn't exist") {
                setIsCategoryModalOpen(true);
            } else {
                setProductName("");
                setBrand("");
                setSalesPrice("");
                setStock("");
                setCategory("");
                setIdProduct("");
            }
        }
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

    const handleDelete = (id) => {
        actions.deleteProduct(id);
    };

    const toggleProductDetails = (id) => {
        if (expandedProductId === id) {
            setExpandedProductId(null);
        } else {
            setExpandedProductId(id);
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
            description: newCategoryDescription, // Se incluye la descripción aquí
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

    return (
        <div className="products-page">
            <Navbar />
            <div className="product-container">
                <h1>Product Management</h1>
                <form className="product-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Product Name:</label>
                        <input
                            type="text"
                            placeholder="Product Name"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Brand:</label>
                        <input
                            type="text"
                            placeholder="Brand"
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Sales Price:</label>
                        <input
                            type="number"
                            placeholder="Sales Price"
                            value={salesPrice}
                            onChange={(e) => setSalesPrice(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Stock:</label>
                        <input
                            type="number"
                            placeholder="Stock"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Category:</label>
                        <input
                            type="text"
                            placeholder="Category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Product ID:</label>
                        <input
                            type="text"
                            placeholder="Product ID"
                            value={idProduct}
                            onChange={(e) => setIdProduct(e.target.value)}
                        />
                    </div>
                    <button type="submit">
                        {editMode ? "Update Product" : "Add Product"}
                    </button>
                    {editMode && (
                        <button type="button" onClick={handleCancel}>
                            Cancel
                        </button>
                    )}
                </form>

                <div className="divider"></div> {/* Aquí está el divisor */}

                <h2>Product List</h2>
                <div className="product-list">
                    {currentProducts.map((product) => (
                        <div key={product.id_prod}>
                            <div className="product-item" onClick={() => toggleProductDetails(product.id_prod)}>
                                <span>{product.prodname}</span>
                                <div className="product-actions">
                                    <button className="edit-btn" onClick={() => handleEdit(product)}>Edit</button>
                                    <button className="delete-btn" onClick={() => handleDelete(product.id_prod)}>Delete</button>
                                </div>
                            </div>
                            {expandedProductId === product.id_prod && (
                                <div className="product-details">
                                    <p><strong>Brand:</strong> {product.brand}</p>
                                    <p><strong>Sales Price:</strong> {product.salesPrice}</p>
                                    <p><strong>Stock:</strong> {product.stock}</p>
                                    <p><strong>Category:</strong> {product.category}</p>
                                    <p><strong>Description:</strong> {product.description ? product.description : "No description available"}</p> {/* Manejo de descripción nula */}
                                    <p><strong>Product ID:</strong> {product.id_prod}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <div className="pagination-container">
                    <button
                        onClick={prevPage}
                        className="prev-page-button"
                        disabled={currentPage === 1}
                    >
                        Previous Page
                    </button>
                    <div className="pagination-buttons">
                        {Array.from({ length: Math.ceil(store.products.length / productsPerPage) }, (_, index) => (
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
                        disabled={currentPage >= Math.ceil(store.products.length / productsPerPage)}
                    >
                        Next Page
                    </button>
                </div>

                {isSuccessAlertVisible && (
                    <SuccessAlert
                        message="Category created successfully!"
                        onClose={() => setIsSuccessAlertVisible(false)}
                    />
                )}

            </div>

            {isCategoryModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Create New Category</h2>
                        <input
                            type="text"
                            placeholder="Category Name"
                            value={newCategoryName}
                            onChange={(e) => setNewCategoryName(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Category Description"
                            value={newCategoryDescription}
                            onChange={(e) => setNewCategoryDescription(e.target.value)}
                        />
                        <button onClick={handleCategorySubmit}>Create Category</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Products;
