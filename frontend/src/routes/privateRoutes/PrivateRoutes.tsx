import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes = ({ isAuthenticated }) => {
    return (
        isAuthenticated ? <Outlet /> : <Navigate to="/login" />
    );
};

export default PrivateRoutes;
