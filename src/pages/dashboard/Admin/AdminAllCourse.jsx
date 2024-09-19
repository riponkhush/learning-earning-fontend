import React, { useEffect, useState } from 'react';
import { CardHeader, Spinner, Typography } from "@material-tailwind/react";
import { FaSearch } from "react-icons/fa";
import { Card, CardBody, Avatar, Chip } from "@material-tailwind/react";
import { IconButton } from "@material-tailwind/react";
import useAxiosPublic from '@/hooks/axiosPublic';
import { useQuery } from 'react-query';
import Loader from '@/widgets/layout/Loader';
import Swal from 'sweetalert2';

const AdminAllCourse = () => {
    const axiosPublic = useAxiosPublic();
    const [isLoading, setIsLoading] = useState(true);
    const [active, setActive] = useState(1);
    const [itemsPerPage] = useState(7); 
    const [totalPages, setTotalPages] = useState(1); 
    const { refetch, data: isCourses = [] } = useQuery({
        queryKey: ["isCourses", active],
        queryFn: async () => {
            const res = await axiosPublic.get("/courseData");
            const sortedData = res.data.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));
            setIsLoading (false)
            setTotalPages(Math.ceil(sortedData.length / itemsPerPage));
            const startIndex = (active - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            return sortedData.slice(startIndex, endIndex);
        },
    });

    const handleDelete = (id) => {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.isConfirmed) {
            axiosPublic.delete(`/courseData/${id}`).then((res) => {
              if (res.data.deletedCount > 0) {
                refetch();
                Swal.fire({
                  title: "Deleted!",
                  text: "Your file has been deleted.",
                  icon: "success",
                });
              }
            });
          }
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
            {
                isLoading ? (
                    <Typography className="text-center text-4xl text-blue-gray-500 flex justify-center items-center h-screen"><Spinner className="h-10 w-10" color="blue" /></Typography>

                ) : (
                <div className="mt-12 mb-8 flex flex-col gap-12">
                    <Card>
                        <CardHeader className="mb-8 md:p-6 p-3 bg-blue-500">
                            <div className='flex justify-between items-center'>
                                <Typography variant="h6" color="white">All course List</Typography>
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
                        {
                            isLoading ? (
                                <Typography className="text-center text-4xl text-blue-gray-500 flex justify-center items-center h-96"><Loader></Loader></Typography>
                            ) : (
                                <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                                <table className="w-full min-w-[640px] table-auto">
                                    <thead>
                                        <tr>
                                            {["title", "course link", "posted man", "Date", "action"].map((el) => (
                                                <th key={el} className="border-b border-blue-gray-50 py-3 px-5 text-left">
                                                    <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">
                                                        {el}
                                                    </Typography>
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {isCourses.map(item => (
                                            <tr key={item._id}>
                                                <td className="py-3 px-5">
                                                    <div className="flex items-center gap-4">
                                                        <div>
                                                            <Typography variant="small" color="blue-gray" className="font-semibold">{item.course_title}</Typography>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-5">
                                                    <Typography className="text-xs font-semibold text-blue-gray-600">{item.course_link}</Typography>
                                                </td>
                                                <td className="py-3 px-5">
                                                <Typography className="text-xs font-semibold text-blue-gray-600">{item.userEmail}</Typography>
                                                </td>
                                                <td className="py-3 px-5">
                                                    <Typography className="text-xs font-semibold text-blue-gray-600">{item.dateTime}</Typography>
                                                </td>
                                                <td className="py-3 px-5">
                                                <Typography  onClick={() =>handleDelete(item._id)} className="text-xs font-semibold text-blue-gray-600">
                                                        <button className='bg-red-400 px-6 text-white rounded-full hover:bg-red-600 duration-500 shadow-md drop-shadow-xl'>Delete</button>
                                                    </Typography>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </CardBody>
                            )
                        }
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

export default AdminAllCourse;