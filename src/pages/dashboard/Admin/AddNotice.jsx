import React, { useContext, useEffect, useState } from 'react';
import { CardHeader, Typography } from "@material-tailwind/react";
import { Card} from "@material-tailwind/react";
import useAxiosPublic from './../../../hooks/axiosPublic';
import { AuthContext } from '@/providers/AuthProvider';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddNotice = () => {
    const {user} = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
      } = useForm()

      const onSubmit = (data) => {
        const userInfo = {
            ...data,
            uerEmail: user.email
        }
        axiosPublic.post('/notices', userInfo)
        .then(res => {
            if(res.data.insertedId){
                navigate('/dashboard/notice-list')
                toast.success("Your noticed posted");
            }
        })
        .catch((error) => {
            toast.error("Not post", error) 
        })
        
      }


    return (
        <div className="mt-12 mb-8 flex flex-col gap-12">
            <Card className=''>
                <CardHeader className="mb-8 p-6 bg-blue-500">
                <div className='flex justify-between items-center'>
                        <Typography variant="h6" color="white">
                            Add notice
                        </Typography>
                </div>
                </CardHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="px-7 h-[450px]">
                    <div className="grid gap-6" id="form">
                    <div className="w-full flex gap-3">
                        <input {...register("news_title", { required: true })} className="capitalize shadow-2xl p-3 ex w-full outline-none focus:border-solid focus:border-[1px] border-[#035ec5] placeholder:text-black" type="text" placeholder="News Title" id=""/>
                    </div>
                    <div className="grid gap-6 w-full">
                        <textarea  className="p-3 shadow-2xl  glass w-full placeholder:text-black outline-none focus:border-solid border-[#035ec5] focus:border-[1px]" type="text" placeholder="About News" id="textarea "
                        {...register("about_news", { required: true })}
                        />
                        <input {...register("dateTime", { required: true })} className="p-3 shadow-2xl   glass w-full text-black outline-none focus:border-solid focus:border-[1px]border-[#035ec5]" type="datetime-local" required=""/>
                    </div>
                    <button className="outline-none glass shadow-2xl  w-full p-3  bg-[#ffffff42] hover:border-[#035ec5] hover:border-solid hover:border-[1px]  hover:text-[#035ec5] font-bold">Submit</button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default AddNotice;