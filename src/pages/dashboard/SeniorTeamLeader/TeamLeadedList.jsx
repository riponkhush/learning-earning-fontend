import React, { useEffect, useState } from 'react';
import { CardHeader, Spinner, Typography } from "@material-tailwind/react";
import { FaSearch } from "react-icons/fa";
import { Card,CardBody,Avatar,Chip} from "@material-tailwind/react";
import { MdDelete } from "react-icons/md";
import useAxiosPublic from '@/hooks/axiosPublic';
import {IconButton } from "@material-tailwind/react";
import { useQuery } from 'react-query';


const TeamLeadedList = () => {
    const axiosPublic = useAxiosPublic();
    const [loading, setLoading ] = useState(true);
    const [active, setActive] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [itemsPerPage] = useState(7); 
    const [totalPages, setTotalPages] = useState(1);  
    const { refetch, data: users = [] } = useQuery({
        queryKey: ["users", active, searchTerm],
        queryFn: async () => {
          const res = await axiosPublic.get("/createUsers");
          const activeUser = res.data.filter(filterData =>filterData.role ==='Team Leader')
          const sortedData = activeUser.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
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
            {
                loading ? (
                    <Typography className="text-center text-4xl text-blue-gray-500 flex justify-center items-center h-screen"><Spinner className="h-10 w-10" color="blue" /></Typography>
                ) : (
                    <div className="mt-12 mb-8 flex flex-col gap-12">
                    <Card>
                        <CardHeader className="mb-8 p-6 bg-blue-500">
                        <div className='flex justify-between items-center'>
                                <Typography variant="h6" color="white">
                                    Team leader list
                                </Typography>
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
                        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                            <table className="w-full min-w-[640px] table-auto">
                            <thead>
                                <tr>
                                {["author", "designation", "status", "date", "action"].map((el) => (
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
                            {
                                users.map(item =>
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
                                    
                                        as="a"
                                        href="#"
                                        className="text-xs font-semibold text-blue-gray-600"
                                    >
                                        <button ><MdDelete className='text-xl  text-red-400'  /></button>
                                    </Typography >
                                    </td>
                                </tr>)
                                }
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
                )
            }
        </div>
    );
};

export default TeamLeadedList;