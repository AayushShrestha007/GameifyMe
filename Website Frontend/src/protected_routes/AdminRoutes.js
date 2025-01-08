import React from 'react';
import { Outlet } from 'react-router-dom';

const AdminRoutes = () => {
    const userData = localStorage.getItem('user');

    //checking if user is found or not
    if (!userData) {
        return <h2 style={{ textAlign: 'center', marginTop: '2rem' }}>Access Only Available To Admin</h2>;
    }

    const parsedUser = JSON.parse(userData);

    const user = parsedUser.findUser;

    // checking if user is Admin
    if (!user || user.isAdmin !== true) {
        return <h2 style={{ textAlign: 'center', marginTop: '2rem' }}>Access Only Available To Admin</h2>;
    }

    return <Outlet />;
};

export default AdminRoutes;