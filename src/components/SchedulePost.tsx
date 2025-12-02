import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar, Plus, X, Save, Loader2 } from 'lucide-react';
import { scheduleStore, ScheduleDay } from '@/stores/scheduleStore';
import { useUser } from '@/contexts/UserContext';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

export function SchedulePost({ onScheduleUpdated }: { onScheduleUpdated?: () => void }) {
  const { user } = useUser();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [schedule, setSchedule] = useState<ScheduleDay[]>([]);

  const daysOfWeek = scheduleStore.getDaysOfWeek();

  useEffect(() => {
    if (user?.worker && isOpen) {
      const existingSchedule = scheduleStore.getWorkerSchedule(user.worker.id);
      if (existingSchedule) {
        setSchedule([...existingSchedule.schedule]);
      } else {
        // Initialize with empty schedule
        setSchedule(
          daysOfWeek.map((day) => ({
            day,
          }))
        );
      }
    }
  }, [user, isOpen, daysOfWeek]);

  const updateDay = (day: string, field: 'startTime' | 'endTime', value: string) => {
    setSchedule((prev) =>
      prev.map((item) => {
        if (item.day === day) {
          const updated = { ...item, [field]: value };
          // Calculate hours when both times are present
          if (updated.startTime && updated.endTime) {
            // Times are stored in 24-hour format (HH:MM)
            const hours = calculateHours(updated.startTime, updated.endTime);
            updated.hours = hours;
          } else {
            updated.hours = 0;
          }
          return updated;
        }
        return item;
      })
    );
  };

  const calculateHours = (start: string, end: string): number => {
    try {
      // Times are in 24-hour format (HH:MM)
      const startParts = start.trim().split(':');
      const endParts = end.trim().split(':');
      
      if (startParts.length >= 2 && endParts.length >= 2) {
        const startHour = parseInt(startParts[0], 10);
        const startMin = parseInt(startParts[1] || '0', 10);
        const endHour = parseInt(endParts[0], 10);
        const endMin = parseInt(endParts[1] || '0', 10);
        
        let startTotal = startHour + startMin / 60;
        let endTotal = endHour + endMin / 60;
        
        // Handle overnight shifts
        if (endTotal < startTotal) {
          endTotal += 24;
        }
        
        const diff = endTotal - startTotal;
        return Math.round(diff * 100) / 100;
      }
    } catch (e) {
      // ignore
    }
    return 0;
  };

  const parseTime = (timeStr: string): Date | null => {
    try {
      // Handle both "HH:MM AM/PM" and "HH:MM" formats
      const parts = timeStr.trim().split(' ');
      let time = parts[0];
      let period = parts[1];

      const [hours, minutes] = time.split(':').map(Number);
      
      let hour24 = hours;
      if (period) {
        // 12-hour format with AM/PM
        if (period.toUpperCase() === 'PM' && hours !== 12) hour24 += 12;
        if (period.toUpperCase() === 'AM' && hours === 12) hour24 = 0;
      }
      // If no period, assume it's already 24-hour format
      
      const date = new Date();
      date.setHours(hour24, minutes || 0, 0, 0);
      return date;
    } catch (e) {
      return null;
    }
  };

  const formatTimeForInput = (timeStr?: string): string => {
    if (!timeStr) return '';
    // Convert "9:00 AM" or "09:00" to "09:00" for time input
    try {
      const parts = timeStr.trim().split(' ');
      let time = parts[0];
      const period = parts[1];
      
      const [hours, minutes] = time.split(':').map(Number);
      
      let hour24 = hours;
      if (period) {
        // Convert from 12-hour to 24-hour
        if (period.toUpperCase() === 'PM' && hours !== 12) hour24 += 12;
        if (period.toUpperCase() === 'AM' && hours === 12) hour24 = 0;
      }
      
      return `${hour24.toString().padStart(2, '0')}:${(minutes || 0).toString().padStart(2, '0')}`;
    } catch (e) {
      return '';
    }
  };

  const formatTimeForDisplay = (timeStr?: string): string => {
    if (!timeStr) return '';
    // Convert "09:00" or "9:00 AM" to "9:00 AM" for display
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

  const handleTimeChange = (day: string, field: 'startTime' | 'endTime', value: string) => {
    // Store in 24-hour format (HH:MM) for easier calculation
    // We'll convert to display format when rendering
    updateDay(day, field, value);
  };

  const getTotalHours = (): number => {
    return schedule.reduce((total, day) => total + (day.hours || 0), 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.worker) return;

    setIsSubmitting(true);
    try {
      scheduleStore.updateSchedule(user.worker.id, schedule);
      toast({
        title: 'Schedule updated!',
        description: `Your weekly schedule has been saved (${getTotalHours()} hours).`,
      });
      setIsOpen(false);
      onScheduleUpdated?.();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update schedule. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user?.worker) {
    return null;
  }

  if (!isOpen) {
    return (
      <Card className="mb-4 border-2 border-dashed border-primary/30 hover:border-primary/50 transition-colors bg-gradient-to-br from-primary/5 to-transparent">
        <CardContent className="p-4">
          <button
            onClick={() => setIsOpen(true)}
            className="w-full flex items-center justify-center gap-2 py-3 text-muted-foreground hover:text-primary transition-colors"
          >
            <Calendar className="w-5 h-5" />
            <span className="font-medium">Post or Update Your Schedule</span>
          </button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-4 shadow-lg border-primary/20">
      <CardHeader className="p-4 md:p-5 pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Calendar className="w-5 h-5" />
          Weekly Schedule
        </CardTitle>
        <CardDescription className="text-sm">Set your availability for the week (7 days)</CardDescription>
      </CardHeader>
      <CardContent className="p-4 md:p-5 pt-0">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-2">
            {schedule.map((day) => (
                  <div
                    key={day.day}
                    className={`p-3 rounded-lg border ${
                      day.startTime && day.endTime
                        ? 'border-primary/30 bg-primary/5'
                        : 'border-border bg-card'
                    }`}
                  >
                <div className="flex items-center justify-between gap-4 mb-3 flex-wrap">
                  <Label className="font-semibold text-base min-w-[100px]">{day.day}</Label>
                  {day.hours && day.hours > 0 && (
                    <Badge variant="secondary" className="gap-1">
                      {day.hours} {day.hours === 1 ? 'hour' : 'hours'}
                    </Badge>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor={`${day.day}-start`} className="text-sm">
                      Start Time
                    </Label>
                    <Input
                      id={`${day.day}-start`}
                      type="time"
                      value={formatTimeForInput(day.startTime)}
                      onChange={(e) => handleTimeChange(day.day, 'startTime', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`${day.day}-end`} className="text-sm">
                      End Time
                    </Label>
                    <Input
                      id={`${day.day}-end`}
                      type="time"
                      value={formatTimeForInput(day.endTime)}
                      onChange={(e) => handleTimeChange(day.day, 'endTime', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">Total Hours:</span>
              <Badge variant="default" className="text-base px-3 py-1">
                {getTotalHours()} {getTotalHours() === 1 ? 'hour' : 'hours'}
              </Badge>
            </div>
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Schedule
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
