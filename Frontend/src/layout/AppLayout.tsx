import { NavLink, Outlet } from "react-router";

const AppLayout = () => {
  return (
    <div className="w-screen h-screen flex">
      {/* Sidebar */}
      <aside className="w-[25%] h-full bg-gradient-to-b from-blue-500 to-purple-600 text-white shadow-lg">
        {/* Title and Logo */}
        <div className="p-6 border-b border-white/20">
          <h1 className="text-2xl font-extrabold tracking-wide">LMS APP</h1>
        </div>
        {/* Menu Items */}
        <div className="p-6">
          <ul className="space-y-4 text-lg">
            <li>
              <NavLink
                to="/book"
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-lg transition ${
                    isActive
                      ? "bg-white text-blue-600 font-bold"
                      : "text-white hover:bg-blue-600 hover:text-white"
                  }`
                }
              >
                📚 Books
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/member"
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-lg transition ${
                    isActive
                      ? "bg-white text-blue-600 font-bold"
                      : "text-white hover:bg-blue-600 hover:text-white"
                  }`
                }
              >
                👥 Members
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/transaction"
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-lg transition ${
                    isActive
                      ? "bg-white text-blue-600 font-bold"
                      : "text-white hover:bg-blue-600 hover:text-white"
                  }`
                }
              >
                💳 Transactions
              </NavLink>
            </li>
          </ul>
        </div>
      </aside>
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