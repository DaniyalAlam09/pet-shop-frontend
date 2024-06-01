// src/Profile.js
import React, { useEffect, useState } from 'react';

const Profile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    if (!user) {
        return <p>Loading...</p>;
    }

    return (
        <div style={styles.container}>
            <div style={styles.profileCard}>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDwmG52pVI5JZfn04j9gdtsd8pAGbqjjLswg&s" alt="Avatar" style={styles.avatar} />
                <h2>{`${user.firstName} ${user.lastName}`}</h2>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Address:</strong> {user.address}</p>
                <p><strong>Phone No:</strong> {user.phoneNo}</p>
                <p><strong>City:</strong> {user.city || 'N/A'}</p>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    profileCard: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        textAlign: 'center',
        maxWidth: '400px',
        width: '100%',
    },
    avatar: {
        borderRadius: '50%',
        marginBottom: '20px',
    },
};

export default Profile;
