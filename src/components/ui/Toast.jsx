import { CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Toast = ({ show, message }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 right-6 z-50 bg-white border border-slate-200 shadow-lg rounded-lg px-4 py-3 flex items-center gap-3"
        >
          <CheckCircle className="text-green-600" size={20} />
          <span className="text-sm text-slate-800">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
