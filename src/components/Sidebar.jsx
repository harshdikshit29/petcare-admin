import { LayoutDashboard, Hospital, KeyRound, Settings, Layers} from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const menu = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Clinics", icon: Hospital, path: "/clinics" },
    { name: "Licenses", icon: KeyRound, path: "/licenses" },
    { name: "Plans", icon: Layers, path: "/plans" },
    { name: "Settings", icon: Settings, path: "/settings" },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-200 flex flex-col">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-slate-800">
        <span className="text-lg font-semibold tracking-tight">
          PetCare <span className="text-slate-400">Admin</span>
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {menu.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-md text-sm
                 transition
                 ${
                   isActive
                     ? "bg-slate-800 text-white"
                     : "text-slate-300 hover:bg-slate-800 hover:text-white"
                 }`
              }
            >
              <Icon size={18} />
              {item.name}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
