import { LogOut, User } from "lucide-react";

const Header = () => {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6">
      <h1 className="text-sm font-medium text-slate-700">
        Super Admin Dashboard
      </h1>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <User size={16} />
          admin@petcare.com
        </div>

        <button className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-800 transition">
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
