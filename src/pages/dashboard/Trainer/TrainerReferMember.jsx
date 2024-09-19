import React, { useContext, useEffect, useState } from 'react';
import { CardHeader, Spinner, Typography } from "@material-tailwind/react";
import { FaSearch } from "react-icons/fa";
import { Card, CardBody, Avatar, Chip } from "@material-tailwind/react";
import useAxiosPublic from '@/hooks/axiosPublic';
import { useQuery } from 'react-query';
import { IconButton } from "@material-tailwind/react";
import { AuthContext } from '@/providers/AuthProvider';

const TrainerReferMember = () => {
    const axiosPublic = useAxiosPublic();
    const {user} = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
    const [logginPerson, setLogginPerson] = useState([]);
    const [active, setActive] = useState(1);
    const [itemsPerPage] = useState(7); 
    const [totalPages, setTotalPages] = useState(1); 

    useEffect(() => {
        axiosPublic.get('/createUsers')
        .then(res => {
            const loggedUser = res.data.find(log => log.email === user.email);
            setLogginPerson(loggedUser);
        })
    },[])
    const { refetch, data: users = [] } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosPublic.get("/createUsers");
            const referData = res.data.filter(userPerson => userPerson.refer_code === logginPerson.refer_code);
            const sortedData = referData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setIsLoading (false)
            setTotalPages(Math.ceil(sortedData.length / itemsPerPage));
            const startIndex = (active - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            return sortedData.slice(startIndex, endIndex);
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
                isLoading ? (
                <Typography className="text-center text-4xl text-blue-gray-500 flex justify-center items-center h-96"><Spinner className="h-10 w-10" color="blue" /></Typography>
                        ) : (
            <div className="mt-12 mb-8 flex flex-col gap-12">
                <Card>
                    <CardHeader className="mb-8 md:p-6 p-3 bg-blue-500">
                        <div className='flex justify-between items-center'>
                            <Typography variant="h6" color="white">Reference Member</Typography>
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
                                {
                                    users.length > 0 ? (
                                        <table className="w-full min-w-[640px] table-auto">
                                        <thead>
                                            <tr>
                                                {["author", "designation", "status", "Date", "action"].map((el) => (
                                                    <th key={el} className="border-b border-blue-gray-50 py-3 px-5 text-left">
                                                        <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">
                                                            {el}
                                                        </Typography>
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users.map(item => (
                                                <tr key={item._id}>
                                                    <td className="py-3 px-5">
                                                        <div className="flex items-center gap-4">
                                                            <Avatar src={item.image} alt="" size="sm" variant="rounded" />
                                                            <div>
                                                                <Typography variant="small" color="blue-gray" className="font-semibold">{item.name}</Typography>
                                                                <Typography className="text-xs font-normal text-blue-gray-500">{item.email}</Typography>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="py-3 px-5">
                                                        <Typography className="text-xs font-semibold text-blue-gray-600">{item.role}</Typography>
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
                                                        <Typography className="text-xs font-semibold text-blue-gray-600">{item.createdAt}</Typography>
                                                    </td>
                                                    <td className="py-3 px-5">
                                                    <Typography  className="text-xs font-semibold text-blue-gray-600">                                              
                                                          </Typography>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    ) : (
                                        <Typography className="text-center text-4xl text-blue-gray-500 flex justify-center items-center h-96">You have no memeber.</Typography>
                                    )
                                }

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

export default TrainerReferMember;