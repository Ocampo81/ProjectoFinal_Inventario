import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";


const PruebaSales = () => {

    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        actions.getSalesNextId();
        actions.getOneCustomer(localStorage.getItem('userId'));
    }, [])

    // const [idsales, setIdsales] = useState(0);
    // const [iduser, setIduser] = useState(0);
    // const [nit, setNit] = useState(0);
    const [idprod, setIdprod] = useState();
    const [amount, setAmount] = useState(0);
    const [unitPrice, setUnitPrice] = useState(0);
    const [listSales, setListSales] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const salesData = {
            idsales: store.nextid.ID,
            iduser: localStorage.getItem('userId'),
            nit: store.customer.nit,
            amount: amount,
            unitPrice: store.prodOne.salesPrice,
            id_prod: store.prodOne.id_prod,
            prodname: store.prodOne.prodname
        };

        setListSales(listSales.concat([salesData]));
        console.log("valor de SALE-salesData", salesData)
        console.log("****** valor de listSales", listSales)

        // se comenta temporalmente: envía la información al backend --- const success = await actions.postAddSales(salesData);


        // if (success) {
        //     setShowModal(true);
        // } else {
        //     setError(store.message);
        // }
    };



    console.log(store.prodOne.prodname)
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
                    <h1> NIT: {store.customer.nit}</h1>
                    <h1>MR: {store.customer.name} {store.customer.lastName}</h1>
                    <h1>{store.customer.address} </h1>
                    <h1>{store.customer.city} - {store.customer.country}</h1>
                    <h1>Phone: {store.customer.phone} </h1>

                    <form className="sales-form" onSubmit={handleSubmit}>
                        <div className="container">
                            <div className="row">
                                <div className="col-sm">
                                    <div data-mdb-input-init className="form-outline">
                                        <label className="form-label" htmlFor="id_prod">Product :  </label>
                                        <input
                                            type="number"
                                            // placeholder="Id Product"
                                            value={idprod}
                                            onChange={(e) => actions.getProductId(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="col-sm">
                                    {/* <label>ID Product: {store.prodOne.id_prod} </label> */}
                                    <label>Product Name: {store.prodOne.prodname} </label>
                                </div>
                                <div className="col-sm">
                                    <label>Category Name: {store.prodOne.category} </label>
                                </div>
                                <div className="col-sm">
                                    <label>Brand Name: {store.prodOne.brand} </label>
                                </div>



                                <div className="col-sm">
                                    <div data-mdb-input-init className="form-outline">
                                        <label className="form-label" htmlFor="amount"> Amount : </label>
                                        <input
                                            type="number"

                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="col-sm">
                                    <div data-mdb-input-init className="form-outline">
                                        <label className="form-label" htmlFor="unitPrice"> Unit Price : </label>
                                        <input
                                            type="number"
                                            value={store.prodOne.salesPrice}
                                            onChange={(e) => setUnitPrice(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="col-sm">
                                    <label className="form-label" htmlFor="Sub Total"> Sub Total:  </label>
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary btn-block mb-4">Confirm</button>
                        {listSales.map((item, index) => (
                            <li key={index}>
                                {/* **********   quedo acá revisando como imprimir un objeto */}
                                <p>{listSales[index].prodname}
                                </p>
                                <i className="fas fa-trash-alt" onClick={() =>
                                    setListSales(
                                        listSales.filter(
                                            (t, currentIndex) => index != currentIndex
                                        )
                                    )
                                }>
                                </i>
                            </li>
                        ))}


                    </form>

                </div>
            </div>

        </section >
    );
};

export default PruebaSales;
