
import { CycleProgress } from "../components/home/CycleProgress";
import { CoursesList } from "../components/home/CoursesList";
import { StatsCard } from "../components/home/StatsCard";
import { EventsList } from "../components/home/EventsList";
import { statsData, coursesData, eventsData, cycleProgressData } from "../pages/_data";

export const DashboardHome = () => {
  return (
    <>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsData.map((stat) => (
          <StatsCard key={stat.id} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <CycleProgress {...cycleProgressData} />
          <CoursesList courses={coursesData} />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <EventsList events={eventsData} />
        </div>
      </div>
    </>
  );
};
