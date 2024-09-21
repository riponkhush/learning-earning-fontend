import React, { useContext, useEffect, useState } from 'react';
import { CardHeader, Spinner, Typography } from "@material-tailwind/react";
import { FaSearch } from "react-icons/fa";
import { Card,CardBody,Avatar} from "@material-tailwind/react";
import useAxiosPublic from './../../../hooks/axiosPublic';
import { useQuery } from 'react-query';
import { AuthContext } from '@/providers/AuthProvider';
import { Select, Option } from "@material-tailwind/react";
import Checkbox from '@mui/material/Checkbox';
import Swal from 'sweetalert2';
import { IconButton } from "@material-tailwind/react";

const TeamLeadermaptoTrainer = () => {
    const axiosPublic = useAxiosPublic();
    const {user} = useContext((AuthContext));
    const [loading , setLoading] = useState(true);
    const [selectedLeader, setSelectedLeader] = useState(''); 
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [active, setActive] = useState(1);
    const [itemsPerPage] = useState(7); 
    const [totalPages, setTotalPages] = useState(1); 
    const [ tariners, setTrainer] = useState([]);
    const [isMan, setIsMan] = useState([]);

    const {refetch,  data: users = [] } = useQuery({
        queryKey: ["users", user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/teamLeaderMappingMember?teamLeaderEmail=${user.email}`)
          setLoading(false);
          return res.data;
        },
      });

      useEffect(() => {
         axiosPublic.get('/createUsers')
                .then(res => {
                    console.log(res.data)
                    const filteredData = res.data.filter(item => 
                        users.some(user => Array.isArray(user.studentId) && user.studentId?.includes(item._id))
                    );
                    setIsMan(filteredData)
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching createUsers:', error);
                    setLoading(false);
                });
    }, []);




      useEffect(() => {
        axiosPublic.get('/createUsers')
        .then(res => {
            const filterTrainer = res.data.filter(man => man.role === 'Trainer');
            const sortedData = filterTrainer.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setTrainer(sortedData)
        })
      },[])

      const handleLeaderChange = (email) => {
        refetch();
        setSelectedLeader(email);
        console.log(email)
    };

    const handleUserSelection = (id) => {
        setSelectedUsers(prevState => 
            prevState.includes(id) ? prevState.filter(userId => userId !== id) : [...prevState, id]
        );
    };

    const handlePostToLeader = () => {
        if (!selectedLeader) {
            Swal.fire("Please select a team leader!");
            return;
        }

        if (selectedUsers.length === 0) {
            Swal.fire("Please select at least one user!");
            return;
        }
        setLoading(true);

        
        axiosPublic.post('/teamLeaderMappingTrainer', { teamLeaderEmail: selectedLeader, trainerId: selectedUsers , loggedInUserEmail: user.email })
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

                    <div className="mt-12 mb-8 flex flex-col gap-12">
                    <Card>
                        <CardHeader className="mb-8 p-6 bg-blue-500">
                        <div className='flex justify-between items-center'>
                                <Typography variant="h6" color="white">
                                Trainer mapping to Trainer
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
                        <div className='flex justify-between gap-1 items-center md:py-3 md:px-5 px-2'>
                                    <div className="md:w-72">
                                        <Select className='' label="Select Team Leader" onChange={(value) => handleLeaderChange(value)} >
                                            {isMan.map(item => <Option className='text-black' key={item._id} value={item.email}>{item.name}
                                                
                                            </Option>)}
                                        </Select>
                                    </div>
                                    <button type='submit' className=" flex items-center w-44 gap-2 p-2 bg-blue-500 text-xs text-white rounded" 
                                    onClick={handlePostToLeader}>
                                            Assign to Team Leader {loading && <Spinner className="h-4 w-4" />}
                                    </button>
                                </div>
                                {
                loading ? (
                    <Typography className="text-center text-4xl text-blue-gray-500 flex justify-center items-center h-screen"><Spinner className="h-10 w-10" color="blue" /></Typography>
                ) : (
                        <CardBody className="overflow-x-scroll md:px-10 px-0 pt-0 pb-2">
                            {
                                tariners.length > 0 ? (
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
                                            tariners.map((item) =>                             
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
                                            <td className="py-3 px-5 flex gap-3">
                                            <Typography className="text-xs font-semibold text-blue-gray-600 flex gap-4">
                                                                <Checkbox
                                                                checked={selectedUsers.includes(item._id)}
                                                                onChange={() => handleUserSelection(item._id)} 
                                                                size="small" />
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

        </div>
    );
};

export default TeamLeadermaptoTrainer;