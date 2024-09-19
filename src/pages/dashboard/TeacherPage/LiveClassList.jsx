import React, { useContext, useState} from 'react';
import { CardHeader, Spinner, Typography } from "@material-tailwind/react";
import { FaSearch } from "react-icons/fa";
import { Card,CardBody,Avatar} from "@material-tailwind/react";
import useAxiosPublic from './../../../hooks/axiosPublic';
import { useQuery } from 'react-query';
import { TbLock } from "react-icons/tb";
import { AuthContext } from '@/providers/AuthProvider';
import { IconButton } from "@material-tailwind/react";

const LiveClassList = () => {
    const axiosPublic = useAxiosPublic();
    const {user} = useContext((AuthContext));
    const [loading, setLoading] = useState(true);
    const [active, setActive] = useState(1);
    const [itemsPerPage] = useState(7); 
    const [totalPages, setTotalPages] = useState(1); 

    const { refetch, data: isUsers = [] } = useQuery({
        queryKey: ["isUsers", user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/teacherClass/?teacherEmail=${user.email}`);
          const sortedData = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setLoading(false);
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
                loading ? (
                    <Typography className="text-center text-4xl text-blue-gray-500 flex justify-center items-center h-96"><Spinner className="h-10 w-10" color="blue" /></Typography>

                ):(
                    <div className="mt-12 mb-8 flex flex-col gap-12">
                    <Card>
                        <CardHeader className="mb-8 p-6 bg-blue-500">
                        <div className='flex justify-between items-center'>
                                <Typography variant="h6" color="white">
                                    All Student
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
                        <CardBody className="overflow-x-scroll md:px-10 px-0 pt-0 pb-2">
                            {
                                isUsers.length > 0 ? (
                                    <table className="w-full min-w-[640px] table-auto">
                                    <thead>
                                        <tr>
                                        {["class title", "date","link", "action"].map((el) => (
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
                                            isUsers.map((item) =>                             
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
                                                <button className='capitalize text-lg'><TbLock /></button>
                                            </Typography>
                                            </td>
                                        </tr>)
                                        }
                                    </tbody>
                                    </table>
                                ) : (
                                    <Typography className="text-center text-4xl text-blue-gray-500 flex justify-center items-center h-96">You have no class.</Typography>
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

export default LiveClassList;