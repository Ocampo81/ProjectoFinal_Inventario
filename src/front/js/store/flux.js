const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: {},
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
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},

			postSignup: async (data) => {
				console.log("ANTES DE ENVIAR: ",data.email, data.name, data.lastname, data.password, data.is_active, data.profile)
				console.log("ANTES DE ENVIAR DATA: ",data)
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/signup", {
						method: "POST",
						body: JSON.stringify(data), // data can be `string` or {object}!
						headers: {
							"Content-Type": "application/json"
						}
					})
					const dataRes = await response.json();
					// console.log(data)
					console.log("VALOR DE DATA  en SIGNUP antes del IF",dataRes)
					if (response.ok) {
						console.log("data.Message.message despues de respuesta: ", dataRes.Message.message);
						setStore({ message: dataRes.Message.message });
						// resp = data.Message.message == "User created successfully"
						if (dataRes.Message.message == "User created successfully")
							return true
						else {
							return false
						}
					}
					else {
						setStore({ message: dataRes.Message.message });
					}

				}
				catch (error) {
					console.log("Error loading message from backend", error)
				}
				// catch(error => console.error("Error:", error));
			},


			postLogin: async (email, password) => {
				console.log(email, password)
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/login", {
						method: "POST",
						body: JSON.stringify({ email, password }), // data can be `string` or {object}!
						headers: {
							"Content-Type": "application/json"
						}
					})
					const data = await response.json();
					console.log("VALOR DE DATA antes del IF",data)
					if (response.ok) {
						// console.log(data.Message.token);
						// console.log(data.Message.email);
						// console.log(data.Message.id);
						setStore({ user: data.Message });
						// setStore({ user: data.Message.id });
						if (data.Message.token != undefined){
							localStorage.setItem("accessToken", data.Message.token);
							return true
						}
						else {
							setStore({ message: data.Message.Error });
							return false
						}
					}
					else {
						setStore({ message: data.Message.Error });
					}

				}
				catch (error) {
					console.log("Error loading message from backend", error)
				}
				// catch(error => console.error("Error:", error));
			},






			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
