import NavItem from "./NavItem";

const SideBar = () => {
  return (
    <aside className="w-[25%] h-full bg-gradient-to-b from-blue-500 to-purple-600 text-white shadow-lg">
      {/* Title and Logo */}
      <div className="p-6 border-b border-white/20">
        <h1 className="text-2xl font-extrabold tracking-wide">LMS APP</h1>
      </div>
      {/* Menu Items */}
      <div className="p-6">
        <ul className="space-y-4 text-lg">
          <li>
            <NavItem to="/book" label="Books" icon="📚" />
          </li>
          <li>
            <NavItem to="/member" label="Members" icon="👥" />
          </li>
          <li>
            <NavItem to="/transaction" label="Transactions" icon="💳" />
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default SideBar;