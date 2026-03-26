import { useState } from "react";
import LicensesTable from "../../components/licenses/LicensesTable";
import GenerateLicenseModal from "../../components/licenses/GenerateLicenseModal";
import Toast from "../../components/ui/Toast";

const Licenses = () => {
  const [showModal, setShowModal] = useState(false);
  const [licenses, setLicenses] = useState([]);
  const [toast, setToast] = useState({ show: false, message: "" });

  // Demo plans — replace later with backend
  const plans = [
    { id: 1, name: "Basic", price: 999 },
    { id: 2, name: "Pro", price: 2499 },
    { id: 3, name: "Enterprise", price: 6999 },
  ];

  const showToast = (msg) => {
    setToast({ show: true, message: msg });
    setTimeout(() => setToast({ show: false, message: "" }), 2500);
  };

  const handleCreateLicense = (license) => {
    setLicenses((prev) => [...prev, license]);
    showToast("License generated successfully");
    setShowModal(false);
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">
            Licenses
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Manage product licenses, activation keys and subscription status
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 transition"
        >
          + Generate License
        </button>
      </div>

      {/* Table */}
      <LicensesTable licenses={licenses} />

      {/* Modal */}
      {showModal && (
        <GenerateLicenseModal
          plans={plans}
          onClose={() => setShowModal(false)}
          onSave={handleCreateLicense}
        />
      )}

      {/* Toast */}
      <Toast show={toast.show} message={toast.message} />
    </div>
  );
};

export default Licenses;
