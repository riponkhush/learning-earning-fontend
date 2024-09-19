import TextField from '@mui/material/TextField';
import { CardHeader, Typography } from "@material-tailwind/react";
import { FaSearch } from "react-icons/fa";
import { useContext, useState } from 'react';
import { AuthContext } from '@/providers/AuthProvider';
import { useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import useAxiosPublic from '@/hooks/axiosPublic';
import { imageUpload } from '@/hooks/useImageApi';
import toast from 'react-hot-toast';
import { Spinner } from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';


const UploadImage = () => {
    const {user} = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const [loading , setLoading] = useState(false);
    const navigate = useNavigate();

    const {register,handleSubmit} = useForm()
      const onSubmit = async (data) => {
        const imageFile = data.image[0];
        const currentDate = new Date();
        const localTime = currentDate.toLocaleString();
        setLoading(true);
       try {
            const imageData = await imageUpload(imageFile);
            const imageUrl = imageData.data.url;

            const photoInfo = {
                ...data,
                image: imageUrl,
                user: user.email,
                createdAt: localTime
            };
            await axiosPublic.post('/images', photoInfo)
            .then(res => {
                console.log(res.data)
                navigate('/dashboard/upload-image')
                toast.success("Uploaded photo");
            })
        } catch (error) {
            console.error("Error uploading image: ", error);
            toast.error(error)
        }
        finally{
            setLoading(false)
        }
      }
    return (
        <div>
            {
                loading ? (
                    <Typography className="text-center text-4xl text-blue-gray-500 flex justify-center items-center h-screen"><Spinner className="h-10 w-10" color="blue" /></Typography>

                ) : (
                    <div className='container  mx-auto'>
                    <CardHeader className="mb-8 md:p-4 p-2 mt-10 bg-blue-500">
                        <div className='flex justify-between items-center'>
                        <Typography variant="h6" color="white">
                            Upload Photo
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
                    <div className='flex mx-auto justify-center items-center h-[450px]'>
                        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col w-96 space-y-6'>
                        <TextField id="standard-basic" type='text' {...register("photo_title", { required: true })} label="Photo title" variant="standard" />
                        <TextField id="standard-basic" type='text' {...register("about_photo", { required: true })} label="About photo" variant="standard" />
                        <TextField id="standard-basic" type='file' {...register("image", { required: true })} label="Your image" variant="standard" />
                        <button className='bg-blue-500 py-2 flex justify-center items-center gap-4 text-white capitalize rounded-full hover:bg-blue-600 duration-500' type='submit'>post {loading && <Spinner className="h-4 w-4" />}</button>
                        </form>
                    </div>
                </div>
                )
            }
        </div>
    );
};

export default UploadImage;