import Modal from "./Modal";
import { AlertTriangle, XCircle, CheckCircle } from "lucide-react";

const variants = {
  warning: {
    icon: AlertTriangle,
    color: "text-yellow-600",
    bg: "bg-yellow-50",
    button: "bg-yellow-600 hover:bg-yellow-700",
  },
  danger: {
    icon: XCircle,
    color: "text-red-600",
    bg: "bg-red-50",
    button: "bg-red-600 hover:bg-red-700",
  },
  success: {
    icon: CheckCircle,
    color: "text-green-600",
    bg: "bg-green-50",
    button: "bg-green-600 hover:bg-green-700",
  },
};

const ConfirmDialog = ({
  open,
  onClose,
  onConfirm,
  title,
  description,
  variant = "warning",
  confirmText = "Confirm",
}) => {
  const config = variants[variant];
  const Icon = config.icon;

  return (
    <Modal open={open} onClose={onClose}>
      <div className={`p-6 ${config.bg}`}>
        <div className="flex items-start gap-4">
          <Icon className={`${config.color}`} size={28} />
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              {title}
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              {description}
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 px-6 py-4 bg-white">
        <button
          onClick={onClose}
          className="rounded-md px-4 py-2 text-sm text-slate-600 hover:bg-slate-100"
        >
          Cancel
        </button>

        <button
          onClick={() => {
            onConfirm();
            onClose();
          }}
          className={`rounded-md px-4 py-2 text-sm font-medium text-white ${config.button}`}
        >
          {confirmText}
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;
