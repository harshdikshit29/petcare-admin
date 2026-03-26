import { useState } from "react";
import { ArrowLeft, Eye, EyeOff, Lock, Mail, KeyRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Toast from "../../components/ui/Toast";

const ChangePassword = () => {
  const navigate = useNavigate();

  const [mode, setMode] = useState("normal"); 
  // normal | email | otp | reset

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    email: "",
    otp: "",
  });

  const [toast, setToast] = useState({ show: false, message: "" });

  const showToast = (msg) => {
    setToast({ show: true, message: msg });
    setTimeout(() => setToast({ show: false, message: "" }), 2500);
  };

  const handleNormalSubmit = (e) => {
    e.preventDefault();

    if (!form.currentPassword || !form.newPassword || !form.confirmPassword) {
      showToast("Please fill all fields");
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      showToast("Passwords do not match");
      return;
    }

    showToast("Password updated successfully");

    setForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      email: "",
      otp: "",
    });
  };

  const handleSendOTP = () => {
    if (!form.email) {
      showToast("Enter your registered email");
      return;
    }

    showToast("OTP sent to your email");
    setMode("otp");
  };

  const handleVerifyOTP = () => {
    if (!form.otp) {
      showToast("Enter OTP");
      return;
    }

    showToast("OTP verified successfully");
    setMode("reset");
  };

  const handleResetPassword = () => {
    if (!form.newPassword || !form.confirmPassword) {
      showToast("Fill new password fields");
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      showToast("Passwords do not match");
      return;
    }

    showToast("Password reset successfully");

    setMode("normal");
    setForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      email: "",
      otp: "",
    });
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
          Change Password
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Securely update your password or reset it using OTP verification.
        </p>
      </div>

      {/* CARD */}
      <div className="max-w-lg rounded-xl border border-slate-200 bg-white shadow-sm p-6">

        {/* MODE SWITCH */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setMode("normal")}
            className={`text-sm px-3 py-1 rounded-md ${
              mode === "normal"
                ? "bg-slate-900 text-white"
                : "bg-slate-100 text-slate-600"
            }`}
          >
            Use Current Password
          </button>

          <button
            onClick={() => setMode("email")}
            className={`text-sm px-3 py-1 rounded-md ${
              mode !== "normal"
                ? "bg-slate-900 text-white"
                : "bg-slate-100 text-slate-600"
            }`}
          >
            Forgot Password
          </button>
        </div>

        {/* NORMAL FLOW */}
        {mode === "normal" && (
          <form onSubmit={handleNormalSubmit} className="space-y-5">

            {/* CURRENT PASSWORD */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Current Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showCurrent ? "text" : "password"}
                  value={form.currentPassword}
                  onChange={(e) =>
                    setForm({ ...form, currentPassword: e.target.value })
                  }
                  placeholder="Enter current password"
                  className="w-full pl-9 pr-10 py-2.5 border border-slate-300 rounded-md text-sm focus:ring-1 focus:ring-slate-900"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                >
                  {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* NEW PASSWORD */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                New Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showNew ? "text" : "password"}
                  value={form.newPassword}
                  onChange={(e) =>
                    setForm({ ...form, newPassword: e.target.value })
                  }
                  placeholder="Create new password"
                  className="w-full pl-9 pr-10 py-2.5 border border-slate-300 rounded-md text-sm focus:ring-1 focus:ring-slate-900"
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                >
                  {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* CONFIRM */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Confirm New Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showConfirm ? "text" : "password"}
                  value={form.confirmPassword}
                  onChange={(e) =>
                    setForm({ ...form, confirmPassword: e.target.value })
                  }
                  placeholder="Re-enter new password"
                  className="w-full pl-9 pr-10 py-2.5 border border-slate-300 rounded-md text-sm focus:ring-1 focus:ring-slate-900"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                >
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button className="w-full bg-slate-900 text-white py-2.5 rounded-md text-sm font-medium hover:bg-slate-800">
              Update Password
            </button>
          </form>
        )}

        {/* EMAIL STEP */}
        {mode === "email" && (
          <div className="space-y-4">
            <label className="block text-sm font-medium">Registered Email</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="admin@email.com"
                className="w-full pl-9 py-2.5 border border-slate-300 rounded-md text-sm focus:ring-1 focus:ring-slate-900"
              />
            </div>

            <button
              onClick={handleSendOTP}
              className="w-full bg-slate-900 text-white py-2.5 rounded-md text-sm font-medium hover:bg-slate-800"
            >
              Send OTP
            </button>
          </div>
        )}

        {/* OTP STEP */}
        {mode === "otp" && (
          <div className="space-y-4">
            <label className="block text-sm font-medium">Enter OTP</label>
            <div className="relative">
              <KeyRound size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={form.otp}
                onChange={(e) => setForm({ ...form, otp: e.target.value })}
                placeholder="6-digit OTP"
                className="w-full pl-9 py-2.5 border border-slate-300 rounded-md text-sm focus:ring-1 focus:ring-slate-900"
              />
            </div>

            <button
              onClick={handleVerifyOTP}
              className="w-full bg-slate-900 text-white py-2.5 rounded-md text-sm font-medium hover:bg-slate-800"
            >
              Verify OTP
            </button>
          </div>
        )}

        {/* RESET STEP */}
        {mode === "reset" && (
          <div className="space-y-4">

            <div>
              <label className="block text-sm font-medium">New Password</label>
              <input
                type="password"
                value={form.newPassword}
                onChange={(e) =>
                  setForm({ ...form, newPassword: e.target.value })
                }
                className="w-full py-2.5 border border-slate-300 rounded-md text-sm focus:ring-1 focus:ring-slate-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">
                Confirm New Password
              </label>
              <input
                type="password"
                value={form.confirmPassword}
                onChange={(e) =>
                  setForm({ ...form, confirmPassword: e.target.value })
                }
                className="w-full py-2.5 border border-slate-300 rounded-md text-sm focus:ring-1 focus:ring-slate-900"
              />
            </div>

            <button
              onClick={handleResetPassword}
              className="w-full bg-slate-900 text-white py-2.5 rounded-md text-sm font-medium hover:bg-slate-800"
            >
              Reset Password
            </button>
          </div>
        )}

      </div>

      {/* TOAST */}
      <Toast show={toast.show} message={toast.message} />

    </div>
  );
};

export default ChangePassword;
