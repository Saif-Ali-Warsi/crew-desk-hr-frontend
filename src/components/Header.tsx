import { useAuth } from "../context/AuthContext";

interface HeaderProps {
  companyName?: string;
  onMenuToggle: () => void;
}

function Header({ companyName, onMenuToggle }: HeaderProps) {
  const { user, logout } = useAuth();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const activeCompanyName =
    user?.company?.name || companyName || "CrewDeskHR LLC";
  const activeCompanyLogo = user?.company?.logo;
  const userRoleDisplay = user?.role ? user.role.replace(/_/g, " ") : "Member";

  const firstName = user?.firstName || "";
  const lastName = user?.lastName || "";

  return (
    <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-slate-200/80 bg-teal-50/60 px-4 backdrop-blur-md transition-all sm:px-6">
      <div className="flex items-center gap-3.5">
        <button
          onClick={onMenuToggle}
          type="button"
          className="cursor-pointer rounded-xl p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors md:hidden"
          aria-label="Open sidebar"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50/80 p-1.5 ring-1 ring-teal-500/20 shadow-xs transition-transform duration-300 hover:scale-105">
            <img
              src={
                activeCompanyLogo ||
                "https://www.image2url.com/r2/default/images/1787239332865-2edc4dd1-17a6-49a8-8f65-394a957ccbd9.png"
              }
              alt={activeCompanyName}
              className="h-full w-full object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-extrabold tracking-tight text-slate-900 leading-none">
              {activeCompanyName.includes(" ") ? (
                <>
                  {activeCompanyName.substring(
                    0,
                    activeCompanyName.lastIndexOf(" "),
                  )}{" "}
                  <span className="text-[#009689]">
                    {activeCompanyName.substring(
                      activeCompanyName.lastIndexOf(" ") + 1,
                    )}
                  </span>
                </>
              ) : (
                <span className="text-[#009689]">{activeCompanyName}</span>
              )}
            </span>
          </div>
        </div>
      </div>

      {user && (
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="hidden items-center gap-2 rounded-full border border-teal-100 bg-teal-50/50 px-3.5 py-1.5 text-xs font-semibold text-teal-800 shadow-xs sm:flex">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#009689]" />
            </span>
            <span>{getGreeting()}</span>
          </div>

          <div className="h-4 w-px bg-slate-200 hidden sm:block" />

          <div className="flex items-center gap-2.5 pl-1">
            {user?.role !== "SUPER_ADMIN" && (
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-white font-bold text-xs ring-2 ring-teal-500/20 shadow-xs">
              {firstName[0]} {lastName[0]}
              </div>
            )}

            <div className="hidden flex-col md:flex text-left">
              <span className="text-xs font-bold text-slate-900 leading-tight">
                {firstName || lastName ? `${firstName} ${lastName}`.trim() : user.username || "User"}
              </span>
              <span className="text-[10px] font-medium tracking-wide text-teal-700 uppercase">
                {userRoleDisplay}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={logout}
            title="Logout"
            className="group cursor-pointer flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200/80 bg-slate-50/50 p-2 shadow-xs transition-all hover:border-red-200 hover:bg-red-50 hover:shadow-sm active:scale-95"
          >
            <img
              src="https://www.image2url.com/r2/default/images/1787236730051-8e048b16-d81c-4709-b1b3-f21ee9969dbd.png"
              alt="Logout"
              className="h-full w-full object-contain transition-transform group-hover:scale-110"
            />
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;