import { useAuth } from "../context/AuthContext";

interface HeaderProps {
  companyName: string;
  onMenuToggle: () => void;
}

function Header({ onMenuToggle }: HeaderProps) {
  const { user, logout } = useAuth();

  return (
    <header className="flex h-16 w-full items-center justify-between border-b border-gray-200 bg-white sm:px-4 md:px-6">
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
        <div className="flex h-10 w-10 items-center justify-center font-black transition-transform duration-300 hover:scale-105">
          <img src="https://www.image2url.com/r2/default/images/1787239332865-2edc4dd1-17a6-49a8-8f65-394a957ccbd9.png" alt="logo" />
        </div>
        <span className="text-2xl font-black tracking-tight text-teal-500">
          Crew Desk HR
        </span>
      </div>

      {user && (
      
        <div onClick={logout} className="cursor-pointer flex h-10 w-10 p-2 items-center justify-center font-black transition-transform duration-300 hover:scale-105">
          <img src="https://www.image2url.com/r2/default/images/1787236730051-8e048b16-d81c-4709-b1b3-f21ee9969dbd.png" alt="logo" />
        </div>
      )}
    </header>
  );
}

export default Header;
