const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: "",
			isAuthenticated: false,
			userToken: null,
			user: {},
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

			postSignup: async (email, password, date) => {
				console.log(email, password, date)
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/signup", {
						method: "POST",
						body: JSON.stringify({ email, password, date }), // data can be `string` or {object}!
						headers: {
							"Content-Type": "application/json"
						}
					})
					const data = await response.json();
					console.log(data)
					if (response.ok) {
						console.log(data.Message.message);
						setStore({ message: data.Message.message });
						resp = data.Message.message == "User created successfully"
						if (resp)
							return true
						else {
							return false
						}
					}
					else {
						setStore({ message: data.Message.message });
					}

				}
				catch (error) {
					console.log("Error loading message from backend", error)
				}
				// catch(error => console.error("Error:", error));
			},


			postLogin: (email, password) => {
				console.log(email, password)
				fetch(process.env.BACKEND_URL + "/api/login", {
					method: "POST",
					body: JSON.stringify({ email, password }), // data can be `string` or {object}!
					headers: {
						"Content-Type": "application/json"
					}

				})
					.then(res => res.json())
					.then(response => console.log("VALOR DE LOCALSTORAGE  *** ", localStorage.getItem('accessToken')))
					.catch(error => console.error("Error:", error));
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
