import useAxiosPublic from "@/hooks/axiosPublic";
import { AuthContext } from "@/providers/AuthProvider";
import { Card, CardHeader,CardBody,Typography, Spinner} from "@material-tailwind/react";
import { useContext, useState } from "react";
import { useQuery } from "react-query";


export const Mypassbook = () => {
  const axiosPublic = useAxiosPublic();
  const [loading, setLoading] = useState(true);
  const {user} = useContext((AuthContext));
  const [totalBonus, setTotalBonus] = useState(0);
  const { refetch, data: isBonus = [] } = useQuery({
    queryKey: ["isBonus", user?.email],
    queryFn: async () => {
        const res = await axiosPublic.get(`/submitHomework?studentEmail=${user.email}`);
        const homeworkData = res.data;
        const total = homeworkData.reduce((sum, item) => sum + parseInt(item.bonus), 0);
        setTotalBonus(total)
        setLoading(false)
      return (homeworkData)
    },
  });

    return (
      <div>
        {
          loading ? (
            <Typography className="text-center text-4xl text-blue-gray-500 flex justify-center items-center h-screen"><Spinner className="h-10 w-10" color="blue" /></Typography>
          ) : (
            <div className="mt-12 mb-8 flex flex-col gap-12">
            <Card className="">
              <CardHeader className="mb-8 p-6 bg-blue-500">
                <Typography variant="h6" color="white">
                  My Passbook
                </Typography>
              </CardHeader>
                <div className="flex justify-evenly  h-screen">
                    <div className="bg-gradient-to-r text-center font-bold text-xl from-blue-300 to-blue-600 w-60 h-60 rounded-lg p-4 text-white">
                        Id Bonus
                    </div>
                    <div className="bg-gradient-to-r text-center font-bold text-xl from-blue-300 to-blue-600 w-60 h-60 rounded-lg p-4 text-white">
                        Refer Bonus
                    </div>
                    <div className="bg-gradient-to-r  from-blue-300 to-blue-600 w-60 h-60 rounded-lg p-4 ">
                       <h2 className="text-white text-center font-bold text-xl">Homework Bonus</h2>
    
                       <div>
                            <p className="text-center text-white mt-4 capitalize">Per homework bonus</p>
                              <div className="text-white text-center space-y-4 bg-deep-orange-50 h-24 w-48 mx-auto flex justify-center items-center rounded-2xl bg-gradient-to-r from-purple-300 to-purple-600">
                                  <h1 className="text-white">Total Bonus: {totalBonus} Taka</h1>
                            </div>
                       </div>
                    </div>
                </div>
            </Card>
          </div>
          )
        }
      </div>
    );
};

export default Mypassbook;