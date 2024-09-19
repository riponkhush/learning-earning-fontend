import {  NavLink } from "react-router-dom";
import { Button,  Typography } from "@material-tailwind/react";
import { useMaterialTailwindController} from "@/context";
import { IoIosBookmark } from "react-icons/io";
import { GiTeamIdea } from "react-icons/gi";
import { IoIosList } from "react-icons/io";
const SeniorteamLeaders = () => {
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
                <NavLink to='/dashboard/create-team-leader'>
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
                       create team leader
                      </Typography>
                    </Button>
                  )}
                </NavLink>
        </li>
        <li>
                <NavLink to='/dashboard/senior-student'>
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
                       map active student
                      </Typography>
                    </Button>
                  )}
                </NavLink>
        </li>
        <li>
                <NavLink to='/dashboard/team-member'>
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
                <NavLink to='/dashboard/passbook'>
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
        <li>
                <NavLink to='/dashboard/reference-membe'>
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
                      <IoIosList   />
                      <Typography
                        color="inherit"
                        className="font-medium text-sm capitalize"
                      >
                        reference memeber
                      </Typography>
                    </Button>
                  )}
                </NavLink>
        </li>
        <li>
                <NavLink to='/dashboard/team-leaded-id'>
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
                      <IoIosList   />
                      <Typography
                        color="inherit"
                        className="font-medium text-sm capitalize"
                      >
                        team leader mapping
                      </Typography>
                    </Button>
                  )}
                </NavLink>
        </li>
        <li>
                <NavLink to='/dashboard/team-leaded-list'>
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
                      <IoIosList   />
                      <Typography
                        color="inherit"
                        className="font-medium text-sm capitalize"
                      >
                        team leader list
                      </Typography>
                    </Button>
                  )}
                </NavLink>
        </li>
        <li>
                <NavLink to='/dashboard/mapping-trainer-id'>
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
                      <IoIosList  />
                      <Typography
                        color="inherit"
                        className="font-medium text-sm capitalize"
                      >
                        mapping to tainer id
                      </Typography>
                    </Button>
                  )}
                </NavLink>
        </li>
        <li>
                <NavLink to='/dashboard/trainer-list'>
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
                      <IoIosList  />
                      <Typography
                        color="inherit"
                        className="font-medium text-sm capitalize"
                      >
                        trainer list
                      </Typography>
                    </Button>
                  )}
                </NavLink>
        </li>
        </>
    );
};

export default SeniorteamLeaders;