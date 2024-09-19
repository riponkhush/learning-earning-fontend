import React, { useEffect, useState } from 'react';
import { CardHeader, Typography } from "@material-tailwind/react";
import { FaSearch } from "react-icons/fa";
import { Card, CardBody, Avatar, Chip } from "@material-tailwind/react";
import { MdDelete } from "react-icons/md";
import useAxiosPublic from '@/hooks/axiosPublic';
import Checkbox from '@mui/material/Checkbox';
import { useQuery } from 'react-query';
import Swal from 'sweetalert2';
import { Select, Option } from "@material-tailwind/react";
import { Spinner } from "@material-tailwind/react";
import Loader from '@/widgets/layout/Loader';
import { AuthContext } from '@/providers/AuthProvider';
import { IconButton } from "@material-tailwind/react";

const ActiveStudentMapping = () => {
    const axiosPublic = useAxiosPublic();
    const {user} = useState(AuthContext);
    const [isSeniorTeamLeader, setIsSeniorTeamLeader] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]); 
    const [selectedLeader, setSelectedLeader] = useState(''); 
    const [loading, setLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [active, setActive] = useState(1);
    const [itemsPerPage] = useState(7); 
    const [totalPages, setTotalPages] = useState(1); 

    const { refetch, data: users = [] } = useQuery({
        queryKey: ["users", active],
        queryFn: async () => {
            const res = await axiosPublic.get("/createUsers");
            const activeUser = res.data.filter(userPerson => userPerson.role === 'Student' && userPerson.status === 'active');
            const sortedData = activeUser.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setIsLoading (false)
            setTotalPages(Math.ceil(sortedData.length / itemsPerPage));
            const startIndex = (active - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            return sortedData.slice(startIndex, endIndex);
        },
    });

    useEffect(() => {
        axiosPublic.get('/createUsers')
            .then(res => {
                const mappingMans = res.data.filter(mappingMan => mappingMan.role === 'Senior Team Leader');
                setIsSeniorTeamLeader(mappingMans);
            });
    }, []);

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
                axiosPublic.delete(`/createUsers/${id}`).then((res) => {
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

    const handleUserSelection = (id) => {
        setSelectedUsers(prevState => 
            prevState.includes(id) ? prevState.filter(userId => userId !== id) : [...prevState, id]
        );
    };
    const handleLeaderChange = (email) => {
        refetch();
        setSelectedLeader(email);
    };
    const handlePostToLeader = () => {
        if (!selectedLeader) {
            Swal.fire("Please select a senior team leader!");
            return;
        }

        if (selectedUsers.length === 0) {
            Swal.fire("Please select at least one user!");
            return;
        }
        setLoading(true);
        axiosPublic.post('/seniorTeamLeader', { seniorTeamLeaderEmail: selectedLeader, studentId: selectedUsers, })
            .then(response => {
                Swal.fire("Success", "Users have been assigned to the leader!", "success");
                setSelectedUsers([]);
                setSelectedLeader('');
                refetch();
                console.log(response.data)
            })
            .catch(error => {
                console.error('Error assigning users:', error);
            })
            .finally(() => {
                setLoading(false)
            })
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
                    loading ? (
                    <Typography className="text-center text-4xl text-blue-gray-500 flex justify-center items-center h-screen"><Spinner className="h-10 w-10" color="blue" /></Typography>
                    ) : (
                        <div className="mt-12 mb-8 flex flex-col gap-12">
                        <Card>
                            <CardHeader className="mb-8 md:p-6 p-3 bg-blue-500">
                                <div className='flex justify-between items-center'>
                                    <Typography variant="h6" color="white">Active Student Mapping</Typography>
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
            
                            <div className='flex justify-between items-center py-3 px-5'>
                                <div className="md:w-72">
                                    <Select label="Senior Team Leader" onChange={(value) => handleLeaderChange(value)}>
                                        {isSeniorTeamLeader.map(item => <Option key={item._id} value={item.email}>{item.name}</Option>)}
                                    </Select>
                                </div>
                                <button type='submit' className=" flex items-center gap-2 p-2 bg-blue-500 text-xs text-white rounded" onClick={handlePostToLeader}>
                                        Assign to Leader {loading && <Spinner className="h-4 w-4" />}
                                </button>
                            </div>
                            {
                                isLoading ? (
                                    <Typography className="text-center text-4xl text-blue-gray-500 flex justify-center items-center h-96"><Loader></Loader></Typography>
                                ) : (
                                    <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                                    <table className="w-full min-w-[640px] table-auto">
                                        <thead>
                                            <tr>
                                                {["author", "designation", "status", "employed", "action", "select"].map((el) => (
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
                                                        <Typography className="text-xs font-semibold text-blue-gray-600">date</Typography>
                                                    </td>
                                                    <td className="py-3 px-5">
                                                        <Typography onClick={() => handleDelete(item._id)} as="a" href="#" className="text-xs font-semibold text-blue-gray-600">
                                                            <button><MdDelete className='text-xl text-red-400' /></button>
                                                        </Typography>
                                                    </td>
                                                    <td className="py-3 px-5">
                                                        <Checkbox 
                                                            size="small" 
                                                            checked={selectedUsers.includes(item._id)}
                                                            onChange={() => handleUserSelection(item._id)} 
                                                        />
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

export default ActiveStudentMapping;