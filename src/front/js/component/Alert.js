import React from 'react';

const Alert = ({ message }) => {
    if (!message) return null;

    const alertStyle = {
        color: '#ff4d4d',
        backgroundColor: '#ffebeb',
        borderRadius: '5px',
        padding: '10px',
        margin: '10px 0',
        fontSize: '14px',
        border: '1px solid #ff4d4d'
    };

    return (
        <div style={alertStyle} role="alert">
            {message}
        </div>
    );
};

export default Alert;
