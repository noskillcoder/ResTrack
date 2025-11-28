import { Link } from 'react-router-dom';
import { User } from 'lucide-react';
import { Worker } from '@/data/mockData';

interface WorkerCardProps {
  worker: Worker;
}

export function WorkerCard({ worker }: WorkerCardProps) {
  return (
    <Link to={`/worker/${worker.id}`}>
      <div className="bg-card rounded-xl shadow-md hover:shadow-lg transition-all duration-150 p-6 border border-border hover:border-primary/30 group">
        <div className="flex items-start gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center text-primary group-hover:bg-primary/10 transition-colors">
              {worker.photo ? (
                <img src={worker.photo} alt={worker.name} className="w-full h-full rounded-full object-cover" />
              ) : (
                <User className="w-8 h-8" />
              )}
            </div>
            {worker.isWorkingToday && (
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-card" />
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors truncate">
              {worker.name}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {worker.hall} - {worker.subHall}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {worker.email}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
