import { type ElementType, type Dispatch, type SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import logotipo from "../../../assets/logotipo.jpg";
import {
  Home,
  BookOpen,
  Star,
  Clock,
  MessageSquare,
  FileText,
  X,
  LogOut,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type MenuItemType = {
  id: string;
  label: string;
  icon: ElementType;
};

type SidebarProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isSidebarOpen: boolean;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
};

type SidebarItemProps = {
  item: MenuItemType;
  isActive: boolean;
  onClick: () => void;
};

const menuItems: MenuItemType[] = [
  { id: "panel", label: "Panel Principal", icon: Home },
  { id: "cursos", label: "Mis Cursos", icon: BookOpen },
  { id: "calificaciones", label: "Calificaciones", icon: Star },
  { id: "horarios", label: "Horarios", icon: Clock },
  { id: "chat", label: "Chat", icon: MessageSquare },
  { id: "tramites", label: "Trámites", icon: FileText },
];

const SidebarItem = ({ item, isActive, onClick }: SidebarItemProps) => {
  const Icon = item.icon;
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`w-full flex items-center gap-2 px-3 py-2 rounded-md mb-1 text-sm font-medium transition-all ${
        isActive
          ? "bg-white text-blue-700 shadow-sm"
          : "hover:bg-blue-600 text-blue-100"
      }`}
    >
      <Icon size={18} />
      <span>{item.label}</span>
    </motion.button>
  );
};

export const Sidebar = ({
  activeTab,
  setActiveTab,
  isSidebarOpen,
  setSidebarOpen,
}: SidebarProps) => {
  return (
    <AnimatePresence>
      {isSidebarOpen && (
        <motion.div key="mobile-sidebar-wrapper">
          <motion.div
            onClick={() => setSidebarOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 bg-black z-20 lg:hidden"
          />
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-blue-900 via-blue-800 to-blue-700 text-white flex flex-col shadow-lg z-30 lg:hidden"
          >
            <SidebarContent
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              setSidebarOpen={setSidebarOpen}
            />
          </motion.aside>
        </motion.div>
      )}

      <aside className="hidden w-52 bg-gradient-to-b from-blue-900 via-blue-800 to-blue-700 text-white min-h-screen lg:flex flex-col shadow-lg">
        <SidebarContent
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setSidebarOpen={setSidebarOpen}
        />
      </aside>
    </AnimatePresence>
  );
};

const SidebarContent = ({
  activeTab,
  setActiveTab,
  setSidebarOpen,
}: Omit<SidebarProps, "isSidebarOpen">) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
    setSidebarOpen(false);
  };

  return (
    <>
      <div className="p-5 border-b border-blue-600 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={logotipo} alt="Logotipo" className="w-10 h-10 rounded-lg" />
          <div>
            <h2 className="font-semibold text-sm leading-tight">
              Colegio Parroquial San Ignacio
            </h2>
            <p className="text-[10px] text-blue-200">Portal Estudiantil</p>
          </div>
        </div>
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden p-1 text-blue-200 hover:text-white"
        >
          <X size={20} />
        </button>
      </div>

      <nav className="flex-1 mt-4 px-2">
        {menuItems.map((item) => (
          <SidebarItem
            key={item.id}
            item={item}
            isActive={activeTab === item.id}
            onClick={() => {
              setActiveTab(item.id);
              setSidebarOpen(false);
            }}
          />
        ))}
      </nav>

      <div className="mt-auto px-2 pb-4">
        <SidebarItem
          key="logout"
          item={{ id: "logout", label: "Cerrar Sesión", icon: LogOut }}
          isActive={false}
          onClick={handleLogout}
        />
      </div>

      <div className="text-center py-3 text-[11px] text-blue-200 border-t border-blue-600">
        © 2025 San Ignacio
      </div>
    </>
  );
};
