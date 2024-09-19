
import { Link, NavLink } from "react-router-dom";
import { MdAddAPhoto } from "react-icons/md";
import { Button, IconButton, Typography } from "@material-tailwind/react";
import { useMaterialTailwindController } from "@/context";
import { FaHome } from "react-icons/fa";

const StudentNav = () => {
    const [controller, dispatch] = useMaterialTailwindController();
    const { sidenavType, openSidenav } = controller;
    const sidenavTypes = {
      dark: "bg-gradient-to-br from-gray-800 to-gray-900",
      white: "bg-white shadow-sm",
      transparent: "bg-transparent",
    };
    return (
        <>
            <li>
                <NavLink to='/dashboard/live-class'>
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
                        live class
                      </Typography>
                    </Button>
                  )}
                </NavLink>
          </li>
          <li>
                <NavLink to='/dashboard/all-course'>
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
                        all course
                      </Typography>
                    </Button>
                  )}
                </NavLink>
          </li>
          <li>
                <NavLink to='/dashboard/my-homeworks'>
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
                        my homeworks
                      </Typography>
                    </Button>
                  )}
                </NavLink>
          </li>
          <li>
                <NavLink to='/dashboard/withdrawals'>
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
                        withdrawals
                      </Typography>
                    </Button>
                  )}
                </NavLink>
          </li>
          <li>
                <NavLink to='/dashboard/my-passbook'>
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
                        my passbook
                      </Typography>
                    </Button>
                  )}
                </NavLink>
          </li>
          <li>
                <NavLink to='/dashboard/affliate-marketing'>
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
                        affliate marketing
                      </Typography>
                    </Button>
                  )}
                </NavLink>
          </li>
          <li>
                <NavLink to='/dashboard/reference'>
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
                        reference
                      </Typography>
                    </Button>
                  )}
                </NavLink>
          </li> 
          <li>
            <NavLink to="/dashboard/upload-image">
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
                  <MdAddAPhoto />
                  <Typography
                    color="inherit"
                    className="font-medium text-sm capitalize"
                  >
                    Upload Image
                  </Typography>
                </Button>
              )}
            </NavLink>
          </li>
        </>
    );
};

export default StudentNav;