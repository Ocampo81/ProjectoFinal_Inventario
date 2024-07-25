import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext"

export const Alerta = () => {
    const { store, actions } = useContext(Context);
    // useEffect(() => {
    //     actions.getCharacters()
    // }, [])
    console.log("ingrese a success EMAIL", store.user.email);
    console.log("ingrese a success ID ", store.user.id);

    return (
        <section className="vh-100">
            <div className="container py-5 h-100">
                <h1>titulo {store.user}</h1>
                {/* <!-- Button trigger modal --> */}
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#alerta">
                    Launch demo modal
                </button>

                {/* <!-- Modal --> */}
                <div className="modal fade" id="alerta" tabIndex="-1" aria-labelledby="alerta" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="alerta">ERROR</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                ...
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                {/* <button type="button" className="btn btn-primary">Save changes</button> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default Alerta;