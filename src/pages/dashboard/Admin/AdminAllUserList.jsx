import React, { useContext, useState } from 'react';
import { CardHeader, Spinner, Typography, Avatar, IconButton, Card, CardBody } from "@material-tailwind/react";
import { FaSearch } from "react-icons/fa";
import useAxiosPublic from './../../../hooks/axiosPublic';
import { useQuery } from 'react-query';
import { AuthContext } from '@/providers/AuthProvider';
import toast from 'react-hot-toast';

const AdminAllUserList = () => {
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const [loading, setLoading] = useState(true);
    const [active, setActive] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [itemsPerPage] = useState(7); 
    const [totalPages, setTotalPages] = useState(1);  

    const { refetch, data: isList = [] } = useQuery({
        queryKey: ["isList", active, searchTerm],
        queryFn: async () => {
            const res = await axiosPublic.get("/createUsers");
            const sortedData = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            const filteredData = sortedData.filter(user => 
                user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email?.toLowerCase().includes(searchTerm.toLowerCase())
            );

            setTotalPages(Math.ceil(filteredData.length / itemsPerPage));
            const startIndex = (active - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            
            setLoading(false);
            return filteredData.slice(startIndex, endIndex);
        },
    });

    const handleActive = (id, targetEmail) => {
        if (!user || !user.email) {
            return;
        }
        const currentDateTime = new Date().toLocaleString();
        axiosPublic.patch(`/createUsers/${id}`, { status: "active" })
            .then((res) => {
                axiosPublic.post('/activeClickPayment', { 
                    loggedInUserEmail: user.email, 
                    targetEmail,
                    dateTime: currentDateTime 
                })
                .then((response) => {
                    toast.success('User activated:', response.data);
                })
                .catch((error) => {
                    toast.error('Error posting emails:', error);
                });
                refetch();
            });
    };
    
    const handleInactive = (id) => {
        axiosPublic.patch(`/createUsers/${id}`, { status: "in active" })
        .then(res => {
            refetch();
            toast.success('User inactivated:', res.data);
        });
    };

    const handleBlock = (id) => {
        axiosPublic.patch(`/createUsers/${id}`, { status: "block" })
        .then(res => {
            refetch();
            toast.success('User Blocked:', res.data);
        });
    };

    const next = () => {
        if (active < totalPages) {
            setActive(active + 1);
        }
    };

    const prev = () => {
        if (active > 1) {
            setActive(active - 1);
        }
    };

    const getItemProps = (index) => ({
        variant: active === index ? "filled" : "text",
        color: "blue",
        onClick: () => setActive(index),
    });

    return (
        <div>
            {loading ? (
                <Typography className="text-center text-4xl text-blue-gray-500 flex justify-center items-center h-screen">
                    <Spinner className="h-10 w-10" color="blue" />
                </Typography>
            ) : (
                <div className="mt-12 mb-8 flex flex-col gap-12">
                    <Card>
                        <CardHeader className="mb-8 p-6 bg-blue-500">
                            <div className='flex justify-between items-center'>
                                <Typography variant="h6" color="white">All Users</Typography>
                                <div id="input" className="relative outline-none">
                                    <input
                                        type="text"
                                        id="floating_outlined"
                                        className="block md:w-full w-36 text-sm outline-none h-[36px] px-4 text-slate-900 bg-white rounded-[8px] border border-slate-200 appearance-none focus:border-transparent focus:outline focus:outline-2 focus:outline-primary focus:ring-0 hover:border-brand-500-secondary- peer invalid:border-error-500 invalid:focus:border-error-500 overflow-ellipsis overflow-hidden text-nowrap pr-[48px]"
                                        placeholder="Search name or email ......"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}  // Handle search input change
                                    />
                                    <div className="absolute top-3 text-sm right-3">
                                        <FaSearch />
                                    </div>
                                </div>
                            </div>
                        </CardHeader>
                        <CardBody className="overflow-x-scroll md:px-10 px-0 pt-0 pb-2">
                            <table className="w-full min-w-[640px] table-auto">
                                <thead>
                                    <tr>
                                        {["author", "designation", "status", "action"].map((el) => (
                                            <th key={el} className="border-b border-blue-gray-50 py-3 px-5 text-left">
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
                                    {isList.map((item) => (
                                        <tr key={item._id}>
                                            <td className="py-3 px-5">
                                                <div className="flex items-center gap-4">
                                                    <Avatar
                                                        src={'https://i.pinimg.com/736x/c3/01/8c/c3018c28d051c071032ae5faa9181b84.jpg'}
                                                        alt=""
                                                        size="sm"
                                                        variant="rounded"
                                                    />
                                                    <div>
                                                        <Typography variant="small" color="blue-gray" className="font-semibold">
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
                                                <Typography className="text-xs font-semibold text-blue-gray-600 capitalize">
                                                    {item.status}
                                                </Typography>
                                            </td>
                                            <td className="py-3 px-5 gap-3">
                                                <Typography className="text-xs font-semibold text-blue-gray-600 flex gap-4">
                                                    <button
                                                        className="capitalize bg-blue-400 px-4 text-white rounded-full shadow drop-shadow-xl text-xs hover:bg-blue-600 duration-300"
                                                        onClick={() => handleActive(item._id, item.email)}
                                                    >
                                                        active
                                                    </button>
                                                    <button
                                                        className="capitalize bg-red-400 px-4 text-white rounded-full shadow drop-shadow-xl text-xs hover:bg-red-600 duration-300"
                                                        onClick={() => handleBlock(item._id)}
                                                    >
                                                        block
                                                    </button>
                                                    <button
                                                        className="capitalize bg-blue-400 px-4 text-white rounded-full shadow drop-shadow-xl text-xs hover:bg-blue-600 duration-300"
                                                        onClick={() => handleInactive(item._id)}
                                                    >
                                                        in active
                                                    </button>
                                                </Typography>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </CardBody>
                    </Card>
                    <div className="flex justify-end items-center gap-4">
                        <div className="flex items-center gap-2">
                            {Array.from({ length: totalPages }, (_, index) => (
                                <IconButton key={index + 1} {...getItemProps(index + 1)}>
                                    {index + 1}
                                </IconButton>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminAllUserList;
