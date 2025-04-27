import { Outlet } from "react-router";
import SideBar from "../components/SideBar";

const AppLayout = () => {
  return (
    <div className="w-screen h-screen flex">
      <SideBar />
      <div className="w-[75%] h-full bg-gray-100 flex flex-col">
    
        <div className="flex-grow overflow-auto">
          <Outlet />
          {/* This is where the nested routes will be rendered */}
        </div>
      </div>
    </div>
  );
};

export default AppLayout;