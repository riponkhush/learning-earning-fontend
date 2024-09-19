import { AuthContext } from "@/providers/AuthProvider";
import { Spinner } from "@material-tailwind/react";
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";



const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const location = useLocation();
    if(loading){
        return <Spinner className="h-10 w-10" color="blue" />
    }

    if(user) {
        return children;
    }
    return  <Navigate to='/auth/sign-in' state={{from: location}} replace></Navigate>
};

export default PrivateRoute;