import React, { useEffect, useState } from 'react';
import { CardHeader, Spinner, Typography } from "@material-tailwind/react";
import img1 from '../../assets/products/1s.png';
import img2 from '../../assets/products/2.png';
import Rating from '@mui/material/Rating';
import { FaSearch } from "react-icons/fa";
import useAxiosPublic from '@/hooks/axiosPublic';

export const Marketing = () => {
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();
    const [isProducts, setIsProducts] = useState([]);
    useEffect(() => {
        axiosPublic.get('/products')
        .then(res => {
            setIsProducts(res.data)
            setLoading(false);
        })
    },[])
    
    return (
        <div>
            {
                loading ? (
                    <Typography className="text-center h-screen text-4xl text-blue-gray-500 flex justify-center items-center"><Spinner className="h-10 w-10" color="blue" /></Typography>
                ) : (
                    <div >
                    <CardHeader className="mb-8 md:p-4 p-2 mt-10 bg-blue-500">
                        <div className='flex justify-between items-center'>
                        <Typography variant="h6" color="white">
                            Sale Your Products
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
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 md:justify-items-center mb-20'>
                            <div className='sticky top-0 h-screen hidden md:block'>
                                <div className='flex flex-col gap-4 items-center'>
                                <div className=''>
                                    <img className='w-full object-cover h-96 rounded-lg' src={img1} alt="Product 1" />
                                </div>
                                <div className=''>
                                    <img className='w-full object-cover h-96 rounded-lg' src={img2} alt="Product 2" />
                                </div>
                            </div>
                            </div>
                            <div className='col-span-3'>
                                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 justify-items-center'>
                                    {
                                        isProducts.map(item =>                         
                                        <div key={item._id} className="md:w-52 w-full bg-white shadow-md transform hover:scale-105 transition-transform duration-300 ease-in-out">
                                            <div className='flex justify-center items-center p-2'>
                                                <img className="w-full h-40 rounded-lg object-cover text-center" alt="Card Image" src={item.image} />
                                            </div>
                                            <div className="text-center">
                                                <h2 className="text-lg font-semibold">{item.product_title}</h2>
                                                <p className="text-gray-600 text-sm">{item.description}</p>
                                                <p className='text-md font-bold text-red-600'>${item.price}</p>
                                                <Rating name="read-only" value={item.rating} readOnly precision={0.5} size="small" />
                                                <div className="mt-4">
                                                    <button className="bg-blue-500 w-full hover:bg-blue-600 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400">Add to cart</button>
                                                </div>
                                            </div>
                                        </div>)
                                    }
                                </div>
                            </div>
                            <div className='sticky top-0 h-screen'>
                                <div className=''>
                                    <h2 className=''>Your comition </h2>
                                </div>
                            </div>
                    </div>
                </div>
                )
            }
        </div>
    );
};

export default Marketing;
