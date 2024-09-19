import { AuthContext } from '@/providers/AuthProvider';
import axios from 'axios';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

  const axiosSecure = axios.create({
    baseURL:import.meta.env.VITE_local_host
})
const useAxiosSecure = () => {
  const navigate = useNavigate();
  const {logOut} = useContext(AuthContext);
    axiosSecure.interceptors.request.use(function(config){
      const token = localStorage.getItem('access-token');
      console.log('request stopped by interseptors', token);
      config.headers.authorization = `Bearer ${token}`
      return config;
    }, function(error) {
      return Promise.reject(error);
    });



    // intersepts 401 and 403
    axiosSecure.interceptors.response.use(function(response) {
      return response;
    },async (error) => {
      const status = error.response.status;
      console.log("status error ", status)
      if(status === 401 || status === 403) {
        await logOut();
        navigate('/auth/sign-in')
      }
      return Promise.reject(error);
    })




    return axiosSecure;
};

export default useAxiosSecure;