import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md transition-all duration-300">
        <div className="relative flex flex-col items-center justify-center rounded-3xl bg-white/95 px-10 py-8 shadow-2xl ring-1 ring-slate-900/5 backdrop-blur-xl dark:bg-slate-900/90 dark:ring-white/10">
          
          {/* Ambient Radial Glow */}
          <div className="absolute -inset-1 rounded-3xl bg-radial from-[#009689]/20 to-transparent blur-xl pointer-events-none" />

          {/* Center Graphic Container */}
          <div className="relative flex items-center justify-center">
            {/* Outer Pulsing Aura */}
            <div className="absolute h-20 w-20 animate-ping rounded-full bg-[#009689]/20 duration-1000" />
            
            {/* Rotating Dual-Color Ring */}
            <div className="h-16 w-16 animate-spin rounded-full border-3 border-slate-100 border-t-[#009689] border-r-[#009689] dark:border-slate-800" />

            {/* Floating Center Brand Badge */}
            <div className="absolute flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-slate-100 dark:bg-slate-800 dark:ring-slate-700">
              <svg
                className="h-5 w-5 text-[#009689] animate-pulse"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 004 11c0 2.473.345 4.866.99 7.132m14.02 0c-.987 1.96-2.327 3.65-3.921 4.965"
                />
              </svg>
            </div>
          </div>

          {/* Status Label */}
          <div className="mt-6 text-center">
            <p className="text-sm font-semibold tracking-wide text-slate-800 dark:text-slate-100">
              Authenticating
            </p>
            <p className="mt-1 text-xs font-medium text-slate-400 dark:text-slate-500">
              Verifying your session...
            </p>
          </div>

          {/* Bottom Progress Pulse Bar */}
          <div className="mt-5 h-1 w-28 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
            <div className="h-full w-full bg-[#009689] animate-[shimmer_1.5s_infinite_linear] bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.8)_50%,transparent_100%)]" />
          </div>

        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;