import { useState } from "react";
import { ArrowLeft, Image, Globe, Moon, Sun, Settings2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Toast from "../../components/ui/Toast";

const SystemPreferences = () => {
  const navigate = useNavigate();

  const [toast, setToast] = useState({ show: false, message: "" });

  const showToast = (msg) => {
    setToast({ show: true, message: msg });
    setTimeout(() => setToast({ show: false, message: "" }), 2500);
  };

  const [form, setForm] = useState({
    appName: "PetCare Admin",
    supportEmail: "support@petcare.com",
    timezone: "Asia/Kolkata",
    theme: "system",
    maintenanceMode: false,
  });

  const toggleMaintenance = () => {
    setForm((prev) => ({
      ...prev,
      maintenanceMode: !prev.maintenanceMode,
    }));
    showToast("System preference updated");
  };

  const handleSave = () => {
    showToast("System preferences saved");
  };

  return (
    <div className="space-y-10">

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
          System Preferences
        </h2>
        <p className="mt-1 text-sm text-slate-500 max-w-2xl">
          Configure system branding, platform behavior, localization and application settings.
        </p>
      </div>

      {/* BRANDING */}
      <Section title="Branding" icon={Image}>
        <Field label="Application Name">
          <input
            value={form.appName}
            onChange={(e) => setForm({ ...form, appName: e.target.value })}
            className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-slate-900 outline-none"
          />
        </Field>

        <Field label="Support Email">
          <input
            value={form.supportEmail}
            onChange={(e) => setForm({ ...form, supportEmail: e.target.value })}
            className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-slate-900 outline-none"
          />
        </Field>

        <Field label="Upload Logo">
          <button className="px-4 py-2 border border-dashed rounded-md text-sm text-slate-600 hover:bg-slate-50">
            Upload Logo
          </button>
        </Field>
      </Section>

      {/* LOCALIZATION */}
      <Section title="Localization" icon={Globe}>
        <Field label="Timezone">
          <select
            value={form.timezone}
            onChange={(e) => setForm({ ...form, timezone: e.target.value })}
            className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-slate-900 outline-none"
          >
            <option>Asia/Kolkata</option>
            <option>UTC</option>
            <option>America/New_York</option>
          </select>
        </Field>

        <Field label="Date Format">
          <select className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-slate-900 outline-none">
            <option>DD/MM/YYYY</option>
            <option>MM/DD/YYYY</option>
            <option>YYYY-MM-DD</option>
          </select>
        </Field>
      </Section>

      {/* THEME */}
      <Section title="Appearance" icon={Settings2}>
        <div className="flex gap-3">
          <ThemeButton
            icon={Sun}
            label="Light"
            active={form.theme === "light"}
            onClick={() => setForm({ ...form, theme: "light" })}
          />
          <ThemeButton
            icon={Moon}
            label="Dark"
            active={form.theme === "dark"}
            onClick={() => setForm({ ...form, theme: "dark" })}
          />
          <ThemeButton
            icon={Settings2}
            label="System"
            active={form.theme === "system"}
            onClick={() => setForm({ ...form, theme: "system" })}
          />
        </div>
      </Section>

      {/* SYSTEM MODE */}
      <Section title="System Controls" icon={Settings2}>
        <ToggleRow
          label="Maintenance Mode"
          description="Temporarily disable platform access for users"
          checked={form.maintenanceMode}
          onChange={toggleMaintenance}
        />
      </Section>

      {/* SAVE */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="rounded-md bg-slate-900 text-white px-5 py-2 text-sm font-medium hover:bg-slate-800 transition"
        >
          Save Preferences
        </button>
      </div>

      {/* TOAST */}
      <Toast show={toast.show} message={toast.message} />
    </div>
  );
};

export default SystemPreferences;

/* ---------------- UI BLOCKS ---------------- */

const Section = ({ title, icon: Icon, children }) => (
  <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
    <div className="flex items-center gap-2 px-5 py-4 border-b">
      <Icon size={18} className="text-slate-600" />
      <h3 className="font-semibold text-slate-900">{title}</h3>
    </div>
    <div className="p-5 space-y-5">{children}</div>
  </div>
);

const Field = ({ label, children }) => (
  <div>
    <label className="block text-sm font-medium text-slate-700 mb-1">
      {label}
    </label>
    {children}
  </div>
);

const ThemeButton = ({ icon: Icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 border rounded-md text-sm transition ${
      active
        ? "border-slate-900 bg-slate-900 text-white"
        : "border-slate-300 hover:bg-slate-50"
    }`}
  >
    <Icon size={16} />
    {label}
  </button>
);

const ToggleRow = ({ label, description, checked, onChange }) => (
  <div className="flex items-center justify-between hover:bg-slate-50 px-3 py-3 rounded-md transition">
    <div>
      <p className="text-sm font-medium text-slate-900">{label}</p>
      <p className="text-xs text-slate-500">{description}</p>
    </div>

    <button
      onClick={onChange}
      className={`relative w-12 h-6 rounded-full transition ${
        checked ? "bg-slate-900" : "bg-slate-300"
      }`}
    >
      <span
        className={`absolute top-[2px] left-[2px] h-5 w-5 bg-white rounded-full shadow transition ${
          checked ? "translate-x-6" : "translate-x-0"
        }`}
      />
    </button>
  </div>
);
