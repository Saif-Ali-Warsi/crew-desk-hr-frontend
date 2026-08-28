import { useAuth } from "../context/AuthContext";
import { NavLink } from "react-router-dom";
import Ripples from "react-ripples";
import { useTranslation } from "react-i18next";

const SafeRipples = Ripples as React.ComponentType<any>;

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { user } = useAuth();
  const { t } = useTranslation();

  const role = user?.role;

  const navigationItems =
    role === "SUPER_ADMIN"
      ? [
          { label: "dashboard", path: "/dashboard" },
          { label: "companies", path: "/companies" },
        ]
      : [
          { label: "dashboard", path: "/dashboard" },
          { label: "employees", path: "/employees" },
          { label: "candidates", path: "/candidates" },
          { label: "jobs", path: "/jobs" },
          { label: "attendance", path: "/attendance" },
          { label: "leaves", path: "/leaves" },
          { label: "settings", path: "/settings" },
        ];

  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-gray-900/50 backdrop-blur-sm md:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-gray-100 bg-teal-50/100 p-4 transition-transform duration-300 ease-in-out md:static md:translate-x-0 overflow-hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-50 pointer-events-none"
          style={{
            backgroundImage: `url('https://www.image2url.com/r2/default/images/1787160159656-42a7b3d4-3dac-46a7-b43a-439138a29ff2.png')`,
          }}
        />

        <nav className="relative z-10 flex flex-col space-y-1.5">
          {navigationItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                `group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-teal-500/10 text-teal-600 shadow-sm backdrop-blur-md"
                    : "text-gray-600 hover:bg-white/80 hover:text-teal-600 hover:shadow-xs"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`h-2 w-2 rounded-full transition-all duration-200 ${
                      isActive
                        ? "scale-100 bg-teal-500"
                        : "scale-0 bg-teal-400 group-hover:scale-100"
                    }`}
                  />

                  <SafeRipples
                    color="#ffffff27"
                    during={1200}
                    className="rounded-full overflow-hidden"
                  >
                    <span>{t(item.label)}</span>
                  </SafeRipples>
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
