import { MdAssignmentAdd  } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import { CiViewList } from "react-icons/ci";
import { Button, IconButton, Typography } from "@material-tailwind/react";
import { useMaterialTailwindController, setOpenSidenav } from "@/context";
import { FaHome } from "react-icons/fa";
import { MdOutlineAttachMoney } from "react-icons/md";
import { IoPersonAdd, IoBagAddSharp  } from "react-icons/io5";
const ManagerNav = () => {
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
                <NavLink to='/dashboard/create-user'>
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
                      <IoPersonAdd />
                      <Typography
                        color="inherit"
                        className="font-medium text-sm capitalize"
                      >
                        create manager
                      </Typography>
                    </Button>
                  )}
                </NavLink>
          </li>
          <li>
                <NavLink to='/dashboard/manager-all-user-list'>
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
                        All user list
                      </Typography>
                    </Button>
                  )}
                </NavLink>
          </li>
          <li>
                <NavLink to='/dashboard/add-product'>
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
                      <IoBagAddSharp  />
                      <Typography
                        color="inherit"
                        className="font-medium text-sm capitalize"
                      >
                        add product
                      </Typography>
                    </Button>
                  )}
                </NavLink>
          </li>
          <li>
                <NavLink to='/dashboard/product-list'>
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
                        product List
                      </Typography>
                    </Button>
                  )}
                </NavLink>
          </li>
          <li>
                <NavLink to='/dashboard/add-notice'>
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
                      <MdAssignmentAdd />
                      <Typography
                        color="inherit"
                        className="font-medium text-sm capitalize"
                      >
                        add notice
                      </Typography>
                    </Button>
                  )}
                </NavLink>
          </li>
          <li>
                <NavLink to='/dashboard/notice-list'>
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
                        notice list
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
                <NavLink to='/dashboard/active-user'>
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
                <NavLink to='/dashboard/active-student-mapping'>
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
                        active student mapping
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
                <NavLink to='/dashboard/add-author-info'>
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
                        add author info
                      </Typography>
                    </Button>
                  )}
                </NavLink>
          </li>
          <li>
                <NavLink to='/dashboard/author-info-list'>
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
                        author info list
                      </Typography>
                    </Button>
                  )}
                </NavLink>
          </li>
          <li>
              <NavLink to='/dashboard/add-course'>
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
                        add course
                      </Typography>
                    </Button>
                  )}
              </NavLink>
          </li>
          <li>
              <NavLink to='/dashboard/admin-all-course'>
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
                        all course 
                      </Typography>
                    </Button>
                  )}
              </NavLink>
          </li>
          <li>
              <NavLink to='/dashboard/add-homeworks'>
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
                        add homeworks
                      </Typography>
                    </Button>
                  )}
              </NavLink>
          </li>
          <li>
              <NavLink to='/dashboard/homework-list'>
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
                        homework list
                      </Typography>
                    </Button>
                  )}
              </NavLink>
          </li>
          <li>
                <NavLink to='/dashboard/manager-list'>
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
                        Manager List
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
                <NavLink to='/dashboard/controller-list'>
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
                        Controller List
                      </Typography>
                    </Button>
                  )}
                </NavLink>
          </li>
          <li>
                <NavLink to='/dashboard/senior-team-leader-list'>
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
                        Senior Team Leader List
                      </Typography>
                    </Button>
                  )}
                </NavLink>
          </li>
          <li>
                <NavLink to='/dashboard/team-leader-list'>
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
                        Team Leader List
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
                      <CiViewList  />
                      <Typography
                        color="inherit"
                        className="font-medium text-sm capitalize"
                      >
                        Trainer List
                      </Typography>
                    </Button>
                  )}
                </NavLink>
          </li>
          <li>
                <NavLink to='/dashboard/teacher-list'>
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
                        Teacher List
                      </Typography>
                    </Button>
                  )}
                </NavLink>
          </li>
          <li>
                <NavLink to='/dashboard/checker-list'>
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
                        Checker List
                      </Typography>
                    </Button>
                  )}
                </NavLink>
          </li>
          <li>
                <NavLink to='/dashboard/accounter-list'>
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
                        Accounter List
                      </Typography>
                    </Button>
                  )}
                </NavLink>
          </li>
        </>
    );
};

export default ManagerNav;