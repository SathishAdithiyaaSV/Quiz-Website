import React, { useState } from 'react';

const InputBox = ({ no, users, setUsers }) => {
    const [username, setUsername] = useState('');

    const handleChange = (e) => {
        const newUsername = e.target.value;
        setUsername(newUsername);

        const updatedUsers = [...users, newUsername];
        setUsers(updatedUsers);
    };

    return (
        <div className='mb-4'>
            <label className="block mb-2" htmlFor={`username-${no}`}>Member {no}</label>
            <input
                type="text"
                id={`username-${no}`}
                className="w-full p-2 rounded bg-gray-700 border border-gray-600"
                placeholder={`Enter username of member ${no}`}
                value={username}
                onChange={handleChange}
            />
        </div>
    );
}

export default InputBox;
