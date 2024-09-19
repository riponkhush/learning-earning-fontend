import { useContext } from "react";
import useAxiosPublic from "./axiosPublic";
import { AuthContext } from "@/providers/AuthProvider";
import { useQuery } from "react-query";
import useAxiosSecure from "./axiosSecure";


const usePhotoImage = () => {
    const axiosSecure = useAxiosSecure();
    const {refetch,data: images=[]} = useQuery({
        queryKey: ['images'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/images`)
            return res.data;
        }
    })
return [images, refetch]
};

export default usePhotoImage;