import Select from '@mui/material/Select';
import { CardHeader, Typography } from "@material-tailwind/react";
import TextField from '@mui/material/TextField';
import { useContext, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import useAxiosPublic from '@/hooks/axiosPublic';
import { imageUpload } from '../../../hooks/useImageApi';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '@/providers/AuthProvider';
import { Spinner } from "@material-tailwind/react";
import toast from 'react-hot-toast';



const CreateUser = () => {
    const [selectedPerson, setSelectedPerson] = useState('');
    const {createUser, user } = useContext(AuthContext);
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
    const [loading, setLoading] = useState(false);
    const handlePersonChange = (event) => {
        setSelectedPerson(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        const form = event.target;
        const name = form.name.value;
        const number = form.number.value;
        const email = form.email.value;
        const password = form.password.value;
        const image = form.image.files[0];
        const role = selectedPerson;
        setLoading(true);
        try {
            const result = await createUser(email, password);
            
            const imageData = await imageUpload(image);
            const currentDate = new Date();
            const localTime = currentDate.toLocaleString();
            const userInfo = {
                name, 
                email, 
                password,
                number,
                image: imageData?.data?.display_url,
                role,
                status:"in active",
                createdAt: localTime,
                loginEmail: user.email
            }
            axiosPublic.post("/createUsers", userInfo).then((res) => {
                console.log(res.data)
            });
          } catch (error) {
            toast.error("Not create user", error)
            console.log(error);
          } finally {
            setLoading(false);
          }
    }

    return (
        <div>
            <CardHeader className="mb-8 mt-10 p-6 bg-blue-500"> 
                <Typography variant="h6" color="white">
                    Create Manager Id
                </Typography>
            </CardHeader>
            <div className="flex flex-col justify-center sm:px-6 lg:px-2">
                <div className="mt-8">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <form onSubmit={handleSubmit}>
                            {/* First Name and Last Name Fields */}
                            <div className="flex items-center justify-between gap-5">
                                <div className="w-full">
                                    <TextField type='text' name='name' required className="w-full" label="First name" variant="standard" />
                                </div>
                            </div>
                            <div className="flex items-center justify-between gap-5 mt-10">
                                <div className="w-full">
                                    <TextField type='text' name='number' required className="w-full" label="Phone number" variant="standard" />
                                </div>
                            </div>
                            <div className="flex items-center justify-between gap-5 mt-10">
                                <div className="w-full">
                                    <TextField type='email' name='email' required className="w-full" label="Email" variant="standard" />
                                </div>
                                <div className="w-full">
                                    <TextField type='password' name='password' required className="w-full" label="Password" variant="standard" />
                                </div>
                            </div>
                            {/* Role Select and File Upload */}
                            <div className="flex items-center justify-between gap-5 mt-10">
                                <div className="w-full flex items-center">
                                    <Select
                                        value={selectedPerson}
                                        onChange={handlePersonChange}
                                        displayEmpty
                                        variant="standard"
                                        className='w-full'
                                    >
                                        <MenuItem value="" disabled>Select Role</MenuItem>
                                        <MenuItem value="Manager">Manager</MenuItem>
                                        <MenuItem value="Controller">Controller</MenuItem>

                                    </Select>
                                </div>
                                <div className="w-full">
                                    <input type='file' name='image' required className="w-full mt-4" />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button type='submit' className='text-center w-full bg-blue-600 py-2 flex items-center gap-3 justify-center mt-10 rounded-md text-white hover:bg-blue-700 duration-500 shadow-2xl'>Submit {loading && <Spinner className="h-4 w-4" />}</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateUser;
