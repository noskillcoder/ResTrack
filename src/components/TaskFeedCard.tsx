import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MapPin, Clock, CheckCircle2, AlertCircle, X, User } from 'lucide-react';
import { Task } from '@/data/mockData';
import { format, formatDistanceToNow, isToday, isPast } from 'date-fns';
import { useUser } from '@/contexts/UserContext';
import { taskStore } from '@/stores/taskStore';
import { useToast } from '@/hooks/use-toast';

interface TaskFeedCardProps {
  task: Task;
  variant?: 'available' | 'assigned' | 'completed';
}

export function TaskFeedCard({ task, variant = 'available' }: TaskFeedCardProps) {
  const { user } = useUser();
  const { toast } = useToast();

  const isDueToday = isToday(task.dueDate);
  const isOverdue = isPast(task.dueDate) && task.status !== 'Completed';
  const isAssignedToMe = task.assignedTo === user?.id;

  const handlePickTask = () => {
    if (!user?.worker) return;
    taskStore.pickTask(task.id, user.worker.id, user.worker.name);
    toast({
      title: 'Task picked!',
      description: `You've picked up "${task.title}"`,
    });
  };

  const handleUnpickTask = () => {
    taskStore.unpickTask(task.id);
    toast({
      title: 'Task released',
      description: `You've released "${task.title}"`,
    });
  };

  const handleCompleteTask = () => {
    taskStore.completeTask(task.id);
    toast({
      title: 'Task completed!',
      description: `Great job completing "${task.title}"`,
    });
  };

  const getPriorityBadge = () => {
    if (task.priority === 'High') {
      return (
        <Badge variant="destructive" className="gap-1">
          <AlertCircle className="w-3 h-3" />
          High Priority
        </Badge>
      );
    }
    return null;
  };

  const getDueDateDisplay = () => {
    if (isOverdue) {
      return (
        <span className="text-destructive font-medium flex items-center gap-1">
          <AlertCircle className="w-4 h-4" />
          Overdue
        </span>
      );
    }
    if (isDueToday) {
      return (
        <span className="text-accent font-medium flex items-center gap-1">
          <Clock className="w-4 h-4" />
          Due today
        </span>
      );
    }
    return (
      <span className="text-muted-foreground text-sm flex items-center gap-1">
        <Clock className="w-4 h-4" />
        Due {format(task.dueDate, 'MMM d, yyyy')}
      </span>
    );
  };

  return (
    <Card
      className={`mb-3 hover:shadow-lg transition-all duration-200 ${
        isOverdue ? 'border-destructive/50 bg-destructive/5' : ''
      } ${variant === 'completed' ? 'opacity-75' : ''}`}
    >
      <CardContent className="p-3 md:p-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <Avatar className="w-10 h-10 md:w-12 md:h-12">
              <AvatarFallback className="gradient-primary text-primary-foreground font-bold">
                {task.assignedByName?.charAt(0) || 'A'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <p className="font-semibold text-sm md:text-base text-foreground">
                  {task.assignedByName || 'Admin'}
                </p>
                <span className="text-xs text-muted-foreground">
                  {formatDistanceToNow(task.createdAt, { addSuffix: true })}
                </span>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-foreground mb-2 break-words">
                {task.title}
              </h3>
            </div>
          </div>
          {getPriorityBadge()}
        </div>

        {/* Description */}
        {task.description && (
          <p className="text-sm md:text-base text-muted-foreground mb-4 whitespace-pre-wrap break-words">
            {task.description}
          </p>
        )}

        {/* Location */}
        <div className="flex items-center gap-2 text-sm md:text-base text-muted-foreground mb-4">
          <MapPin className="w-4 h-4 flex-shrink-0" />
          <span className="break-words">{task.location}</span>
        </div>

        {/* Due Date & Status */}
        <div className="flex items-center justify-between gap-4 mb-4 pb-4 border-b border-border flex-wrap">
          <div>
            {task.status === 'Completed' && task.completedAt ? (
              <span className="text-green-600 font-medium flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                Completed {format(task.completedAt, 'MMM d, yyyy')}
              </span>
            ) : (
              getDueDateDisplay()
            )}
          </div>
          {task.status === 'Completed' ? (
            <Badge variant="default" className="gap-1 bg-green-600 hover:bg-green-600">
              <CheckCircle2 className="w-3 h-3" />
              Completed
            </Badge>
          ) : variant === 'assigned' && isAssignedToMe ? (
            <Badge variant="secondary" className="gap-1">
              <User className="w-3 h-3" />
              Assigned to you
            </Badge>
          ) : null}
        </div>

        {/* Actions */}
        <div className="flex gap-2 flex-wrap">
          {variant === 'available' && user?.worker && (
            <Button onClick={handlePickTask} className="flex-1 md:flex-initial">
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Pick Task
            </Button>
          )}
          {variant === 'assigned' && isAssignedToMe && task.status !== 'Completed' && (
            <>
              <Button
                onClick={handleCompleteTask}
                className="flex-1 md:flex-initial"
              >
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Mark Done
              </Button>
              <Button
                onClick={handleUnpickTask}
                variant="outline"
                className="flex-1 md:flex-initial"
              >
                <X className="w-4 h-4 mr-2" />
                Release
              </Button>
            </>
          )}
          {variant === 'completed' && task.status === 'Completed' && (
            <div className="text-sm text-muted-foreground italic">
              Task completed successfully
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
