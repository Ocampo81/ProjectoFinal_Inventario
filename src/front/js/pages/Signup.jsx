import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

const Signup = () => {
    const { store, actions } = useContext(Context);
    const [name, setName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const is_active = true;
    const profile = 1;


    const handleLogin = async (event) => {
        event.preventDefault();
        const success = await actions.postSignup(email, name, lastname, password, is_active, profile);
        // console.log(" despues del flux store.message", store.message);
        if (success) {
            navigate("/login"); // se debe redireccionar a ****
        }
        else {
            console.log(" FALLo!!!", store.message);
            // navigate("/Alerta");
        }
    }
    return (
        <section className="text-center text-lg-start">
            <style>
                {`.cascading-right {
          margin-right: -50px;
        }

        @media (max-width: 991.98px) {
          .cascading-right {
            margin-right: 0;
          }
        }`}
            </style>

            <div className="container py-4">
                <div className="row g-0 align-items-center">
                    <div className="col-lg-6 mb-5 mb-lg-0">
                        <div className="card cascading-right bg-body-tertiary"
                            style={{
                                backdropFilter: 'blur(30px)',
                            }}>
                            <div className="card-body p-5 shadow-5 text-center">
                                <h2 className="fw-bold mb-5">Sign up now</h2>
                                <form onSubmit={handleLogin}>
                                    <fieldset >
                                        <div className="row">
                                            <div className="col-md-6 mb-4">
                                                <div data-mdb-input-init className="form-outline">

                                                    <input
                                                        type="text"
                                                        id="InputName"
                                                        className="form-control"
                                                        //  className="form-control form-control-lg"
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}

                                                    />
                                                    <label className="form-label" htmlFor="InputName">First name</label>
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <div data-mdb-input-init className="form-outline">
                                                    <input
                                                        type="text"
                                                        id="InputLastName"
                                                        className="form-control"
                                                        //  className="form-control form-control-lg"
                                                        value={lastname}
                                                        onChange={(e) => setLastName(e.target.value)}

                                                    />
                                                    <label className="form-label" htmlFor="InputLastName">Last name</label>
                                                </div>
                                            </div>
                                        </div>
                                    </fieldset>

                                    <div data-mdb-input-init className="form-outline mb-4">
                                        <input type="email" id="form3Example3" className="form-control" />
                                        <input
                                            type="text"
                                            id="InputEmail"
                                            className="form-control"
                                            //  className="form-control form-control-lg"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}

                                        />
                                        <label className="form-label" htmlFor="InputEmail">Email address</label>
                                    </div>

                                    <div data-mdb-input-init className="form-outline mb-4">
                                        {/* <input type="password" id="form3Example4" className="form-control" /> */}
                                        <input
                                            type="password"
                                            id="InputPassword"
                                            className="form-control"
                                            //  className="form-control form-control-lg"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}

                                        />
                                        <label className="form-label" htmlFor="form3Example4">Password</label>
                                    </div>

                                    {/* <div className="form-check d-flex justify-content-center mb-4">
                                        <input className="form-check-input me-2" type="checkbox" value="" id="form2Example33" checked />
                                        <label className="form-check-label" htmlFor="form2Example33">
                                            Subscribe to our newsletter
                                        </label>
                                    </div> */}

                                    <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-block mb-4">
                                        Sign up
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6 mb-5 mb-lg-0">
                        <img src="https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg" className="w-100 rounded-4 shadow-4" alt="" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Signup;
