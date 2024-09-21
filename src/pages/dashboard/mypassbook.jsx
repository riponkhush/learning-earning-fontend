import useAxiosPublic from "@/hooks/axiosPublic";
import { AuthContext } from "@/providers/AuthProvider";
import { Card, CardHeader,CardBody,Typography, Spinner, Avatar, Chip} from "@material-tailwind/react";
import { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";

export const Mypassbook = () => {
  const axiosPublic = useAxiosPublic();
  const [loading, setLoading] = useState(true);
  const {user} = useContext((AuthContext));
  const [isImages, setImages] = useState([]);
  const [totalBonus, setTotalBonus] = useState(0);
  const [totalPoint, setTotalPoint] = useState(0);
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

  useEffect(() => {
    axiosPublic.get(`/images`)
    .then(res => {
      const filterImage = res.data.filter(userImage => userImage.user === user.email);
      const sortedData = filterImage.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      const totalPoints = sortedData.reduce((sum, item) => sum + parseInt(item.like), 0);
      setTotalPoint(totalPoints)
      setImages(filterImage)
    })
  },[])

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.delete(`/images/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };




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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 justify-items-center">
                    <div className="bg-gradient-to-r text-center font-bold text-xl from-blue-200 to-purple-200 w-56 h-32 rounded-lg p-4 text-white">
                        Id Bonus
                    </div>
                    <div className="bg-gradient-to-r text-center font-bold text-xl from-blue-200 to-purple-200 w-56 h-32 rounded-lg p-4 text-white">
                        Refer Bonus
                    </div>
                    <div className="bg-gradient-to-r  from-blue-200 to-purple-200 w-56 h-32 rounded-lg p-4 ">
                       <h2 className="text-white text-center font-bold text-xl">Photo Bonus</h2>
                       <div>
                            <p className="text-center text-white mt-4 capitalize">Like's Point</p>
                              <div className="text-white text-center bg-deep-orange-50 h-6 w-48 mx-auto flex justify-center items-center rounded-2xl bg-gradient-to-r from-purple-300 to-purple-600">
                                  <h1 className="text-white text-sm">Total point: {totalPoint}</h1>
                            </div>
                       </div>
                    </div>
                    <div className="bg-gradient-to-r  from-blue-200 to-purple-200 w-56 h-32 rounded-lg p-4 ">
                       <h2 className="text-white text-center font-bold text-xl">Homework Bonus</h2>
                       <div>
                            <p className="text-center text-white mt-4 capitalize">Per homework bonus</p>
                              <div className="text-white text-center bg-deep-orange-50 h-6 w-48 mx-auto flex justify-center items-center rounded-2xl bg-gradient-to-r from-purple-300 to-purple-600">
                                  <h1 className="text-white text-sm">Total Bonus: {totalBonus} Taka</h1>
                            </div>
                       </div>
                    </div>
                </div>
                <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                            <table className="w-full min-w-[640px] table-auto col-span-4">
                            <thead>
                                <tr>
                                {["author", "like", "dislike", "date", "action"].map((el) => (
                                    <th
                                    key={el}
                                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                                    >
                                    <Typography
                                        variant="small"
                                        className="text-[11px] font-bold uppercase text-blue-gray-400"
                                    >
                                        {el}
                                    </Typography>
                                    </th>
                                ))}
                                </tr>
                            </thead>
                            <tbody>
                            {
                                isImages.map(item =>
                                    <tr key={item._id}>
                                    <td className="py-3 px-5">
                                    <div className="flex items-center gap-4">
                                        <Avatar src={item.image} alt="" size="sm" variant="rounded" />
                                        <div>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-semibold"
                                        >
                                            {item.name}
                                        </Typography>
                                        <Typography className="text-xs font-normal text-blue-gray-500">
                                            {item.photo_title}
                                        </Typography>
                                        </div>
                                    </div>
                                    </td>
                                    <td className="py-3 px-5">
                                    <Typography className="text-xs font-semibold text-blue-gray-600">
                                        {item.like}
                                    </Typography>
                                    </td>
                                    <td className="py-3 px-5">
                                    <Typography className="text-xs font-semibold text-blue-gray-600">
                                        {item.dislike}
                                    </Typography>
                                    </td>
                                    <td className="py-3 px-5">
                                    <Typography className="text-xs font-semibold text-blue-gray-600">
                                        {item.createdAt}
                                    </Typography>
                                    </td>
                                    <td className="py-3 px-5">
                                    <Typography
                                        className="text-xs font-semibold text-blue-gray-600"
                                    >
                                        <button className=" bg-red-400 text-white w-28 rounded-full shadow-2xl drop-shadow-2xl hover:bg-red-600 duration-500" onClick={() => handleDelete(item._id)} >Image Delete</button>
                                    </Typography >
                                    </td>
                                </tr>)
                                }
                            </tbody>
                            </table>
                  </CardBody>
            </Card>
          </div>
          )
        }
      </div>
    );
};

export default Mypassbook;