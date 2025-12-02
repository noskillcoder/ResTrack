import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Loader2 } from 'lucide-react';
import { taskStore } from '@/stores/taskStore';
import { Priority, Hall } from '@/data/mockData';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

export function TaskPost({ onTaskCreated }: { onTaskCreated?: () => void }) {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    priority: 'Normal' as Priority,
    dueDate: format(new Date(Date.now() + 24 * 60 * 60 * 1000), 'yyyy-MM-dd'),
    dueTime: '17:00',
  });

  const halls: Hall[] = ['Crawford', 'McElroy', 'Preska', 'Julia Sears'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const dueDateTime = new Date(`${formData.dueDate}T${formData.dueTime}`);
      
      taskStore.createTask({
        title: formData.title,
        description: formData.description,
        location: formData.location,
        priority: formData.priority,
        dueDate: dueDateTime,
        assignedByName: 'Admin',
      });

      toast({
        title: 'Task posted!',
        description: 'The task has been added to the feed.',
      });

      // Reset form
      setFormData({
        title: '',
        description: '',
        location: '',
        priority: 'Normal',
        dueDate: format(new Date(Date.now() + 24 * 60 * 60 * 1000), 'yyyy-MM-dd'),
        dueTime: '17:00',
      });
      setIsOpen(false);
      onTaskCreated?.();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to post task. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) {
    return (
      <Card className="mb-6 border-2 border-dashed border-primary/30 hover:border-primary/50 transition-colors bg-gradient-to-br from-primary/5 to-transparent">
        <CardContent className="p-6">
          <button
            onClick={() => setIsOpen(true)}
            className="w-full flex items-center justify-center gap-3 py-4 text-muted-foreground hover:text-primary transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span className="font-medium">Post a new task</span>
          </button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-4 shadow-lg border-primary/20">
      <CardContent className="p-3 md:p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title" className="text-base font-semibold">
              Task Title *
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Clean Common Area"
              required
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Add details about the task..."
              className="mt-2 min-h-[100px]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="location" className="text-base font-semibold">
                Location *
              </Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g., Crawford Hall A - 1st Floor"
                required
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="priority" className="text-base font-semibold">
                Priority *
              </Label>
              <Select
                value={formData.priority}
                onValueChange={(value: Priority) => setFormData({ ...formData, priority: value })}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Normal">Normal</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="dueDate" className="text-base font-semibold">
                Due Date *
              </Label>
              <Input
                id="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                required
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="dueTime" className="text-base font-semibold">
                Due Time *
              </Label>
              <Input
                id="dueTime"
                type="time"
                value={formData.dueTime}
                onChange={(e) => setFormData({ ...formData, dueTime: e.target.value })}
                required
                className="mt-2"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 md:flex-initial"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Posting...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  Post Task
                </>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
