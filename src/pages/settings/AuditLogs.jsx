import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AuditLogsTable from "../../components/audit/AuditLogsTable";

const AuditLogs = () => {
  const navigate = useNavigate();

  const [logs] = useState([
    {
      id: 1,
      user: "Super Admin",
      action: "Created Plan",
      module: "Plans",
      target: "Pro Plan",
      ip: "192.168.1.45",
      device: "Chrome / Windows",
      status: "success",
      timestamp: "2025-01-29 10:42 AM",
    },
    {
      id: 2,
      user: "Super Admin",
      action: "Deleted License",
      module: "Licenses",
      target: "PETCARE-XYZ-7890",
      ip: "192.168.1.45",
      device: "Chrome / Windows",
      status: "success",
      timestamp: "2025-01-29 10:15 AM",
    },
    {
      id: 3,
      user: "Clinic Admin",
      action: "Failed Login Attempt",
      module: "Authentication",
      target: "admin@clinic.com",
      ip: "10.1.0.22",
      device: "Edge / Windows",
      status: "failed",
      timestamp: "2025-01-29 09:40 AM",
    },
  ]);

  return (
    <div className="space-y-8">

      {/* BACK */}
      <button
        onClick={() => navigate("/settings")}
        className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900"
      >
        <ArrowLeft size={16} />
        Back to Settings
      </button>

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">
            Audit Logs
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Track every system activity for security & accountability
          </p>
        </div>
      </div>

      {/* TABLE */}
      <AuditLogsTable logs={logs} />

    </div>
  );
};

export default AuditLogs;
