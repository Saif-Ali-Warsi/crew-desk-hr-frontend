import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";


function AppLayout() {
  return (
<div className="flex h-screen flex-col overflow-hidden">
      <Header companyName="CrewDesk HR." />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;