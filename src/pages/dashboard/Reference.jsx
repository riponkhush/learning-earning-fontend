import useAxiosPublic from "@/hooks/axiosPublic";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import { useQuery } from "react-query";
import { Card, CardHeader,CardBody,Typography,Avatar,Chip,Tooltip,Progress, Spinner,} from "@material-tailwind/react";
const Reference = () => {
    const axiosPublic = useAxiosPublic();
    const { user } = useContext(AuthContext);
    const [loginUser, setLoginUser] = useState(null); // Set initial value to null to handle async state
    const [loading, setLoading] = useState(true);
    // Fetch login user on mount
    useEffect(() => {
        axiosPublic.get('/createUsers')
        .then(res => {
            const loginUser = res.data.find(lofUser => lofUser.email === user?.email);
            setLoginUser(loginUser);
        })
        .catch(err => {
            console.error(err);
        });
    }, [user, axiosPublic]);


    const { refetch, data: userReference = [] } = useQuery({
        queryKey: ["userReference", loginUser],
        queryFn: async () => {
            if (!loginUser) return [];
            const res = await axiosPublic.get('/createUsers');
            const filterReferData = res.data.filter(refers => refers.student_refer_code === loginUser.refer_code);
            console.log(filterReferData);
            setLoading(false)
            return filterReferData;
        },
        enabled: !!loginUser, 
    });

    return (
        <div>
            {
                loading ? (
                    <Typography className="text-center text-4xl text-blue-gray-500 flex justify-center items-center h-screen"><Spinner className="h-10 w-10" color="blue" /></Typography>
                ) : (
                    <div className="mt-12 mb-8 flex flex-col gap-12">
                    <Card>
                      <CardHeader className="mb-8 p-6 bg-blue-500 flex justify-between">
                        <Typography variant="h6" color="white">
                          Your Reference code ......
                        </Typography>
                        <Typography variant="h6" color="white">
                          {loginUser.refer_code}
                        </Typography>
                      </CardHeader>
                      <CardBody className="overflow-x-scroll md:px-10 px-0 pt-0 pb-2">
                                {
                                    userReference.length > 0 ? (
                                        <table className="w-full min-w-[640px] table-auto">
                                        <thead>
                                            <tr>
                                                {["image", "price", "status", "Date", "action"].map((el) => (
                                                    <th key={el} className="border-b border-blue-gray-50 py-3 px-5 text-left">
                                                        <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">
                                                            {el}
                                                        </Typography>
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {userReference.map(item => (
                                                <tr key={item._id}>
                                                    <td className="py-3 px-5">
                                                        <div className="flex items-center gap-4">
                                                            <Avatar src={item.image} alt="" size="sm" variant="rounded" />
                                                            <div>
                                                                <Typography variant="small" color="blue-gray" className="font-semibold">{item.product_title}</Typography>
                                                                <Typography className="text-xs font-normal text-blue-gray-500">{item.email}</Typography>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="py-3 px-5">
                                                        <Typography className="text-xs font-semibold text-blue-gray-600">$ {item.price}</Typography>
                                                    </td>
                                                    <td className="py-3 px-5">
                                                    <Typography className="text-xs font-semibold text-blue-gray-600">{item.createdAt}</Typography>
                                                    </td>
                                                    <td className="py-3 px-5">
                                                        <Typography className="text-xs font-semibold text-blue-gray-600">{item.createdAt}</Typography>
                                                    </td>
                                                    <td className="py-3 px-5">
                                                        <Typography  onClick={() =>handleDelete(item._id)} className="text-xs font-semibold text-blue-gray-600">
                                                            <button className='bg-red-400 px-6 text-white  rounded-full hover:bg-red-600 duration-500 shadow-md drop-shadow-xl'>Delete</button>
                                                        </Typography>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    ) : (
                                        <Typography className="text-center text-4xl text-blue-gray-500 flex justify-center items-center h-96">You have no refer students.</Typography>
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

export default Reference;
