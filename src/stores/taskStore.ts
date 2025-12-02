import { Task, Priority } from '@/data/mockData';

// Available tasks (unassigned tasks that appear in the feed)
let availableTasks: Task[] = [
  {
    id: 'avail-1',
    title: 'Clean Lobby Area',
    description: 'Deep clean the main lobby including windows, floors, and furniture',
    location: 'Crawford Hall - Main Lobby',
    priority: 'High',
    status: 'Available',
    assignedByName: 'Admin',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
  },
  {
    id: 'avail-2',
    title: 'Restock Kitchen Supplies',
    description: 'Check and restock all kitchen supplies in common areas',
    location: 'McElroy Hall - Kitchen',
    priority: 'Normal',
    status: 'Available',
    assignedByName: 'Admin',
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    dueDate: new Date(Date.now() + 12 * 60 * 60 * 1000), // 12 hours from now
  },
  {
    id: 'avail-3',
    title: 'Inspect Fire Safety Equipment',
    description: 'Monthly inspection of all fire extinguishers and alarms',
    location: 'Preska Hall - All Floors',
    priority: 'High',
    status: 'Available',
    assignedByName: 'Admin',
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
    dueDate: new Date(), // Today
  },
  {
    id: 'avail-4',
    title: 'Organize Storage Room',
    description: 'Organize and label items in the main storage room',
    location: 'Julia Sears Hall - Storage Room',
    priority: 'Normal',
    status: 'Available',
    assignedByName: 'Admin',
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    dueDate: new Date(Date.now() + 48 * 60 * 60 * 1000), // 2 days from now
  },
];

let assignedTasks: Task[] = [];

// Callbacks for state updates
const listeners = new Set<() => void>();

function notifyListeners() {
  listeners.forEach((listener) => listener());
}

export const taskStore = {
  getAvailableTasks(): Task[] {
    return [...availableTasks].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  },

  getAssignedTasks(): Task[] {
    return [...assignedTasks];
  },

  getTasksByWorker(workerId: string): Task[] {
    return assignedTasks.filter((t) => t.assignedTo === workerId);
  },

  getTasksDueToday(): Task[] {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return assignedTasks.filter((task) => {
      const dueDate = new Date(task.dueDate);
      dueDate.setHours(0, 0, 0, 0);
      return dueDate >= today && dueDate < tomorrow;
    });
  },

  getCompletedTasks(): Task[] {
    return assignedTasks.filter((t) => t.status === 'Completed').sort((a, b) => {
      const dateA = a.completedAt?.getTime() || 0;
      const dateB = b.completedAt?.getTime() || 0;
      return dateB - dateA;
    });
  },

  pickTask(taskId: string, workerId: string, workerName: string): void {
    const task = availableTasks.find((t) => t.id === taskId);
    if (!task) return;

    // Remove from available tasks
    availableTasks = availableTasks.filter((t) => t.id !== taskId);

    // Add to assigned tasks
    const assignedTask: Task = {
      ...task,
      assignedTo: workerId,
      status: 'In Progress',
    };
    assignedTasks.push(assignedTask);

    notifyListeners();
  },

  unpickTask(taskId: string): void {
    const task = assignedTasks.find((t) => t.id === taskId);
    if (!task) return;

    // Remove from assigned tasks
    assignedTasks = assignedTasks.filter((t) => t.id !== taskId);

    // Add back to available tasks
    const availableTask: Task = {
      ...task,
      assignedTo: undefined,
      status: 'Available',
    };
    availableTasks.push(availableTask);

    notifyListeners();
  },

  completeTask(taskId: string): void {
    const task = assignedTasks.find((t) => t.id === taskId);
    if (task) {
      task.status = 'Completed';
      task.completedAt = new Date();
      notifyListeners();
    }
  },

  createTask(task: Omit<Task, 'id' | 'createdAt' | 'status'>): void {
    const newTask: Task = {
      ...task,
      id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      status: 'Available',
      createdAt: new Date(),
    };
    availableTasks.push(newTask);
    notifyListeners();
  },

  subscribe(listener: () => void): () => void {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
};

