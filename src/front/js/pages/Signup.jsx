import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import Alert from "../component/Alert";
import "../../styles/Signup.css";

const Signup = () => {
    const { store } = useContext(Context);
    const navigate = useNavigate();

    const [data, setData] = useState({
        email: "",
        password: "",
        name: "",
        lastname: "",
        profile: 0,
        is_active: false
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        });
    };

    const handleNext = (event) => {
        event.preventDefault();
        localStorage.setItem("signupData", JSON.stringify(data));
        navigate("/register-information");
    };

    return (
        <div className="signup-page">
            <section className="text-center text-lg-start">
                <style>
                    {`
                    .cascading-right {
                        margin-right: -50px;
                    }
                    @media (max-width: 900x) {
                        .cascading-right {
                            margin-right: 0;
                        }
                    }
                    `}
                </style>

                <div className="container py-4">
                    <div className="row g-0 align-items-center">
                        <div className="col-lg-6 mb-5 mb-lg-0">
                            <div className="card cascading-right bg-body-tertiary" style={{ backdropFilter: 'blur(30px)' }}>
                                <div className="card-body p-5 shadow-5 text-center">
                                    <h2 className="fw-bold mb-5">Sign up now</h2>
                                    {error && <Alert message={error} />}
                                    <form onSubmit={handleNext}>
                                        <div className="row">
                                            <div className="col-md-6 mb-4">
                                                <div data-mdb-input-init className="form-outline">
                                                    <input type="text" name="name" className="form-control" value={data.name} onChange={handleChange} required />
                                                    <label className="form-label" htmlFor="name">First name</label>
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <div data-mdb-input-init className="form-outline">
                                                    <input type="text" name="lastname" className="form-control" value={data.lastname} onChange={handleChange} required />
                                                    <label className="form-label" htmlFor="lastname">Last name</label>
                                                </div>
                                            </div>
                                        </div>

                                        <div data-mdb-input-init className="form-outline mb-4">
                                            <input type="email" name="email" className="form-control" value={data.email} onChange={handleChange} required />
                                            <label className="form-label" htmlFor="email">Email address</label>
                                        </div>

                                        <div data-mdb-input-init className="form-outline mb-4">
                                            <input type="password" name="password" className="form-control" value={data.password} onChange={handleChange} required />
                                            <label className="form-label" htmlFor="password">Password</label>
                                        </div>

                                        <button type="submit" className="btn btn-primary btn-block mb-4">Next</button>

                                        <div className="mt-3">
                                            <Link to="/login" className="text-light">Back to login</Link>
                                        </div>
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
        </div>
    );
};

export default Signup;
