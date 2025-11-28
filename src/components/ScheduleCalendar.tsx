import { Calendar } from 'lucide-react';

interface ScheduleItem {
  day: string;
  hours: string;
}

interface ScheduleCalendarProps {
  schedule: ScheduleItem[];
}

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export function ScheduleCalendar({ schedule }: ScheduleCalendarProps) {
  return (
    <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="w-5 h-5 text-primary" />
        <h3 className="font-semibold text-lg text-foreground">Weekly Schedule</h3>
      </div>

      {/* Mobile: Vertical List */}
      <div className="md:hidden space-y-2">
        {daysOfWeek.map((day) => {
          const scheduleItem = schedule.find((s) => s.day === day);
          return (
            <div
              key={day}
              className={`p-3 rounded-lg ${
                scheduleItem
                  ? 'bg-primary/5 border border-primary/20'
                  : 'bg-muted/30 border border-border'
              }`}
            >
              <p className="font-medium text-sm text-foreground">{day}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {scheduleItem ? scheduleItem.hours : 'Off'}
              </p>
            </div>
          );
        })}
      </div>

      {/* Desktop: Grid Calendar */}
      <div className="hidden md:grid grid-cols-7 gap-3">
        {daysOfWeek.map((day) => {
          const scheduleItem = schedule.find((s) => s.day === day);
          return (
            <div
              key={day}
              className={`p-4 rounded-lg text-center ${
                scheduleItem
                  ? 'bg-primary/5 border border-primary/20'
                  : 'bg-muted/30 border border-border'
              }`}
            >
              <p className="font-semibold text-sm text-foreground mb-2">{day.slice(0, 3)}</p>
              <p className="text-xs text-muted-foreground">
                {scheduleItem ? scheduleItem.hours : 'Off'}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
