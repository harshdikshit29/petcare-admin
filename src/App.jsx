import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import Clinics from "./pages/clinics/Clinics";
import ClinicDetails from "./pages/clinics/ClinicDetails";
import Licenses from "./pages/licenses/Licenses";
import LicenseDetails from "./pages/licenses/LicenseDetails";
import Plans from "./pages/plans/Plans";
import AuditLogs from "./pages/settings/AuditLogs";
import Settings from "./pages/settings/Settings";
import ManageUsers from "./pages/settings/ManageUsers";
import ChangePassword from "./pages/settings/ChangePassword";
import SecuritySettings from "./pages/settings/SecuritySettings";
import LoginActivity from "./pages/settings/LoginActivity";
import ApiKeys from "./pages/settings/ApiKeys";
import NotificationSettings from "./pages/settings/NotificationSettings";
import SystemPreferences from "./pages/settings/SystemPreferences";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Protected dashboard */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/clinics" element={<Clinics />} />
          <Route path="/clinics/:id" element={<ClinicDetails />} />
          <Route path="/licenses" element={<Licenses />} />
          <Route path="/licenses/:id" element={<LicenseDetails />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/audit-logs" element={<AuditLogs />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/settings/manage-users" element={<ManageUsers />} />
          <Route path="/settings/change-password" element={<ChangePassword />} />
          <Route path="/settings/security-settings" element={<SecuritySettings />} />
          <Route path="/settings/login-activity" element={<LoginActivity />} />
          <Route path="/settings/api-keys" element={<ApiKeys />} />
          <Route path="/settings/notification-settings" element={<NotificationSettings />} />
          <Route path="/settings/system-preferences" element={<SystemPreferences />} />
        </Route>

        {/* Default redirect */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
