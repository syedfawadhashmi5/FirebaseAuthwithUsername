import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/UserAuthContext';

const Header = () => {
    const navigate = useNavigate();
    const { handleLogout, currentuser } = useAuth();

    const handleLoginClick = () => {
        navigate('/login');
    };

    const handleSignupClick = () => {
        navigate('/signup');
    };
    const getusername = currentuser ? localStorage.getItem('name') : null;
    const handleLogoutClick = () => {
        handleLogout();
        navigate('/login');
    };
    return (
        <header>
            <h1>Your Website</h1>
            <div id="userOptions">
                {currentuser ? (
                    <div>
                        <span>Welcome, {getusername}</span>
                        <button onClick={handleLogoutClick}>Sign Out</button>
                    </div>
                ) : (
                    <div>
                        <button onClick={handleLoginClick}>Login</button>
                        <button onClick={handleSignupClick}>Sign Up</button>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
