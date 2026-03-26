import { useState, useEffect } from "react";
import Modal from "../ui/Modal";
import { RefreshCcw, KeyRound } from "lucide-react";

const GenerateLicenseModal = ({ plans = [], onClose, onSave }) => {
  const [licenseKey, setLicenseKey] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("");
  const [duration, setDuration] = useState(365);
  const [expiry, setExpiry] = useState("");

  // Generate Random License Key
  const generateKey = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let key = "";
    for (let i = 0; i < 5; i++) {
      key += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setLicenseKey(`PETCARE-${key}-${Date.now().toString().slice(-4)}`);
  };

  // Auto expiry calc
  useEffect(() => {
    if (!duration) return;
    const date = new Date();
    date.setDate(date.getDate() + Number(duration));
    setExpiry(date.toISOString().split("T")[0]);
  }, [duration]);

  useEffect(() => {
    generateKey();
  }, []);

  const handleSubmit = () => {
    onSave({
      licenseKey,
      plan: selectedPlan,
      duration,
      expiry,
      status: "active",
      createdAt: new Date().toISOString(),
    });
  };

  return (
    <Modal open onClose={onClose}>
      <div className="flex flex-col max-h-[85vh] w-full">

        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b bg-slate-50">
          <h3 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
            <KeyRound size={18} /> Generate License
          </h3>

          <button onClick={onClose} className="text-slate-500 hover:text-slate-900 text-lg">
            ✕
          </button>
        </div>

        {/* BODY */}
        <div className="p-6 space-y-6 overflow-y-auto">

          {/* LICENSE KEY */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              License Key
            </label>

            <div className="flex gap-2">
              <input
                value={licenseKey}
                onChange={(e) => setLicenseKey(e.target.value)}
                className="flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm font-mono tracking-wider"
              />

              <button
                onClick={generateKey}
                className="px-3 py-2 rounded-md bg-slate-900 text-white hover:bg-slate-800"
                title="Generate new key"
              >
                <RefreshCcw size={16} />
              </button>
            </div>
          </div>

          {/* PLAN */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Select Plan
            </label>

            <select
              value={selectedPlan}
              onChange={(e) => setSelectedPlan(e.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            >
              <option value="">Select a plan</option>
              {plans.map((plan) => (
                <option key={plan.id} value={plan.name}>
                  {plan.name} — ₹{plan.price}/month
                </option>
              ))}
            </select>
          </div>

          {/* DURATION */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Duration (Days)
              </label>
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Expiry Date
              </label>
              <input
                type="date"
                value={expiry}
                readOnly
                className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm bg-slate-50"
              />
            </div>
          </div>

          {/* STATUS */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Status
            </label>

            <select className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* NOTES */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Internal Notes (Optional)
            </label>

            <textarea
              rows={3}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              placeholder="Notes for admin..."
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
            Generate License
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default GenerateLicenseModal;
