import { Clock } from 'lucide-react';

interface HoursTrackerProps {
  scheduled: number;
  worked: number;
}

export function HoursTracker({ scheduled, worked }: HoursTrackerProps) {
  const percentage = (worked / scheduled) * 100;
  const remaining = scheduled - worked;

  return (
    <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-5 h-5 text-primary" />
        <h3 className="font-semibold text-lg text-foreground">Work Hours This Week</h3>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-primary">{scheduled}</p>
            <p className="text-xs text-muted-foreground mt-1">Scheduled</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-accent">{worked}</p>
            <p className="text-xs text-muted-foreground mt-1">Worked</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-muted-foreground">{remaining}</p>
            <p className="text-xs text-muted-foreground mt-1">Remaining</p>
          </div>
        </div>

        <div className="relative">
          <div className="w-full h-3 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
              style={{ width: `${Math.min(percentage, 100)}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground text-center mt-2">
            {percentage.toFixed(0)}% Complete
          </p>
        </div>
      </div>
    </div>
  );
}
