import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import Navbar from "../component/Navbar";
import "../../styles/Profile.css";

const Profile = () => {
    const { store, actions } = useContext(Context);
    const [userData, setUserData] = useState(store.user);

    useEffect(() => {
        const fetchData = async () => {
            if (!store.user.email) {  
                const data = await actions.getUserProfile();
                if (data) {
                    setUserData(store.user); 
                }
            }
        };
        fetchData();
    }, [store.user, actions]);

    return (
        <div className="profile-page">
            <Navbar />
            <div className="profile-container">
                <h1>User Profile</h1>
                <div className="profile-details">
                    <p><strong>Email:</strong> {userData.email}</p>
                    <p><strong>First Name:</strong> {userData.name}</p> 
                    <p><strong>Last Name:</strong> {userData.lastName}</p>
                </div>
            </div>
        </div>
    );
};

export default Profile;
