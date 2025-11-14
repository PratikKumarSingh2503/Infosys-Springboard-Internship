import React, { useState } from 'react';
import LandingPage from './LandingPage';
import Login from './Login';

const AuthenticationPage = () => {
    const [ page, setPage ] = useState('start');

    if (page === 'start') {

        return (
            <div>
                <LandingPage setPage={setPage} />
            </div>
        );
    } else {
        return (
            <div>
                <Login setPage={setPage} />
            </div>
        );

    }
};

export default AuthenticationPage;