import { useState, useEffect } from "react";
import Modal from "../ui/Modal";
import { CheckSquare, Square, Timer } from "lucide-react";

const ALL_FEATURES = [
  "Clinic access",
  "Reports dashboard",
  "WhatsApp integration",
  "Multi-clinic support",
  "API access",
  "Priority support",
  "Custom branding",
];

const DEFAULT_PLAN = {
  name: "",
  price: 0,

  trial: {
    enabled: false,
    days: 14,
    seatsLimit: 2,
    features: [],
  },

  seats: {
    doctors: 0,
    staff: 0,
    receptionists: 0,
    support: 0,
    admin: 0,
    subadmin: 0,
  },

  features: [],
};

const EditPlanModal = ({ plan, mode = "edit", onClose, onSave }) => {
  const [form, setForm] = useState(DEFAULT_PLAN);

  useEffect(() => {
    if (mode === "edit" && plan) {
      setForm({
        ...DEFAULT_PLAN,
        ...plan,
        trial: plan.trial || DEFAULT_PLAN.trial,
      });
    } else {
      setForm(DEFAULT_PLAN);
    }
  }, [plan, mode]);

  const toggleSeat = (key, value) => {
    setForm({
      ...form,
      seats: {
        ...form.seats,
        [key]: Number(value),
      },
    });
  };

  const toggleFeature = (feature) => {
    const exists = form.features.includes(feature);

    setForm({
      ...form,
      features: exists
        ? form.features.filter((f) => f !== feature)
        : [...form.features, feature],
    });
  };

  const toggleTrialFeature = (feature) => {
    const exists = form.trial.features.includes(feature);

    setForm({
      ...form,
      trial: {
        ...form.trial,
        features: exists
          ? form.trial.features.filter((f) => f !== feature)
          : [...form.trial.features, feature],
      },
    });
  };

  const toggleAllFeatures = () => {
    const allSelected = form.features.length === ALL_FEATURES.length;

    setForm({
      ...form,
      features: allSelected ? [] : [...ALL_FEATURES],
    });
  };

  return (
    <Modal open onClose={onClose}>
      <div className="flex flex-col max-h-[90vh] w-full">

        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b bg-slate-50">
          <h3 className="text-xl font-semibold text-slate-900">
            {mode === "create" ? "Create New Plan" : `Edit Plan — ${plan?.name}`}
          </h3>

          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-900 text-lg"
          >
            ✕
          </button>
        </div>

        {/* BODY */}
        <div className="p-6 overflow-y-auto space-y-10">

          {/* BASIC INFO */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
              Basic Information
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Plan Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Starter, Pro, Enterprise"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-1 focus:ring-slate-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Monthly Price (₹)
                </label>
                <input
                  type="number"
                  value={form.price}
                  onChange={(e) =>
                    setForm({ ...form, price: Number(e.target.value) })
                  }
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-1 focus:ring-slate-900 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* SEATS */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
              Seat Limits by Role
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              {Object.entries(form.seats).map(([key, value]) => (
                <div key={key}>
                  <label className="block capitalize text-slate-600 mb-1">
                    {key.replace(/_/g, " ")}
                  </label>
                  <input
                    type="number"
                    value={value}
                    onChange={(e) => toggleSeat(key, e.target.value)}
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:ring-1 focus:ring-slate-900 focus:outline-none"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* PAID FEATURES */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
                Paid Features
              </h4>

              <button
                onClick={toggleAllFeatures}
                className="text-xs text-blue-600 hover:text-blue-800"
              >
                {form.features.length === ALL_FEATURES.length
                  ? "Deselect all"
                  : "Select all"}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ALL_FEATURES.map((feature) => {
                const checked = form.features.includes(feature);

                return (
                  <button
                    key={feature}
                    type="button"
                    onClick={() => toggleFeature(feature)}
                    className={`flex items-center gap-3 rounded-lg border px-3 py-2 text-sm transition ${
                      checked
                        ? "border-slate-900 bg-slate-50 text-slate-900"
                        : "border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {checked ? (
                      <CheckSquare size={18} />
                    ) : (
                      <Square size={18} className="text-slate-400" />
                    )}
                    {feature}
                  </button>
                );
              })}
            </div>
          </div>

          {/* TRIAL SETTINGS */}
          <div className="space-y-4 border-t pt-6">

            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                <Timer size={16} /> Trial Settings
              </h4>

              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={form.trial.enabled}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      trial: {
                        ...form.trial,
                        enabled: e.target.checked,
                      },
                    })
                  }
                  className="rounded"
                />
                Enable Trial
              </label>
            </div>

            {form.trial.enabled && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">

                {/* Trial Days */}
                <div>
                  <label className="block text-slate-600 mb-1">
                    Trial Duration (days)
                  </label>
                  <input
                    type="number"
                    value={form.trial.days}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        trial: {
                          ...form.trial,
                          days: Number(e.target.value),
                        },
                      })
                    }
                    className="w-full rounded-md border border-slate-300 px-3 py-2"
                  />
                </div>

                {/* Trial Seats */}
                <div>
                  <label className="block text-slate-600 mb-1">
                    Trial Seat Limit
                  </label>
                  <input
                    type="number"
                    value={form.trial.seatsLimit}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        trial: {
                          ...form.trial,
                          seatsLimit: Number(e.target.value),
                        },
                      })
                    }
                    className="w-full rounded-md border border-slate-300 px-3 py-2"
                  />
                </div>

                {/* Trial Features */}
                <div className="md:col-span-2">
                  <label className="block text-slate-600 mb-2">
                    Trial Features
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {ALL_FEATURES.map((feature) => {
                      const enabled = form.trial.features.includes(feature);

                      return (
                        <button
                          key={feature}
                          type="button"
                          onClick={() => toggleTrialFeature(feature)}
                          className={`flex items-center gap-3 rounded-lg border px-3 py-2 text-sm transition ${
                            enabled
                              ? "border-blue-700 bg-blue-50 text-blue-900"
                              : "border-slate-200 text-slate-600 hover:bg-slate-50"
                          }`}
                        >
                          {enabled ? (
                            <CheckSquare size={18} />
                          ) : (
                            <Square size={18} className="text-slate-400" />
                          )}
                          {feature}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
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
            onClick={() => onSave(form)}
            className="px-4 py-2 text-sm bg-slate-900 text-white rounded-md hover:bg-slate-800"
          >
            {mode === "create" ? "Create Plan" : "Save Changes"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EditPlanModal;
