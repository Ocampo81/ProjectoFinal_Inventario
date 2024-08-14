import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import Navbar from "../component/Navbar";
import "../../styles/Employees.css";

const Employees = () => {


    return (
        <div className="employees-page">
            <Navbar />
            <div className="employee-container">
                <h1>Employee Management</h1>
                <form className="employee-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name || ""}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email || ""}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Position"
                        value={position || ""}
                        onChange={(e) => setPosition(e.target.value)}
                    />
                    <button type="submit">Add Employee</button>
                </form>

                <h2>Employee List</h2>
                <div>
                    {store.employees && store.employees.length > 0 ? (
                        store.employees.map((employee) => (
                            <div key={employee.id}>
                                {employee.name} - {employee.position}
                                <button onClick={() => actions.editEmployee(employee.id)}>Edit</button>
                                <button onClick={() => actions.deleteEmployee(employee.id)}>Delete</button>
                            </div>
                        ))
                    ) : (
                        <p>No employees found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Employees;
