import React, { useState, useEffect } from 'react';
import { Sidebar } from '@/modules/student/components/Sidebar';
import { Header } from '@/modules/student/components/Header';
import { Outlet, useNavigate } from 'react-router-dom';
import { ParentSidebar } from '@/modules/parent/components/ParentSidebar'; // Import ParentSidebar
import { TeacherSidebar } from '@/modules/teacher/components/TeacherSidebar'; // Import TeacherSidebar
import { AdminSidebar } from '@/modules/admin/components/AdminSidebar'; // Import AdminSidebar
import { authService } from '../../api/authService'; // Import authService

interface PrivateLayoutProps {
  role: 'student' | 'parent' | 'teacher' | 'admin'; // Define role prop to include admin
}

export const PrivateLayout: React.FC<PrivateLayoutProps> = ({ role }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const userRole = authService.getUserRole();

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate('/login');
      return;
    }

    if (userRole !== role) {
      // Redirect to appropriate dashboard if role doesn't match
      switch (userRole) {
        case 'ADMIN':
          navigate('/dashboard-admin');
          break;
        case 'STUDENT':
          navigate('/dashboard');
          break;
        case 'TEACHER':
          navigate('/dashboard-docente');
          break;
        case 'PARENT':
          navigate('/dashboard-padre');
          break;
        default:
          authService.logout();
          navigate('/login');
          break;
      }
    }
  }, [role, navigate, userRole]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const renderSidebar = () => {
    switch (role) {
      case 'student':
        return <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />;
      case 'parent':
        return <ParentSidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />;
      case 'teacher':
        return <TeacherSidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />;
      case 'admin':
        return <AdminSidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-neutral-100 font-sans">
      {renderSidebar()}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-72"> {/* Changed lg:ml-64 to lg:ml-72 */}
        <Header toggleSidebar={toggleSidebar} userName="Carlos" role={role} /> {/* Pass role to Header */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-neutral-100 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};