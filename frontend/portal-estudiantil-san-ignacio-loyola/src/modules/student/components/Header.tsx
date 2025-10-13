import React from "react";
import { Bell, Menu } from "lucide-react";
import { getInitials } from "@/shared/utils/string";
import { getCurrentDate } from "@/shared/utils/date";

interface HeaderProps {
  userName: string;
  userGrade: string;
  toggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ userName, userGrade, toggleSidebar }) => {
  return (
    <div className="bg-white shadow-sm border-b sticky top-0 z-10">
      <div className="px-4 md:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={toggleSidebar} className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition">
            <Menu className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-xl md:text-2xl font-semibold text-gray-800">
              Bienvenido, {userName}
            </h1>
            <p className="text-xs md:text-sm text-gray-500">{getCurrentDate()}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition">
            <Bell className="w-6 h-6" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          {/* User info and avatar - hide on small screens */}
          <div className="hidden md:flex items-center gap-3 pl-4 border-l">
            <div className="text-right">
              <div className="text-sm font-medium text-gray-800">
                {userName}
              </div>
              <div className="text-xs text-gray-500">{userGrade}</div>
            </div>
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
              {getInitials(userName)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};