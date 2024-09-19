import React, { useState } from 'react';
import useAxiosPublic from '@/hooks/axiosPublic';
import { useQuery } from 'react-query';
import { Spinner, Typography } from '@material-tailwind/react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export const AllCourse = () => {
    const axiosPublic = useAxiosPublic();
    const [isLoading, setIsLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [selectedCourseLinks, setSelectedCourseLinks] = useState([]); // To store the selected course links
    const { refetch, data: isCourses = [] } = useQuery({
        queryKey: ["isCourses"],
        queryFn: async () => {
            const res = await axiosPublic.get("/courseData");
            setIsLoading(false);
            return res.data;
        },
    });

    const handleClickOpen = (courseLinks) => {
        console.log(courseLinks)
        setSelectedCourseLinks(courseLinks); // Set the course links when opening the dialog
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            {isLoading ? (
                <Typography className="text-center text-4xl text-blue-gray-500 flex justify-center items-center h-screen">
                    <Spinner className="h-10 w-10" color="blue" />
                </Typography>
            ) : (
                <div className="mx-auto my-20 max-w-screen">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-4 justify-items-center">
                        {isCourses.map((item, index) => (
                            <div key={item._id} className="transform relative transition duration-300 hover:scale-110 rounded-lg shadow-lg md:h-68 h-full w-full md:w-56 hover:shadow-xl bg-white">
                                <div className="bg-gradient-to-br from-rose-100 via-purple-200 to-purple-200 m-2 h-3/6 rounded-lg">
                                    <img className="w-28 mx-auto md:mx-0" src="https://png.pngtree.com/png-vector/20230408/ourmid/pngtree-assignment-flat-icon-vector-png-image_6696151.png" alt="" />
                                </div>
                                <div className="absolute top-0 right-0 px-4 py-2 font-bold text-2xl"># {index + 1}</div>

                                <div className="px-5 flex flex-col space-y-2">
                                    <h2 className="font-semibold">{item.course_title}</h2>
                                    <h2 className="font-semibold">{item.dateTime}</h2>

                                    <button
                                        onClick={() => handleClickOpen(item.courseLinks)} // Pass course links when clicked
                                        className="bg-blue-500 cursor-pointer text-xs text-white px-2 py-1 mt-2 rounded-md transition duration-150 hover:bg-blue-600"
                                        type="button"
                                    >
                                        View Link
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Course Links</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Here are the links to your course:
                    </DialogContentText>
                    {selectedCourseLinks.map((link, index) => (
                        <div key={index}>
                            <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-600">
                                {link}
                            </a>
                        </div>
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AllCourse;
