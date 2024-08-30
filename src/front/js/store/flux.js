import { Next } from "react-bootstrap/esm/PageItem";

const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            message: "",
            apiToken: "",
            isAuthenticated: false,
            userToken: null,
            user: {},
            products: [],
            prodOne: [],
            employees: [],
            customers: [],
            customer: [], 
            categories: [],
            nextid: null,
            nextid_prod: [], 
            sales: [],
            states: [],
            statesList: [],
            reportsList: [],
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
            getStates: async (token) => { 
                console.log("***** TOKEN dentro de GETSTATES: ",token)
                const response = await getActions().fetchWithCheck("https://www.universal-tutorial.com/api/states/colombia",{
                    headers : { 'Authorization': `Bearer ${token}` },
                    body: JSON.stringify(response),
                });
                if (response) {
                    setStore({ states: response });
                    console.log("STATES DENTRO DE STORE", getStore().states)
                    getActions().addStates(getStore().states)

                    return true;
                }
                return false;
            },
            getToken: async () => { 
                const response = await getActions().fetchWithCheck("https://www.universal-tutorial.com/api/getaccesstoken", {
                    body: JSON.stringify(response),
                    headers: {
                    "Accept": "application/json",
                    "api-token": "uXV-d_QF25Rl209jI9zpmkI3VXDlPp8j1vA_aMJ9KdRHT9E3UwX5bxNhEBWhlZiqS2A",
                    "user-email": "gespana26@yahoo.com"
                    }
                });
                if (response) {
                        setStore({ apiToken: response.auth_token });
                        // localStorage.setItem("apiToken", response.auth_token);
                        // console.log("'apiToken: *****')",getStore().apiToken);
                        getActions().getStates(getStore().apiToken);
                        return true;
                    
                }
                return false;
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
                        localStorage.setItem("firstName", response.Message.name); 
                        localStorage.setItem("lastName", response.Message.lastName);  
                        return true;
                    } else {
                        setStore({ message: response.Message.Error });
                    }
                }
                return false;
            },

            logout: () => {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("userId");
                localStorage.removeItem("isActive");
                localStorage.removeItem("profile");
                localStorage.removeItem("firstName");
                localStorage.removeItem("lastName");
                setStore({ user: null, isAuthenticated: false });
                window.location.href = "/login"; 
            },

            getUserProfile: async () => {
                const token = localStorage.getItem("accessToken");
                if (!token) return null;

                const data = await getActions().fetchWithCheck(`${process.env.BACKEND_URL}/api/profile`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (data) {
                    setStore({ user: data, isAuthenticated: true });
                    return true;
                } else {
                    return false;
                }
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
                    await getActions().getCategories();
                    return true;
                }
                return false;
            },

            addProduct: async (productData) => {
                console.log("productData PRODUCTS en FLUX", productData)
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

            getNextProdId: async () => {
                const data = await getActions().fetchWithCheck(`${process.env.BACKEND_URL}/api/nextprodid`);
                if (data) {
                    setStore({ nextid_prod: data });
                } else {
                    setStore({ nextid_prod: null });
                }
            },

            addProductentry: async (productData) => {
                const response = await getActions().fetchWithCheck(`${process.env.BACKEND_URL}/api/productsentry`, {
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

            getCustomer: async () => {
                const data = await getActions().fetchWithCheck(`${process.env.BACKEND_URL}/api/customer/`);
                if (data) {
                    console.log("Datos de cliente recibidos del servidor:", data);
                    setStore({ customers: data });
                } else {
                    setStore({ customers: null });
                }
            },

            getOneCustomer: async (id) => {
                console.log("DENTRO DEL FLUX GTEONECUSTOMER",id)
                const data = await getActions().fetchWithCheck(`${process.env.BACKEND_URL}/api/customerid/${id}`);
                if (data) {
                    console.log("Datos de cliente recibidos del servidor:", data);
                    setStore({ customer: data[0] });
                } else {
                    setStore({ customer: null });
                }
            },

            getSalesNextId: async () => {
                const data = await getActions().fetchWithCheck(`${process.env.BACKEND_URL}/api/salesNextid`);
                if (data) {
                    setStore({ nextid: data });
                } else {
                    setStore({ nextid: null });
                }
            },

            postAddSalesBatch: async (salesList) => {
                console.log("LISTA QUE VA PARA CREAR FACTURA dentro del Flux", salesList);
                const response = await getActions().fetchWithCheck(`${process.env.BACKEND_URL}/api/sales`, {
                    method: "POST",
                    body: JSON.stringify({ salesList }),
                    headers: { "Content-Type": "application/json" }
                });
                if (response && response.Message.message === "Sales created successfully") {
                    return true;
                }
                return false;
            },

            getPendingUsers: async () => {
                const data = await getActions().fetchWithCheck(`${process.env.BACKEND_URL}/api/pending-users`);
                return data;
            },

            approveUser: async (userId, role) => {
                const response = await getActions().fetchWithCheck(`${process.env.BACKEND_URL}/api/approve-user/${userId}`, {
                    method: "POST",
                    body: JSON.stringify({ role }),
                    headers: { "Content-Type": "application/json" }
                });

            
                return response && response.message === "User approved successfully";
            },

            addStates: async (states) => {
                console.log("states en addStates", states)
                const response = await getActions().fetchWithCheck(`${process.env.BACKEND_URL}/api/states`, {
                    method: "POST",
                    body: JSON.stringify(states),
                    headers: { "Content-Type": "application/json" }
                });
                console.log("RESPUESTA DE ADDstates",response)
                if (response.message == "States created successfully") {
                    console.log("RESPUESTA DE ADDstates",response.message)
                    await getActions().getStatesBack();
                    return true;
                }
                return "State doesn't exist";
            },

            getStatesBack: async () => {
                console.log("ENTRE A getStatesBack")
                const data = await getActions().fetchWithCheck(`${process.env.BACKEND_URL}/api/states`);
                setStore({ statesList: data });
                console.log("ENTRE A getStatesBack", data)
                return data;
            },
            getAmountSold: async () => {
                console.log("ENTRE A getAmountSold")
                const data = await getActions().fetchWithCheck(`${process.env.BACKEND_URL}/api/amountsold`);
                setStore({ reportsList: data });
                console.log("ENTRE A getAmountSold", data)
                return data;
            },
            getProductClient: async () => {
                console.log("ENTRE A getProductClient")
                const data = await getActions().fetchWithCheck(`${process.env.BACKEND_URL}/api/amountsold/${localStorage.getItem('userId')}`);
                setStore({ reportsList: data });
                console.log("ENTRE A getProductClient", data)
                return data;
            },

        }
    };
};

export default getState;
