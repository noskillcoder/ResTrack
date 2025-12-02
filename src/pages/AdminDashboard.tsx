import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { workers } from '@/data/mockData';
import { Users, Clock, CheckCircle, Building, Plus, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function AdminDashboard() {
  const [dailyMessage, setDailyMessage] = useState<string | null>(null);
  const { toast } = useToast();

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

  const showComingSoon = (feature: string) => {
    toast({
      title: `${feature} coming soon`,
      description: 'This action is not wired up yet in this version, but the UI is ready for it.',
    });
  };

  const generateDailyMessage = () => {
    const today = new Date();
    const dateString = today.toLocaleDateString(undefined, {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });

    const offWorkers = workers.filter((w) => !w.isWorkingToday);
    const offNames = offWorkers.map((w) => w.name).join(', ') || 'None';
    const workingNames = workingToday.map((w) => w.name).join(', ') || 'None';

    const message = [
      'Good afternoon,',
      '',
      'Everyone!',
      '',
      `${dateString}`,
      '',
      `Off today: ${offNames}.`,
      '',
      "Today's workers:",
      workingNames,
      '',
      "Today's tasks:",
      '• Bring two cases of ♻️ bags to the office hallway in the Dining Center.',
      '• Empty the large round ♻️ bin in the main Res. Life office workroom and return it (ask Jana if unsure).',
      '• Empty the purple ♻️ bin near Crawford C-Wing if needed.',
      '• Empty the purple ♻️ bins in the Salt Room.',
      '• Take out trash in H2 and H1 if needed.',
      '• Empty tilt carts in Julia Sears, Crawford, McElroy, and the Food Pantry (if not done yesterday).',
      '',
      'Trash and ♻️ are priorities!',
      '',
      'After these are done, vacuum floor lounges in:',
      '- Crawford A, B, C, D',
      '- McElroy E, F, G, H',
      '- Preska I, J, K, L',
      '- Julia Sears',
      '',
      'Remember to turn off lights in the Salt Room and Carkoski Room 12.',
      'The Salt Room lights were left on yesterday.',
      'Check the lights behind Chet’s if you know the areas to look.',
      '',
      'Thank you!',
    ].join('\n');

    setDailyMessage(message);
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

          <div className="container mx-auto px-4 py-10 md:py-16 relative z-10">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-2 hero-title">
              Admin Dashboard
            </h1>
            <p className="text-sm md:text-base text-white/80 max-w-xl">
              Get a live snapshot of workers, tasks, and hours across every hall — all in one place.
            </p>
          </div>
        </section>

        {/* Content */}
        <div className="container mx-auto px-3 md:px-4 py-4 md:py-5 space-y-4">
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
              <button
                className="flex items-center gap-3 p-4 bg-primary/5 hover:bg-primary/10 rounded-lg border border-primary/20 transition-colors"
                onClick={() => showComingSoon('Add worker')}
              >
                <Plus className="w-5 h-5 text-primary" />
                <span className="font-medium text-foreground">Add New Worker</span>
              </button>
              <button
                className="flex items-center gap-3 p-4 bg-accent/5 hover:bg-accent/10 rounded-lg border border-accent/20 transition-colors"
                onClick={() => showComingSoon('Assign task')}
              >
                <Plus className="w-5 h-5 text-accent" />
                <span className="font-medium text-foreground">Assign Task</span>
              </button>
              <button
                className="flex items-center gap-3 p-4 bg-secondary hover:bg-secondary/80 rounded-lg border border-border transition-colors"
                onClick={() => showComingSoon('Edit schedules')}
              >
                <Clock className="w-5 h-5 text-foreground" />
                <span className="font-medium text-foreground">Edit Schedules</span>
              </button>
              <button
                className="flex items-center gap-3 p-4 bg-primary/5 hover:bg-primary/10 rounded-lg border border-primary/20 transition-colors sm:col-span-2 lg:col-span-1"
                onClick={generateDailyMessage}
              >
                <FileText className="w-5 h-5 text-primary" />
                <span className="font-medium text-foreground">Generate Daily Message</span>
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

          {/* Generated Daily Message */}
          {dailyMessage && (
            <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
              <h2 className="text-xl font-semibold text-foreground mb-4">Daily Message</h2>
              <p className="text-xs text-muted-foreground mb-2">
                Copy and paste this into your email or announcements.
              </p>
              <pre className="whitespace-pre-wrap text-sm bg-muted/40 rounded-lg p-4 border border-border">
{dailyMessage}
              </pre>
            </div>
          )}

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
