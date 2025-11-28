export type WorkerType = 'student' | 'gmw';
export type Hall = 'Crawford' | 'McElroy' | 'Preska' | 'Julia Sears';
export type SubHall = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L';
export type Priority = 'Normal' | 'High';
export type TaskStatus = 'Not Started' | 'In Progress' | 'Completed';

export interface Task {
  id: string;
  title: string;
  location: string;
  priority: Priority;
  status: TaskStatus;
}

export interface Worker {
  id: string;
  name: string;
  type: WorkerType;
  hall: Hall;
  subHall: SubHall;
  email: string;
  photo?: string;
  isWorkingToday: boolean;
  hoursScheduled: number;
  hoursWorked: number;
  tasks: Task[];
  schedule: {
    day: string;
    hours: string;
  }[];
}

export const workers: Worker[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    type: 'student',
    hall: 'Crawford',
    subHall: 'A',
    email: 'sarah.johnson@mnsu.edu',
    isWorkingToday: true,
    hoursScheduled: 20,
    hoursWorked: 12,
    tasks: [
      {
        id: 't1',
        title: 'Clean Common Area',
        location: 'Crawford Hall A - 1st Floor',
        priority: 'High',
        status: 'In Progress',
      },
      {
        id: 't2',
        title: 'Restock Supplies',
        location: 'Crawford Hall A - Supply Room',
        priority: 'Normal',
        status: 'Not Started',
      },
    ],
    schedule: [
      { day: 'Monday', hours: '9:00 AM - 1:00 PM' },
      { day: 'Wednesday', hours: '9:00 AM - 1:00 PM' },
      { day: 'Friday', hours: '2:00 PM - 6:00 PM' },
    ],
  },
  {
    id: '2',
    name: 'Michael Chen',
    type: 'student',
    hall: 'Crawford',
    subHall: 'B',
    email: 'michael.chen@mnsu.edu',
    isWorkingToday: false,
    hoursScheduled: 20,
    hoursWorked: 18,
    tasks: [
      {
        id: 't3',
        title: 'Maintenance Check',
        location: 'Crawford Hall B - 2nd Floor',
        priority: 'Normal',
        status: 'Completed',
      },
    ],
    schedule: [
      { day: 'Tuesday', hours: '10:00 AM - 2:00 PM' },
      { day: 'Thursday', hours: '10:00 AM - 2:00 PM' },
    ],
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    type: 'student',
    hall: 'McElroy',
    subHall: 'E',
    email: 'emily.rodriguez@mnsu.edu',
    isWorkingToday: true,
    hoursScheduled: 15,
    hoursWorked: 8,
    tasks: [
      {
        id: 't4',
        title: 'Event Setup',
        location: 'McElroy Hall E - Lounge',
        priority: 'High',
        status: 'In Progress',
      },
    ],
    schedule: [
      { day: 'Monday', hours: '3:00 PM - 6:00 PM' },
      { day: 'Wednesday', hours: '3:00 PM - 6:00 PM' },
      { day: 'Friday', hours: '3:00 PM - 6:00 PM' },
    ],
  },
  {
    id: '4',
    name: 'James Wilson',
    type: 'gmw',
    hall: 'Preska',
    subHall: 'I',
    email: 'james.wilson@mnsu.edu',
    isWorkingToday: true,
    hoursScheduled: 40,
    hoursWorked: 32,
    tasks: [
      {
        id: 't5',
        title: 'Building Inspection',
        location: 'Preska Hall I - All Floors',
        priority: 'High',
        status: 'In Progress',
      },
      {
        id: 't6',
        title: 'Equipment Repair',
        location: 'Preska Hall I - Maintenance Room',
        priority: 'Normal',
        status: 'Not Started',
      },
    ],
    schedule: [
      { day: 'Monday', hours: '8:00 AM - 4:00 PM' },
      { day: 'Tuesday', hours: '8:00 AM - 4:00 PM' },
      { day: 'Wednesday', hours: '8:00 AM - 4:00 PM' },
      { day: 'Thursday', hours: '8:00 AM - 4:00 PM' },
      { day: 'Friday', hours: '8:00 AM - 4:00 PM' },
    ],
  },
  {
    id: '5',
    name: 'Lisa Martinez',
    type: 'gmw',
    hall: 'Julia Sears',
    subHall: 'A',
    email: 'lisa.martinez@mnsu.edu',
    isWorkingToday: true,
    hoursScheduled: 40,
    hoursWorked: 35,
    tasks: [
      {
        id: 't7',
        title: 'Safety Training',
        location: 'Julia Sears Hall - Conference Room',
        priority: 'Normal',
        status: 'Completed',
      },
    ],
    schedule: [
      { day: 'Monday', hours: '7:00 AM - 3:00 PM' },
      { day: 'Tuesday', hours: '7:00 AM - 3:00 PM' },
      { day: 'Wednesday', hours: '7:00 AM - 3:00 PM' },
      { day: 'Thursday', hours: '7:00 AM - 3:00 PM' },
      { day: 'Friday', hours: '7:00 AM - 3:00 PM' },
    ],
  },
  {
    id: '6',
    name: 'David Park',
    type: 'student',
    hall: 'Preska',
    subHall: 'J',
    email: 'david.park@mnsu.edu',
    isWorkingToday: false,
    hoursScheduled: 20,
    hoursWorked: 15,
    tasks: [],
    schedule: [
      { day: 'Tuesday', hours: '1:00 PM - 5:00 PM' },
      { day: 'Thursday', hours: '1:00 PM - 5:00 PM' },
    ],
  },
];
