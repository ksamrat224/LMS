import { Outlet } from "react-router";
import SideBar from "../components/SideBar";

const AppLayout = () => {
  return (
    <div className="w-screen h-screen flex">
      {/* Sidebar */}
      <SideBar />
      {/* Main Content */}
      <div className="w-[75%] h-full bg-gray-100 flex flex-col justify-center items-center">
        <p className="text-gray-700 text-xl font-medium">Welcome to the LMS App</p>
        <Outlet />
        {/* This is where the nested routes will be rendered */}
      </div>
    </div>
  );
};

export default AppLayout;