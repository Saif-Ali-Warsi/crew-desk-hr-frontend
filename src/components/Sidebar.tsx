import { NavLink } from "react-router-dom";

function Sidebar() {
  const navigationItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Employees", path: "/employees" },
    { label: "Candidates", path: "/candidates" },
    { label: "Jobs", path: "/jobs" },
    { label: "Attendance", path: "/attendance" },
    { label: "Leaves", path: "/leaves" },
  ];

  return (
    <aside className="w-64 border-r border-gray-200 bg-white p-4">
      <nav className="flex flex-col space-y-1">
        {navigationItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
