const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            message: "",
            isAuthenticated: false,
            userToken: null,
            user: [],
            products: [],
            employees: [],
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
                        getActions().getProducts(); 
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
                            product.id_prod === id ? updatedProduct : product
                        );
                        setStore({ products: updatedProducts });
                        return true;
                    } else {
                        const errorData = await response.json();
                        console.error("Error updating product:", errorData);
                        return false;
                    }
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
                            (product) => product.id_prod !== id
                        );
                        setStore({ products: filteredProducts });
                        return true;
                    } else {
                        const errorData = await response.json();
                        console.error("Error deleting product:", errorData);
                        return false;
                    }
                } catch (error) {
                    console.error("Error deleting product:", error);
                    return false;
                }
            },

            // Empleados
            getEmployees: async () => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/employees`);
                    const data = await response.json();
                    if (response.ok) {
                        setStore({ employees: data });
                    } else {
                        console.log("Error loading employees from backend", data);
                    }
                } catch (error) {
                    console.log("Error loading employees from backend", error);
                }
            },

            addEmployee: async (employeeData) => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/employees`, {
                        method: "POST",
                        body: JSON.stringify(employeeData),
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });
                    const data = await response.json();
                    if (response.ok) {
                        getActions().getEmployees(); 
                        return true;
                    } else {
                        console.log("Error adding employee", data);
                        return false;
                    }
                } catch (error) {
                    console.log("Error adding employee", error);
                    return false;
                }
            },

            updateEmployee: async (id, employeeData) => {
                try {
                    const response = await fetch(
                        `${process.env.BACKEND_URL}/api/employees/${id}`,
                        {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(employeeData),
                        }
                    );

                    if (response.ok) {
                        getActions().getEmployees(); 
                        return true;
                    } else {
                        const errorData = await response.json();
                        console.error("Error updating employee:", errorData);
                        return false;
                    }
                } catch (error) {
                    console.error("Error updating employee:", error);
                    return false;
                }
            },

            deleteEmployee: async (id) => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/employees/${id}`, {
                        method: "DELETE",
                    });

                    if (response.ok) {
                        const filteredEmployees = getStore().employees.filter(
                            (employee) => employee.id !== id
                        );
                        setStore({ employees: filteredEmployees });
                        return true;
                    } else {
                        const errorData = await response.json();
                        console.error("Error deleting employee:", errorData);
                        return false;
                    }
                } catch (error) {
                    console.error("Error deleting employee:", error);
                    return false;
                }
            },
        }
    };
};

export default getState;
