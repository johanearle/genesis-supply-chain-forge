
import { NavLink } from "react-router-dom";
import { 
  Home, 
  Package2, 
  ClipboardList, 
  Users, 
  BarChart3,
  Zap,
  Settings,
  X 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const navItems = [
  { name: "Dashboard", path: "/", icon: Home },
  { name: "Inventory", path: "/inventory", icon: Package2 },
  { name: "Orders", path: "/orders", icon: ClipboardList },
  { name: "Suppliers", path: "/suppliers", icon: Users },
  { name: "Analytics", path: "/analytics", icon: BarChart3 },
  { name: "Advanced Analytics", path: "/advanced-analytics", icon: Zap },
  { name: "Settings", path: "/settings", icon: Settings },
];

const Sidebar = ({ open, setOpen }: SidebarProps) => {
  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "bg-scm-primary text-white fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 md:translate-x-0 md:static md:z-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-scm-accent/20">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-scm-accent flex items-center justify-center mr-2">
              <span className="font-bold text-scm-primary">SC</span>
            </div>
            <span className="font-bold text-lg">SupplyChain</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen(false)}
            className="md:hidden text-white hover:bg-scm-accent/20"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                  isActive
                    ? "bg-scm-accent/20 text-white"
                    : "text-white/80 hover:bg-scm-accent/10 hover:text-white"
                )
              }
              onClick={() => setOpen(false)}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="bg-scm-accent/20 rounded-md p-3">
            <p className="text-sm font-medium">Supply Chain MVP</p>
            <p className="text-xs text-white/70 mt-1">Next-Gen Enterprise System</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
