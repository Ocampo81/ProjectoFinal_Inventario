import { Next } from "react-bootstrap/esm/PageItem";

const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            message: "",
            isAuthenticated: false,
            userToken: null,
            user: [],
            // isActive: null,
            // profile: null,
            products: [],
            prodOne: [],
            employees: [],
            customers: [],
            customer: [],
            categories: [],
            nextid: [],
            sales: [],
        },
        actions: {
            fetchWithCheck: async (url, options = {}) => {
                try {
                    const response = await fetch(url, options);
                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(JSON.stringify(errorData));
                    }
                    return await response.json();
                } catch (error) {
                    console.error("Error in fetch:", error.message);
                    return null;
                }
            },

            getMessage: async () => {
                const data = await getActions().fetchWithCheck(process.env.BACKEND_URL + "/api/hello");
                if (data) setStore({ message: data.message });
            },

            postSignup: async (data) => {
                const response = await getActions().fetchWithCheck(`${process.env.BACKEND_URL}/api/signup`, {
                    method: "POST",
                    body: JSON.stringify(data),
                    headers: { "Content-Type": "application/json" }
                });
                if (response) {
                    setStore({ message: response.Message.message });
                    return response.Message.message === "User created successfully";
                }
                return false;
            },

            postLogin: async (email, password) => {
                const response = await getActions().fetchWithCheck(`${process.env.BACKEND_URL}/api/login`, {
                    method: "POST",
                    body: JSON.stringify({ email, password }),
                    headers: { "Content-Type": "application/json" }
                });
                if (response) {
                    if (response.Message.token) {
                        setStore({ user: response.Message });
                        localStorage.setItem("accessToken", response.Message.token);
                        localStorage.setItem("userId", response.Message.id);
                        localStorage.setItem("isActive", response.Message.isActive);
                        localStorage.setItem("profile", response.Message.profile);
                        return true;
                    } else {
                        setStore({ message: response.Message.Error });
                    }
                }
                return false;
            },

            getCategories: async () => {
                const data = await getActions().fetchWithCheck(`${process.env.BACKEND_URL}/api/categories`);
                if (data) setStore({ categories: data });
            },

            addCategory: async (categoryData) => {
                const response = await getActions().fetchWithCheck(`${process.env.BACKEND_URL}/api/category`, {
                    method: "POST",
                    body: JSON.stringify(categoryData),
                    headers: { "Content-Type": "application/json" }
                });
                if (response && response.Message.message === "Category created successfully") {
                    await getActions().getCategories(); // Actualiza las categorías después de agregar una nueva
                    return true;
                }
                return false;
            },

            addProduct: async (productData) => {
                const response = await getActions().fetchWithCheck(`${process.env.BACKEND_URL}/api/products`, {
                    method: "POST",
                    body: JSON.stringify(productData),
                    headers: { "Content-Type": "application/json" }
                });
                if (response && response.Message.message !== "Category doesn't exist") {
                    await getActions().getProducts(); 
                    return true;
                }
                return "Category doesn't exist";
            },

            
            getProducts: async () => {
                const data = await getActions().fetchWithCheck(`${process.env.BACKEND_URL}/api/products`);
                if (data) {
                    console.log("Productos recibidos del servidor:", data); 
                    setStore({ products: data });
                }
            },

            updateProduct: async (id, productData) => {
                const response = await getActions().fetchWithCheck(`${process.env.BACKEND_URL}/api/products/${id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(productData)
                });
                if (response) await getActions().getProducts();
                return !!response;
            },

            deleteProduct: async (id) => {
                const response = await getActions().fetchWithCheck(`${process.env.BACKEND_URL}/api/products/${id}`, {
                    method: "DELETE"
                });
                if (response) {
                    await getActions().getProducts();
                }
                return !!response;
            },

            getProductId: async (id) => {
                const data = await getActions().fetchWithCheck(`${process.env.BACKEND_URL}/api/products/${id}`);
                if (data) setStore({ prodOne: data[0] });
            },

            getOneCustomer: async (id) => {
                const data = await getActions().fetchWithCheck(`${process.env.BACKEND_URL}/api/customerid/${id}`);
                if (data) {
                    console.log("Productos recibidos del servidor:", data); 
                    setStore({ customer: data[0] });
                }
            },

            getSalesNextId: async () => {
                const data = await getActions().fetchWithCheck(`${process.env.BACKEND_URL}/api/salesNextid`);
                if (data) setStore({ nextid: data });
            },

            postAddSales: async (salesData) => {
                const response = await getActions().fetchWithCheck(`${process.env.BACKEND_URL}/api/sales`, {
                    method: "POST",
                    body: JSON.stringify(salesData),
                    headers: { "Content-Type": "application/json" }
                });
                if (response && response.Message.message === "Category created successfully") {
                    // await getActions().getCategories(); // Actualiza las categorías después de agregar una nueva
                    return true;
                }
                return false;
            },

        }
    };
};

export default getState;
