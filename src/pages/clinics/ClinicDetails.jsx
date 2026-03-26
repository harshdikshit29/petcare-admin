import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import StatusBadge from "../../components/clinics/StatusBadge";
import ConfirmDialog from "../../components/ui/ConfirmDialog";

const ClinicDetails = () => {
  const navigate = useNavigate();
  const [action, setAction] = useState(null);

  // Dummy data (backend later)
  const clinic = {
    name: "Happy Paws Clinic",
    adminEmail: "admin@happypaws.com",
    plan: "Pro",
    status: "active",
    expiry: "12 Mar 2026",
    createdAt: "05 Jan 2025",
    licenseCount: 3,
  };

  return (
    <div className="space-y-8">
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900"
      >
        <ArrowLeft size={16} />
        Back to Clinics
      </button>

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">
            {clinic.name}
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            {clinic.adminEmail}
          </p>
        </div>

        <StatusBadge status={clinic.status} />
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <InfoCard label="Plan" value={clinic.plan} />
        <InfoCard label="Licenses" value={clinic.licenseCount} />
        <InfoCard label="Expiry Date" value={clinic.expiry} />
      </div>

      {/* Actions */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
        <h3 className="text-lg font-medium text-slate-900">
          License Actions
        </h3>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setAction("pause")}
            className="rounded-md bg-yellow-100 px-4 py-2 text-sm font-medium text-yellow-800 hover:bg-yellow-200 transition"
          >
            Pause Subscription
          </button>

          <button
            onClick={() => setAction("resume")}
            className="rounded-md bg-green-100 px-4 py-2 text-sm font-medium text-green-800 hover:bg-green-200 transition"
          >
            Resume Subscription
          </button>

          <button
            onClick={() => setAction("revoke")}
            className="rounded-md bg-red-100 px-4 py-2 text-sm font-medium text-red-800 hover:bg-red-200 transition"
          >
            Revoke Access
          </button>
        </div>

        <p className="text-xs text-slate-400">
          Actions take effect immediately. Use carefully.
        </p>
      </div>

      {/* Meta */}
      <div className="text-sm text-slate-500">
        Created on <span className="font-medium">{clinic.createdAt}</span>
      </div>

      {/* ================= MODALS ================= */}

      {/* Pause */}
      <ConfirmDialog
        open={action === "pause"}
        onClose={() => setAction(null)}
        onConfirm={() => {
          console.log("Subscription Paused");
          // API call later
        }}
        title="Pause subscription?"
        description="The clinic will temporarily lose access to the system until resumed by admin."
        variant="warning"
        confirmText="Pause"
      />

      {/* Resume */}
      <ConfirmDialog
        open={action === "resume"}
        onClose={() => setAction(null)}
        onConfirm={() => {
          console.log("Subscription Resumed");
          // API call later
        }}
        title="Resume subscription?"
        description="The clinic will regain full access to the system immediately."
        variant="success"
        confirmText="Resume"
      />

      {/* Revoke */}
      <ConfirmDialog
        open={action === "revoke"}
        onClose={() => setAction(null)}
        onConfirm={() => {
          console.log("Access Revoked");
          // API call later
        }}
        title="Revoke access permanently?"
        description="This will permanently disable the clinic account. This action cannot be undone."
        variant="danger"
        confirmText="Revoke"
      />
    </div>
  );
};

export default ClinicDetails;

/* ---------- Small UI Components ---------- */

const InfoCard = ({ label, value }) => (
  <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
    <p className="text-sm text-slate-500">{label}</p>
    <p className="mt-2 text-xl font-semibold text-slate-900">{value}</p>
  </div>
);
