import { BrowserRouter, Routes, Route } from "react-router-dom";

// Public
import LandingPage from "../pages/public/LandingPage";
import LoginPage from "../pages/public/LoginPage";

// Employee
import DashboardEmployee from "../pages/employee/DashboardEmployee";

// Admin
import DashboardAdmin from "../pages/admin/DashboardAdmin";
import ManageMaterialAdmin from "../pages/admin/ManageMaterial";
import ManageExamAdmin from "../pages/admin/ManageExam";

// Super Admin
import DashboardSuperAdmin from "../pages/superadmin/DashboardSuperAdmin";
import UserManagement from "../pages/superadmin/UserManagement";
import ManageMaterialSuperAdmin from "../pages/superadmin/ManageMaterial";
import ManageExamSuperAdmin from "../pages/superadmin/ManageExam";

// Error Page
import NotFoundPage from "../pages/NotFoundPage";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= PUBLIC ================= */}

        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* ================= EMPLOYEE ================= */}

        <Route
          path="/employee"
          element={<DashboardEmployee />}
        />


        {/* ================= ADMIN ================= */}

        <Route
          path="/admin"
          element={<DashboardAdmin />}
        />

        <Route
          path="/admin/manage-exam"
          element={<ManageExamAdmin />}
        />

        <Route
          path="/admin/manage-materi"
          element={<ManageMaterialAdmin />}
        />


        {/* ================= SUPER ADMIN ================= */}

        <Route
          path="/superadmin"
          element={<DashboardSuperAdmin />}
        />

        <Route
          path="/superadmin/manage-user"
          element={<UserManagement />}
        />

        <Route
          path="/superadmin/manage-exam"
          element={<ManageExamSuperAdmin />}
        />

        <Route
          path="/superadmin/manage-materi"
          element={<ManageMaterialSuperAdmin />}
        />


        {/* ================= 404 ================= */}

        <Route
          path="*"
          element={<NotFoundPage />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
