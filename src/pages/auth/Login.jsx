import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[#f7f8fa]">

      {/* LEFT BRAND / STORY PANEL */}
      <div className="hidden lg:flex flex-col justify-between px-20 py-16 bg-[#0f172a] text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-semibold leading-tight tracking-tight">
            PetCare
            <span className="block text-slate-300 font-normal mt-1">
              Admin Platform
            </span>
          </h1>

          <p className="mt-6 text-slate-300 text-lg max-w-md leading-relaxed">
            A modern administration system designed for veterinary clinics to
            manage licenses, doctors, security and operations at scale.
          </p>
        </motion.div>

        {/* Feature list */}
        <ul className="space-y-4 text-sm text-slate-300">
          <li className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
            Role-based access & permissions
          </li>
          <li className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
            Subscription & activation control
          </li>
          <li className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
            Healthcare-grade security standards
          </li>
        </ul>
      </div>

      {/* RIGHT LOGIN PANEL */}
      <div className="flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="w-full max-w-md"
        >
          {/* Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-[0_10px_30px_rgba(0,0,0,0.06)] p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900">
                Sign in
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Access your PetCare admin account
              </p>
            </div>

            {/* Email */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Email address
              </label>
              <input
                type="email"
                placeholder="admin@petcare.com"
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm
                focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none
                transition"
              />
            </div>

            {/* Password */}
            <div className="mb-7">
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 pr-11 text-sm
                  focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none
                  transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                  className="absolute inset-y-0 right-0 flex items-center px-3
                  text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Button */}
            <button
            onClick={() => navigate('/dashboard')}
              className="w-full rounded-lg bg-slate-900 py-2.5 text-sm font-medium text-white
              hover:bg-slate-800 transition
              focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-1"
            >
              Sign in to Admin
            </button>
          </div>

          {/* Footer */}
          <p className="mt-8 text-center text-xs text-slate-400">
            © {new Date().getFullYear()} PetCare. All rights reserved.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
