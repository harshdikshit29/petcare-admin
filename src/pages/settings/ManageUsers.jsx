import { useState } from "react";
import { Plus, Shield, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import Toast from "../../components/ui/Toast";
import AddUserModal from "../../components/settings/AddUserModal";

const ManageUsers = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([
        {
            id: 1,
            name: "Super Admin",
            email: "admin@petcare.com",
            role: "Super Admin",
            status: "active",
            lastLogin: "2025-01-29 10:30 AM",
            permissions: {
                dashboard: { read: true, write: true },
                clinics: { read: true, write: true },
                licenses: { read: true, write: true },
                plans: { read: true, write: true },
                auditLogs: { read: true, write: false },
                settings: { read: true, write: true },
            },
        },
        {
            id: 2,
            name: "Clinic Manager",
            email: "manager@clinic.com",
            role: "Admin",
            status: "active",
            lastLogin: "2025-01-28 08:10 PM",
            permissions: {
                dashboard: { read: true, write: false },
                clinics: { read: true, write: true },
                licenses: { read: true, write: true },
                plans: { read: true, write: false },
                auditLogs: { read: false, write: false },
                settings: { read: false, write: false },
            },
        },
        {
            id: 3,
            name: "Support Staff",
            email: "support@petcare.com",
            role: "Staff",
            status: "inactive",
            lastLogin: "Never",
            permissions: {
                dashboard: { read: true, write: false },
                clinics: { read: true, write: false },
                licenses: { read: true, write: false },
                plans: { read: false, write: false },
                auditLogs: { read: false, write: false },
                settings: { read: false, write: false },
            },
        },
    ]);

    const [showModal, setShowModal] = useState(false);
    const [confirmAction, setConfirmAction] = useState(null);
    const [toast, setToast] = useState({ show: false, message: "" });

    const showToast = (msg) => {
        setToast({ show: true, message: msg });
        setTimeout(() => setToast({ show: false, message: "" }), 2500);
    };

    const handleAddUser = (user) => {
        setUsers((prev) => [...prev, { ...user, id: Date.now() }]);
        setShowModal(false);
        showToast("User added successfully");
    };

    const handleDelete = () => {
        setUsers((prev) => prev.filter((u) => u.id !== confirmAction.user.id));
        setConfirmAction(null);
        showToast("User deleted");
    };

    const handleToggleStatus = () => {
        setUsers((prev) =>
            prev.map((u) =>
                u.id === confirmAction.user.id
                    ? {
                        ...u,
                        status: u.status === "active" ? "inactive" : "active",
                    }
                    : u
            )
        );
        setConfirmAction(null);
        showToast("User status updated");
    };

    const handleResetPassword = (user) => {
        showToast(`Password reset email sent to ${user.email}`);
    };

    const formatModule = (key) =>
        key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());

    return (
        <div className="space-y-4">

            {/* Back Button */}
            <button
                onClick={() => navigate("/settings")}
                className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900"
            >
                <ArrowLeft size={16} />
                Back to Settings
            </button>

            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-semibold text-slate-900">
                        Manage Users
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                        Control user roles, access permissions and account security
                    </p>
                </div>

                <button
                    onClick={() => setShowModal(true)}
                    className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 flex items-center gap-2"
                >
                    <Plus size={16} /> Add User
                </button>
            </div>

            {/* USERS TABLE */}
            <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">

                <table className="w-full text-sm">
                    <thead className="bg-slate-50 text-slate-600">
                        <tr>
                            <th className="px-4 py-3 text-left">Name</th>
                            <th className="px-4 py-3 text-left">Email</th>
                            <th className="px-4 py-3 text-left">Role</th>
                            <th className="px-4 py-3 text-left">Status</th>
                            <th className="px-4 py-3 text-left">Permissions</th>
                            <th className="px-4 py-3 text-left">Last Login</th>
                            <th className="px-4 py-3 text-right">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y">
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-slate-50 align-top">

                                {/* NAME */}
                                <td className="px-4 py-3 font-medium">{user.name}</td>

                                {/* EMAIL */}
                                <td className="px-4 py-3 text-slate-600">{user.email}</td>

                                {/* ROLE */}
                                <td className="px-4 py-3">
                                    <span className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-blue-50 text-blue-700">
                                        <Shield size={12} /> {user.role}
                                    </span>
                                </td>

                                {/* STATUS */}
                                <td className="px-4 py-3">
                                    <span
                                        className={`px-2 py-1 text-xs rounded-full ${user.status === "active"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-yellow-100 text-yellow-700"
                                            }`}
                                    >
                                        {user.status}
                                    </span>
                                </td>

                                {/* PERMISSIONS SUMMARY */}
                                <td className="px-4 py-3 text-xs text-slate-600 space-y-1 max-w-xs">
                                    {Object.entries(user.permissions || {}).map(
                                        ([module, perms]) => {
                                            if (!perms.read && !perms.write) return null;

                                            return (
                                                <div key={module}>
                                                    <span className="font-medium">
                                                        {formatModule(module)}
                                                    </span>{" "}
                                                    —{" "}
                                                    <span className="text-slate-500">
                                                        {perms.write ? "Read + Write" : "Read"}
                                                    </span>
                                                </div>
                                            );
                                        }
                                    )}
                                </td>

                                {/* LAST LOGIN */}
                                <td className="px-4 py-3 text-slate-500">
                                    {user.lastLogin}
                                </td>

                                {/* ACTIONS */}
                                <td className="px-4 py-3 text-right space-x-3 text-xs">

                                    <button
                                        onClick={() =>
                                            setConfirmAction({ type: "toggle", user })
                                        }
                                        className="text-yellow-700 hover:underline"
                                    >
                                        {user.status === "active" ? "Deactivate" : "Activate"}
                                    </button>

                                    <button
                                        onClick={() => handleResetPassword(user)}
                                        className="text-indigo-700 hover:underline"
                                    >
                                        Reset Password
                                    </button>

                                    <button
                                        onClick={() =>
                                            setConfirmAction({ type: "delete", user })
                                        }
                                        className="text-red-600 hover:underline"
                                    >
                                        Delete
                                    </button>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>

            {/* ADD USER MODAL */}
            {showModal && (
                <AddUserModal
                    onClose={() => setShowModal(false)}
                    onSave={handleAddUser}
                />
            )}

            {/* CONFIRM DELETE */}
            <ConfirmDialog
                open={confirmAction?.type === "delete"}
                onClose={() => setConfirmAction(null)}
                onConfirm={handleDelete}
                title="Delete this user?"
                description="This user will lose all access permanently."
                variant="danger"
                confirmText="Delete"
            />

            {/* CONFIRM STATUS */}
            <ConfirmDialog
                open={confirmAction?.type === "toggle"}
                onClose={() => setConfirmAction(null)}
                onConfirm={handleToggleStatus}
                title="Change user status?"
                description="This will activate or deactivate the user account."
                variant="warning"
                confirmText="Confirm"
            />

            {/* TOAST */}
            <Toast show={toast.show} message={toast.message} />
        </div>
    );
};

export default ManageUsers;
