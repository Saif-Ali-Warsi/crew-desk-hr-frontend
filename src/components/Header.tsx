import { useAuth } from "../context/AuthContext";

interface HeaderProps {
  companyName: string;
  onMenuToggle: () => void;
}

function Header({ companyName, onMenuToggle }: HeaderProps) {
  const { user, logout } = useAuth();

  return (
    <header className="flex h-16 w-full items-center justify-between border-b border-gray-200 bg-white px-6">
      <button
        onClick={onMenuToggle}
        type="button"
        className="cursor-pointer rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 md:hidden"
        aria-label="Open sidebar"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      <div className="flex items-center justify-center space-x-1">
        <div className="flex h-11 w-11 items-center justify-center font-black transition-transform duration-300 hover:scale-105">
          <img src="src/assets/logo.png" alt="logo" />
        </div>
        <span className="text-2xl font-black tracking-tight text-teal-500">
          Crew Desk HR
        </span>
      </div>

      {user && (
        <button
          onClick={logout}
          className="cursor-pointer rounded-md bg-gray-100 px-3.5 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:bg-red-50 hover:text-red-600"
        >
          Logout
        </button>
      )}
    </header>
  );
}

export default Header;
