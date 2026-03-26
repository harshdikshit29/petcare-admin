import LicenseStatusBadge from "./LicenseStatusBadge";
import { useNavigate } from "react-router-dom";

const licenses = [
  {
    id: 101,
    clinic: "Happy Paws Clinic",
    plan: "Pro",
    seats: 5,
    status: "active",
    issued: "05 Jan 2025",
    expiry: "12 Mar 2026",
    key: "LIC-PET-2390X",
  },
  {
    id: 102,
    clinic: "CareVet Hospital",
    plan: "Basic",
    seats: 2,
    status: "trial",
    issued: "22 Sep 2025",
    expiry: "22 Oct 2025",
    key: "LIC-PET-8821A",
  },
  {
    id: 103,
    clinic: "PetLife Center",
    plan: "Pro",
    seats: 3,
    status: "expired",
    issued: "01 May 2024",
    expiry: "01 Aug 2025",
    key: "LIC-PET-5510Z",
  },
];

const LicensesTable = () => {
  const navigate = useNavigate();

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500">
              License Key
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500">
              Clinic
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500">
              Plan
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500">
              Seats
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500">
              Issued
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
          {licenses.map((lic) => (
            <tr key={lic.id} className="hover:bg-slate-50 transition">
              <td className="px-6 py-4 text-sm font-medium text-slate-900">
                {lic.key}
              </td>

              <td className="px-6 py-4 text-sm text-slate-700">
                {lic.clinic}
              </td>

              <td className="px-6 py-4 text-sm text-slate-600">
                {lic.plan}
              </td>

              <td className="px-6 py-4 text-sm text-slate-600">
                {lic.seats}
              </td>

              <td className="px-6 py-4">
                <LicenseStatusBadge status={lic.status} />
              </td>

              <td className="px-6 py-4 text-sm text-slate-600">
                {lic.issued}
              </td>

              <td className="px-6 py-4 text-sm text-slate-600">
                {lic.expiry}
              </td>

              <td className="px-6 py-4 text-right text-sm">
                <button
                  onClick={() => navigate(`/licenses/${lic.id}`)}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
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

export default LicensesTable;
