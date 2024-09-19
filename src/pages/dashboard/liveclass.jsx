import { Card, CardHeader,CardBody,Typography,Avatar,Chip,Tooltip,Progress, Spinner,} from "@material-tailwind/react";
  import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
  import { authorsTableData, projectsTableData } from "@/data";
  import { SiGoogleclassroom } from "react-icons/si";
import { useQuery } from "react-query";
import useAxiosPublic from "@/hooks/axiosPublic";
import { useState } from "react";

export const Liveclass = () => {
  const axiosPublic = useAxiosPublic();
  const [loading, setLoading] = useState(true);
  const { refetch, data: isClasses = [] } = useQuery({
      queryKey: ["isClasses"],
      queryFn: async () => {
          const res = await axiosPublic.get(`/teacherClass`);
        const sortedData = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setLoading(false)
        return (sortedData);
      },
    });


    return (
        <div>
            {
                loading ? (
                    <Typography className="text-center text-4xl text-blue-gray-500 flex justify-center items-center h-screen"><Spinner className="h-10 w-10" color="blue" /></Typography>
                ) : (
                    <div className="mt-12 mb-8 flex flex-col gap-12">
                    <Card>
                      <CardHeader className="mb-8 p-6 bg-blue-500">
                        <Typography variant="h6" color="white">
                          Join Your Class
                        </Typography>
                      </CardHeader>
                      <CardBody className="overflow-x-scroll md:px-10 px-0 pt-0 pb-2">
                                {
                                    isClasses.length > 0 ? (
                                        <table className="w-full min-w-[640px] table-auto">
                                        <thead>
                                            <tr>
                                            {["class title", "post date","zoom link", "join"].map((el) => (
                                                <th
                                                key={el}
                                                className="border-b border-blue-gray-50 py-3 px-5 text-left"
                                                >
                                                <Typography
                                                    variant="small"
                                                    className="text-[11px] font-bold uppercase text-blue-gray-400"
                                                >
                                                    {el}
                                                </Typography>
                                                </th>
                                            ))}
                                            </tr>
                                        </thead>
                                        <tbody className=''>
                                            {
                                                isClasses.map((item) =>                             
                                                <tr key={item}>
                                                <td className="py-3 px-5">
                                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                                    {item.class_title}
                                                </Typography>
                                                </td>
                                                <td className="py-3 px-5">
                                                <Typography className="text-xs font-semibold text-blue-gray-600 capitalize">
                                                    {item.createdAt}
                                                </Typography>
                                                </td>
                                                <td className="py-3 px-5">
                                                <Typography className="text-xs font-semibold text-blue-gray-600 capitalize">
                                                    {item.zoom_link}
                                                </Typography>
                                                </td>
                                                <td className="py-3 px-5 flex gap-3">
                                                <Typography className="text-xs font-semibold text-blue-gray-600 flex gap-4">
                                                    <button className='capitalize bg-blue-400 w-16 text-white hover:bg-blue-600 duration-300 shadow drop-shadow-xl rounded-full'>zoom</button>
                                                </Typography>
                                                </td>
                                            </tr>)
                                            }
                                        </tbody>
                                        </table>
                                    ) : (
                                        <Typography className="text-center text-4xl text-blue-gray-500 flex justify-center items-center h-96">You have no students.</Typography>
                                    )
                                }
                            </CardBody>
                    </Card>
                  </div>
                )
            }
        </div>
    );
};

export default Liveclass;