import React, { useState, useEffect } from 'react';
import { UserContext } from './UserContext';

const UserContextProvider = ({ children }) => {
    const [ user, setUser ] = useState(null);

    // Restore user from localStorage on mount/refresh so we stay "logged in" after refresh
    useEffect(() => {
        try {
            const stored = localStorage.getItem("user");
            if (stored) setUser(JSON.parse(stored));
        } catch {}
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;