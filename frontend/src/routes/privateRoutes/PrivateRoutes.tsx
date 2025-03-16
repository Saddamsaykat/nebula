import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Lottie from "lottie-react";
import spin from "../../json/loading.json";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useSelector((state) => state.auth);
    const location = useLocation();

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Lottie loop={true} animationData={spin} className="w-96" />
            </div>
        );
    }

    if (user) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
