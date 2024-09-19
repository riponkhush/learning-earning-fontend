import React, { useContext } from 'react';
import { CardHeader, Typography, Card, Select, Option } from "@material-tailwind/react";
import useAxiosPublic from './../../../hooks/axiosPublic';
import { AuthContext } from '@/providers/AuthProvider';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddHomeWorks = () => {
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const { register, handleSubmit, setValue } = useForm();

    const onSubmit = (data) => {
        const currentDate = new Date();
        const localTime = currentDate.toLocaleString();
        const homeworkInfo = {
            ...data,
            userEmail: user.email,
            createdAt: localTime
        };
        axiosPublic.post('/studentHomework', homeworkInfo)
            .then(res => {
                if (res.data.insertedId) {
                    navigate('/dashboard/homework-list');
                    toast.success("Your homework has been posted");
                }
            })
            .catch((error) => {
                toast.error("Failed to post homework");
                console.error(error);
            });
    };
    return (
        <div className="mt-12 mb-8 flex flex-col gap-12">
            <Card className=''>
                <CardHeader className="mb-8 p-6 bg-blue-500">
                    <div className='flex justify-between items-center'>
                        <Typography variant="h6" color="white">
                            Add Homework
                        </Typography>
                    </div>
                </CardHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="px-7 h-auto">
                    <div className="grid gap-6" id="form">
                        {/* Select category */}
                        <div className="w-full flex gap-3">
                            <Select
                                onChange={(value) => setValue("category", value)}
                                className="capitalize shadow-2xl p-3 w-full outline-none focus:border-[#035ec5]"
                                label="Select category"
                            >
                                <Option value="Nature">Nature</Option>
                                <Option value="Drawing">Drawing</Option>
                                <Option value="Culture">Culture</Option>
                                <Option value="English">English</Option>
                                <Option value="Bangla">Bangla</Option>
                                <Option value="Islam">Islam</Option>
                            </Select>
                        </div>

                        {/* Multi-select for homework types */}
                        <div className="grid gap-6 w-full">
                        <textarea  className="p-3 shadow-2xl  glass w-full placeholder:text-gray-400 outline-none focus:border-solid border-[#035ec5] focus:border-[1px]" type="text" placeholder="Homework name" id="textarea "
                        {...register("homework", { required: true })}
                        />
                        </div>
                        <div className="grid gap-6 w-full">
                        <textarea  className="p-3 shadow-2xl  glass w-full placeholder:text-gray-400  outline-none focus:border-solid border-[#035ec5] focus:border-[1px]" type="text" placeholder="About homework" id="textarea "
                        {...register("about_homework", { required: true })}
                        />
                        </div>
                        <button type='submit' className="outline-none shadow-2xl w-full p-3 bg-[#ffffff42] hover:border-[#035ec5] hover:border-[1px] hover:text-[#035ec5] font-bold">
                            Add Homework
                        </button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default AddHomeWorks;
