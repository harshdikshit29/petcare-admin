import { useState, useEffect } from "react";
import Modal from "../ui/Modal";
import { Building2, Mail, KeyRound, ShieldCheck } from "lucide-react";

const AddClinicModal = ({ plans = [], licenses = [], onClose, onSave }) => {
  const [form, setForm] = useState({
    name: "",
    adminEmail: "",
    phone: "",
    city: "",
    licenseKey: "",
    plan: "",
    status: "active",
    notes: "",
  });

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = () => {
    onSave({
      ...form,
      createdAt: new Date().toISOString(),
    });
  };

  return (
    <Modal open onClose={onClose}>
      <div className="flex flex-col max-h-[90vh] w-full">

        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b bg-slate-50">
          <h3 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
            <Building2 size={18} /> Add New Clinic
          </h3>

          <button onClick={onClose} className="text-slate-500 hover:text-slate-900 text-lg">
            ✕
          </button>
        </div>

        {/* BODY */}
        <div className="p-6 space-y-6 overflow-y-auto">

          {/* CLINIC NAME */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Clinic Name
            </label>
            <input
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Happy Paws Veterinary Clinic"
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            />
          </div>

          {/* ADMIN EMAIL */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Clinic Admin Email
            </label>
            <input
              type="email"
              value={form.adminEmail}
              onChange={(e) => handleChange("adminEmail", e.target.value)}
              placeholder="admin@clinic.com"
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            />
          </div>

          {/* PHONE + CITY */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Phone Number
              </label>
              <input
                value={form.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                placeholder="+91 XXXXX XXXXX"
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                City / Location
              </label>
              <input
                value={form.city}
                onChange={(e) => handleChange("city", e.target.value)}
                placeholder="Lucknow"
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              />
            </div>
          </div>

          {/* LICENSE KEY */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              License Key
            </label>

            <select
              value={form.licenseKey}
              onChange={(e) => handleChange("licenseKey", e.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            >
              <option value="">Select License Key</option>
              {licenses.map((l, i) => (
                <option key={i} value={l.licenseKey}>
                  {l.licenseKey} — expires {l.expiry}
                </option>
              ))}
            </select>
          </div>

          {/* PLAN */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Subscription Plan
            </label>

            <select
              value={form.plan}
              onChange={(e) => handleChange("plan", e.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            >
              <option value="">Select Plan</option>
              {plans.map((plan) => (
                <option key={plan.id} value={plan.name}>
                  {plan.name} — ₹{plan.price}/month
                </option>
              ))}
            </select>
          </div>

          {/* STATUS */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Account Status
            </label>

            <select
              value={form.status}
              onChange={(e) => handleChange("status", e.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            >
              <option value="active">Active</option>
              <option value="paused">Paused</option>
              <option value="revoked">Revoked</option>
            </select>
          </div>

          {/* PASSWORD NOTICE */}
          <div className="rounded-md border border-blue-200 bg-blue-50 p-3 text-sm text-blue-800 flex gap-2">
            <ShieldCheck size={18} />
            Admin password will be automatically generated and sent to the provided email securely.
          </div>

          {/* NOTES */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Internal Notes (Optional)
            </label>
            <textarea
              rows={3}
              value={form.notes}
              onChange={(e) => handleChange("notes", e.target.value)}
              placeholder="Admin only notes..."
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            />
          </div>

        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t bg-white">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-md"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-sm bg-slate-900 text-white rounded-md hover:bg-slate-800"
          >
            Create Clinic
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AddClinicModal;