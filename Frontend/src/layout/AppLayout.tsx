import { Outlet } from "react-router";
import SideBar from "../components/SideBar";

const AppLayout = () => {
  return (
    <div className="w-screen h-screen flex">
      {/* Sidebar */}
      <SideBar />
      {/* Main Content */}
      <div className="w-[75%] h-full bg-gray-100 flex flex-col">
        <header className="py-4 text-center bg-gradient-to-r from-purple-700 to-blue-700 shadow-lg">
          <p className="text-gray-100 text-xl font-medium">Welcome to the LMS App</p>
        </header>
        <div className="flex-grow overflow-auto">
          <Outlet />
          {/* This is where the nested routes will be rendered */}
        </div>
      </div>
    </div>
  );
};

export default AppLayout;