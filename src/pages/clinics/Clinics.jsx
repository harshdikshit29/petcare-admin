import { useState } from "react";
import ClinicsTable from "../../components/clinics/ClinicsTable";
import AddClinicModal from "../../components/clinics/AddClinicModal";
import Toast from "../../components/ui/Toast";

const Clinics = () => {
  const [showModal, setShowModal] = useState(false);
  const [clinics, setClinics] = useState([]);
  const [toast, setToast] = useState({ show: false, message: "" });

  // Demo plans
  const plans = [
    { id: 1, name: "Basic", price: 999 },
    { id: 2, name: "Pro", price: 2499 },
    { id: 3, name: "Enterprise", price: 6999 },
  ];

  // Demo licenses
  const licenses = [
    { licenseKey: "PETCARE-ABCD-1234", expiry: "2026-01-01" },
    { licenseKey: "PETCARE-ZYXW-9876", expiry: "2025-10-12" },
  ];

  const showToast = (msg) => {
    setToast({ show: true, message: msg });
    setTimeout(() => setToast({ show: false, message: "" }), 2500);
  };

  const handleAddClinic = (clinic) => {
    setClinics((prev) => [...prev, clinic]);
    showToast("Clinic added successfully");
    setShowModal(false);
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">
            Clinics
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Manage all registered clinics and their licenses
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 transition"
        >
          + Add Clinic
        </button>
      </div>

      {/* Table */}
      <ClinicsTable clinics={clinics} />

      {/* Modal */}
      {showModal && (
        <AddClinicModal
          plans={plans}
          licenses={licenses}
          onClose={() => setShowModal(false)}
          onSave={handleAddClinic}
        />
      )}

      {/* Toast */}
      <Toast show={toast.show} message={toast.message} />
    </div>
  );
};

export default Clinics;
