import { useState } from "react";
import { ArrowLeft, Bell, Mail, Smartphone, Shield, Megaphone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Toast from "../../components/ui/Toast";

const NotificationSettings = () => {
  const navigate = useNavigate();

  const [toast, setToast] = useState({ show: false, message: "" });

  const showToast = (msg) => {
    setToast({ show: true, message: msg });
    setTimeout(() => setToast({ show: false, message: "" }), 2500);
  };

  const [settings, setSettings] = useState({
    email: {
      productUpdates: true,
      systemAlerts: true,
      securityAlerts: true,
      marketing: false,
    },
    sms: {
      securityAlerts: true,
      loginAlerts: true,
      reminders: false,
    },
    whatsapp: {
      reminders: true,
      promotions: false,
    },
    push: {
      dashboardAlerts: true,
      reports: false,
    },
  });

  const toggleSetting = (group, key) => {
    setSettings((prev) => ({
      ...prev,
      [group]: {
        ...prev[group],
        [key]: !prev[group][key],
      },
    }));

    showToast("Notification preferences updated");
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
          Notification Settings
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Manage how and when you receive alerts and messages
        </p>
      </div>

      {/* EMAIL */}
      <Section title="Email Notifications" icon={Mail}>
        <ToggleRow
          label="System alerts"
          description="Important system-related updates and outages"
          checked={settings.email.systemAlerts}
          onChange={() => toggleSetting("email", "systemAlerts")}
        />

        <ToggleRow
          label="Security alerts"
          description="Login alerts, password changes and suspicious activity"
          checked={settings.email.securityAlerts}
          onChange={() => toggleSetting("email", "securityAlerts")}
        />

        <ToggleRow
          label="Product updates"
          description="New features, improvements and announcements"
          checked={settings.email.productUpdates}
          onChange={() => toggleSetting("email", "productUpdates")}
        />

        <ToggleRow
          label="Marketing & offers"
          description="Promotional content and special offers"
          checked={settings.email.marketing}
          onChange={() => toggleSetting("email", "marketing")}
        />
      </Section>

      {/* SMS */}
      <Section title="SMS Notifications" icon={Smartphone}>
        <ToggleRow
          label="Login alerts"
          description="Receive SMS on new device login"
          checked={settings.sms.loginAlerts}
          onChange={() => toggleSetting("sms", "loginAlerts")}
        />

        <ToggleRow
          label="Security alerts"
          description="Critical account security warnings"
          checked={settings.sms.securityAlerts}
          onChange={() => toggleSetting("sms", "securityAlerts")}
        />

        <ToggleRow
          label="Appointment reminders"
          description="Pet vaccination and visit reminders"
          checked={settings.sms.reminders}
          onChange={() => toggleSetting("sms", "reminders")}
        />
      </Section>

      {/* WHATSAPP */}
      <Section title="WhatsApp Notifications" icon={Bell}>
        <ToggleRow
          label="Pet reminders"
          description="Vaccination and health reminder alerts"
          checked={settings.whatsapp.reminders}
          onChange={() => toggleSetting("whatsapp", "reminders")}
        />

        <ToggleRow
          label="Promotional messages"
          description="Special offers and promotions"
          checked={settings.whatsapp.promotions}
          onChange={() => toggleSetting("whatsapp", "promotions")}
        />
      </Section>

      {/* PUSH */}
      <Section title="Push Notifications" icon={Megaphone}>
        <ToggleRow
          label="Dashboard alerts"
          description="Important admin dashboard notifications"
          checked={settings.push.dashboardAlerts}
          onChange={() => toggleSetting("push", "dashboardAlerts")}
        />

        <ToggleRow
          label="Reports & analytics"
          description="Weekly insights and system reports"
          checked={settings.push.reports}
          onChange={() => toggleSetting("push", "reports")}
        />
      </Section>

      {/* SECURITY NOTE */}
      <div className="text-xs text-slate-500 flex items-center gap-2">
        <Shield size={14} />
        Critical security alerts cannot be fully disabled for safety.
      </div>

      {/* TOAST */}
      <Toast show={toast.show} message={toast.message} />

    </div>
  );
};

export default NotificationSettings;

/* -------- UI BLOCKS -------- */

const Section = ({ title, icon: Icon, children }) => (
  <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
    <div className="flex items-center gap-2 px-5 py-4 border-b">
      <Icon size={18} className="text-slate-600" />
      <h3 className="font-semibold text-slate-900">{title}</h3>
    </div>
    <div className="divide-y">{children}</div>
  </div>
);

const ToggleRow = ({ label, description, checked, onChange }) => (
  <div className="flex items-center justify-between px-5 py-4 hover:bg-slate-50 transition">
    <div>
      <p className="text-sm font-medium text-slate-900">{label}</p>
      <p className="text-xs text-slate-500 mt-0.5">{description}</p>
    </div>

    <button
      onClick={onChange}
      className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
        checked ? "bg-slate-900" : "bg-slate-300"
      }`}
    >
      <span
        className={`absolute top-[2px] left-[2px] h-5 w-5 rounded-full bg-white shadow-md transition-transform duration-300 ${
          checked ? "translate-x-6" : "translate-x-0"
        }`}
      />
    </button>
  </div>
);

