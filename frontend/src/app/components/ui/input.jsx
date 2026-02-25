import React from 'react';

const Input = ({ id, type, placeholder, className, ...props }) => {
    return (
        <input
            {...props}
            type={type}
            id={id}
            placeholder={placeholder}
            className={className}
        />
    );
};

export default Input; // Ensure this line is present