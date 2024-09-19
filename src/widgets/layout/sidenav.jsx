import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Button, IconButton, Typography } from "@material-tailwind/react";
import { useMaterialTailwindController, setOpenSidenav } from "@/context";
import { FaHome } from "react-icons/fa";
import AdminNav from "../sideNavbar/Admin";
import ManagerNav from "../sideNavbar/Manager";
import StudentNav from "../sideNavbar/Student";
import { useContext, useEffect, useState } from "react";
import useAxiosPublic from "@/hooks/axiosPublic";
import Controller from "../sideNavbar/Controller";
import Councilor from "../sideNavbar/Councilor";
import { AuthContext } from "@/providers/AuthProvider";
import SeniorteamLeaders from "../sideNavbar/SeniorteamLeader";
import { TfiGallery } from "react-icons/tfi";
import { CgProfile } from "react-icons/cg";
import TeamLeader from "../sideNavbar/TeamLeader";
import Trainer from "../sideNavbar/Trainer";
import Teacher from "../sideNavbar/Teacher";
import { Spinner } from "@material-tailwind/react";
import Checker from "../sideNavbar/Checker";



export function Sidenav() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType, openSidenav } = controller;
  const { user } = useContext(AuthContext);
  const [userNav, setUserNav] = useState(null);
  const axiosPublic = useAxiosPublic();
  const [loading, setLoading] = useState(true);
  const sidenavTypes = {
    dark: "bg-gradient-to-br from-gray-800 to-gray-900",
    white: "bg-white shadow-sm",
    transparent: "bg-transparent",
  };

  useEffect(() => {
    if (user) {
      setLoading(true);
      axiosPublic.get('/createUsers').then((res) => {
        const loggedUserNav = res.data.find((nav) => nav.email === user.email);
        setUserNav(loggedUserNav);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      })
    }
  }, [user]);

  const renderNavigation = () => {
    if (!userNav || !userNav.role) return null; 

    switch (userNav.role) {
      case "Admin":
        return <AdminNav />;
      case "Manager":
        return <ManagerNav />;
      case "Student":
        return <StudentNav />;
      case "Controller":
        return <Controller />;
      case "Councilor":
        return <Councilor />;
      case "Senior Team Leader":
        return <SeniorteamLeaders></SeniorteamLeaders>;
      case "Team Leader":
        return <TeamLeader></TeamLeader>;
      case "Trainer":
        return <Trainer></Trainer>;
      case "Teacher":
        return <Teacher></Teacher>;
      case "Checker":
        return <Checker></Checker>;
      default:
        return null;
    }
  };

  return (
    <div>
            <aside
            className={`${sidenavTypes[sidenavType]} ${
              openSidenav ? "translate-x-0" : "-translate-x-80"
            } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72  rounded-xl transition-transform duration-300 xl:translate-x-0 border border-blue-gray-100 overflow-y-auto`}
          >
            <div className="relative">
              <Link to="/" className="py-6 px-8 text-center">
                <Typography
                  variant="h6"
                  color={sidenavType === "dark" ? "white" : "blue-gray"}
                >
                  Management System
                </Typography>
              </Link>
              <IconButton
                variant="text"
                color="white"
                size="sm"
                ripple={false}
                className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
                onClick={() => setOpenSidenav(dispatch, false)}
              >
                <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-white" />
              </IconButton>
            </div>
            <div className="m-4">
              <ul className="mb-4 flex flex-col gap-1">
                {/* General routes that are visible to all users */}
                <li>
                  <NavLink to="/dashboard/home">
                    {({ isActive }) => (
                      <Button
                        variant={isActive ? "gradient" : "text"}
                        color={
                          isActive
                            ? "blue"
                            : sidenavType === "dark"
                            ? "white"
                            : "blue-gray"
                        }
                        className="flex items-center gap-4 px-4 capitalize"
                        fullWidth
                      >
                        <FaHome />
                        <Typography
                          color="inherit"
                          className="font-medium text-sm capitalize"
                        >
                          Home
                        </Typography>
                      </Button>
                    )}
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/profile">
                    {({ isActive }) => (
                      <Button
                        variant={isActive ? "gradient" : "text"}
                        color={
                          isActive
                            ? "blue"
                            : sidenavType === "dark"
                            ? "white"
                            : "blue-gray"
                        }
                        className="flex items-center gap-4 px-4 capitalize"
                        fullWidth
                      >
                        <CgProfile  />
                        <Typography
                          color="inherit"
                          className="font-medium text-sm capitalize"
                        >
                          Profile
                        </Typography>
                      </Button>
                    )}
                  </NavLink>
                </li>
  
                    {
                      loading ? (
                        <Typography color="blue-gray"><Spinner className="h-10 w-10" color="blue" /></Typography>
                      ) : (
                        renderNavigation()
                      )
                    }
  
                <li>
                  <NavLink to="/dashboard/photo-&-gallery">
                    {({ isActive }) => (
                      <Button
                        variant={isActive ? "gradient" : "text"}
                        color={
                          isActive
                            ? "blue"
                            : sidenavType === "dark"
                            ? "white"
                            : "blue-gray"
                        }
                        className="flex items-center gap-4 px-4 capitalize"
                        fullWidth
                      >
                        <TfiGallery  />
                        <Typography
                          color="inherit"
                          className="font-medium text-sm capitalize"
                        >
                          Photo Gallery
                        </Typography>
                      </Button>
                    )}
                  </NavLink>
                </li>
  
              </ul>
            </div>
          </aside>
    </div>
  );
}

Sidenav.defaultProps = {
  brandImg: "/img/logo-ct.png",
  brandName: "Material Tailwind React",
};

Sidenav.propTypes = {
  brandImg: PropTypes.string,
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Sidenav.displayName = "/src/widgets/layout/sidenav.jsx";

export default Sidenav;
