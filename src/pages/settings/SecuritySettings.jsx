import { useState } from "react";
import { ArrowLeft, ShieldCheck, Lock, Smartphone, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Toast from "../../components/ui/Toast";

const SecuritySettings = () => {
  const navigate = useNavigate();

  const [settings, setSettings] = useState({
    twoFactor: true,
    maxLoginAttempts: 5,
    lockDuration: 15,
    sessionTimeout: 30,
    bruteForceProtection: true,
    trustedDevicesOnly: false,
    securityAlerts: true,
  });

  const [toast, setToast] = useState({ show: false, message: "" });

  const showToast = (msg) => {
    setToast({ show: true, message: msg });
    setTimeout(() => setToast({ show: false, message: "" }), 2500);
  };

  const handleSave = () => {
    showToast("Security settings updated successfully");
  };

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
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">
          Security Settings
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Manage authentication, login protection and account security
        </p>
      </div>

      {/* SECURITY CARDS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* 2FA */}
        <SecurityCard icon={Smartphone} title="Two-Factor Authentication">
          <Toggle
            label="Require OTP at login"
            enabled={settings.twoFactor}
            onChange={(v) => setSettings({ ...settings, twoFactor: v })}
          />
          <p className="text-xs text-slate-500 mt-1">
            Adds extra security by requiring OTP on login.
          </p>
        </SecurityCard>

        {/* BRUTE FORCE */}
        <SecurityCard icon={ShieldCheck} title="Brute Force Protection">
          <Toggle
            label="Enable brute force protection"
            enabled={settings.bruteForceProtection}
            onChange={(v) =>
              setSettings({ ...settings, bruteForceProtection: v })
            }
          />
          <p className="text-xs text-slate-500 mt-1">
            Prevents repeated failed login attempts.
          </p>
        </SecurityCard>

        {/* LOGIN ATTEMPTS */}
        <SecurityCard icon={Lock} title="Login Attempt Limits">
          <NumberInput
            label="Max failed login attempts"
            value={settings.maxLoginAttempts}
            onChange={(v) =>
              setSettings({ ...settings, maxLoginAttempts: v })
            }
          />
          <NumberInput
            label="Lock account duration (minutes)"
            value={settings.lockDuration}
            onChange={(v) =>
              setSettings({ ...settings, lockDuration: v })
            }
          />
        </SecurityCard>

        {/* SESSION */}
        <SecurityCard icon={ShieldCheck} title="Session Timeout">
          <NumberInput
            label="Auto logout after (minutes)"
            value={settings.sessionTimeout}
            onChange={(v) =>
              setSettings({ ...settings, sessionTimeout: v })
            }
          />
          <p className="text-xs text-slate-500 mt-1">
            Idle users will be logged out automatically.
          </p>
        </SecurityCard>

        {/* TRUSTED DEVICES */}
        <SecurityCard icon={Smartphone} title="Trusted Devices">
          <Toggle
            label="Allow login only from trusted devices"
            enabled={settings.trustedDevicesOnly}
            onChange={(v) =>
              setSettings({ ...settings, trustedDevicesOnly: v })
            }
          />
        </SecurityCard>

        {/* ALERTS */}
        <SecurityCard icon={AlertTriangle} title="Security Alerts">
          <Toggle
            label="Email alerts on suspicious login"
            enabled={settings.securityAlerts}
            onChange={(v) =>
              setSettings({ ...settings, securityAlerts: v })
            }
          />
        </SecurityCard>

      </div>

      {/* SAVE BUTTON */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="bg-slate-900 text-white px-5 py-2.5 rounded-md text-sm font-medium hover:bg-slate-800 transition"
        >
          Save Security Settings
        </button>
      </div>

      {/* TOAST */}
      <Toast show={toast.show} message={toast.message} />
    </div>
  );
};

export default SecuritySettings;

/* ---------------- COMPONENTS ---------------- */

const SecurityCard = ({ icon: Icon, title, children }) => (
  <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-6 space-y-4">
    <div className="flex items-center gap-3">
      <div className="p-2 rounded-lg bg-slate-100 text-slate-700">
        <Icon size={20} />
      </div>
      <h3 className="text-lg font-semibold text-slate-900">
        {title}
      </h3>
    </div>
    {children}
  </div>
);

const Toggle = ({ label, enabled, onChange }) => (
  <div className="flex items-center justify-between">
    <span className="text-sm text-slate-700">{label}</span>
    <button
      onClick={() => onChange(!enabled)}
      className={`w-11 h-6 rounded-full relative transition ${
        enabled ? "bg-slate-900" : "bg-slate-300"
      }`}
    >
      <span
        className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition ${
          enabled ? "left-5" : "left-1"
        }`}
      />
    </button>
  </div>
);

const NumberInput = ({ label, value, onChange }) => (
  <div className="space-y-1">
    <label className="block text-sm text-slate-700">{label}</label>
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-slate-900 focus:outline-none"
    />
  </div>
);
