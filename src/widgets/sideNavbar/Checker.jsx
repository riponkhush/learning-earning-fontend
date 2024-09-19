
import { CiViewList } from "react-icons/ci";
import {  NavLink } from "react-router-dom";

import { Button,  Typography } from "@material-tailwind/react";
import { useMaterialTailwindController} from "@/context";
import { FaHome } from "react-icons/fa";

const Checker = () => {
    const [controller, ] = useMaterialTailwindController();
    const { sidenavType,  } = controller;
    return (
        <>
            <li>
                <NavLink to='/dashboard/all-homeworks'>
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
                        All Homeworks
                      </Typography>
                    </Button>
                  )}
                </NavLink>
          </li>
        </>
    );
};

export default Checker;