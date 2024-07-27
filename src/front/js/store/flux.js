const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            message: "",
            isAuthenticated: false,
            userToken: null,
            user: [],
            demo: [
                {
                    title: "FIRST",
                    background: "white",
                    initial: "white"
                },
                {
                    title: "SECOND",
                    background: "white",
                    initial: "white"
                }
            ]
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
                    const response = await fetch(process.env.BACKEND_URL + "/api/signup", {
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
                    }
                } catch (error) {
                    console.log("Error loading message from backend", error);
                }
            },

            postLogin: async (email, password) => {
                try {
                    const response = await fetch(process.env.BACKEND_URL + "/api/login", {
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

            changeColor: (index, color) => {
                const store = getStore();
                const demo = store.demo.map((elm, i) => {
                    if (i === index) elm.background = color;
                    return elm;
                });
                setStore({ demo: demo });
            }
        }
    };
};

export default getState;
