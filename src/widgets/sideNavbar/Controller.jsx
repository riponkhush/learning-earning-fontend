
import { CiViewList } from "react-icons/ci";
import {  NavLink } from "react-router-dom";

import { Button,  Typography } from "@material-tailwind/react";
import { useMaterialTailwindController} from "@/context";
import { FaHome } from "react-icons/fa";
const Controller = () => {
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
            <NavLink to="/dashboard/create-councilor">
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
                    create Councilor
                  </Typography>
                </Button>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/map-councilor">
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
                    map Councilor
                  </Typography>
                </Button>
              )}
            </NavLink>
          </li>
          <li>
                <NavLink to='/dashboard/all-student'>
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
                      <CiViewList  />
                      <Typography
                        color="inherit"
                        className="font-medium text-sm capitalize"
                      >
                        all student
                      </Typography>
                    </Button>
                  )}
                </NavLink>
          </li>
          <li>
                <NavLink to='/dashboard/all-active-student'>
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
                      <CiViewList  />
                      <Typography
                        color="inherit"
                        className="font-medium text-sm capitalize"
                      >
                        active Student
                      </Typography>
                    </Button>
                  )}
                </NavLink>
          </li>
          <li>
                <NavLink to='/dashboard/in-active-user'>
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
                      <CiViewList  />
                      <Typography
                        color="inherit"
                        className="font-medium text-sm capitalize"
                      >
                        in active Student
                      </Typography>
                    </Button>
                  )}
                </NavLink>
          </li>
          <li>
                <NavLink to='/dashboard/councilor-mapping-student'>
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
                      <CiViewList  />
                      <Typography
                        color="inherit"
                        className="font-medium text-sm capitalize"
                      >
                      student mapp to councilor
                      </Typography>
                    </Button>
                  )}
                </NavLink>
          </li>
          <li>
                <NavLink to='/dashboard/councilor-mapping-system'>
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
                      <CiViewList  />
                      <Typography
                        color="inherit"
                        className="font-medium text-sm capitalize"
                      >
                        councilor mapping system
                      </Typography>
                    </Button>
                  )}
                </NavLink>
          </li>
          <li>
                <NavLink to='/dashboard/mapping-students'>
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
                      <CiViewList  />
                      <Typography
                        color="inherit"
                        className="font-medium text-sm capitalize"
                      >
                        mapping student
                      </Typography>
                    </Button>
                  )}
                </NavLink>
          </li>
          <li>
                <NavLink to='/dashboard/not-mapping-student'>
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
                      <CiViewList  />
                      <Typography
                        color="inherit"
                        className="font-medium text-sm capitalize"
                      >
                        not mapping student
                      </Typography>
                    </Button>
                  )}
                </NavLink>
          </li>
          <li>
                <NavLink to='/dashboard/councilor-list'>
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
                      <CiViewList  />
                      <Typography
                        color="inherit"
                        className="font-medium text-sm capitalize"
                      >
                        Councilor  List
                      </Typography>
                    </Button>
                  )}
                </NavLink>
          </li>
          <li>
                <NavLink to='/dashboard/senior-team-mapping-member'>
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
                      <CiViewList  />
                      <Typography
                        color="inherit"
                        className="font-medium text-sm capitalize"
                      >
                        senior leader mapping
                      </Typography>
                    </Button>
                  )}
                </NavLink>
          </li>
        </>
    );
};

export default Controller;