import React, { useEffect, useState } from 'react';
import { CardHeader, Typography, Chip } from "@material-tailwind/react";
import { FaSearch } from "react-icons/fa";
import { Card,CardBody,Avatar} from "@material-tailwind/react";
import useAxiosPublic from '@/hooks/axiosPublic';
import { useQuery } from 'react-query';
import Swal from 'sweetalert2';
import { Spinner } from "@material-tailwind/react";
import Loader from '@/widgets/layout/Loader';

const NotMappingStudent = () => {
    const axiosPublic = useAxiosPublic();
    const [loading, setLoading] = useState(true);
    const { refetch, data: users = [] } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
          const res = await axiosPublic.get("/createUsers");
          const inactiveUsers = res.data.filter(userPerson =>userPerson.role ==='Student' && userPerson.status === 'in active')
          const sortedData = inactiveUsers.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setLoading(false)
          return (sortedData)
        },
      });
    return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
        <Card>
            <CardHeader className="mb-8 p-6 bg-blue-500">
            <div className='flex justify-between items-center'>
                    <Typography variant="h6" color="white">
                        Not Mapping Students
                    </Typography>
                    <div id="input" className="relative outline-none">
                    <input
                        type="text"
                        id="floating_outlined"
                        className="block md:w-full w-36 text-sm outline-none h-[36px] px-4 text-slate-900 bg-white rounded-[8px] border border-slate-200 appearance-none focus:border-transparent focus:outline focus:outline-2 focus:outline-primary focus:ring-0 hover:border-brand-500-secondary- peer invalid:border-error-500 invalid:focus:border-error-500 overflow-ellipsis overflow-hidden text-nowrap pr-[48px]"
                        placeholder="Search here...."
                        value=""
                    />
                    <div className="absolute top-3 text-sm right-3">
                    <FaSearch />
                    </div>
                    </div>
                    </div>
            </CardHeader>
            <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                    {loading ? (
                        <Typography className="text-center text-4xl text-blue-gray-500 flex justify-center items-center h-96"><Loader></Loader></Typography>
                    ) : users.length > 0 ? (
                        <table className="w-full min-w-[640px] table-auto">
                            <thead>
                                <tr>
                                    {["author", "designation", "status", "employed", "action"].map((el) => (
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
                            <tbody>
                                {users.map(item =>
                                    <tr key={item._id}>
                                        <td className="py-3 px-5">
                                            <div className="flex items-center gap-4">
                                                <Avatar src={item.image} alt="" size="sm" variant="rounded" />
                                                <div>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-semibold"
                                                    >
                                                        {item.name}
                                                    </Typography>
                                                    <Typography className="text-xs font-normal text-blue-gray-500">
                                                        {item.email}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-3 px-5">
                                            <Typography className="text-xs font-semibold text-blue-gray-600">
                                                {item.role}
                                            </Typography>
                                        </td>
                                        <td className="py-3 px-5">
                                            <Chip
                                                variant="gradient"
                                                color={item.status === "active" ? "green" : "blue-gray"}
                                                value={item.status === "active" ? "active" : "inactive"}
                                                className="py-0.5 px-4 text-[11px] font-medium w-20 text-center"
                                            />
                                        </td>
                                        <td className="py-3 px-5">
                                            <Typography className="text-xs font-semibold text-blue-gray-600">
                                                {item.createdAt}
                                            </Typography>
                                        </td>
                                        <td className="py-3 px-5">
                                            <Typography
                                                className="text-xs font-semibold text-blue-gray-600"
                                            >
                                                <button className='bg-blue-500 text-white w-28 py-1 rounded-full hover:bg-blue-600 duration-500 shadow-xl'></button>
                                            </Typography >
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    ) : (
                        <Typography className="text-center text-4xl text-blue-gray-500 flex justify-center items-center h-96">You have no students.</Typography>
                    )}
                </CardBody>
        </Card>
    </div>
    );
};

export default NotMappingStudent;