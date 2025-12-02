import { useEffect, useState } from 'react';
import { TaskFeedCard } from './TaskFeedCard';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Task } from '@/data/mockData';
import { taskStore } from '@/stores/taskStore';
import { useUser } from '@/contexts/UserContext';
import { Inbox, Clock, CheckCircle2 } from 'lucide-react';

export function TaskFeed() {
  const { user } = useUser();
  const [availableTasks, setAvailableTasks] = useState<Task[]>([]);
  const [myTasks, setMyTasks] = useState<Task[]>([]);
  const [tasksDueToday, setTasksDueToday] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
  const [activeTab, setActiveTab] = useState('available');

  const updateTasks = () => {
    setAvailableTasks(taskStore.getAvailableTasks());
    if (user?.worker) {
      const allMyTasks = taskStore.getTasksByWorker(user.worker.id);
      setMyTasks(allMyTasks.filter((t) => t.status !== 'Completed'));
      setTasksDueToday(
        taskStore.getTasksDueToday().filter((t) => t.assignedTo === user.worker?.id && t.status !== 'Completed')
      );
    }
    setCompletedTasks(
      user?.worker
        ? taskStore.getCompletedTasks().filter((t) => t.assignedTo === user.worker?.id)
        : []
    );
  };

  useEffect(() => {
    updateTasks();
    const unsubscribe = taskStore.subscribe(updateTasks);
    return unsubscribe;
  }, [user]);

  if (!user) {
    return null;
  }

  const isAdmin = user.role === 'admin';
  const isWorker = user.role === 'worker';

  return (
    <div className="w-full">
      {isWorker && (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4 h-auto p-1">
            <TabsTrigger value="available" className="gap-1 md:gap-2 py-2.5 md:py-1.5 text-xs md:text-sm">
              <Inbox className="w-4 h-4 flex-shrink-0" />
              <span className="hidden sm:inline">Available</span>
            </TabsTrigger>
            <TabsTrigger value="my-tasks" className="gap-1 md:gap-2 py-2.5 md:py-1.5 text-xs md:text-sm">
              <Clock className="w-4 h-4 flex-shrink-0" />
              <span className="hidden sm:inline">My Tasks</span>
            </TabsTrigger>
            <TabsTrigger value="completed" className="gap-1 md:gap-2 py-2.5 md:py-1.5 text-xs md:text-sm">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span className="hidden sm:inline">Done</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="available" className="space-y-0">
            {availableTasks.length === 0 ? (
              <Card>
                <CardContent className="p-8 md:p-12 text-center">
                  <Inbox className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-lg font-semibold text-foreground mb-2">No tasks available</p>
                  <p className="text-muted-foreground">Check back later for new tasks!</p>
                </CardContent>
              </Card>
            ) : (
              availableTasks.map((task) => (
                <TaskFeedCard key={task.id} task={task} variant="available" />
              ))
            )}
          </TabsContent>

          <TabsContent value="my-tasks" className="space-y-0">
            {myTasks.length === 0 ? (
              <Card>
                <CardContent className="p-8 md:p-12 text-center">
                  <Clock className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-lg font-semibold text-foreground mb-2">No tasks yet</p>
                  <p className="text-muted-foreground">Pick a task from the Available tab to get started!</p>
                </CardContent>
              </Card>
            ) : (
              <>
                {tasksDueToday.length > 0 && (
                  <Card className="mb-4 border-accent/50 bg-accent/5">
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Clock className="w-5 h-5 text-accent" />
                        Due Today ({tasksDueToday.length})
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 space-y-3">
                      {tasksDueToday.map((task) => (
                        <TaskFeedCard key={task.id} task={task} variant="assigned" />
                      ))}
                    </CardContent>
                  </Card>
                )}
                {myTasks
                  .filter((task) => !tasksDueToday.some((t) => t.id === task.id))
                  .map((task) => (
                    <TaskFeedCard key={task.id} task={task} variant="assigned" />
                  ))}
              </>
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-0">
            {completedTasks.length === 0 ? (
              <Card>
                <CardContent className="p-8 md:p-12 text-center">
                  <CheckCircle2 className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-lg font-semibold text-foreground mb-2">No completed tasks</p>
                  <p className="text-muted-foreground">Complete tasks to see them here!</p>
                </CardContent>
              </Card>
            ) : (
              completedTasks.map((task) => (
                <TaskFeedCard key={task.id} task={task} variant="completed" />
              ))
            )}
          </TabsContent>
        </Tabs>
      )}

      {isAdmin && (
        <div>
          <div className="mb-6">
            <Card className="mb-4 border-primary/20">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                  <Inbox className="w-5 h-5" />
                  Available Tasks ({availableTasks.length})
                </CardTitle>
              </CardHeader>
            </Card>
          </div>
          {availableTasks.length === 0 ? (
            <Card>
              <CardContent className="p-8 md:p-12 text-center">
                <Inbox className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg md:text-xl font-semibold text-foreground mb-2">No tasks yet</p>
                <p className="text-sm md:text-base text-muted-foreground">Post a new task to get started!</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {availableTasks.map((task) => (
                <TaskFeedCard key={task.id} task={task} variant="available" />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
