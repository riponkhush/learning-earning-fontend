import {  NavLink } from "react-router-dom";
import { Button,  Typography } from "@material-tailwind/react";
import { useMaterialTailwindController} from "@/context";
import { IoIosBookmark } from "react-icons/io";
import { GiTeamIdea } from "react-icons/gi";

const Trainer = () => {
    const [controller, ] = useMaterialTailwindController();
    const { sidenavType,  } = controller;
    const sidenavTypes = {
      dark: "bg-gradient-to-br from-gray-800 to-gray-900",
      white: "bg-white shadow-sm",
      transparent: "bg-transparent",
    };
    return (
        <>
              <li>
                <NavLink to='/dashboard/trainer-team-member'>
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
                        <GiTeamIdea />
                      <Typography
                        color="inherit"
                        className="font-medium text-sm capitalize"
                      >
                        team member
                      </Typography>
                    </Button>
                  )}
                </NavLink>
        </li>
        <li>
                <NavLink to='/dashboard/trainer-active-member'>
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
                      <GiTeamIdea />
                      <Typography
                        color="inherit"
                        className="font-medium text-sm capitalize"
                      >
                        active member
                      </Typography>
                    </Button>
                  )}
                </NavLink>
        </li>
        <li>
                <NavLink to='/dashboard/trainer-inactive-member'>
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
                      <GiTeamIdea />
                      <Typography
                        color="inherit"
                        className="font-medium text-sm capitalize"
                      >
                        in active member
                      </Typography>
                    </Button>
                  )}
                </NavLink>
        </li>
        <li>
                <NavLink to='/dashboard/trainer-refer-member'>
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
                      <GiTeamIdea />
                      <Typography
                        color="inherit"
                        className="font-medium text-sm capitalize"
                      >
                        reference member
                      </Typography>
                    </Button>
                  )}
                </NavLink>
        </li>
        <li>
                <NavLink to='/dashboard/trainer-passbook'>
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
                      <IoIosBookmark  />
                      <Typography
                        color="inherit"
                        className="font-medium text-sm capitalize"
                      >
                        passbook
                      </Typography>
                    </Button>
                  )}
                </NavLink>
        </li>
        </>
    );
};

export default Trainer;