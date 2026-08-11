import { NavLink } from "react-router-dom";

function Sidebar() {
const isActive = false

  return (
    <aside className="w-64 border-r border-gray-200 bg-white p-4">
      <nav className="flex flex-col space-y-1">
        <NavLink to="/dashboard" className={`flex items-center rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
      isActive
        ? "bg-indigo-50 text-indigo-600"
        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
    }`}>
          Dashboard
        </NavLink>
        <NavLink to="/employees" className={`flex items-center rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
      isActive
        ? "bg-indigo-50 text-indigo-600"
        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
    }`}>
          Employees
        </NavLink>
        <NavLink to="/candidates" className={`flex items-center rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
      isActive
        ? "bg-indigo-50 text-indigo-600"
        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
    }`}>
          Candidates
        </NavLink>
        <NavLink to="/jobs" className={`flex items-center rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
      isActive
        ? "bg-indigo-50 text-indigo-600"
        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
    }`}>
          Jobs
        </NavLink>
        <NavLink to="/attendance" className={`flex items-center rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
      isActive
        ? "bg-indigo-50 text-indigo-600"
        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
    }`}>
          Attendance
        </NavLink>
        <NavLink to="/leaves" className={`flex items-center rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
      isActive
        ? "bg-indigo-50 text-indigo-600"
        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
    }`}>
          Leaves
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;