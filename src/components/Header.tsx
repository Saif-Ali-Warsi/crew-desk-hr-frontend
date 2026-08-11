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
        className="rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 md:hidden"
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

      <h1 className="text-lg font-bold text-gray-900">{companyName}</h1>

      {user && (
        <button
          onClick={logout}
          className="rounded-md bg-gray-100 px-3.5 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:bg-red-50 hover:text-red-600"
        >
          Logout
        </button>
      )}
    </header>
  );
}

export default Header;
