import { useAuth } from "../context/AuthContext";

interface HeaderProps {
  companyName: string;
}

function Header({ companyName }: HeaderProps) {
  const { user, logout } = useAuth();

  return (
    <header className="flex h-16 w-full items-center justify-between border-b border-gray-200 bg-white px-6">
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