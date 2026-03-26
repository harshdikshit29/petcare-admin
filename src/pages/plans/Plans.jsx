import { useState, useMemo } from "react";
import PlanCard from "../../components/plans/PlanCard";
import EditPlanModal from "../../components/plans/EditPlanModal";
import Toast from "../../components/ui/Toast";
import ConfirmDialog from "../../components/ui/ConfirmDialog";

const Plans = () => {
  const [plans, setPlans] = useState([
    {
      id: 1,
      name: "Basic",
      price: 999,
      status: "active",

      trial: {
        enabled: true,
        days: 7,
        seatsLimit: 2,
        features: ["Clinic access"],
      },

      seats: {
        doctors: 1,
        staff: 2,
        receptionists: 1,
        support: 1,
        admin: 1,
        subadmin: 0,
      },

      features: ["Clinic access", "Basic reports"],
    },

    {
      id: 2,
      name: "Pro",
      price: 2499,
      status: "active",

      trial: {
        enabled: true,
        days: 14,
        seatsLimit: 3,
        features: ["Clinic access", "Reports dashboard"],
      },

      seats: {
        doctors: 3,
        staff: 4,
        receptionists: 2,
        support: 2,
        admin: 1,
        subadmin: 1,
      },

      features: [
        "Clinic access",
        "Reports dashboard",
        "WhatsApp integration",
        "Priority support",
      ],
    },

    {
      id: 3,
      name: "Enterprise",
      price: 6999,
      status: "inactive",

      trial: {
        enabled: false,
        days: 0,
        seatsLimit: 0,
        features: [],
      },

      seats: {
        doctors: 10,
        staff: 10,
        receptionists: 5,
        support: 5,
        admin: 2,
        subadmin: 3,
      },

      features: [
        "Unlimited clinics",
        "API access",
        "Dedicated support",
        "Custom integrations",
      ],
    },
  ]);

  const [editingPlan, setEditingPlan] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "" });
  const [confirmAction, setConfirmAction] = useState(null);

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredPlans = useMemo(() => {
    return plans.filter((plan) => {
      const matchesSearch = plan.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesStatus =
        filterStatus === "all" || plan.status === filterStatus;

      return matchesSearch && matchesStatus;
    });
  }, [plans, search, filterStatus]);

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: "" }), 2500);
  };

  const handleSave = (plan) => {
    if (isCreating) {
      setPlans((prev) => [
        ...prev,
        {
          ...plan,
          id: Date.now(),
          status: "active",
          trial: plan.trial || {
            enabled: false,
            days: 0,
            seatsLimit: 0,
            features: [],
          },
        },
      ]);

      showToast("Plan created successfully");
    } else {
      setPlans((prev) =>
        prev.map((p) => (p.id === plan.id ? plan : p))
      );

      showToast("Plan updated successfully");
    }

    setEditingPlan(null);
    setIsCreating(false);
  };

  const handleDelete = () => {
    setPlans((prev) =>
      prev.filter((p) => p.id !== confirmAction.plan.id)
    );

    showToast("Plan deleted successfully");
    setConfirmAction(null);
  };

  const handleToggleStatus = () => {
    setPlans((prev) =>
      prev.map((p) =>
        p.id === confirmAction.plan.id
          ? {
              ...p,
              status:
                p.status === "active" ? "inactive" : "active",
            }
          : p
      )
    );

    showToast("Plan status updated");
    setConfirmAction(null);
  };

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">
            Plans & Pricing
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Manage subscription plans, pricing, trials and seat limits
          </p>
        </div>

        <button
          onClick={() => {
            setIsCreating(true);
            setEditingPlan(null);
          }}
          className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 transition"
        >
          + Create Plan
        </button>
      </div>

      {/* SEARCH + FILTER BAR */}
      <div className="flex flex-col md:flex-row gap-3">
        <input
          type="text"
          placeholder="Search plans..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:max-w-xs rounded-md border border-slate-300 px-3 py-2 text-sm focus:ring-1 focus:ring-slate-900 focus:outline-none"
        />

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="rounded-md border border-slate-300 px-3 py-2 text-sm"
        >
          <option value="all">All Plans</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* PLANS GRID */}
      {filteredPlans.length === 0 ? (
        <div className="text-center py-20 text-slate-500">
          No plans found
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredPlans.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              onEdit={(p) => {
                setEditingPlan(p);
                setIsCreating(false);
              }}
              onDelete={(p) =>
                setConfirmAction({ type: "delete", plan: p })
              }
              onToggleStatus={(p) =>
                setConfirmAction({ type: "status", plan: p })
              }
            />
          ))}
        </div>
      )}

      {/* CREATE / EDIT MODAL */}
      {(editingPlan || isCreating) && (
        <EditPlanModal
          mode={isCreating ? "create" : "edit"}
          plan={editingPlan}
          onClose={() => {
            setEditingPlan(null);
            setIsCreating(false);
          }}
          onSave={handleSave}
        />
      )}

      {/* CONFIRM DELETE */}
      <ConfirmDialog
        open={confirmAction?.type === "delete"}
        onClose={() => setConfirmAction(null)}
        onConfirm={handleDelete}
        title="Delete this plan?"
        description="This plan will be permanently removed. This action cannot be undone."
        variant="danger"
        confirmText="Delete"
      />

      {/* CONFIRM STATUS */}
      <ConfirmDialog
        open={confirmAction?.type === "status"}
        onClose={() => setConfirmAction(null)}
        onConfirm={handleToggleStatus}
        title="Change plan status?"
        description="This will activate or deactivate the plan for future subscriptions."
        variant="warning"
        confirmText="Confirm"
      />

      {/* TOAST */}
      <Toast show={toast.show} message={toast.message} />
    </div>
  );
};

export default Plans;
