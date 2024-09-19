import React, { useContext, useState } from 'react';
import { CardHeader, Typography } from "@material-tailwind/react";
import { Card } from "@material-tailwind/react";
import useAxiosPublic from './../../../hooks/axiosPublic';
import { AuthContext } from '@/providers/AuthProvider';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddCourse = () => {
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const { register, handleSubmit, setValue } = useForm();

    // State for multiple course links
    const [courseLinks, setCourseLinks] = useState([{ link: "" }]);

    const onSubmit = (data) => {
        const courseInfo = {
            ...data,
            courseLinks: courseLinks.map(link => link.link), // Include all the course links
            userEmail: user.email
        };

        axiosPublic.post('/courseData', courseInfo)
            .then(res => {
                if (res.data.insertedId) {
                    navigate('/dashboard/admin-all-course');
                    toast.success("Your course has been posted");
                }
            })
            .catch((error) => {
                toast.error("Failed to post course");
            });
    };

    // Handle adding new course link input fields
    const handleAddCourseLink = () => {
        setCourseLinks([...courseLinks, { link: "" }]);
    };

    // Handle removing a course link
    const handleRemoveCourseLink = (index) => {
        const updatedLinks = [...courseLinks];
        updatedLinks.splice(index, 1);
        setCourseLinks(updatedLinks);
    };

    // Handle input changes for the course link
    const handleCourseLinkChange = (index, event) => {
        const updatedLinks = [...courseLinks];
        updatedLinks[index].link = event.target.value;
        setCourseLinks(updatedLinks);
    };

    return (
        <div className="mt-12 mb-8 flex flex-col gap-12">
            <Card className=''>
                <CardHeader className="mb-8 p-6 bg-blue-500">
                    <div className='flex justify-between items-center'>
                        <Typography variant="h6" color="white">
                            Add Course
                        </Typography>
                    </div>
                </CardHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="px-7 h-screen">
                    <div className="grid gap-6" id="form">
                        <div className="w-full flex gap-3">
                            <input {...register("course_title", { required: true })} 
                                className="capitalize shadow-2xl p-3 ex w-full outline-none focus:border-solid focus:border-[1px] border-[#035ec5] placeholder:text-black" 
                                type="text" 
                                placeholder="Course Title" 
                                id=""
                            />
                        </div>

                        {/* Dynamically rendered course links */}
                        <div className="w-full flex flex-col gap-3">
                            {courseLinks.map((courseLink, index) => (
                                <div key={index} className="flex gap-3">
                                    <input
                                        className="capitalize shadow-2xl p-3 ex w-full outline-none focus:border-solid focus:border-[1px] border-[#035ec5] placeholder:text-black"
                                        type="text"
                                        placeholder={`Course Link ${index + 1}`}
                                        value={courseLink.link}
                                        onChange={(e) => handleCourseLinkChange(index, e)}
                                    />
                                    {index > 0 && (
                                        <button
                                            type="button"
                                            className="bg-red-500 text-white px-2 rounded"
                                            onClick={() => handleRemoveCourseLink(index)}
                                        >
                                            Remove
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button
                                type="button"
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                                onClick={handleAddCourseLink}
                            >
                                Add More Links
                            </button>
                        </div>

                        <div className="grid gap-6 w-full">
                            <textarea
                                className="p-3 shadow-2xl glass w-full placeholder:text-black outline-none focus:border-solid border-[#035ec5] focus:border-[1px]"
                                type="text"
                                placeholder="About course"
                                id="textarea"
                                {...register("about_course", { required: true })}
                            />
                            <input
                                {...register("dateTime", { required: true })}
                                className="p-3 shadow-2xl glass w-full text-black outline-none focus:border-solid focus:border-[1px]border-[#035ec5]"
                                type="datetime-local"
                                required=""
                            />
                        </div>

                        <button
                            type='submit'
                            className="outline-none glass shadow-2xl w-full p-3 bg-[#ffffff42] hover:border-[#035ec5] hover:border-solid hover:border-[1px] hover:text-[#035ec5] font-bold"
                        >
                            Add Course
                        </button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default AddCourse;
