import { useState } from "react";
import { ArrowLeft, Monitor, Smartphone, AlertTriangle, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Toast from "../../components/ui/Toast";

const LoginActivity = () => {
  const navigate = useNavigate();

  const [toast, setToast] = useState({ show: false, message: "" });

  const showToast = (msg) => {
    setToast({ show: true, message: msg });
    setTimeout(() => setToast({ show: false, message: "" }), 2500);
  };

  const [logs] = useState([
    {
      id: 1,
      ip: "192.168.1.45",
      device: "Windows PC",
      browser: "Chrome",
      location: "Delhi, India",
      time: "29 Jan 2025 — 10:32 AM",
      status: "success",
      risk: "low",
      current: true,
    },
    {
      id: 2,
      ip: "157.45.92.10",
      device: "Android Phone",
      browser: "Chrome Mobile",
      location: "Mumbai, India",
      time: "28 Jan 2025 — 08:21 PM",
      status: "success",
      risk: "medium",
      current: false,
    },
    {
      id: 3,
      ip: "89.12.54.190",
      device: "Unknown Device",
      browser: "Firefox",
      location: "Berlin, Germany",
      time: "27 Jan 2025 — 03:14 AM",
      status: "failed",
      risk: "high",
      current: false,
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
            Login Activity
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            View recent login attempts, devices and suspicious activity
          </p>
        </div>

        <span className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
          {logs.length} total sessions
        </span>
      </div>

      {/* TABLE */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">

        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-3 text-left">Device</th>
              <th className="px-4 py-3 text-left">IP Address</th>
              <th className="px-4 py-3 text-left">Location</th>
              <th className="px-4 py-3 text-left">Browser</th>
              <th className="px-4 py-3 text-left">Time</th>
              <th className="px-4 py-3 text-left">Risk</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-slate-50">

                {/* DEVICE */}
                <td className="px-4 py-3 flex items-center gap-2">
                  {log.device.includes("Phone") ? (
                    <Smartphone size={16} className="text-slate-500" />
                  ) : (
                    <Monitor size={16} className="text-slate-500" />
                  )}
                  <div>
                    <p className="font-medium text-slate-900">
                      {log.device}
                    </p>
                    <p className="text-xs text-slate-500">
                      {log.current ? "Current Session" : log.status}
                    </p>
                  </div>
                </td>

                {/* IP */}
                <td className="px-4 py-3 text-slate-700">
                  {log.ip}
                </td>

                {/* LOCATION */}
                <td className="px-4 py-3 text-slate-600">
                  {log.location}
                </td>

                {/* BROWSER */}
                <td className="px-4 py-3 text-slate-600">
                  {log.browser}
                </td>

                {/* TIME */}
                <td className="px-4 py-3 text-slate-500">
                  {log.time}
                </td>

                {/* RISK */}
                <td className="px-4 py-3">
                  <RiskBadge level={log.risk} />
                </td>

                {/* ACTION */}
                <td className="px-4 py-3 text-right">
                  {!log.current && (
                    <button
                      onClick={() =>
                        showToast(`Session logged out: ${log.ip}`)
                      }
                      className="flex items-center gap-1 text-red-600 hover:underline text-xs"
                    >
                      <LogOut size={14} />
                      Logout
                    </button>
                  )}
                </td>

              </tr>
            ))}
          </tbody>
        </table>

      </div>

      {/* INFO */}
      <div className="text-xs text-slate-500 flex items-center gap-2">
        <AlertTriangle size={14} />
        If you see suspicious activity, logout unknown sessions immediately.
      </div>

      {/* TOAST */}
      <Toast show={toast.show} message={toast.message} />

    </div>
  );
};

export default LoginActivity;

/* -------- RISK BADGE -------- */

const RiskBadge = ({ level }) => {
  const styles = {
    low: "bg-green-100 text-green-700",
    medium: "bg-yellow-100 text-yellow-700",
    high: "bg-red-100 text-red-700",
  };

  return (
    <span className={`px-2 py-1 text-xs rounded-full ${styles[level]}`}>
      {level.toUpperCase()}
    </span>
  );
};
