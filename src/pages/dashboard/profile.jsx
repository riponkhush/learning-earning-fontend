import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Avatar,
  Typography,
  Tabs,
  TabsHeader,
  Tab,
  Switch,
  Tooltip,
  Button,
  Spinner,
} from "@material-tailwind/react";
import {
  HomeIcon,
  ChatBubbleLeftEllipsisIcon,
  Cog6ToothIcon,
  PencilIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { ProfileInfoCard, MessageCard } from "@/widgets/cards";
import { platformSettingsData, conversationsData, projectsData } from "@/data";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import useAxiosPublic from "@/hooks/axiosPublic";
import Loader from "@/widgets/layout/Loader";

export function Profile() {
  const axiosPublic = useAxiosPublic();
  const[isUser, setIsUser] = useState([]);
  const [loading, setLoading] = useState(true); 
  const { user } = useContext(AuthContext);
  useEffect(() => {
    axiosPublic.get('/createUsers')
    .then(res => {
      const userProfile = res.data.find(item => item.email === user.email);
      setLoading(false)
      setIsUser(userProfile)
    })
  },[])
  return (
      <div>
        {
          loading ? (
            <Typography className="text-center text-4xl text-blue-gray-500 flex justify-center items-center h-screen"><Spinner className="h-10 w-10" color="blue" /></Typography>
          ) : (
            <div>
            <div
              className={`relative mt-8 h-80 w-full overflow-hidden rounded-xl bg-cover bg-center`}
              style={{ backgroundImage: `url(${isUser.image})` }}
            >
              <div className="absolute inset-0 h-full w-full bg-blue-600 opacity-50" />
            </div>
            <Card className="mx-3 -mt-16 mb-6 lg:mx-4 border border-blue-gray-100">
                    <CardBody className="p-4">
                      <div className="mb-10 flex items-center justify-between flex-wrap gap-6">
                        <div className="flex items-center gap-6">
                          <Avatar
                            src={isUser.image}
                            alt="bruce-mars"
                            size="xl"
                            variant="rounded"
                            className="rounded-lg shadow-lg shadow-blue-gray-500/40"
                          />
                          <div>
                            <Typography variant="h5" color="blue-gray" className="mb-1">
                            {isUser.name}
                            </Typography>
                            <Typography
                              variant="small"
                              className="font-normal text-blue-gray-600"
                            >
                              Email - {user?.email}
                            </Typography>
                          </div>
                        </div>
 
                      </div>
                      <div className="gird-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-2 xl:grid-cols-3">
                        <ProfileInfoCard
                          title="Profile Information"
                          description="Hi, I'm Alec Thompson, Decisions: If you can't decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality)."
                          details={{
                            "first name": isUser.name,
                            mobile: isUser.number,
                            email: isUser.email,
                            social: (
                              <div className="flex items-center gap-4">
                                <i className="fa-brands fa-facebook text-blue-700" />
                                <i className="fa-brands fa-twitter text-blue-400" />
                                <i className="fa-brands fa-instagram text-purple-500" />
                              </div>
                            ),
                          }}
                          action={
                            <Tooltip content="Edit Profile">
                              <PencilIcon className="h-4 w-4 cursor-pointer text-blue-gray-500" />
                            </Tooltip>
                          }
                        />
                      </div>
                    </CardBody>
            </Card>
          </div>
          )
        }
      </div>
  );
}

export default Profile;
