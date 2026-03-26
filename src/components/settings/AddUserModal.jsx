import { useState } from "react";
import Modal from "../ui/Modal";

const MODULES = [
  "dashboard",
  "clinics",
  "licenses",
  "plans",
  "auditLogs",
  "settings",
];

const formatLabel = (key) =>
  key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());

const AddUserModal = ({ onClose, onSave }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "Staff",
    status: "active",
    permissions: MODULES.reduce((acc, module) => {
      acc[module] = { read: false, write: false };
      return acc;
    }, {}),
  });

  const togglePermission = (module, type) => {
    setForm((prev) => {
      const current = prev.permissions[module];

      const updated = {
        ...prev.permissions,
        [module]: {
          ...current,
          [type]: !current[type],
          read: type === "write" ? true : current.read,
        },
      };

      return { ...prev, permissions: updated };
    });
  };

  const handleSubmit = () => {
    onSave({
      ...form,
      lastLogin: "Never",
    });
  };

  return (
    <Modal open onClose={onClose}>
      <div className="flex flex-col w-full max-h-[90vh]">

        {/* HEADER */}
        <div className="px-6 py-4 border-b bg-slate-50 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-slate-900">
            Add New User
          </h3>

          <button onClick={onClose} className="text-slate-500 hover:text-slate-900">
            ✕
          </button>
        </div>

        {/* BODY */}
        <div className="p-6 space-y-6 overflow-y-auto">

          {/* USER INFO */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>
              <label className="block text-sm mb-1">Full Name</label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border rounded-md px-3 py-2 text-sm"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full border rounded-md px-3 py-2 text-sm"
                placeholder="user@email.com"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Role</label>
              <select
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                className="w-full border rounded-md px-3 py-2 text-sm"
              >
                <option>Super Admin</option>
                <option>Admin</option>
                <option>Staff</option>
                <option>Support</option>
              </select>
            </div>

            <div>
              <label className="block text-sm mb-1">Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full border rounded-md px-3 py-2 text-sm"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

          </div>

          {/* PERMISSIONS */}
          <div>
            <h4 className="text-sm font-semibold mb-3 text-slate-900">
              Page Permissions
            </h4>

            <div className="rounded-lg border border-slate-200 overflow-hidden">

              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th className="px-4 py-2 text-left">Module</th>
                    <th className="px-4 py-2 text-center">Read</th>
                    <th className="px-4 py-2 text-center">Write</th>
                  </tr>
                </thead>

                <tbody className="divide-y">
                  {MODULES.map((module) => (
                    <tr key={module}>
                      <td className="px-4 py-2 font-medium">
                        {formatLabel(module)}
                      </td>

                      {/* READ */}
                      <td className="px-4 py-2 text-center">
                        <input
                          type="checkbox"
                          checked={form.permissions[module].read}
                          onChange={() => togglePermission(module, "read")}
                        />
                      </td>

                      {/* WRITE */}
                      <td className="px-4 py-2 text-center">
                        <input
                          type="checkbox"
                          checked={form.permissions[module].write}
                          onChange={() => togglePermission(module, "write")}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

            </div>

            <p className="mt-2 text-xs text-slate-500">
              Write access automatically grants Read access.
            </p>
          </div>

        </div>

        {/* FOOTER */}
        <div className="px-6 py-4 border-t flex justify-end gap-2">
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
            Create User
          </button>
        </div>

      </div>
    </Modal>
  );
};

export default AddUserModal;
