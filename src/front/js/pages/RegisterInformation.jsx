import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import "../../styles/RegisterInformation.css"; 

const RegisterInformation = () => {
    const [formData, setFormData] = useState({
        nit: '',       
        address: '',   
        city: '',
        country: '',
        phone: '',
    });

    const navigate = useNavigate();

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

        fetch('/api/register_user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fullData)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            navigate('/dashboard');
        })
        .catch(error => {
            console.error('Hubo un error al registrar la información', error);
        });
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
                                <input type="text" name="nit" className="form-control" onChange={handleChange} required />
                                <label className="form-label">NIT</label>
                            </div>

                            <div className="form-outline mb-4">
                                <input type="text" name="address" className="form-control" onChange={handleChange} required />
                                <label className="form-label">Address</label>
                            </div>

                            <div className="form-outline mb-4">
                                <input type="text" name="city" className="form-control" onChange={handleChange} required />
                                <label className="form-label">City</label>
                            </div>

                            <div className="form-outline mb-4">
                                <input type="text" name="country" className="form-control" onChange={handleChange} required />
                                <label className="form-label">Country</label>
                            </div>

                            <div className="form-outline mb-4">
                                <input type="text" name="phone" className="form-control" onChange={handleChange} required />
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
