import React, { useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

const Signup = () => {
    const { store, actions } = useContext(Context);
    // const [name, setName] = useState("");
    // const [lastname, setLastName] = useState("");
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const params = useParams();

    const [data, setData] = useState({
        email: "",
        password: "",
        name: "",
        lastname: "",
        "profile": 1,
        "is_active": true
    });

    const info = event => {
        setData({
            ...data, [event.target.name]: event.target.value
        })
    }

    const handleSignup = async (event) => {
        event.preventDefault();
        const success = await actions.postSignup(data);
        // console.log(" despues del flux store.message", store.message);
        if (success) {
            navigate("/login"); // se debe redireccionar a login
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
                                <form>

                                    <div className="row">
                                        <div className="col-md-6 mb-4">
                                            <label className="col-sm-2 col-form-label">Firstname</label>
                                            <div className="col-sm-10">
                                                <input type="text" className="form-control" onChange={info} name="name" value={data.name} />
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-4">
                                            <label className="col-sm-2 col-form-label">Lastname</label>
                                            <div className="col-sm-10">
                                                <input type="text" className="form-control" onChange={info} name="lastname" value={data.lastname} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-6 mb-4">
                                        <label className="col-sm-2 col-form-label">email</label>
                                        <div className="col-sm-10">
                                            <input type="email" className="form-control" onChange={info} name="email" value={data.email} />
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <label className="col-sm-2 col-form-label">Password</label>
                                        <div className="col-sm-10">
                                            <input type="password" className="form-control" onChange={info} name="password" value={data.password} autoComplete="on" />

                                        </div>
                                    </div>

                                    {/* <div className="form-check d-flex justify-content-center mb-4">
                                        <input className="form-check-input me-2" type="checkbox" value="" id="form2Example33" checked />
                                        <label className="form-check-label" htmlFor="form2Example33">
                                            Subscribe to our newsletter
                                        </label>
                                    </div> */}

                                    <button type="submit" onClick={handleSignup} className="btn btn-primary btn-block mb-4">
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
