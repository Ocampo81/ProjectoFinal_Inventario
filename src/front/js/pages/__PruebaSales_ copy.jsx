import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";


const PruebaSales = () => {
    let _IDSales = 0;
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        actions.getSalesgetNextId();

        // actions.getProducts();
    }, [])

    const [sale, setSale] = useState({
        idsales: 31,
        iduser: 28,
        // totalPrice: 100,
        nit: 0,
        amount: 0,
        unitPrice: 0,
        id_prod: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSale({
            ...sale,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("valor de SALE", sale)
        const success = await actions.postAddSales(sale);
        // if (success) {
        //     setShowModal(true);
        // } else {
        //     setError(store.message);
        // }
    };
    _IDSales = store.nextid.ID;
    return (
        <section className="text-center text-lg-start">
            <style>
                {`
                .cascading-right {
                    margin-right: -50px;
                }
                @media (max-width: 991.98px) {
                    .cascading-right {
                        margin-right: 0;
                    }
                }
                `}
            </style>
            <div className="sales-page">

                <div className="sales-container">
                    <h1>Sales Module </h1>
                    <h1>Receipt: {store.nextid.ID}</h1>
                    <form className="sales-form" onSubmit={handleSubmit}>

                        <div data-mdb-input-init className="form-outline">
                            {/* <label className="form-label" htmlFor="id_prod">Id prod</label> */}
                            <input
                                type="number"
                                id="readonlyInput"
                                name="idsales"
                                value={_IDSales}
                                // onChange={handleChange}
                                readOnly
                            />

                        </div>
                        <div data-mdb-input-init className="form-outline">
                            <label className="form-label" htmlFor="id_prod">Id prod</label>
                            <input
                                type="number"
                                name="id_prod"
                                placeholder="Id Product"
                                onChange={handleChange}
                                value={sale.id_prod}

                            />

                        </div>
                        <div data-mdb-input-init className="form-outline">
                            <label className="form-label" htmlFor="amount"> Amount: </label>
                            <input
                                type="number"
                                name="amount"
                                value={sale.amount}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div data-mdb-input-init className="form-outline">
                            <label className="form-label" htmlFor="unitPrice"> Unit Price: </label>
                            <input
                                type="number"
                                name="unitPrice"
                                value={sale.unitPrice}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div data-mdb-input-init className="form-outline">
                            <label className="form-label" htmlFor="nit"> NIT: </label>
                            <input
                                type="number"
                                name="nit"
                                value={sale.nit}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-primary btn-block mb-4">Sign up</button>
                    </form>

                </div>
            </div>

        </section >
    );
};

export default PruebaSales;
