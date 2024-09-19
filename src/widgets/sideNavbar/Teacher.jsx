import {  NavLink } from "react-router-dom";

import { Button, Typography } from "@material-tailwind/react";
import { useMaterialTailwindController } from "@/context";
import { FaHome } from "react-icons/fa";

const Teacher = () => {
    const [controller] = useMaterialTailwindController();
    const { sidenavType } = controller;
    return (
        <>
            <li>
                    <NavLink to='/dashboard/add-live-class'>
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
                            add live class
                        </Typography>
                        </Button>
                    )}
                    </NavLink>
            </li>
            <li>
                    <NavLink to='/dashboard/live-class-list'>
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
                            live class list
                        </Typography>
                        </Button>
                    )}
                    </NavLink>
            </li>
        </>
    );
};

export default Teacher;