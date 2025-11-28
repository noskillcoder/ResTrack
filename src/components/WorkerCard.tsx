import { Link } from 'react-router-dom';
import { User } from 'lucide-react';
import { Worker } from '@/data/mockData';

interface WorkerCardProps {
  worker: Worker;
}

export function WorkerCard({ worker }: WorkerCardProps) {
  return (
    <Link to={`/worker/${worker.id}`}>
      <div className="bg-card rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 p-6 border-2 border-border hover:border-primary/40 group hover:-translate-y-1">
        <div className="flex items-start gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center text-primary-foreground group-hover:scale-110 transition-transform shadow-md">
              {worker.photo ? (
                <img src={worker.photo} alt={worker.name} className="w-full h-full rounded-full object-cover" />
              ) : (
                <User className="w-8 h-8" />
              )}
            </div>
            {worker.isWorkingToday && (
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-card shadow-lg animate-pulse-glow" />
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors truncate">
              {worker.name}
            </h3>
            <p className="text-sm text-muted-foreground mt-1 font-medium">
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
