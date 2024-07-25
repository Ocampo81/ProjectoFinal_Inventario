import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";



const Login = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        const success = await actions.postLogin(email, password);
        console.log(" despues del flux success", success);
        console.log(" despues del flux store.message", store.message);
        if (success) {
            console.log("ingrese a success TOKEN", localStorage.getItem('accessToken'));
            console.log("ingrese a success EMAIL", store.user.email);
            console.log("ingrese a success ID ", store.user.id);

            navigate("/register-company"); // se debe redireccionar a ****
        }
        else {
            console.log(" FALLo!!!", store.message);
            navigate("/Alerta");
        }
    }
    return (
        <section className="vh-100">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-xl-10">
                        <div className="card" style={{ borderRadius: '1rem' }}>
                            <div className="row g-0">
                                <div className="col-md-6 col-lg-5 d-none d-md-block">
                                    <img
                                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                                        alt="login form"
                                        className="img-fluid"
                                        style={{ borderRadius: '1rem 0 0 1rem' }}
                                    />
                                </div>
                                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                    <div className="card-body p-4 p-lg-5 text-black">
                                        {/* <form> */}
                                        <div className="d-flex align-items-center mb-3 pb-1">
                                            <i className="fas fa-cubes fa-2x me-3" style={{ color: '#ff6219' }}></i>
                                            <span className="h1 fw-bold mb-0">Logo</span>
                                        </div>

                                        <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>
                                            Sign into your account
                                        </h5>
                                        <form onSubmit={handleLogin}>
                                            <fieldset >
                                                <div data-mdb-input-init className="form-outline mb-4">
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
                                                </div>

                                                <div data-mdb-input-init className="form-outline mb-4">
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
                                                </div>

                                                <div className="pt-1 mb-4">
                                                    <button
                                                        data-mdb-button-init
                                                        data-mdb-ripple-init
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
                                        <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>
                                            Don't have an account?{' '}
                                            <Link to="/singup" style={{ color: '#393f81' }}>
                                                Register here
                                            </Link>
                                        </p>
                                        <Link to="#" className="small text-muted">
                                            Terms of use.
                                        </Link>
                                        <Link to="#" className="small text-muted">
                                            Privacy policy
                                        </Link>
                                        {/* </form> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
