import React, { useState, useEffect, useContext } from "react";
import Navbar from "../component/Navbar";
import "../../styles/UserApproval.css";
import { Context } from "../store/appContext";

const UserApproval = () => {
    const { store, actions } = useContext(Context);
    const [pendingUsers, setPendingUsers] = useState([]);
    const [selectedRoles, setSelectedRoles] = useState({});

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

    return (
        <div className="user-approval-page">
            <Navbar />
            <div className="user-approval-container">
                <h1>User Approval</h1>
                <div className="user-list">
                    {pendingUsers.map(user => (
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
            </div>
        </div>
    );
};

export default UserApproval;
