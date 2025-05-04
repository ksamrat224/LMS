import { useNavigate } from "react-router";
import Button from "./Button";
import NavItem from "./NavItem";
import { Bounce, toast } from "react-toastify";
import { MoonIcon, SunIcon } from "lucide-react";
import { useContext } from "react";
import { ThemeContext } from "../context/themeContext";

const SideBar = () => {
  const navigate = useNavigate();
  const {theme,setTheme} = useContext(ThemeContext); // Assuming you have a ThemeContext to manage theme state

  const handleLogout = () => {
    // Display the toast notification
    toast.success("Logging Out!", {
      position: "top-right",
      autoClose: 2000, // Toast duration
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      onClose: () => {
        // Perform logout and navigate after the toast closes
        localStorage.removeItem("token");
        navigate("/login");
      },
    });
  };

  return (
    <aside className="relative w-[25%] h-full bg-gradient-to-b from-blue-500 to-purple-600 text-white shadow-lg flex flex-col">
      {/* Top Section: Title and Menu Items */}
      <div>
        {/* Title and Logo */}
        <div className="p-6 border-b border-white/20 flex items-center justify-between">
          <h1 className="text-2xl font-extrabold tracking-wide">LMS APP</h1>
        {theme==="light"?(<SunIcon  onClick={()=>{
          setTheme("dark");
          console.log("theme:dark");}} className="text-yellow-400 font-extrabold cursor-pointer " />):(<MoonIcon onClick={()=>{
            setTheme("light");
            console.log("theme:light");}} className=" text-white cursor-pointer " />)}
        </div>
        {/* Menu Items */}
        <nav>
          <ul className="space-y-4 text-lg font-bold p-6">
            <NavItem to="/book" label="Books" icon="📚" />
            <NavItem to="/member" label="Members" icon="👥" />
            <NavItem to="/transaction" label="Transactions" icon="💳" />
          </ul>
        </nav>
      </div>
      {/* Bottom Section: Log Out Button */}
      <div className="mt-auto w-full">
        <Button
          label="Log Out"
          type="button"
          onClick={handleLogout}
          bgColor="bg-red-500 hover:bg-red-700 w-full"
        />
      </div>
    </aside>
  );
};

export default SideBar;