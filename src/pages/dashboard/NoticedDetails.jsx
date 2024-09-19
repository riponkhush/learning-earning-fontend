import useAxiosPublic from "@/hooks/axiosPublic";
import { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Card,} from "@material-tailwind/react";
import { CardHeader, Typography } from "@material-tailwind/react";
import img1 from '../../assets/noticeDetailsimage/ban1.jpg'
import img2 from '../../assets/noticeDetailsimage/ban2.jpg'
import Loader from "@/widgets/layout/Loader";
const NoticedDetails = () => {
    const {id} = useParams();
    const axiosPublic = useAxiosPublic();
    const [isLoading, setIsLoading] = useState(true);
    const { refetch, data: isRead = [] } = useQuery({
        queryKey: ["isRead"],
        queryFn: async () => {
            const res = await axiosPublic.get("/notices");
            const activeData = res.data.find(read => read._id === id );
            setIsLoading (false)
            return activeData;
        },
    });
    return (
        <div>
            {
                isLoading ? (
                    <Typography className="text-center text-4xl text-blue-gray-500 flex justify-center items-center h-96"><Loader></Loader></Typography>
                ) : (
                    <div className="mt-12 mb-8 flex flex-col gap-12">
                    <Card>
                        <CardHeader className="mb-8 md:p-6 p-3 bg-blue-500">
                            <div className='flex justify-between items-center'>
                                <Typography variant="h6" color="white">Read News</Typography>
                            </div>
                        </CardHeader>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 md:h-screen justify-items-center md:px-10 px-4">
                            <div className="md:col-span-3 ">
                                <h2>{isRead.news_title}</h2>
                                <h2>{isRead.about_news}</h2>
                                <h2>{isRead.dateTime}</h2>
                            </div>
                            <div className="md:col-span-2 w-full hidden md:block">
                                <h2 className="capitalize font-bold mb-4">Read more for knowledge</h2>

                                    <div className="md:w-56 relative">
                                        <img className="rounded-lg shadow-lg" src={img1} alt="" />
                                        <img className="absolute top-28 md:left-28 rounded-lg shadow-xl" src={img2} alt="" />
                                    </div>
                            </div>
                        </div>
                    </Card>
            </div>
                )
            }
        </div>
    );
};

export default NoticedDetails;