import "./DashboardLayout.css";

import { useState } from "react";

import Navbar from "../landing/Navbar";
import Sidebar from "./Sidebar";
import Footer from "../common/Footer";

function DashboardLayout({ children, role = "superadmin" }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className={`dashboard-layout dashboard-layout-${role}`}>
      <Navbar
        showButton={true}
        buttonText="BERANDA"
        buttonLink="/"
        showMenuButton={true}
        isMenuOpen={isSidebarOpen}
        onMenuToggle={() => setIsSidebarOpen((isOpen) => !isOpen)}
      />

      <div className="dashboard-body">
        <Sidebar
          role={role}
          isOpen={isSidebarOpen}
          onNavigate={() => setIsSidebarOpen(false)}
        />
        <button
          type="button"
          className={`dashboard-sidebar-backdrop${isSidebarOpen ? " is-visible" : ""}`}
          aria-label="Tutup menu navigasi"
          onClick={() => setIsSidebarOpen(false)}
        />

        <main className="dashboard-content">
          <div className="dashboard-content-inner">
            {children}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default DashboardLayout;
