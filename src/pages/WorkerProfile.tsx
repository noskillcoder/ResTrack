import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { TaskItem } from '@/components/TaskItem';
import { HoursTracker } from '@/components/HoursTracker';
import { ScheduleCalendar } from '@/components/ScheduleCalendar';
import { workers, TaskStatus } from '@/data/mockData';
import { ArrowLeft, Mail, Building, User, Plus } from 'lucide-react';

export function WorkerProfile() {
  const { id } = useParams();
  const worker = workers.find((w) => w.id === id);
  const [tasks, setTasks] = useState(worker?.tasks || []);

  if (!worker) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-background flex items-center justify-center pb-20 md:pb-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-2">Worker Not Found</h1>
            <Link to="/" className="text-primary hover:underline">
              Return to Home
            </Link>
          </div>
        </div>
      </>
    );
  }

  const handleStatusChange = (taskId: string, newStatus: TaskStatus) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task))
    );
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-background pb-20 md:pb-8">
        {/* Header */}
        <section className="landing-hero text-white relative overflow-hidden">
          <div className="landing-orb landing-orb-1" />
          <div className="landing-orb landing-orb-2" />
          <div className="landing-orb landing-orb-3" />

          <div className="container mx-auto px-4 py-8 md:py-14 relative z-10">
            <Link
              to={worker.type === 'student' ? '/student-gmws' : '/gmws'}
              className="inline-flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to {worker.type === 'student' ? 'Student GMWs' : 'GMWs'}</span>
            </Link>

            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center border-4 border-white/30 shadow-lg">
                {worker.photo ? (
                  <img src={worker.photo} alt={worker.name} className="w-full h-full rounded-full object-cover" />
                ) : (
                  <User className="w-12 h-12" />
                )}
              </div>

              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-extrabold mb-2 hero-title">
                  {worker.name}
                </h1>
                <div className="flex flex-wrap gap-4 text-sm opacity-90">
                  <span className="flex items-center gap-1">
                    <Building className="w-4 h-4" />
                    {worker.hall} - {worker.subHall}
                  </span>
                  <span className="flex items-center gap-1">
                    <Mail className="w-4 h-4" />
                    {worker.email}
                  </span>
                  <span className="px-3 py-1 bg-white/15 rounded-full font-medium">
                    {worker.type === 'student' ? 'Student GMW' : 'GMW'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <div className="container mx-auto px-3 md:px-4 py-4 md:py-5 space-y-4">
          {/* Hours Tracker */}
          <HoursTracker scheduled={worker.hoursScheduled} worked={worker.hoursWorked} />

          {/* Tasks Section */}
          <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-foreground">Assigned Tasks</h2>
              <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium">
                <Plus className="w-4 h-4" />
                Add Task
              </button>
            </div>

            {tasks.length > 0 ? (
              <div className="space-y-3">
                {tasks.map((task) => (
                  <TaskItem key={task.id} task={task} onStatusChange={handleStatusChange} />
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">No tasks assigned yet.</p>
            )}
          </div>

          {/* Schedule */}
          <ScheduleCalendar schedule={worker.schedule} />
        </div>
      </div>
    </>
  );
}
