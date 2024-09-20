import React, { useContext, useEffect, useState } from "react";
import {Typography,
  Card,
  CardHeader,
  CardBody,
  Avatar,
  Tooltip,
  Spinner,
} from "@material-tailwind/react";
import {ArrowUpIcon} from "@heroicons/react/24/outline";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay } from 'swiper/modules';
import useAxiosPublic from "@/hooks/axiosPublic";
import { FcCallback } from "react-icons/fc";
import { AuthContext } from "@/providers/AuthProvider";
import { Link } from "react-router-dom";
import img1 from '../../assets/slider image/bg1.jpg'
import img2 from '../../assets/slider image/bg2.jpg'
import img3 from '../../assets/slider image/bg3.jpg'
import img4 from '../../assets/slider image/bg4.jpg'
import img5 from '../../assets/slider image/bg5.jpg'
export function Home() {
  const {user} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [ isNoticed, setIsNoticed] = useState([]);
  const [isSeniorTeam, setIsSeniorTeam] = useState([])
  const [isTeamLeader, setIsTeamLeader] = useState([])
  const [isTestimonial, setIsTestimonial] = useState([]);
  const axiosPublic = useAxiosPublic();
  const [isStatus, setIsStatus] = useState([])

  useEffect(() => {
    axiosPublic.get('/createUsers')
    .then(res => {
      const supportedTeam = res.data.filter(user => 
        user.role.includes("Senior Team Leader")
      )
      setLoading(false)
      setIsSeniorTeam(supportedTeam)
    })
  },[])

  useEffect(() => {
    axiosPublic.get('/createUsers')
    .then(res => {
      const supportedTeam = res.data.filter(user => 
        user.role.includes("Team Leader")
      )
      setLoading(false)
      setIsTeamLeader(supportedTeam)
    })
  },[])

useEffect(() => {
  axiosPublic.get('/authorInfo')
  .then(res => {
    setLoading(false)
    setIsTestimonial(res.data)
  })
},[])

  useEffect(() => {
      axiosPublic.get('/createUsers')
      .then(res => {
        const loggedUser = res.data.find(userMan => userMan.email === user.email);
        setLoading(false)
        setIsStatus(loggedUser)
      })
  },[])

  useEffect(() => {
    axiosPublic.get('/notices')
    .then(res => {
      const sortedData = res.data.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));
      setIsNoticed(sortedData);
      setLoading(false);
    })
  },[])



  return (
      <div>
        {
          loading ? (
            <Typography className="text-center text-4xl text-blue-gray-500 flex justify-center items-center h-screen"><Spinner className="h-10 w-10" color="blue" /></Typography>
          ) : (

            <div className="mt-4">
            <div className="flex justify-between px-6 shadow-lg py-2 rounded-lg items-center bg-gray-200">
              <p className="capitalize text-purple-500 font-extrabold">{isStatus.role}</p>
              <p className="capitalize text-purple-500 font-extrabold bg-blue-100 rounded-full w-32 text-center">{isStatus.status}</p>
            </div>
          <div className="relative mt-2 h-72 w-full overflow-hidden rounded-xl bg-[url('/img/background-image.png')] bg-cover	bg-center">
          <div className="absolute inset-0 h-full w-full bg-blue-600" />
          </div>
          <div className="mb-4 mx-3 -mt-10 grid grid-cols-1 gap-6 xl:grid-cols-3">
            <Card className="overflow-hidden xl:col-span-2 border border-blue-gray-100 shadow-sm">
              <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="m-0 flex items-center justify-between p-6"
              >
                <div>
                  <Typography variant="h6" color="blue-gray" className="mb-1">
                  Senior Team Leader
                  </Typography>
                </div>
              </CardHeader>
              <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                <table className="w-full min-w-[640px] table-auto">
                  <thead>
                    <tr>
                      {["name","image", "whatsApp number", "status"].map(
                        (el) => (
                          <th
                            key={el}
                            className="border-b border-blue-gray-50 py-3 px-6 text-center"
                          >
                            <Typography
                              variant="small"
                              className="text-[11px] font-medium uppercase text-blue-gray-400"
                            >
                              {el}
                            </Typography>
                          </th>
                        )
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {
                      isSeniorTeam.slice(0, 5).map(item=>                     
                      <tr key={item._id} className="border-b border-blue-gray-50 py-3 px-6 text-center">
                          <td>    
                            <Tooltip>
                              <Avatar className="my-1" src={item.image} alt="" size="sm" />
                            </Tooltip>
                        </td>
                        <td>
                          <div className="">
                                <Typography variant="small" color="blue-gray" className="font-bold" >
                                {item.name}
                                </Typography>
                          </div>
                        </td>
                        <td >
                          <Typography variant="small" className="text-xs font-medium text-blue-gray-600">
                                    <button className="flex items-center justify-center w-full bg-blue-50 text-sm rounded-lg mx-auto gap-4 py-2">{item.number}<FcCallback /></button>
                            </Typography>
                        </td>
                          <td >
                            <Typography variant="small" className="text-xs font-medium text-blue-gray-600" >
                                {item.role}
                            </Typography>
                        </td>
                      </tr>)
                    }
                  </tbody>
                </table>
              </CardBody>
            </Card>
              <div>
                {
                  loading ? (
                    <Typography className="text-center text-4xl text-blue-gray-500 flex justify-center items-center h-screen"><Spinner className="h-10 w-10" color="blue" /></Typography>

                  ): (
                    <Card className="border border-blue-gray-100 shadow-sm">
                    <CardHeader
                      floated={false}
                      shadow={false}
                      color="transparent"
                      className="m-0 p-6"
                    >
                      <Typography variant="h6" color="blue-gray" className="mb-2">
                        Notice Board
                      </Typography>
                      <Typography
                        variant="small"
                        className="flex items-center gap-1 font-normal text-blue-gray-600"
                      >
                        <ArrowUpIcon
                          strokeWidth={3}
                          className="h-3.5 w-3.5 text-green-500"
                        />
                      </Typography>
                    </CardHeader>
                    <CardBody className="pt-0">
                      {
                        isNoticed.slice(0, 4).map(item => 
                          <div  key={item._id} className="flex items-start gap-4 py-3 divide-y">
                            <Link to={`/dashboard/notice-details/${item._id}`}>
                              <div>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="block font-medium"
                                >
                                  {item.news_title}
                                </Typography>
                                <Typography
                                  as="span"
                                  variant="small"
                                  className="text-xs font-medium text-blue-gray-500"
                                >
                                  {item.about_news}
                                </Typography>
                              </div>
                            </Link>
                          </div>
                        )
                      }
                    </CardBody>
                  </Card>
                  )
                }
              </div>
          </div>
          <div>
          <Card className="overflow-hidden xl:col-span-2 border border-blue-gray-100 shadow-sm">
              <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="m-0 flex items-center justify-between p-6"
              >
                <div>
                  <Typography variant="h6" color="blue-gray" className="mb-1">
                  Team Leader
                  </Typography>
                </div>
              </CardHeader>
              <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                <table className="w-full min-w-[640px] table-auto">
                  <thead>
                    <tr>
                      {["name","image", "whatsApp number", "status"].map(
                        (el) => (
                          <th
                            key={el}
                            className="border-b border-blue-gray-50 py-3 px-6 text-center"
                          >
                            <Typography
                              variant="small"
                              className="text-[11px] font-medium uppercase text-blue-gray-400"
                            >
                              {el}
                            </Typography>
                          </th>
                        )
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {
                      isTeamLeader.slice(0, 4).map(item=>                     
                      <tr key={item._id} className="border-b border-blue-gray-50 py-3 px-6 text-center">
                          <td>    
                            <Tooltip>
                              <Avatar className="my-1" src={item.image} alt="" size="sm" />
                            </Tooltip>
                        </td>
                        <td>
                          <div className="">
                                <Typography variant="small" color="blue-gray" className="font-bold" >
                                {item.name}
                                </Typography>
                          </div>
                        </td>
                        <td >
                          <Typography variant="small" className="text-xs font-medium text-blue-gray-600">
                                    <button className="flex items-center justify-center w-full bg-blue-50 text-sm rounded-lg mx-auto gap-4 py-2">{item.number}<FcCallback /></button>
                            </Typography>
                        </td>
                          <td >
                            <Typography variant="small" className="text-xs font-medium text-blue-gray-600" >
                                {item.role}
                            </Typography>
                        </td>
                      </tr>)
                    }
                  </tbody>
                </table>
              </CardBody>
            </Card>
          </div>
                {/* author information */}
                <div className="mt-10">
                    <div>
                      <h2 className="text-2xl text-center font-bold text-gray-600">Most Hard working Author</h2>
                      <div className="border border-blue-600 w-96 mt-2 mx-auto"></div>
                    </div>
                    <div>
                <Swiper
                  slidesPerView={3}
                  spaceBetween={0}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                  modules={[Autoplay]}
                  breakpoints={{
                    320:{
                      slidesPerView:1,
                    },
                    640:{
                      slidesPerView:2,
                    },
                    1024:{
                      slidesPerView:3,
                    },
                  }}
                  className="mySwiper"
                >
              
                  {
                    isTestimonial.map(person => 
                      <SwiperSlide>
                      <div className="flex items-center justify-center py-10">
                        <div className="w-96 h-72 border-2 bg-transparent p-4 text-center shadow-lg bg-white">
                          <div className="mx-auto mb-4 flex items-center justify-center">
                            <img className="rounded-full h-32 w-32 object-cover" src={person.image} alt="" />
                          </div>
                            <div className="text-center">
                                <h2 className="font-bold text-blue-600 dark:text-indigo-400 capitalize">{person.author_name}</h2>
                              <p className=" text-gray-600 text-xs dark:text-gray-300 capitalize">{person.dasignation}</p>
                              <p className=" text-gray-600 text-xs dark:text-gray-300 capitalize">{person.author_email}</p>
                              <p className=" text-gray-600 text-xs dark:text-gray-300">{person.about_him}</p>
                            </div>
                        </div>
                      </div>
                    </SwiperSlide>
                    )
                  }
                </Swiper>
              </div>
                </div>


            <div className="mt-10">
              <div>
                <Swiper
                  slidesPerView={1}
                  spaceBetween={0}
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                  }}
                  modules={[Autoplay]}
                  className="mySwiper"
                >
                      <SwiperSlide>
                          <div className="w-full md:h-[500px] p-4">
                            <img className="object-cover w-full h-full" src={img1} alt="" />
                          </div>
                    </SwiperSlide>
                      <SwiperSlide>
                          <div className="w-full md:h-[500px] p-4">
                            <img className="object-cover w-full h-full" src={img2} alt="" />
                          </div>
                    </SwiperSlide>
                      <SwiperSlide>
                          <div className="w-full md:h-[500px] p-4">
                            <img className="object-cover w-full h-full" src={img3} alt="" />
                          </div>
                    </SwiperSlide>
                      <SwiperSlide>
                          <div className="w-full md:h-[500px] p-4">
                            <img className="object-cover w-full h-full" src={img4} alt="" />
                          </div>
                    </SwiperSlide>
                      <SwiperSlide>
                          <div className="w-full md:h-[500px] p-4">
                            <img className="object-cover w-full h-full" src={img5} alt="" />
                          </div>
                    </SwiperSlide>
                </Swiper>
              </div>
            </div>
          </div>
              )
            }
          </div>
  );
}

export default Home;
