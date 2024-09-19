
import {  NavLink } from "react-router-dom";

import { Button, Typography } from "@material-tailwind/react";
import { useMaterialTailwindController } from "@/context";
import { FaHome } from "react-icons/fa";

const TeamLeader = () => {
    const [controller] = useMaterialTailwindController();
    const { sidenavType } = controller;
    return (
        <>
            <li>
                <NavLink to='/dashboard/team-leader-member'>
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
                        team member
                      </Typography>
                    </Button>
                  )}
                </NavLink>
          </li>
            <li>
                <NavLink to='/dashboard/team-leader-student'>
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
                        active student list
                      </Typography>
                    </Button>
                  )}
                </NavLink>
          </li>
            <li>
                <NavLink to='/dashboard/create-trainer'>
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
                        Create Trainer
                      </Typography>
                    </Button>
                  )}
                </NavLink>
          </li>
          <li>
                <NavLink to='/dashboard/team-leader-trainer'>
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
                        trainer list
                      </Typography>
                    </Button>
                  )}
                </NavLink>
          </li>
          <li>
                <NavLink to='/dashboard/team-leader-active-member'>
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
                        active member
                      </Typography>
                    </Button>
                  )}
                </NavLink>
          </li>
          <li>
                <NavLink to='/dashboard/team-leader-inactive-member'>
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
                        in active member
                      </Typography>
                    </Button>
                  )}
                </NavLink>
          </li>
          <li>
                <NavLink to='/dashboard/member-lead-Data'>
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
                        member lead data
                      </Typography>
                    </Button>
                  )}
                </NavLink>
          </li>
        </>
    );
};

export default TeamLeader;