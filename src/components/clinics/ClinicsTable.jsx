import StatusBadge from "./StatusBadge";
import { useNavigate } from "react-router-dom";

const clinics = [
  {
    id: 1,
    name: "Happy Paws Clinic",
    adminEmail: "admin@happypaws.com",
    plan: "Pro",
    status: "active",
    expiry: "12 Mar 2026",
  },
  {
    id: 2,
    name: "CareVet Hospital",
    adminEmail: "contact@carevet.com",
    plan: "Basic",
    status: "trial",
    expiry: "22 Oct 2025",
  },
  {
    id: 3,
    name: "PetLife Center",
    adminEmail: "info@petlife.com",
    plan: "Pro",
    status: "expired",
    expiry: "01 Aug 2025",
  },
];

const ClinicsTable = () => {
  const navigate = useNavigate();
  
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full border-collapse">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500">
              Clinic Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500">
              Admin Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500">
              Plan
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500">
              Expiry
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-slate-500">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-200">
          {clinics.map((clinic) => (
            <tr key={clinic.id} className="hover:bg-slate-50 transition">
              <td className="px-6 py-4 text-sm font-medium text-slate-900">
                {clinic.name}
              </td>
              <td className="px-6 py-4 text-sm text-slate-600">
                {clinic.adminEmail}
              </td>
              <td className="px-6 py-4 text-sm text-slate-600">
                {clinic.plan}
              </td>
              <td className="px-6 py-4">
                <StatusBadge status={clinic.status} />
              </td>
              <td className="px-6 py-4 text-sm text-slate-600">
                {clinic.expiry}
              </td>
              <td className="px-6 py-4 text-right text-sm">
                <button onClick={() => navigate(`/clinics/${clinic.id}`)} className="text-blue-600 hover:text-blue-800 font-medium">
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClinicsTable;
