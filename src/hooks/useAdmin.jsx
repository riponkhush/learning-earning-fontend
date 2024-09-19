import { AuthContext } from "@/providers/AuthProvider";
import { useContext } from "react";
import { useQuery } from "react-query";
import useAxiosSecure from "./useAxiosSecure";


const useAdmin = () => {
    const {user} = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const {data: isAdmin} = useQuery({
        queryKey:[user?.email, 'isAdmin'],
        queryFn: async() => {
            const res = await axiosSecure.get(`/createUsers/admin/${user.email}`);
            console.log(res.data)
            return res.data?.admin;
        }
    })
    return [isAdmin]
};

export default useAdmin;