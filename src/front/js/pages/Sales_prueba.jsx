import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import Navbar from "../component/Navbar";
import "../../styles/Products.css";

const Products = () => {
    const { store, actions } = useContext(Context);
    const [productName, setProductName] = useState("");
    const [brand, setBrand] = useState("");
    const [salesPrice, setSalesPrice] = useState("");
    const [stock, setStock] = useState("");
    const [categoryId, setCategoryId] = useState(""); // Cambiado a id_prod
    const [description, setDescription] = useState("");
    const [editMode, setEditMode] = useState(false);
    const [editProductId, setEditProductId] = useState(null);
    const [expandedProductId, setExpandedProductId] = useState(null);

    useEffect(() => {
        actions.getProducts();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const productData = {
            prodname: productName,
            brand: brand,
            salesPrice: salesPrice,
            stock: stock,
            idCatProd: categoryId, // Este campo se envía como idCatProd, lo que es correcto
            description: description,
        };

        if (editMode) {
            actions.updateProduct(editProductId, productData);
            setEditMode(false);
            setEditProductId(null);
        } else {
            actions.addProduct(productData);
        }

        // Reset form fields
        setProductName("");
        setBrand("");
        setSalesPrice("");
        setStock("");
        setCategoryId("");
        setDescription("");
    };

    const handleEdit = (product) => {
        setEditMode(true);
        setEditProductId(product.id_prod);
        setProductName(product.prodname);
        setBrand(product.brand);
        setSalesPrice(product.salesPrice);
        setStock(product.stock);
        setCategoryId(product.id_prod); // Cambiado a id_prod para editar
        setDescription(product.description);
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

    const products = store.products || [];

    return (
        <div className="products-page">
            <Navbar />
            <div className="product-container">
                <h1>Product Management</h1>
                <form className="product-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Product Name"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Brand"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Sales Price"
                        value={salesPrice}
                        onChange={(e) => setSalesPrice(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Stock"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Category ID"
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <button type="submit">
                        {editMode ? "Update Product" : "Add Product"}
                    </button>
                </form>

                <h2>Product List</h2>
                <div className="product-list">
                    {products.map((product) => (
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
                                    <p><strong>Category ID:</strong> {product.id_prod}</p> {/* Cambiado a id_prod */}
                                    <p><strong>Description:</strong> {product.description}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Products;
