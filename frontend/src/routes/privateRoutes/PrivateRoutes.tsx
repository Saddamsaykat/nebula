import { Navigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import spin from "../../json/loading.json";
import Lottie from "lottie-react";
import { checkAuthState } from "../../authActions/authActions";
import { useEffect } from "react";
import { ReactNode } from "react";
import { RootState } from "../../redux/store";

const PrivateRoute = ({ children }: { children: ReactNode }) => {

    const dispatch = useDispatch();

    // Dispatch checkAuthState on component mount
    useEffect(() => {
      dispatch(checkAuthState());
    }, [dispatch]);
    const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
    const { user, loading } = useTypedSelector((state) => state.auth);
    const location = useLocation();
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Lottie loop={true} animationData={spin} className="w-96" />
            </div>
        );
    }

    if (user?.email) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
