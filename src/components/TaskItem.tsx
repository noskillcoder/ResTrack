import { Task, TaskStatus } from '@/data/mockData';
import { AlertCircle, MapPin } from 'lucide-react';

interface TaskItemProps {
  task: Task;
  onStatusChange?: (taskId: string, newStatus: TaskStatus) => void;
}

const statusColors = {
  'Not Started': 'bg-muted text-muted-foreground',
  'In Progress': 'bg-accent text-accent-foreground',
  'Completed': 'bg-green-100 text-green-800',
};

export function TaskItem({ task, onStatusChange }: TaskItemProps) {
  const statuses: TaskStatus[] = ['Not Started', 'In Progress', 'Completed'];

  return (
    <div className="bg-card rounded-lg p-4 border border-border shadow-sm">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h4 className="font-semibold text-foreground">{task.title}</h4>
            {task.priority === 'High' && (
              <span className="flex items-center gap-1 text-xs bg-destructive/10 text-destructive px-2 py-0.5 rounded-full">
                <AlertCircle className="w-3 h-3" />
                High Priority
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            {task.location}
          </div>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        {statuses.map((status) => (
          <button
            key={status}
            onClick={() => onStatusChange?.(task.id, status)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-150 ${
              task.status === status
                ? statusColors[status]
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
          >
            {status}
          </button>
        ))}
      </div>
    </div>
  );
}
