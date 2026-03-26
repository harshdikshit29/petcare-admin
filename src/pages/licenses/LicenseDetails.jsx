import { ArrowLeft, KeyRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LicenseStatusBadge from "../../components/licenses/LicenseStatusBadge";
import ConfirmDialog from "../../components/ui/ConfirmDialog";

const LicenseDetails = () => {
  const navigate = useNavigate();
  const [action, setAction] = useState(null);

  // Dummy license data (backend later)
  const license = {
    key: "LIC-PET-2390X",
    clinic: "Happy Paws Clinic",
    plan: "Pro",
    seats: 5,
    status: "active",
    issued: "05 Jan 2025",
    expiry: "12 Mar 2026",
    lastUsed: "02 Feb 2026",
    createdBy: "Super Admin",
  };

  return (
    <div className="space-y-8">

      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900"
      >
        <ArrowLeft size={16} />
        Back to Licenses
      </button>

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900 flex items-center gap-2">
            <KeyRound size={20} />
            License Details
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Manage activation key and subscription lifecycle
          </p>
        </div>

        <LicenseStatusBadge status={license.status} />
      </div>

      {/* License Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <InfoCard label="License Key" value={license.key} highlight />
        <InfoCard label="Plan" value={license.plan} />
        <InfoCard label="Seats" value={license.seats} />
        <InfoCard label="Expiry Date" value={license.expiry} />
      </div>

      {/* Meta Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetaCard label="Clinic" value={license.clinic} />
        <MetaCard label="Issued On" value={license.issued} />
        <MetaCard label="Last Used" value={license.lastUsed} />
      </div>

      {/* Actions */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
        <h3 className="text-lg font-medium text-slate-900">
          License Actions
        </h3>

        <div className="flex flex-wrap gap-3">

          <button
            onClick={() => setAction("extend")}
            className="rounded-md bg-blue-100 px-4 py-2 text-sm font-medium text-blue-800 hover:bg-blue-200 transition"
          >
            Extend License
          </button>

          <button
            onClick={() => setAction("pause")}
            className="rounded-md bg-yellow-100 px-4 py-2 text-sm font-medium text-yellow-800 hover:bg-yellow-200 transition"
          >
            Pause License
          </button>

          <button
            onClick={() => setAction("resume")}
            className="rounded-md bg-green-100 px-4 py-2 text-sm font-medium text-green-800 hover:bg-green-200 transition"
          >
            Resume License
          </button>

          <button
            onClick={() => setAction("revoke")}
            className="rounded-md bg-red-100 px-4 py-2 text-sm font-medium text-red-800 hover:bg-red-200 transition"
          >
            Revoke License
          </button>
        </div>

        <p className="text-xs text-slate-400">
          These actions affect real clinic access. Proceed carefully.
        </p>
      </div>

      {/* Audit */}
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h3 className="text-lg font-medium text-slate-900 mb-3">
          Audit Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-600">
          <div>Created by: <span className="font-medium">{license.createdBy}</span></div>
          <div>Last activity: <span className="font-medium">{license.lastUsed}</span></div>
        </div>
      </div>

      {/* ================= MODALS ================= */}

      <ConfirmDialog
        open={action === "extend"}
        onClose={() => setAction(null)}
        onConfirm={() => console.log("License Extended")}
        title="Extend license validity?"
        description="This will extend the subscription period for this license."
        variant="success"
        confirmText="Extend"
      />

      <ConfirmDialog
        open={action === "pause"}
        onClose={() => setAction(null)}
        onConfirm={() => console.log("License Paused")}
        title="Pause license access?"
        description="The clinic will temporarily lose access until resumed."
        variant="warning"
        confirmText="Pause"
      />

      <ConfirmDialog
        open={action === "resume"}
        onClose={() => setAction(null)}
        onConfirm={() => console.log("License Resumed")}
        title="Resume license access?"
        description="Access will be restored immediately for this clinic."
        variant="success"
        confirmText="Resume"
      />

      <ConfirmDialog
        open={action === "revoke"}
        onClose={() => setAction(null)}
        onConfirm={() => console.log("License Revoked")}
        title="Revoke license permanently?"
        description="This will permanently disable this license. This cannot be undone."
        variant="danger"
        confirmText="Revoke"
      />
    </div>
  );
};

export default LicenseDetails;

/* ---------- UI Blocks ---------- */

const InfoCard = ({ label, value, highlight }) => (
  <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
    <p className="text-sm text-slate-500">{label}</p>
    <p className={`mt-2 text-xl font-semibold ${highlight ? "text-blue-700" : "text-slate-900"}`}>
      {value}
    </p>
  </div>
);

const MetaCard = ({ label, value }) => (
  <div className="rounded-xl border border-slate-200 bg-white p-6">
    <p className="text-sm text-slate-500">{label}</p>
    <p className="mt-1 text-sm font-medium text-slate-900">{value}</p>
  </div>
);
