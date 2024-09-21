import React, { useContext, useEffect, useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { Card,CardBody,Avatar, Spinner} from "@material-tailwind/react";
import useAxiosPublic from './../../../hooks/axiosPublic';
import { AuthContext } from '@/providers/AuthProvider';
import { CardHeader, Typography } from "@material-tailwind/react";
import { useQuery } from 'react-query';
import { IconButton } from "@material-tailwind/react";
const TeamLeaderMember = () => {
    const axiosPublic = useAxiosPublic();
    const [isMan, setIsMan] = useState([]);
    const [loading , setLoading] = useState(true);
    const {user} = useContext((AuthContext));
    const [active, setActive] = useState(1);
    const [itemsPerPage] = useState(7); 
    const [totalPages, setTotalPages] = useState(1); 
    const [searchTerm, setSearchTerm] = useState('');

    const {  data: users = [] } = useQuery({
        queryKey: ["users", user?.email, active],
        queryFn: async () => {
            const res = await axiosPublic.get(`/teamLeaderMappingMember?teamLeaderEmail=${user.email}`)
          const sortedData = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setLoading(false);
          setTotalPages(Math.ceil(sortedData.length / itemsPerPage));
          const startIndex = (active - 1) * itemsPerPage;
          const endIndex = startIndex + itemsPerPage;
          return sortedData.slice(startIndex, endIndex);
        },
      });


      useEffect(() => {
        if (users.length > 0) {
            axiosPublic.get('/createUsers')
                .then(res => {
                    const filteredData = res.data.filter(item => 
                        users.some(user => Array.isArray(user.studentId) && user.studentId?.includes(item._id))
                    );
                    const searchFilteredData = filteredData.filter(item =>
                        item.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        item.email?.toLowerCase().includes(searchTerm.toLowerCase())  
                    );
                    setIsMan(searchFilteredData); 
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching createUsers:', error);
                    setLoading(false);
                });
        }
    }, []);


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
                                    Team Member
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
                            <CardBody className="overflow-x-scroll md:px-10 px-0 pt-0 pb-2">
                                {
                                    isMan.length > 0 ? (
                                        <table className="w-full min-w-[640px] table-auto">
                                        <thead>
                                            <tr>
                                            {["author", "designation", "status", "action"].map((el) => (
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
                                                isMan.map((item) =>                             
                                                <tr key={item}>
                                                <td className="py-3 px-5">
                                                <div className="flex items-center gap-4">
                                                    <Avatar src={item.image} alt="" size="sm" variant="rounded" />
                                                    <div className=''>
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
                                                <Typography className="text-xs font-semibold text-blue-gray-600 capitalize">
                                                    {item.status}
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

export default TeamLeaderMember;