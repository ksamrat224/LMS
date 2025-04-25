import { useNavigate } from "react-router";
import Button from "./Button";
import NavItem from "./NavItem";

const SideBar = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login"); // Redirect to the login page after logout
  };

  return (
    <aside className="w-[25%] h-full bg-gradient-to-b from-blue-500 to-purple-600 text-white shadow-lg flex flex-col">
      {/* Top Section: Title and Menu Items */}
      <div>
        {/* Title and Logo */}
        <div className="p-6 border-b border-white/20">
          <h1 className="text-2xl font-extrabold tracking-wide">LMS APP</h1>
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
      <div className="p-6 mt-auto">
        <Button
          label="Log Out"
          type="button"
          onClick={handleLogout}
          bgColor="bg-red-500 hover:bg-red-700"
        />
      </div>
    </aside>
  );
};

export default SideBar;
