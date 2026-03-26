import {
  Users,
  Lock,
  ShieldCheck,
  History,
  ClipboardList,
  KeyRound,
  Bell,
  Settings as SettingsIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Manage Users",
      desc: "Add, edit or remove admins and staff users",
      icon: Users,
      color: "bg-blue-50 text-blue-700",
      path: "/settings/manage-users",
    },
    {
      title: "Change Password",
      desc: "Update your account password securely",
      icon: Lock,
      color: "bg-purple-50 text-purple-700",
      path: "/settings/change-password",
    },
    {
      title: "Security Settings",
      desc: "Two-factor authentication, sessions & login protection",
      icon: ShieldCheck,
      color: "bg-green-50 text-green-700",
      path: "/settings/security-settings",
    },
    {
      title: "Login Activity",
      desc: "View login history, devices and suspicious activity",
      icon: History,
      color: "bg-yellow-50 text-yellow-700",
      path: "/settings/login-activity",
    },
    {
      title: "Audit Logs",
      desc: "Track all system activity and admin actions",
      icon: ClipboardList,
      color: "bg-slate-100 text-slate-700",
      path: "/audit-logs",
    },
    {
      title: "API Keys",
      desc: "Generate and manage system API keys",
      icon: KeyRound,
      color: "bg-indigo-50 text-indigo-700",
      path: "/settings/api-keys",
    },
    {
      title: "Notifications",
      desc: "Email alerts, reminders and system notifications",
      icon: Bell,
      color: "bg-pink-50 text-pink-700",
      path: "/settings/notification-settings",
    },
    {
      title: "System Preferences",
      desc: "Branding, system settings and configuration",
      icon: SettingsIcon,
      color: "bg-gray-50 text-gray-700",
      path: "/settings/system-preferences",
    },
  ];

  return (
    <div className="space-y-10">

      {/* HEADER */}
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">
          Settings & Security Center
        </h2>
        <p className="mt-1 text-sm text-slate-500 max-w-2xl">
          Manage users, security, system preferences, audit logs, API access and account protection — all in one place.
        </p>
      </div>

      {/* CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {cards.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.title}
              onClick={() => navigate(item.path)}
              className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition text-left cursor-pointer"
            >
              <div className="flex items-start gap-4">

                <div className={`p-3 rounded-lg ${item.color}`}>
                  <Icon size={22} />
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-900 group-hover:text-slate-800">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    {item.desc}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Settings;
