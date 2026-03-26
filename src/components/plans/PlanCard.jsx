import { Pencil, Trash2, PauseCircle, PlayCircle, Timer } from "lucide-react";

const PlanCard = ({ plan, onEdit, onDelete, onToggleStatus }) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-6 flex flex-col justify-between hover:shadow-md transition">

      <div>
        {/* HEADER */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              {plan.name}
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              ₹{plan.price}/month
            </p>

            {/* Trial Badge */}
            {plan.trial?.enabled && (
              <span className="mt-2 inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                <Timer size={12} />
                Trial: {plan.trial.days} days
              </span>
            )}
          </div>

          {/* Status Badge */}
          <span
            className={`text-xs font-medium px-2 py-1 rounded-full ${
              plan.status === "active"
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {plan.status}
          </span>
        </div>

        {/* SEATS */}
        <div className="mt-5">
          <p className="text-sm font-medium text-slate-900 mb-2">
            Seat Limits
          </p>

          <div className="grid grid-cols-2 gap-y-1 text-sm text-slate-700">
            <p>Doctors: <strong>{plan.seats.doctors}</strong></p>
            <p>Staff: <strong>{plan.seats.staff}</strong></p>
            <p>Receptionists: <strong>{plan.seats.receptionists}</strong></p>
            <p>Supporting Staff: <strong>{plan.seats.support}</strong></p>
            <p>Admins: <strong>{plan.seats.admin}</strong></p>
            <p>Sub-admins: <strong>{plan.seats.subadmin}</strong></p>
          </div>
        </div>

        {/* TRIAL INFO */}
        {plan.trial?.enabled && (
          <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-3 text-sm">
            <p className="font-medium text-blue-900 mb-1">
              Trial Access
            </p>

            <p className="text-blue-700">
              Duration: <strong>{plan.trial.days} days</strong>
            </p>

            <p className="text-blue-700">
              Trial Seats: <strong>{plan.trial.seatsLimit}</strong>
            </p>

            {plan.trial.features?.length > 0 && (
              <div className="mt-1 text-blue-700">
                Features:
                <ul className="list-disc list-inside text-xs mt-1 space-y-0.5">
                  {plan.trial.features.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* FEATURES */}
        <div className="mt-4">
          <p className="text-sm font-medium text-slate-900 mb-1">
            Paid Features
          </p>

          <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
            {plan.features.map((feature, i) => (
              <li key={i}>{feature}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="mt-6 grid grid-cols-3 gap-2 text-sm">

        <button
          onClick={() => onEdit(plan)}
          className="flex items-center justify-center gap-2 rounded-md bg-slate-900 text-white py-2 hover:bg-slate-800 transition"
        >
          <Pencil size={16} /> Edit
        </button>

        <button
          onClick={() => onToggleStatus(plan)}
          className="flex items-center justify-center gap-2 rounded-md bg-yellow-100 text-yellow-800 py-2 hover:bg-yellow-200 transition"
        >
          {plan.status === "active" ? (
            <>
              <PauseCircle size={16} /> Inactivate
            </>
          ) : (
            <>
              <PlayCircle size={16} /> Activate
            </>
          )}
        </button>

        <button
          onClick={() => onDelete(plan)}
          className="flex items-center justify-center gap-2 rounded-md bg-red-100 text-red-800 py-2 hover:bg-red-200 transition"
        >
          <Trash2 size={16} /> Delete
        </button>

      </div>
    </div>
  );
};

export default PlanCard;
