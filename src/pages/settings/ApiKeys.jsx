import { useState } from "react";
import { ArrowLeft, KeyRound, Copy, RefreshCcw, Trash2, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import Toast from "../../components/ui/Toast";

const ApiKeys = () => {
  const navigate = useNavigate();

  const [keys, setKeys] = useState([
    {
      id: 1,
      name: "Production Key",
      key: "pk_live_9x82hd92jd83jd",
      scopes: ["clinics.read", "licenses.write", "plans.read"],
      lastUsed: "29 Jan 2025 — 10:12 AM",
      expiry: "Never",
      status: "active",
    },
    {
      id: 2,
      name: "Testing Key",
      key: "pk_test_48ds9s82d7sd2",
      scopes: ["clinics.read"],
      lastUsed: "Never",
      expiry: "12 Mar 2025",
      status: "inactive",
    },
  ]);

  const [toast, setToast] = useState({ show: false, message: "" });
  const [confirmAction, setConfirmAction] = useState(null);

  const showToast = (msg) => {
    setToast({ show: true, message: msg });
    setTimeout(() => setToast({ show: false, message: "" }), 2500);
  };

  const generateKey = () => {
    const random = `pk_live_${Math.random().toString(36).slice(2, 16)}`;

    const newKey = {
      id: Date.now(),
      name: `New API Key`,
      key: random,
      scopes: ["clinics.read"],
      lastUsed: "Never",
      expiry: "Never",
      status: "active",
    };

    setKeys((prev) => [newKey, ...prev]);
    showToast("API Key generated");
  };

  const handleCopy = (value) => {
    navigator.clipboard.writeText(value);
    showToast("API Key copied to clipboard");
  };

  const handleRevoke = () => {
    setKeys((prev) =>
      prev.map((k) =>
        k.id === confirmAction.key.id
          ? { ...k, status: "revoked" }
          : k
      )
    );

    setConfirmAction(null);
    showToast("API Key revoked");
  };

  const handleDelete = () => {
    setKeys((prev) =>
      prev.filter((k) => k.id !== confirmAction.key.id)
    );

    setConfirmAction(null);
    showToast("API Key deleted");
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
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">
            API Keys
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Manage API access tokens for integrations and third-party services
          </p>
        </div>

        <button
          onClick={generateKey}
          className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 flex items-center gap-2"
        >
          <KeyRound size={16} />
          Generate Key
        </button>
      </div>

      {/* API KEYS LIST */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm divide-y">

        {keys.map((item) => (
          <div
            key={item.id}
            className="p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:bg-slate-50"
          >

            {/* LEFT */}
            <div className="space-y-1">
              <h3 className="font-semibold text-slate-900">
                {item.name}
              </h3>

              <div className="text-sm text-slate-600 flex items-center gap-2">
                <code className="bg-slate-100 px-2 py-0.5 rounded text-xs">
                  {item.status === "revoked"
                    ? "************"
                    : item.key.slice(0, 8) + "••••••••••"}
                </code>

                {item.status === "active" && (
                  <button
                    onClick={() => handleCopy(item.key)}
                    className="text-blue-600 hover:underline flex items-center gap-1 text-xs"
                  >
                    <Copy size={14} /> Copy
                  </button>
                )}
              </div>

              <div className="flex flex-wrap gap-2 mt-2">
                {item.scopes.map((scope, i) => (
                  <span
                    key={i}
                    className="text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded-full"
                  >
                    {scope}
                  </span>
                ))}
              </div>

              <div className="text-xs text-slate-500 mt-1">
                Last used: {item.lastUsed} • Expiry: {item.expiry}
              </div>
            </div>

            {/* RIGHT ACTIONS */}
            <div className="flex items-center gap-3 text-xs">

              {item.status === "active" ? (
                <>
                  <button
                    onClick={() =>
                      showToast("API Key regenerated (UI only)")
                    }
                    className="text-indigo-700 hover:underline flex items-center gap-1"
                  >
                    <RefreshCcw size={14} /> Regenerate
                  </button>

                  <button
                    onClick={() =>
                      setConfirmAction({ type: "revoke", key: item })
                    }
                    className="text-yellow-700 hover:underline flex items-center gap-1"
                  >
                    <ShieldCheck size={14} /> Revoke
                  </button>
                </>
              ) : (
                <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
                  Revoked
                </span>
              )}

              <button
                onClick={() =>
                  setConfirmAction({ type: "delete", key: item })
                }
                className="text-red-600 hover:underline flex items-center gap-1"
              >
                <Trash2 size={14} /> Delete
              </button>

            </div>
          </div>
        ))}

      </div>

      {/* CONFIRM REVOKE */}
      <ConfirmDialog
        open={confirmAction?.type === "revoke"}
        onClose={() => setConfirmAction(null)}
        onConfirm={handleRevoke}
        title="Revoke API Key?"
        description="This key will stop working immediately for all integrations."
        variant="warning"
        confirmText="Revoke"
      />

      {/* CONFIRM DELETE */}
      <ConfirmDialog
        open={confirmAction?.type === "delete"}
        onClose={() => setConfirmAction(null)}
        onConfirm={handleDelete}
        title="Delete API Key?"
        description="This key will be permanently removed. This cannot be undone."
        variant="danger"
        confirmText="Delete"
      />

      {/* TOAST */}
      <Toast show={toast.show} message={toast.message} />

    </div>
  );
};

export default ApiKeys;
