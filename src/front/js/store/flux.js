const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            message: "",
            isAuthenticated: false,
            userToken: null,
            user: [],
            products: [],
        },
        actions: {
            exampleFunction: () => {
                getActions().changeColor(0, "green");
            },

            getMessage: async () => {
                try {
                    const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
                    const data = await resp.json();
                    setStore({ message: data.message });
                    return data;
                } catch (error) {
                    console.log("Error loading message from backend", error);
                }
            },

            postSignup: async (data) => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/signup`, {
                        method: "POST",
                        body: JSON.stringify(data),
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });
                    const dataRes = await response.json();
                    if (response.ok) {
                        setStore({ message: dataRes.Message.message });
                        return dataRes.Message.message === "User created successfully";
                    } else {
                        setStore({ message: dataRes.Message.message });
                        return false;
                    }
                } catch (error) {
                    console.log("Error loading message from backend", error);
                    return false;
                }
            },

            postLogin: async (email, password) => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/login`, {
                        method: "POST",
                        body: JSON.stringify({ email, password }),
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });
                    const data = await response.json();
                    if (response.ok) {
                        setStore({ user: data.Message });
                        if (data.Message.token) {
                            localStorage.setItem("accessToken", data.Message.token);
                            return true;
                        } else {
                            setStore({ message: data.Message.Error });
                            return false;
                        }
                    } else {
                        setStore({ message: data.Message.Error });
                        return false;
                    }
                } catch (error) {
                    console.log("Error loading message from backend", error);
                    return false;
                }
            },

            getProducts: async () => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/products`);
                    const data = await response.json();
                    if (response.ok) {
                        setStore({ products: data });
                    } else {
                        console.log("Error loading products from backend", data);
                    }
                } catch (error) {
                    console.log("Error loading products from backend", error);
                }
            },

            addProduct: async (productData) => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/products`, {
                        method: "POST",
                        body: JSON.stringify(productData),
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });
                    const data = await response.json();
                    if (response.ok) {
                        getActions().getProducts();  // Refresh the product list
                        return true;
                    } else {
                        console.log("Error adding product", data);
                        return false;
                    }
                } catch (error) {
                    console.log("Error adding product", error);
                    return false;
                }
            },

            updateProduct: async (id, productData) => {
                try {
                    const response = await fetch(
                        `${process.env.BACKEND_URL}/api/products/${id}`,
                        {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(productData),
                        }
                    );

                    if (response.ok) {
                        const updatedProduct = await response.json();
                        const updatedProducts = getStore().products.map((product) =>
                            product.id === id ? updatedProduct : product
                        );
                        setStore({ products: updatedProducts });
                        return true;
                    }
                    return false;
                } catch (error) {
                    console.error("Error updating product:", error);
                    return false;
                }
            },

            deleteProduct: async (id) => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/products/${id}`, {
                        method: "DELETE",
                    });

                    if (response.ok) {
                        const filteredProducts = getStore().products.filter(
                            (product) => product.id !== id
                        );
                        setStore({ products: filteredProducts });
                        return true;
                    }
                    return false;
                } catch (error) {
                    console.error("Error deleting product:", error);
                    return false;
                }
            },
        }
    };
};

export default getState;
