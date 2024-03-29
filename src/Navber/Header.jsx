import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/UserAuthContext';

const Header = () => {
    const navigate = useNavigate();
    const { handleLogout, currentuser, userName } = useAuth();
    const getusername = currentuser ? localStorage.getItem('name') : null;

    console.log("userName", userName.Name)

    const handleLoginClick = () => {
        navigate('/login');
    };

    const handleSignupClick = () => {
        navigate('/signup');
    };

    const handleLogoutClick = () => {
        handleLogout();
        navigate('/login');
    };

    return (
        <header style={styles.header}>
            <h1 style={styles.logo}>Your Website</h1>
            <div id="userOptions" style={styles.userOptions}>
                {currentuser ? (
                    <div>
                        <span style={styles.welcome}>Welcome, {userName.Name}</span>
                        <button style={styles.button} onClick={handleLogoutClick}>Sign Out</button>
                    </div>
                ) : (
                    <div>
                        <button style={styles.button} onClick={handleLoginClick}>Login</button>
                        <button style={styles.button} onClick={handleSignupClick}>Sign Up</button>
                    </div>
                )}
            </div>
        </header>
    );
};

// Styles
const styles = {
    header: {
        width: '100%',
        height: '44px',
        background: 'blue',
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0 22px',
        alignItems: 'center',
    },
    logo: {
        color: 'white',
        margin: 0,
    },
    userOptions: {
        display: 'flex',
        alignItems: 'center',
    },
    welcome: {
        color: 'white',
        marginRight: '10px',
    },
    button: {
        marginLeft: '10px',
        padding: '8px 16px',
        border: 'none',
        borderRadius: '4px',
        backgroundColor: 'white',
        color: 'blue',
        cursor: 'pointer',
    },
};

export default Header;
