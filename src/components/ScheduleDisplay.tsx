import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, CheckCircle2 } from 'lucide-react';
import { scheduleStore, WorkerSchedule } from '@/stores/scheduleStore';
import { useUser } from '@/contexts/UserContext';

// Helper to format time for display (converts 24-hour to 12-hour format)
const formatTimeForDisplay = (timeStr?: string): string => {
  if (!timeStr) return '';
  try {
    const parts = timeStr.trim().split(' ');
    let time = parts[0];
    let period = parts[1];
    
    // If already in display format, return as is
    if (period) return timeStr;
    
    // Convert from 24-hour to 12-hour display format
    const [hours, minutes] = time.split(':').map(Number);
    const period12 = hours >= 12 ? 'PM' : 'AM';
    const hour12 = hours % 12 || 12;
    return `${hour12}:${(minutes || 0).toString().padStart(2, '0')} ${period12}`;
  } catch (e) {
    return timeStr;
  }
};

export function ScheduleDisplay() {
  const { user } = useUser();
  const [schedule, setSchedule] = useState<WorkerSchedule | undefined>();
  const [, forceUpdate] = useState({});

  useEffect(() => {
    if (user?.worker) {
      const workerSchedule = scheduleStore.getWorkerSchedule(user.worker.id);
      setSchedule(workerSchedule);

      const unsubscribe = scheduleStore.subscribe(() => {
        const updated = scheduleStore.getWorkerSchedule(user.worker.id);
        setSchedule(updated);
        forceUpdate({});
      });

      return unsubscribe;
    }
  }, [user]);

  if (!user?.worker) {
    return null;
  }

  const daysOfWeek = scheduleStore.getDaysOfWeek();
  
  // Show empty state if no schedule exists yet
  const hasSchedule = schedule?.schedule.some((day) => day.startTime && day.endTime) || false;


  return (
    <Card className="mb-4 border-primary/20 shadow-lg">
      <CardHeader className="p-4 md:p-5 pb-3">
        <CardTitle className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            <span>My Weekly Schedule</span>
          </div>
          {schedule && (
            <div className="flex items-center gap-3 flex-wrap">
              <Badge variant="secondary" className="gap-1 text-sm px-3 py-1">
                <Clock className="w-3 h-3" />
                {schedule.hoursPicked} hrs picked
              </Badge>
              <Badge variant="default" className="gap-1 text-sm px-3 py-1 bg-green-600 hover:bg-green-600">
                <CheckCircle2 className="w-3 h-3" />
                {schedule.hoursCompleted} hrs completed
              </Badge>
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!schedule || !hasSchedule ? (
          <div className="text-center py-8">
            <Calendar className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <p className="text-muted-foreground">No schedule posted yet</p>
            <p className="text-sm text-muted-foreground mt-1">Post your schedule to get started!</p>
          </div>
        ) : (
          <>
            {/* Mobile: Vertical List */}
            <div className="md:hidden space-y-2">
              {daysOfWeek.map((day) => {
                const scheduleDay = schedule?.schedule.find((s) => s.day === day);
                const hasShift = scheduleDay?.startTime && scheduleDay?.endTime;
                return (
                  <div
                    key={day}
                    className={`p-4 rounded-lg border ${
                      hasShift
                        ? 'border-primary/30 bg-primary/5'
                        : 'border-border bg-muted/30'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold text-foreground">{day}</p>
                      {scheduleDay?.hours && scheduleDay.hours > 0 && (
                        <Badge variant="outline" className="text-xs">
                          {scheduleDay.hours}h
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {hasShift
                        ? `${formatTimeForDisplay(scheduleDay.startTime)} - ${formatTimeForDisplay(scheduleDay.endTime)}`
                        : 'Off'}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Desktop: Grid Calendar */}
            <div className="hidden md:grid grid-cols-7 gap-2">
              {daysOfWeek.map((day) => {
                const scheduleDay = schedule?.schedule.find((s) => s.day === day);
                const hasShift = scheduleDay?.startTime && scheduleDay?.endTime;
                return (
                  <div
                    key={day}
                    className={`p-3 rounded-lg border text-center ${
                      hasShift
                        ? 'border-primary/30 bg-primary/5'
                        : 'border-border bg-muted/30'
                    }`}
                  >
                    <p className="font-semibold text-sm text-foreground mb-2">{day.slice(0, 3)}</p>
                    {hasShift ? (
                      <>
                        <p className="text-xs text-muted-foreground mb-1">
                          {formatTimeForDisplay(scheduleDay.startTime)}
                        </p>
                        <p className="text-xs text-muted-foreground mb-2">-</p>
                        <p className="text-xs text-muted-foreground mb-2">
                          {formatTimeForDisplay(scheduleDay.endTime)}
                        </p>
                        {scheduleDay?.hours && (
                          <Badge variant="outline" className="text-xs">
                            {scheduleDay.hours}h
                          </Badge>
                        )}
                      </>
                    ) : (
                      <p className="text-xs text-muted-foreground">Off</p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Hours Summary */}
            <div className="mt-4 pt-4 border-t border-border">
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-3 rounded-lg bg-muted/30">
                  <p className="text-xl font-bold text-foreground">{schedule?.hoursPicked || 0}</p>
                  <p className="text-xs text-muted-foreground mt-1">Hours Picked This Week</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                  <p className="text-xl font-bold text-green-600">{schedule?.hoursCompleted || 0}</p>
                  <p className="text-xs text-muted-foreground mt-1">Hours Completed</p>
                </div>
              </div>
              {schedule && schedule.hoursPicked > 0 && (
                <div className="mt-3">
                  <div className="w-full bg-muted/50 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-green-600 transition-all duration-300"
                      style={{
                        width: `${Math.min((schedule.hoursCompleted / schedule.hoursPicked) * 100, 100)}%`,
                      }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 text-center">
                    {Math.round((schedule.hoursCompleted / schedule.hoursPicked) * 100)}% completed
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
