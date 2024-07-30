import React from 'react';

const Alert = ({ message }) => {
    if (!message) return null;

    const isSuccess = message.includes("User created successfully");
    const alertStyle = {
        color: isSuccess ? '#28a745' : '#ff4d4d', // verde para éxito, rojo para errores
        backgroundColor: isSuccess ? '#d4edda' : '#ffebeb',
        borderRadius: '5px',
        padding: '10px',
        margin: '10px 0',
        fontSize: '14px',
        border: `1px solid ${isSuccess ? '#28a745' : '#ff4d4d'}`
    };

    return (
        <div style={alertStyle} role="alert">
            {message}
        </div>
    );
};

export default Alert;
