import { workers } from '@/data/mockData';

export interface ScheduleDay {
  day: string;
  startTime?: string;
  endTime?: string;
  hours?: number;
}

export interface WorkerSchedule {
  workerId: string;
  schedule: ScheduleDay[];
  hoursPicked: number; // Total hours scheduled for the week
  hoursCompleted: number; // Hours worked/completed
  updatedAt: Date;
}

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// Store worker schedules
let workerSchedules: Map<string, WorkerSchedule> = new Map();

// Initialize with existing worker data
workers.forEach((worker) => {
  const scheduleDays: ScheduleDay[] = daysOfWeek.map((day) => {
    const existing = worker.schedule.find((s) => s.day === day);
    if (existing) {
      // Parse hours from string like "9:00 AM - 1:00 PM"
      const hours = calculateHours(existing.hours);
      const [startTime, endTime] = existing.hours.split(' - ');
      return {
        day,
        startTime,
        endTime,
        hours,
      };
    }
    return { day };
  });

  workerSchedules.set(worker.id, {
    workerId: worker.id,
    schedule: scheduleDays,
    hoursPicked: worker.hoursScheduled || calculateTotalHours(scheduleDays),
    hoursCompleted: worker.hoursWorked || 0,
    updatedAt: new Date(),
  });
});

function calculateHours(timeRange?: string): number {
  if (!timeRange) return 0;
  try {
    const [start, end] = timeRange.split(' - ');
    const startDate = parseTime(start);
    const endDate = parseTime(end);
    if (startDate && endDate) {
      let diff = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);
      // Handle overnight shifts
      if (diff < 0) diff += 24;
      return Math.round(diff * 100) / 100;
    }
  } catch (e) {
    // ignore
  }
  return 0;
}

function parseTime(timeStr: string): Date | null {
  try {
    const [time, period] = timeStr.split(' ');
    const [hours, minutes] = time.split(':').map(Number);
    let hour24 = hours;
    if (period === 'PM' && hours !== 12) hour24 += 12;
    if (period === 'AM' && hours === 12) hour24 = 0;
    const date = new Date();
    date.setHours(hour24, minutes || 0, 0, 0);
    return date;
  } catch (e) {
    return null;
  }
}

function calculateTotalHours(schedule: ScheduleDay[]): number {
  return schedule.reduce((total, day) => total + (day.hours || 0), 0);
}

function formatTimeForDisplay(hour: number, minute: number): string {
  const period = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minute.toString().padStart(2, '0')} ${period}`;
}

function parseTimeInput(timeStr: string): { hour: number; minute: number } | null {
  try {
    const [time, period] = timeStr.split(' ');
    const [hours, minutes] = time.split(':').map(Number);
    let hour24 = hours;
    if (period === 'PM' && hours !== 12) hour24 += 12;
    if (period === 'AM' && hours === 12) hour24 = 0;
    return { hour: hour24, minute: minutes || 0 };
  } catch (e) {
    return null;
  }
}

const listeners = new Set<() => void>();

function notifyListeners() {
  listeners.forEach((listener) => listener());
}

export const scheduleStore = {
  getDaysOfWeek(): string[] {
    return [...daysOfWeek];
  },

  getWorkerSchedule(workerId: string): WorkerSchedule | undefined {
    return workerSchedules.get(workerId);
  },

  updateSchedule(workerId: string, schedule: ScheduleDay[]): void {
    const totalHours = calculateTotalHours(schedule);
    const existing = workerSchedules.get(workerId);
    
    workerSchedules.set(workerId, {
      workerId,
      schedule,
      hoursPicked: totalHours,
      hoursCompleted: existing?.hoursCompleted || 0,
      updatedAt: new Date(),
    });
    
    notifyListeners();
  },

  updateHoursCompleted(workerId: string, hours: number): void {
    const existing = workerSchedules.get(workerId);
    if (existing) {
      existing.hoursCompleted = hours;
      notifyListeners();
    }
  },

  calculateHours(timeRange: string): number {
    return calculateHours(timeRange);
  },

  formatTime(hour: number, minute: number): string {
    return formatTimeForDisplay(hour, minute);
  },

  parseTimeInput(timeStr: string): { hour: number; minute: number } | null {
    return parseTimeInput(timeStr);
  },

  subscribe(listener: () => void): () => void {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
};

