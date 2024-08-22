import React, { useState, useEffect, useContext } from "react";
import Navbar from "../component/Navbar";
import "../../styles/UserApproval.css";
import { Context } from "../store/appContext";

const UserApproval = () => {
    const { store, actions } = useContext(Context);
    const [pendingUsers, setPendingUsers] = useState([]);
    const [selectedRoles, setSelectedRoles] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5;

    useEffect(() => {
        const fetchPendingUsers = async () => {
            const users = await actions.getPendingUsers();
            if (users) {
                setPendingUsers(users);
            }
        };

        fetchPendingUsers();
    }, [actions]);

    const handleRoleChange = (userId, role) => {
        setSelectedRoles(prevState => ({
            ...prevState,
            [userId]: role
        }));
    };

    const handleApprove = async (userId) => {
        const role = selectedRoles[userId];
        if (role) {
            const success = await actions.approveUser(userId, role);
            if (success) {
                const updatedUsers = pendingUsers.filter(user => user.id !== userId);
                setPendingUsers(updatedUsers);
                console.log(`User with ID ${userId} approved with role ${role}`);
            }
        } else {
            console.log("Please select a role before approving the user.");
        }
    };

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = pendingUsers.slice(indexOfFirstUser, indexOfLastUser);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(pendingUsers.length / usersPerPage); i++) {
        pageNumbers.push(i);
    }

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < pageNumbers.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div className="user-approval-page">
            <Navbar />
            <div className="user-approval-container">
                <h1>User Approval</h1>
                <div className="user-list">
                    {currentUsers.map(user => (
                        <div key={user.id} className="user-item">
                            <div className="user-details">
                                <p><strong>Name:</strong> {user.name} {user.lastName}</p>
                                <p><strong>Email:</strong> {user.email}</p>
                            </div>
                            <div>
                                <select
                                    className="role-select"
                                    value={selectedRoles[user.id] || ""}
                                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                >
                                    <option value="">Select Role</option>
                                    <option value="1">Admin</option>
                                    <option value="2">Sales</option>
                                    <option value="3">Inventory</option>
                                </select>
                                <button className="approve-btn" onClick={() => handleApprove(user.id)}>Approve</button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="pagination">
                    <button onClick={handlePreviousPage} className="page-btn">Previous</button>
                    {pageNumbers.map(number => (
                        <button key={number} onClick={() => paginate(number)} className="page-btn">
                            {number}
                        </button>
                    ))}
                    <button onClick={handleNextPage} className="page-btn">Next</button>
                </div>
            </div>
        </div>
    );
};

export default UserApproval;
