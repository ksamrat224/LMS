import { Outlet } from "react-router";
import SideBar from "../components/SideBar";
import { useContext } from "react";
import { ThemeContext } from "../context/themeContext";



const AppLayout = () => {
  const {theme} = useContext(ThemeContext);
  console.log({theme}); // Assuming you have a ThemeContext to manage theme state
  return (
    <div className="w-screen h-screen flex">
      <SideBar />
      <div className="w-[75%] h-full bg-gray-100 flex flex-col">
    
        <div className="flex-grow overflow-hidden">
          <Outlet />
          {/* This is where the nested routes will be rendered */}
        </div>
        {/* Footer */}
      {/* <footer className="py-4 text-center bg-gradient-to-r from-purple-700 to-blue-700 shadow-lg">
        <p className="text-sm text-white">
          © 2025 Library Management System. All rights reserved.
        </p>
      </footer> */}
      </div>
    </div>
  );
};

export default AppLayout;