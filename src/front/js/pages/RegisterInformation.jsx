import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Context } from '../store/appContext'; // Asegúrate de que la ruta sea correcta
import Navbar from '../component/Navbar';
import '../../styles/RegisterInformation.css';

const RegisterInformation = () => {
    const { store, actions } = useContext(Context);
    const [formData, setFormData] = useState({
        nit: '',
        address: '',
        city: '', // Este ahora será el departamento seleccionado
        country: '',
        phone: '',
    });

    const navigate = useNavigate();

    useEffect(() => {
        // Si statesList está vacío, obtenemos los estados
        console.log("store.statesList.length", store.statesList.length);
        if (store.statesList.length === 0) {
            actions.getToken(); // Esto debería cargar statesList en el store
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const signupData = JSON.parse(localStorage.getItem("signupData"));
        const fullData = {
            ...signupData,
            ...formData
        };
        console.log("Valor de fullData antes de enviar al BACK ////", fullData);

        const success = actions.postRegisterUser(fullData);
        if (success) {
            console.log("User created successfully");
        } else {
            console.log("User ERROR");
        }


        //     fetch('/api/register_user', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify(fullData)
        //     })
        //     .then(response => response.json())
        //     .then(data => {
        //         console.log(data);
        //         navigate('/dashboard');
        //     })
        //     .catch(error => {
        //         console.error('Hubo un error al registrar la información', error);
        //     });
    };

    return (
        <div className="register-information-page">
            {/* Botón para volver a la vista de Signup */}
            <Link to="/signup" className="back-button">
                <i className="fas fa-arrow-left"></i> Back
            </Link>

            <div className="register-information-container">
                <div className="card cascading-right bg-body-tertiary" style={{ backdropFilter: 'blur(30px)' }}>
                    <div className="card-body p-5 shadow-5 text-center">
                        <h2 className="fw-bold mb-5">Register Information</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-outline mb-4">
                                <input
                                    type="text"
                                    name="nit"
                                    className="form-control"
                                    value={formData.nit}
                                    onChange={handleChange}
                                    required
                                />
                                <label className="form-label">NIT</label>
                            </div>

                            <div className="form-outline mb-4">
                                <input
                                    type="text"
                                    name="address"
                                    className="form-control"
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                                />
                                <label className="form-label">Address</label>
                            </div>

                            {/* Reemplazamos el input de "City" con un select */}
                            <div className="form-outline mb-4">
                                <select
                                    name="city"
                                    className="form-control"
                                    value={formData.city}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select a Department</option>
                                    {store.statesList && store.statesList.length > 0 ? (
                                        store.statesList.map((state, index) => (
                                            <option key={index} value={state}>{state}</option>
                                        ))
                                    ) : (
                                        <option value="" disabled>Loading departments...</option>
                                    )}
                                </select>
                                <label className="form-label">Department</label>
                            </div>

                            <div className="form-outline mb-4">
                                <input
                                    type="text"
                                    name="country"
                                    className="form-control"
                                    value={formData.country}
                                    onChange={handleChange}
                                    required
                                />
                                <label className="form-label">Country</label>
                            </div>

                            <div className="form-outline mb-4">
                                <input
                                    type="text"
                                    name="phone"
                                    className="form-control"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                />
                                <label className="form-label">Phone</label>
                            </div>

                            <button type="submit" className="btn btn-primary btn-block mb-4">Register</button>
                        </form>
                    </div>
                </div>
                <div className="col-lg-6 mb-5 mb-lg-0">
                    <img src="https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg" className="w-100 rounded-4 shadow-4" alt="" />
                </div>
            </div>
        </div>
    );
};

export default RegisterInformation;
