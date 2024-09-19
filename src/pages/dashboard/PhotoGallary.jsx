import { AiOutlineLike, AiOutlineDislike  } from "react-icons/ai";
import { Button } from "@mui/material";
import useAxiosPublic from "@/hooks/axiosPublic";
import { useQuery } from "react-query";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import {Spinner, Typography} from "@material-tailwind/react";
import Loader from "@/widgets/layout/Loader";


export const PhotoGallary = () => {
    const axiosPublic = useAxiosPublic();
    const [isImage, setIsImage] = useState([]);
    const [activeUsers, setActiveUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const {user} = useContext(AuthContext)
    const {refetch, data: image=[]} = useQuery({
        queryKey: ['image'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/images`);
            const sortedData = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setLoading(false)
            return sortedData;
        }
    })
    useEffect(() => {
        axiosPublic.get('/images')
        .then(res => {
            const userImages = res.data.filter((userImage) => userImage.user === user.email);
            setLoading(false);
            setIsImage(userImages);
        })
    },[user.email])


    const handleLike = (id) => {
        axiosPublic.patch(`/images/like/${id}`, {like: 1})
        .then(res => {
            refetch();
        })
    }

    const handleDislike = (id) => {
        axiosPublic.patch(`/images/dislike/${id}`, {dislike: 1})
        .then(res => {
            refetch();
        })
    }

    useEffect(() => {
        axiosPublic.get('/createUsers')
        .then(res => {
            const filterData = res.data.filter(activeUser => activeUser.status === "active")
            setActiveUsers(filterData);
        })
    },[])

    const isUserActive = activeUsers.some((activeUser) => activeUser.email === user.email);

    return (
        <div>
            {
                loading ? (
                    <Typography className="text-center text-4xl text-blue-gray-500 flex justify-center items-center h-screen"><Spinner className="h-10 w-10" color="blue" /></Typography>
                ) : (
                    <div className="md:px-10 md:py-6">
                    <div className="grid grid-cols-1 md:grid-cols-5 md:justify-items-center gap-6">
                        <div className="w-full col-span-2 md:sticky top-0 md:h-screen px-4 rounded-md">        
                            {
                            isImage.length > 0 ? (
                                <div >
                                <div className="bg-white py-10 px-4 rounded-lg">
                                    <h2 className="text-xl font-bold">Your uploaded photo</h2>
                                    {isImage.map(item =><div key={item._id} className="grid grid-cols-3 gap-3 mt-4">
                                        <img className="rounded-lg h-full object-cover" src={item.image} alt="" />
                                    </div>)}
                                </div>
                            </div>
                            ) : (
                                <Typography className="text-center text-4xl text-blue-gray-500 flex justify-center items-center h-96">You have no image.</Typography>
                            )
                            }
                        </div>
                            <div className="col-span-3 w-full">
                                {isUserActive ? (
                                    <div className="flex flex-col gap-6">
                                    {image.length > 0 ? (
                                        image.map((item) => (
                                        <div key={item._id} className="flex flex-col bg-white bg-clip-border text-gray-700 shadow-md">
                                            <div className="flex items-center text-white shadow-lg shadow-blue-gray-500/40">
                                            <img className="w-full h-96 object-cover" src={item.image} alt={item.photo_title} />
                                            </div>
                                            <div className="p-2">
                                            <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                                                {item.photo_title}
                                            </h5>
                                            <h5 className="mb-2 block font-sans leading-snug tracking-normal text-blue-gray-500 antialiased">
                                                {new Date(item.createdAt).toLocaleString()}
                                            </h5>
                                            <div className="flex justify-between items-center"> 
                                                <Button onClick={() => handleLike(item._id)} className="flex items-center gap-2">
                                                <AiOutlineLike className="text-lg" /> Like {item.like}
                                                </Button>
                                                <Button onClick={() => handleDislike(item._id)} className="flex items-center gap-2">
                                                <AiOutlineDislike className="text-lg" /> Dislike {item.dislike}
                                                </Button>
                                            </div>
                                            </div>
                                        </div>
                                        ))
                                    ) : (
                                        <Typography className="text-center text-4xl text-blue-gray-500 flex justify-center items-center h-96">
                                        No images available.
                                        </Typography>
                                    )}
                                    </div>
                                ) : (
                                    <Typography className="text-center text-4xl text-blue-gray-500 flex justify-center items-center h-96">
                                    You are not an active user.
                                    </Typography>
                                )}
                            </div>
                    </div>
                </div>
                )
            }
        </div>
    );
};

export default PhotoGallary;