import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterCompany = () => {
    const [formData, setFormData] = useState({
        companyName: '',
        companyAddress: '',
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
        fetch('/api/register_company', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // Redirigir al dashboard o a otra página después del registro
            navigate('/dashboard');
        })
        .catch(error => {
            console.error('Hubo un error al registrar la empresa', error);
        });
    };

    return (
        <section className="text-center text-lg-start">
            <div className="container py-4">
                <div className="row g-0 align-items-center">
                    <div className="col-lg-6 mb-5 mb-lg-0">
                        <div className="card cascading-right bg-body-tertiary" style={{ backdropFilter: 'blur(30px)' }}>
                            <div className="card-body p-5 shadow-5 text-center">
                                <h2 className="fw-bold mb-5">Register your Company</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-outline mb-4">
                                        <input type="text" name="companyName" className="form-control" onChange={handleChange} required />
                                        <label className="form-label">Company Name</label>
                                    </div>

                                    <div className="form-outline mb-4">
                                        <input type="text" name="companyAddress" className="form-control" onChange={handleChange} required />
                                        <label className="form-label">Company Address</label>
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

                                    <button type="submit" className="btn btn-primary btn-block mb-4">Register Company</button>
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

export default RegisterCompany;
