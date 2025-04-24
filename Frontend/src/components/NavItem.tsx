import { NavLink } from "react-router";

interface NavItemProps {
  to: string;
  label: string;
  icon: React.ReactNode; // To allow passing icons like 📚, 👥, 💳
}

const NavItem = ({ to, label, icon }: NavItemProps) => {
  return (
    <li className="w-full px-4">
      <NavLink
        to={to}
        className={({ isActive }) =>
          `flex items-center gap-2  px-4 py-2 rounded-lg transition ${
            isActive
              ? "bg-white text-blue-600 font-bold"
              : "text-white hover:bg-blue-600 hover:text-white"
          }`
        }
      >
        <span>{icon}</span>
        {label}
      </NavLink>
    </li>
  );
};

export default NavItem;
