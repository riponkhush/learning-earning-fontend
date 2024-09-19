
import React, { useContext, useState } from 'react';
import { Spinner } from "@material-tailwind/react";
import { CardHeader, Typography, Chip } from "@material-tailwind/react";
import { FaSearch } from "react-icons/fa";
import { Card,CardBody,Avatar} from "@material-tailwind/react";
import { useForm } from 'react-hook-form';
import useAxiosPublic from '@/hooks/axiosPublic';
import { imageUpload } from '@/hooks/useImageApi';
import { AuthContext } from '@/providers/AuthProvider';
import toast from 'react-hot-toast';

const AddProduct = () => {
const axiosPublic = useAxiosPublic();
const {user} = useContext(AuthContext);
const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
      } = useForm()
    
      const onSubmit = async (data) => {
        setLoading(true);
        try {
          const imageFile = data.image[0]; 
          const imageData = await imageUpload(imageFile);
          const currentDate = new Date();
          const localTime = currentDate.toLocaleString();

          const productInfo = {
            ...data,
            image: imageData?.data?.display_url,
            user: user.email,
            createdAt: localTime
          };
    
          // Post product information
          const response = await axiosPublic.post('/products', productInfo)
          console.log('Product created:', response.data);
          if(response.data.insertedId){
            toast.success("Product added successfull")
          }
        } catch (error) {
            toast.error("Failed to add product. Please try again.");
        }finally{
            setLoading(false)
        }
      };


    return (
        <div className="mt-12 mb-8 flex flex-col gap-12">
        <Card>
            <CardHeader className="mb-8 p-6 bg-blue-500">
            <div className='flex justify-between items-center'>
                    <Typography variant="h6" color="white">
                        Add your product
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

            <div>
                <form onSubmit={handleSubmit(onSubmit)} className="px-7 h-[500px]">
                    <div className="grid gap-6" id="form">
                        <div className="w-full flex gap-3">
                        <input className="capitalize shadow-2xl p-3 ex w-full outline-none focus:border-solid focus:border-[1px] border-[#035ec5] placeholder:text-black" type="text" placeholder="Product title" id="" {...register("product_title", { required: true })}/>
                        </div>
                        <div className="grid gap-6 w-full">
                        <textarea className="p-3 shadow-2xl  glass w-full placeholder:text-black outline-none focus:border-solid border-[#035ec5] focus:border-[1px]" type="text" placeholder="Description" id="" {...register("description", { required: true })}/>
                        </div>
                        <div className="flex gap-3">
                        <input className="p-3 glass shadow-2xl  w-full placeholder:text-black outline-none focus:border-solid focus:border-[1px] border-[#035ec5]" type="text" placeholder="Price" id="password"  {...register("price", { required: true })}/>
                        </div>
                        <div className="flex gap-3">
                        <input className="p-3 glass shadow-2xl  w-full placeholder:text-black outline-none focus:border-solid focus:border-[1px] border-[#035ec5]" type="text" placeholder="Rating" id="password" {...register("rating", { required: true })}/>
                        </div>
                        <div className="flex gap-3">
                        <input className="p-3 glass shadow-2xl  w-full placeholder:text-black outline-none focus:border-solid focus:border-[1px] border-[#035ec5]" type="file" placeholder="Rating" id="password" {...register("image", { required: true })}/>
                        </div>

                        <button className="outline-none glass shadow-2xl flex items-center justify-center gap-5 w-full p-3  bg-[#ffffff42] hover:border-[#035ec5] hover:border-solid hover:border-[1px]  hover:text-[#035ec5] font-bold" type="submit">Submit {loading && <Spinner className="h-4 w-4" />}</button>
                    </div>
                </form>
            </div>
        </Card>
      </div>
    );
};

export default AddProduct;