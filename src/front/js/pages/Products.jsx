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
    const [categoryId, setCategoryId] = useState("");
    const [editMode, setEditMode] = useState(false);
    const [editProductId, setEditProductId] = useState(null);

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
            idCatProd: categoryId,
        };

        if (editMode) {
            actions.updateProduct(editProductId, productData);
            setEditMode(false);
            setEditProductId(null);
        } else {
            actions.addProduct(productData);
        }

        setProductName("");
        setBrand("");
        setSalesPrice("");
        setStock("");
        setCategoryId("");
    };

    const handleEdit = (product) => {
        setEditMode(true);
        setEditProductId(product.id_prod);
        setProductName(product.prodname);
        setBrand(product.brand);
        setSalesPrice(product.salesPrice);
        setStock(product.stock);
        setCategoryId(product.idCatProd);
    };

    const handleDelete = (id) => {
        actions.deleteProduct(id);
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
                    <button type="submit">
                        {editMode ? "Update Product" : "Add Product"}
                    </button>
                </form>

                <h2>Product List</h2>
                <div>
                    {products.map((product) => (
                        <div key={product.id_prod} className="product-item">
                            <span>{product.prodname}</span>
                            <button onClick={() => handleEdit(product)}>Edit</button>
                            <button onClick={() => handleDelete(product.id_prod)}>Delete</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Products;
