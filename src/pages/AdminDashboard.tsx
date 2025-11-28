import { Navigation } from '@/components/Navigation';
import { workers } from '@/data/mockData';
import { Users, Clock, CheckCircle, Building, Plus } from 'lucide-react';

export function AdminDashboard() {
  const studentWorkers = workers.filter((w) => w.type === 'student');
  const gmwWorkers = workers.filter((w) => w.type === 'gmw');
  const workingToday = workers.filter((w) => w.isWorkingToday);
  const totalScheduledHours = workers.reduce((sum, w) => sum + w.hoursScheduled, 0);
  const totalWorkedHours = workers.reduce((sum, w) => sum + w.hoursWorked, 0);
  const completedTasks = workers.flatMap((w) => w.tasks).filter((t) => t.status === 'Completed').length;
  const totalTasks = workers.flatMap((w) => w.tasks).length;

  const hallStats = ['Crawford', 'McElroy', 'Preska', 'Julia Sears'].map((hall) => {
    const hallWorkers = workers.filter((w) => w.hall === hall);
    const hallWorkingToday = hallWorkers.filter((w) => w.isWorkingToday).length;
    return { hall, total: hallWorkers.length, workingToday: hallWorkingToday };
  });

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-background pb-20 md:pb-8">
        {/* Header */}
        <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-lg opacity-90">Manage workers, tasks, and schedules</p>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-6 space-y-6">
          {/* Quick Stats */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{workers.length}</p>
                  <p className="text-sm text-muted-foreground">Total Workers</p>
                </div>
              </div>
              <div className="flex gap-4 text-xs text-muted-foreground mt-3 pt-3 border-t border-border">
                <span>{studentWorkers.length} Students</span>
                <span>{gmwWorkers.length} GMWs</span>
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{totalWorkedHours}</p>
                  <p className="text-sm text-muted-foreground">Hours Worked</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-3 pt-3 border-t border-border">
                of {totalScheduledHours} scheduled
              </p>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{completedTasks}</p>
                  <p className="text-sm text-muted-foreground">Tasks Done</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-3 pt-3 border-t border-border">
                of {totalTasks} total tasks
              </p>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Building className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{workingToday.length}</p>
                  <p className="text-sm text-muted-foreground">Working Today</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
            <h2 className="text-xl font-semibold text-foreground mb-4">Quick Actions</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <button className="flex items-center gap-3 p-4 bg-primary/5 hover:bg-primary/10 rounded-lg border border-primary/20 transition-colors">
                <Plus className="w-5 h-5 text-primary" />
                <span className="font-medium text-foreground">Add New Worker</span>
              </button>
              <button className="flex items-center gap-3 p-4 bg-accent/5 hover:bg-accent/10 rounded-lg border border-accent/20 transition-colors">
                <Plus className="w-5 h-5 text-accent" />
                <span className="font-medium text-foreground">Assign Task</span>
              </button>
              <button className="flex items-center gap-3 p-4 bg-secondary hover:bg-secondary/80 rounded-lg border border-border transition-colors">
                <Clock className="w-5 h-5 text-foreground" />
                <span className="font-medium text-foreground">Edit Schedules</span>
              </button>
            </div>
          </div>

          {/* Hall Overview */}
          <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
            <h2 className="text-xl font-semibold text-foreground mb-4">Hall Overview</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Hall</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Total Workers</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Working Today</th>
                  </tr>
                </thead>
                <tbody>
                  {hallStats.map((stat) => (
                    <tr key={stat.hall} className="border-b border-border last:border-0 hover:bg-muted/30">
                      <td className="py-3 px-4 text-sm font-medium text-foreground">{stat.hall}</td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">{stat.total}</td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center gap-1 text-sm text-green-600">
                          {stat.workingToday}
                          <CheckCircle className="w-4 h-4" />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Who's Working Today */}
          <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
            <h2 className="text-xl font-semibold text-foreground mb-4">Working Today</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {workingToday.map((worker) => (
                <div key={worker.id} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg border border-border">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {worker.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-foreground truncate">{worker.name}</p>
                    <p className="text-xs text-muted-foreground">{worker.hall} - {worker.subHall}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
