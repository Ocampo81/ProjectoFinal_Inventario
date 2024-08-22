import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import Alert from '../component/Alert';
import "../../styles/Loginn.css";

const Login = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        const success = await actions.postLogin(email, password);
        if (success) {
            if (localStorage.getItem('profile') == '0') {
                setError({ password: "Your account is pending approval by the admin." });
            } else if (localStorage.getItem('isActive') == 'false') {
                setError({ password: "Your account is not active. Please contact the system admin." });
            } else {
                navigate("/main-menu");
            }
        } else {
            if (store.message.includes("email") || store.message.includes("password")) {
                setError({ email: "Incorrect email or password", password: "Incorrect email or password" });
            } else {
                setError({ email: "", password: "Incorrect email or password" });
            }
        }
    };

    return (
        <div className="login-page">
            <div className="container h-100 d-flex justify-content-center align-items-center">
                <div className="row d-flex justify-content-center align-items-center">
                    <div className="col-lg-10">
                        <div className="card login-card">
                            <div className="row g-0">
                                <div className="col-md-6 d-none d-md-block">
                                    <img
                                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                                        alt="login form"
                                        className="img-fluid"
                                    />
                                </div>
                                <div className="col-md-6 d-flex align-items-center">
                                    <div className="card-body p-4 p-lg-5 text-black">
                                        <div className="d-flex align-items-center mb-3 pb-1">
                                            <i className="fas fa-cubes fa-2x me-3" style={{ color: '#ff6219' }}></i>
                                            <span className="h1 fw-bold mb-0">Logo</span>
                                        </div>
                                        <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>
                                            Sign into your account
                                        </h5>
                                        <form onSubmit={handleLogin}>
                                            <fieldset>
                                                <div className="form-outline mb-4">
                                                    <input
                                                        type="email"
                                                        id="InputEmail1"
                                                        className="form-control form-control-lg"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                    />
                                                    <label className="form-label" htmlFor="InputEmail1">
                                                        Email address
                                                    </label>
                                                    {error.email && <Alert message={error.email} />}
                                                </div>

                                                <div className="form-outline mb-4">
                                                    <input
                                                        type="password"
                                                        id="InputPassword"
                                                        className="form-control form-control-lg"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                    />
                                                    <label className="form-label" htmlFor="InputPassword">
                                                        Password
                                                    </label>
                                                    {error.password && <Alert message={error.password} />}
                                                </div>

                                                <div className="pt-1 mb-4">
                                                    <button
                                                        className="btn btn-dark btn-lg btn-block"
                                                        type="submit"
                                                    >
                                                        Login
                                                    </button>
                                                </div>
                                            </fieldset>
                                        </form>
                                        <Link to="#" className="small text-muted">
                                            Forgot password?
                                        </Link>
                                        <p className="mb-5 pb-lg-2" style={{ color: '#ffb700' }}>
                                            Don't have an account?{' '}
                                            <Link to="/signup" style={{ color: '#ffb700' }}>
                                                Register here
                                            </Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
