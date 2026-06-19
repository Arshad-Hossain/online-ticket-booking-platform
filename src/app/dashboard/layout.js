import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden bg-[#1c120d] ">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden bg-[#1c120d]">
        {/* Dashboard Navbar */}
        <div className="h-16 border-b border-[#c8a27a]/20 bg-[#1c120d] flex items-center px-6">
          <h2 className="text-lg font-semibold text-[#f5e6d3]">Dashboard</h2>
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-[#1c120d]">{children}</main>
      </div>
    </div>
  );
}
