import { useContext, useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';
import useAxiosPublic from '@/hooks/axiosPublic';
import { useQuery } from 'react-query';
import { AuthContext } from '@/providers/AuthProvider';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Spinner, Typography } from '@material-tailwind/react';

const Homework = () => {
    const [open, setOpen] = useState(false);
    const [selectedHomework, setSelectedHomework] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const axiosPublic = useAxiosPublic();
    const { user } = useContext(AuthContext);

    const { refetch, data: isCourses = [] } = useQuery({
        queryKey: ["isCourses"],
        queryFn: async () => {
            const res = await axiosPublic.get("/studentHomework");
            const sortedData = res.data.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));
            setIsLoading(false);
            return sortedData;
        },
    });

    useEffect(() => {
        const lastSubmittedTime = localStorage.getItem('lastSubmittedTime');
        if (lastSubmittedTime) {
            const currentTime = new Date().getTime();
            const timeDifference = currentTime - parseInt(lastSubmittedTime);

            if (timeDifference < 60) {     //3600000 barano jabe
                setIsButtonDisabled(true);
                const remainingTime = 60 - timeDifference;
                setTimeout(() => {
                    setIsButtonDisabled(false);
                    localStorage.removeItem('lastSubmittedTime');
                }, remainingTime);
            }
        }
    }, []);

    const handleClickOpen = (item) => {
        setSelectedHomework(item);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedHomework(null);
    };

    const handleHomework = (data) => {
        const currentDate = new Date();
        const localTime = currentDate.toLocaleString();
        const dataInfo = {
            ...data, 
            assignmentId: selectedHomework._id,
            createdAt: localTime,
            bonus: "100"
        };
        
        try {
            axiosPublic.post('/submitHomework', dataInfo)
                .then(res => {
                    refetch();
                    toast.success('Homework submitted successfully and get Bonus');
                    localStorage.setItem('lastSubmittedTime', new Date().getTime());

                    setIsButtonDisabled(true);
                    setTimeout(() => {
                        setIsButtonDisabled(false);
                        localStorage.removeItem('lastSubmittedTime');
                    }, 60); 
                });
        } catch (error) {
            toast.error('Not submitted', error);
        }
    };

    const { register, handleSubmit } = useForm();

    return (
        <div>
            {
                isLoading ? (
                    <Typography className="text-center text-4xl text-blue-gray-500 flex justify-center items-center h-screen"><Spinner className="h-10 w-10" color="blue" /></Typography>

                ): (
                    <div className="md:my-14 my-6">
                    <div className="bg-blue-600 w-44 ml-auto mb-8 p-2 rounded-l-full">
                        <h2 className="text-sm text-white text-center">Category Name</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-4 justify-items-center">
                        {isCourses.map((item, index) => 
                            <div key={item._id} className="transform relative transition duration-300 hover:scale-110 rounded-lg shadow-lg md:h-52 h-full w-full md:w-60 hover:shadow-xl bg-white">
                                <div className="bg-gradient-to-br from-rose-100 via-purple-200 to-purple-200 m-2 h-3/6 rounded-lg">
                                    <img className="w-28 mx-auto md:mx-0" src="https://png.pngtree.com/png-vector/20230408/ourmid/pngtree-assignment-flat-icon-vector-png-image_6696151.png" alt="" />
                                </div>
                                <div className="absolute top-0 right-0 px-4 py-2 font-bold text-2xl"># {index + 1}</div>
                                <div className="px-5 pt-2 flex flex-col">
                                    <h2 className="font-semibold">Title: {item.homework}</h2>
                                    <h2 className="text-xs">Post: {item.createdAt}</h2>
        
                                    <button 
                                        onClick={() => handleClickOpen(item)}
                                        className="bg-blue-500 cursor-pointer text-white px-2 mt-2 rounded-md transition duration-150 hover:bg-blue-600"
                                        type="button"
                                    >
                                        View
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                    
                    {selectedHomework && (
                        <Dialog
                            open={open}
                            onClose={handleClose}
                            PaperProps={{
                                component: 'form',
                                onSubmit: handleSubmit(handleHomework),
                            }}
                        >
                            <DialogTitle>Download file</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    {selectedHomework.about_homework}
                                </DialogContentText>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    label="Your email"
                                    type="email"
                                    fullWidth
                                    variant="standard"
                                    {...register("studentEmail", { required: true })}
                                    defaultValue={user.email}
                                />
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    label="Your homework category"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    {...register("category")}
                                    defaultValue={selectedHomework.category}
                                />
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    label="Your homework"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    {...register("homework")}
                                    defaultValue={selectedHomework.homework}
                                />
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    label="Give homework link"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    {...register("homeworkLink", { required: true })}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button type="submit" disabled={isButtonDisabled}>
                                    {isButtonDisabled ? 'Please wait...' : 'Submit'}
                                </Button>
                            </DialogActions>
                        </Dialog>
                    )}
                </div>
                )
            }
        </div>
    );
};

export default Homework;
