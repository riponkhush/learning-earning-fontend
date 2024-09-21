import {
  HomeIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import { CiLogout } from "react-icons/ci";
import { MdLogin  } from "react-icons/md";
import { SignIn, SignUp } from "@/pages/auth";
import AllCourse from "./pages/dashboard/allcourse";
import Liveclass from "./pages/dashboard/liveclass";
import Homework from "./pages/dashboard/homework";
import Withdrawal from "./pages/dashboard/withdrawal";
import Mypassbook from "./pages/dashboard/mypassbook";
import Marketing from "./pages/dashboard/Marketing";
import Home from "./pages/dashboard/Home";
import Profile from "./pages/dashboard/Profile";
import PhotoGallary from "./pages/dashboard/PhotoGallary";
import CreateUser from "./pages/dashboard/Manager/CreateUser";
import Account from "./pages/dashboard/Admin/Account";
import ActiveUser from "./pages/dashboard/Manager/ActiveUser";
import InActiveUser from "./pages/dashboard/Manager/InActiveUser";
import CreateCouncilor from "./pages/dashboard/Controler/CreateCouncilor";
import SendSms from "./pages/dashboard/Councilor/SendSms";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import UploadImage from "./pages/dashboard/UploadImage";
import Passbook from "./pages/dashboard/SeniorTeamLeader/Passbook";
import TeamMember from "./pages/dashboard/SeniorTeamLeader/TeamMember";
import ReferenceMember from "./pages/dashboard/SeniorTeamLeader/ReferenceMember";
import TeamLeadedId from "./pages/dashboard/SeniorTeamLeader/TeamLeadedId";
import TeamLeadedList from "./pages/dashboard/SeniorTeamLeader/TeamLeadedList";
import MappingTrainer from "./pages/dashboard/SeniorTeamLeader/MappingTrainer";
import TrainerList from "./pages/dashboard/SeniorTeamLeader/TrainerList";
import AddNotice from "./pages/dashboard/Admin/AddNotice";
import SeniorForActiveStudent from "./pages/dashboard/SeniorTeamLeader/SeniorForActiveStudent";
import TeamLeaderActiveStudent from "./pages/dashboard/TeamLeaderpage/TeamLeaderActiveStudent";
import ManagerList from "./pages/dashboard/Admin/ManagerList";
import CouncilorList from "./pages/dashboard/Admin/CouncilorList";
import ControllerList from "./pages/dashboard/Admin/ControllerList";
import SeniorTeamList from "./pages/dashboard/Admin/SeniorTeamList";
import TeamLeaderList from "./pages/dashboard/Admin/TeamLeaderList";
import TeacherList from "./pages/dashboard/Admin/TeacherList";
import CheckerList from "./pages/dashboard/Admin/CheckerList";
import AccounterList from "./pages/dashboard/Admin/AccounterList";
import CreateTrainer from "./pages/dashboard/TeamLeaderpage/CreateTrainer";
import TmLeaderTrainer from "./pages/dashboard/TeamLeaderpage/TmLeaderTrainer";
import NoticeList from "./pages/dashboard/Admin/NoticeList";
import NoticedDetails from "./pages/dashboard/NoticedDetails";
import AddProduct from "./pages/dashboard/Admin/AddProduct";
import ProductList from "./pages/dashboard/Admin/ProductList";
import MapCouncilor from "./pages/dashboard/Controler/MapCouncilor";
import AllStudent from "./pages/dashboard/Admin/AllStudent";
import NotMappingStudent from "./pages/dashboard/Controler/NotMappingStudent";
import MappingMember from "./pages/dashboard/Councilor/MappingMember";
import MessageDoneMember from "./pages/dashboard/Councilor/MessageDoneMember";
import MappingStudent from "./pages/dashboard/Controler/MappingStudent";
import CouncilorMappingStudent from "./pages/dashboard/Controler/CouncilorMappingStudent";
import CouncilorMappingSystem from "./pages/dashboard/Controler/CouncilorMappingSystem";
import ActiveStudentForController from "./pages/dashboard/Controler/ActiveStudentForController";
import AddCourse from "./pages/dashboard/Admin/AddCourse";
import AdminAllCourse from "./pages/dashboard/Admin/AdminAllCourse";
import AddHomeWorks from "./pages/dashboard/Admin/AddHomeWorks";
import AddminHomeworkList from "./pages/dashboard/Admin/AddminHomeworkList";
import AddLiveClass from "./pages/dashboard/TeacherPage/AddLiveClass";
import LiveClassList from "./pages/dashboard/TeacherPage/LiveClassList";
import AddAuthorInfo from "./pages/dashboard/Admin/AddAuthorInfo";
import AuthorInfoList from "./pages/dashboard/Admin/AuthorInfoList";
import ActiveStudentMapping from "./pages/dashboard/Councilor/ActiveStudentMapping";
import TeamLeaderMember from "./pages/dashboard/TeamLeaderpage/TeamLeaderMember";
import TrainerTeamMember from "./pages/dashboard/Trainer/TrainerTeamMember";
import TrainerActiveMember from "./pages/dashboard/Trainer/TrainerActiveMember";
import TrainerInActiveMem from "./pages/dashboard/Trainer/TrainerInActiveMem";
import TrainerPassbook from "./pages/dashboard/Trainer/TrainerPassbook";
import CouncilorActiveMember from "./pages/dashboard/Councilor/CouncilorActiveMember";
import TrainerReferMember from "./pages/dashboard/Trainer/TrainerReferMember";
import TeamLeaderActiveMem from "./pages/dashboard/TeamLeaderpage/TeamLeaderActiveMem";
import TeamLeaderInActiveMem from "./pages/dashboard/TeamLeaderpage/TeamLeaderInActiveMem";
import MemberLeadData from "./pages/dashboard/TeamLeaderpage/MemberLeadData";
import SeniorTeamMappingMemr from "./pages/dashboard/Controler/SeniorTeamMappingMemr";
import AllHomeworks from "./pages/dashboard/CheckerPages/AllHomeworks";
import ManagerAllUserList from "./pages/dashboard/Manager/ManagerAllUserList";
import AdminAllUserList from "./pages/dashboard/Admin/AdminAllUserList";
import AdminCreateUser from "./pages/dashboard/Admin/AdminCreateUser";
import CreateSeniorTeamLeader from "./pages/dashboard/Councilor/CreateSeniorTeamLeader";
import CreatTeamLeader from "./pages/dashboard/SeniorTeamLeader/CreatTeamLeader";
import SeniorActiveMember from "./pages/dashboard/SeniorTeamLeader/SeniorActiveMember";
import SeniorInActiveMem from "./pages/dashboard/SeniorTeamLeader/SeniorInActiveMem";
import TeamLeadermaptoTrainer from "./pages/dashboard/TeamLeaderpage/TeamLeadermaptoTrainer";
import Reference from "./pages/dashboard/Reference";


const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [

  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "Home",
        path: "/home",
        element: <PrivateRoute><Home></Home></PrivateRoute>,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
        element: <PrivateRoute><Profile /></PrivateRoute>,
      },
      // student routes
      {
        name: "live class",
        path: "/live-class",
        element: <PrivateRoute><Liveclass/></PrivateRoute>,
      },
      {
        name: "all course",
        path: "/all-course",
        element: <PrivateRoute><AllCourse></AllCourse></PrivateRoute>,
      },
      {
        name: "my homeworks",
        path: "/my-homeworks",
        element: <PrivateRoute><Homework></Homework></PrivateRoute>,
      },
      {
        name: "withdrawals",
        path: "/withdrawals",
        element: <PrivateRoute><Withdrawal></Withdrawal></PrivateRoute>,
      },
      {
        name: "my passbook",
        path: "/my-passbook",
        element: <PrivateRoute><Mypassbook></Mypassbook></PrivateRoute>,
      },
      {
        name: "affliate marketing",
        path: "/affliate-marketing",
        element: <PrivateRoute><Marketing></Marketing></PrivateRoute>,
      },
      {
        name: "photo & gallery",
        path: "/photo-&-gallery",
        element: <PrivateRoute><PhotoGallary></PhotoGallary></PrivateRoute>,
      },
      {
        name: "reference",
        path: "/reference",
        element: <PrivateRoute><Reference></Reference></PrivateRoute>,
      },
      // admin
      {
        name: "account",
        path: "/account",
        element: <PrivateRoute><Account></Account></PrivateRoute>,
      },
      {
        name: "create user",
        path: "/create-user",
        element: <PrivateRoute><CreateUser></CreateUser></PrivateRoute>,
      },
      {
        name: "active student",
        path: "/active-user",
        element: <PrivateRoute><ActiveUser></ActiveUser></PrivateRoute>,
      },
      {
        name: "Inactive student",
        path: "/in-active-user",
        element: <PrivateRoute><InActiveUser></InActiveUser></PrivateRoute>,
      },

      {
        name: "create councilor",
        path: "/create-councilor",
        element: <PrivateRoute><CreateCouncilor></CreateCouncilor></PrivateRoute>,
      },

      {
        name: "send sms",
        path: "/send-sms",
        element: <PrivateRoute><SendSms></SendSms></PrivateRoute>,
      },
      {
        name: "Upload Image",
        path: "/upload-image",
        element: <PrivateRoute><UploadImage></UploadImage></PrivateRoute>,
      },
      {
        name: "team member",
        path: "/team-member",
        element: <PrivateRoute><TeamMember></TeamMember></PrivateRoute>,
      },
      {
        name: "passbook",
        path: "/passbook",
        element: <PrivateRoute><Passbook></Passbook></PrivateRoute>,
      },
      {
        name: "reference member",
        path: "/reference-member",
        element: <PrivateRoute><ReferenceMember></ReferenceMember></PrivateRoute>,
      },
      {
        name: "team leaded id",
        path: "/team-leaded-id",
        element: <PrivateRoute><TeamLeadedId></TeamLeadedId></PrivateRoute>,
      },
      {
        name: "team leaded list",
        path: "/team-leaded-list",
        element: <PrivateRoute><TeamLeadedList></TeamLeadedList></PrivateRoute>,
      },
      {
        name: "mapping trainer id",
        path: "/mapping-trainer-id",
        element: <PrivateRoute><MappingTrainer></MappingTrainer></PrivateRoute>,
      },
      {
        name: "trainer list",
        path: "/trainer-list",
        element: <PrivateRoute><TrainerList></TrainerList></PrivateRoute>,
      },
      {
        name: "add notice",
        path: "/add-notice",
        element: <PrivateRoute><AddNotice></AddNotice></PrivateRoute>,
      },
      {
        name: "senior student",
        path: "/senior-student",
        element: <PrivateRoute><SeniorForActiveStudent></SeniorForActiveStudent></PrivateRoute>,
      },
      {
        name: "student",
        path: "/team-leader-student",
        element: <PrivateRoute><TeamLeaderActiveStudent></TeamLeaderActiveStudent></PrivateRoute>,
      },
      {
        name: "manager list",
        path: "/manager-list",
        element: <PrivateRoute><ManagerList></ManagerList></PrivateRoute>,
      },
      {
        name: "councilor list",
        path: "/councilor-list",
        element: <PrivateRoute><CouncilorList></CouncilorList></PrivateRoute>,
      },
      {
        name: "controller list",
        path: "/controller-list",
        element: <PrivateRoute><ControllerList></ControllerList></PrivateRoute>,
      },
      {
        name: "senior team leader list",
        path: "/senior-team-leader-list",
        element: <PrivateRoute><SeniorTeamList></SeniorTeamList></PrivateRoute>,
      },
      {
        name: "team leader list",
        path: "/team-leader-list",
        element: <PrivateRoute><TeamLeaderList></TeamLeaderList></PrivateRoute>,
      },
      {
        name: "teacher list",
        path: "/teacher-list",
        element: <PrivateRoute><TeacherList></TeacherList></PrivateRoute>,
      },
      {
        name: "checker list",
        path: "/checker-list",
        element: <PrivateRoute><CheckerList></CheckerList></PrivateRoute>,
      },
      {
        name: "accounter list",
        path: "/accounter-list",
        element: <PrivateRoute><AccounterList></AccounterList></PrivateRoute>,
      },
      {
        name: "create trainer",
        path: "/create-trainer",
        element: <PrivateRoute><CreateTrainer></CreateTrainer></PrivateRoute>,
      },
      {
        name: "team leader trainer",
        path: "/team-leader-trainer",
        element: <PrivateRoute><TmLeaderTrainer></TmLeaderTrainer></PrivateRoute>,
      },
      {
        name: "notice list",
        path: "/notice-list",
        element: <PrivateRoute><NoticeList></NoticeList></PrivateRoute>,
      },
      {
        name: "add product",
        path: "/add-product",
        element: <PrivateRoute><AddProduct></AddProduct></PrivateRoute>,
      },
      {
        name: "map councilor",
        path: "/map-councilor",
        element: <PrivateRoute><MapCouncilor></MapCouncilor></PrivateRoute>,
      },
      {
        name: "product list",
        path: "/product-list",
        element: <PrivateRoute><ProductList></ProductList></PrivateRoute>,
      },
      {
        name: "councilor mapping student",
        path: "/councilor-mapping-student",
        element: <PrivateRoute><CouncilorMappingStudent></CouncilorMappingStudent></PrivateRoute>,
      },
      {
        name: "councilor mapping system",
        path: "/councilor-mapping-system",
        element: <PrivateRoute><CouncilorMappingSystem></CouncilorMappingSystem></PrivateRoute>,
      },
      {
        name: "all student",
        path: "/all-student",
        element: <PrivateRoute><AllStudent></AllStudent></PrivateRoute>,
      },
      {
        name: "all active student",
        path: "/all-active-student",
        element: <PrivateRoute><ActiveStudentForController></ActiveStudentForController></PrivateRoute>,
      },
      {
        name: 'notice details',
        path: '/notice-details/:id',
        element:<PrivateRoute><NoticedDetails /></PrivateRoute>,
      },
      {
        name: "not mapping student",
        path: "/not-mapping-student",
        element: <PrivateRoute><NotMappingStudent></NotMappingStudent></PrivateRoute>,
      },
      {
        name: "mapping students",
        path: "/mapping-students",
        element: <PrivateRoute><MappingStudent></MappingStudent></PrivateRoute>,
      },
      {
        name: "mapping member",
        path: "/mapping-member",
        element: <PrivateRoute><MappingMember></MappingMember></PrivateRoute>,
      },
      {
        name: "message done member",
        path: "/message-done-member",
        element: <PrivateRoute><MessageDoneMember></MessageDoneMember></PrivateRoute>,
      },
      {
        name: "add course",
        path: "/add-course",
        element: <PrivateRoute><AddCourse></AddCourse></PrivateRoute>,
      },
      {
        name: "admin all course",
        path: "/admin-all-course",
        element: <PrivateRoute><AdminAllCourse></AdminAllCourse></PrivateRoute>,
      },
      {
        name: "add homeworks",
        path: "/add-homeworks",
        element: <PrivateRoute><AddHomeWorks></AddHomeWorks></PrivateRoute>,
      },
      {
        name: "homework list",
        path: "/homework-list",
        element: <PrivateRoute><AddminHomeworkList></AddminHomeworkList></PrivateRoute>,
      },
      {
        name: "add live class",
        path: "/add-live-class",
        element: <PrivateRoute><AddLiveClass></AddLiveClass></PrivateRoute>,
      },
      {
        name: "live class list",
        path: "/live-class-list",
        element: <PrivateRoute><LiveClassList></LiveClassList></PrivateRoute>,
      },
      {
        name: "add author info",
        path: "/add-author-info",
        element: <PrivateRoute><AddAuthorInfo></AddAuthorInfo></PrivateRoute>,
      },
      {
        name: "author info list",
        path: "/author-info-list",
        element: <PrivateRoute><AuthorInfoList></AuthorInfoList></PrivateRoute>,
      },
      {
        name: "active student mapping",
        path: "/active-student-mapping",
        element: <PrivateRoute><ActiveStudentMapping></ActiveStudentMapping></PrivateRoute>,
      },
      {
        name: "team leader member",
        path: "/team-leader-member",
        element: <PrivateRoute><TeamLeaderMember></TeamLeaderMember></PrivateRoute>,
      },
      {
        name: "trainer team member",
        path: "/trainer-team-member",
        element: <PrivateRoute><TrainerTeamMember></TrainerTeamMember></PrivateRoute>,
      },
      {
        name: "trainer active member",
        path: "/trainer-active-member",
        element: <PrivateRoute><TrainerActiveMember></TrainerActiveMember></PrivateRoute>,
      },
      {
        name: "trainer inactive member",
        path: "/trainer-inactive-member",
        element: <PrivateRoute><TrainerInActiveMem></TrainerInActiveMem></PrivateRoute>,
      },
      {
        name: "trainer refer member",
        path: "/trainer-refer-member",
        element: <PrivateRoute><TrainerReferMember></TrainerReferMember></PrivateRoute>,
      },
      {
        name: "trainer passbook",
        path: "/trainer-passbook",
        element: <PrivateRoute><TrainerPassbook></TrainerPassbook></PrivateRoute>,
      },
      {
        name: "councilor active member",
        path: "/councilor-active-member",
        element: <PrivateRoute><CouncilorActiveMember></CouncilorActiveMember></PrivateRoute>,
      },
      {
        name: "team leader active member",
        path: "/team-leader-active-member",
        element: <PrivateRoute><TeamLeaderActiveMem></TeamLeaderActiveMem></PrivateRoute>,
      },
      {
        name: "team leader inactive member",
        path: "/team-leader-inactive-member",
        element: <PrivateRoute><TeamLeaderInActiveMem></TeamLeaderInActiveMem></PrivateRoute>,
      },
      {
        name: "member lead Data",
        path: "/member-lead-Data",
        element: <PrivateRoute><MemberLeadData></MemberLeadData></PrivateRoute>,
      },
      {
        name: "senior team mapping member",
        path: "/senior-team-mapping-member",
        element: <PrivateRoute><SeniorTeamMappingMemr></SeniorTeamMappingMemr></PrivateRoute>,
      },
      {
        name: "all homeworks",
        path: "/all-homeworks",
        element: <PrivateRoute><AllHomeworks></AllHomeworks></PrivateRoute>,
      },
      {
        name: "manager all user list",
        path: "/manager-all-user-list",
        element: <PrivateRoute><ManagerAllUserList></ManagerAllUserList></PrivateRoute>,
      },
      {
        name: "admin all user lists",
        path: "/admin-all-user-lists",
        element: <PrivateRoute><AdminAllUserList></AdminAllUserList></PrivateRoute>,
      },
      {
        name: "admin create id",
        path: "/admin-create-id",
        element: <PrivateRoute><AdminCreateUser></AdminCreateUser></PrivateRoute>,
      },
      {
        name: "create senior team leader",
        path: "/create-senior-team-leader",
        element: <PrivateRoute><CreateSeniorTeamLeader></CreateSeniorTeamLeader></PrivateRoute>,
      },
      {
        name: "create team leader",
        path: "/create-team-leader",
        element: <PrivateRoute><CreatTeamLeader></CreatTeamLeader></PrivateRoute>,
      },
      {
        name: "senior active member",
        path: "/senior-active-member",
        element: <PrivateRoute><SeniorActiveMember></SeniorActiveMember></PrivateRoute>,
      },
      {
        name: "senior inactive member",
        path: "/senior-inactive-member",
        element: <PrivateRoute><SeniorInActiveMem></SeniorInActiveMem></PrivateRoute>,
      },
      {
        name: "trainer map to teamleader",
        path: "/trainer-map-to-teamleader",
        element: <PrivateRoute><TeamLeadermaptoTrainer></TeamLeadermaptoTrainer></PrivateRoute>,
      },


    ],
  },








  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <MdLogin  {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <CiLogout  {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
];

export default routes;
