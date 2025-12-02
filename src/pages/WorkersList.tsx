import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { WorkerCard } from '@/components/WorkerCard';
import { workers, WorkerType, Hall, SubHall } from '@/data/mockData';
import { Search, Filter } from 'lucide-react';

interface WorkersListProps {
  type: WorkerType;
}

const hallSubHalls: Record<Hall, SubHall[]> = {
  'Crawford': ['A', 'B', 'C', 'D'],
  'McElroy': ['E', 'F', 'G', 'H'],
  'Preska': ['I', 'J', 'K', 'L'],
  'Julia Sears': ['A', 'B', 'C', 'D'],
};

export function WorkersList({ type }: WorkersListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedHall, setSelectedHall] = useState<Hall | 'all'>('all');
  const [selectedSubHall, setSelectedSubHall] = useState<SubHall | 'all'>('all');

  const filteredWorkers = workers
    .filter((w) => w.type === type)
    .filter((w) => w.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter((w) => selectedHall === 'all' || w.hall === selectedHall)
    .filter((w) => selectedSubHall === 'all' || w.subHall === selectedSubHall);

  const availableSubHalls = selectedHall !== 'all' ? hallSubHalls[selectedHall] : [];

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-background pb-20 md:pb-8">
        {/* Header */}
        <section className="landing-hero text-white relative overflow-hidden">
          <div className="landing-orb landing-orb-1" />
          <div className="landing-orb landing-orb-2" />
          <div className="landing-orb landing-orb-3" />

          <div className="container mx-auto px-4 py-10 md:py-16 relative z-10">
            <div className="flex flex-col gap-4">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold hero-title">
                {type === 'student' ? 'Student GMWs' : 'GMWs'}
              </h1>
              <p className="text-sm md:text-base text-white/80 max-w-xl">
                Browse all {type === 'student' ? 'student general maintenance workers' : 'general maintenance workers'} by hall, sub‑hall, and name.
              </p>
              <p className="text-xs md:text-sm text-white/70">
                {filteredWorkers.length} workers matched your current filters.
              </p>
            </div>
          </div>
        </section>

        {/* Filters */}
        <div className="container mx-auto px-3 md:px-4 py-4 md:py-5">
          <div className="bg-card rounded-xl p-3 md:p-4 shadow-md border border-border mb-4">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="w-5 h-5 text-primary" />
              <h2 className="font-semibold text-lg text-foreground">Filters</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Hall Filter */}
              <select
                value={selectedHall}
                onChange={(e) => {
                  setSelectedHall(e.target.value as Hall | 'all');
                  setSelectedSubHall('all');
                }}
                className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">All Halls</option>
                <option value="Crawford">Crawford</option>
                <option value="McElroy">McElroy</option>
                <option value="Preska">Preska</option>
                <option value="Julia Sears">Julia Sears</option>
              </select>

              {/* Sub-Hall Filter */}
              <select
                value={selectedSubHall}
                onChange={(e) => setSelectedSubHall(e.target.value as SubHall | 'all')}
                disabled={selectedHall === 'all'}
                className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="all">All Sub-Halls</option>
                {availableSubHalls.map((sh) => (
                  <option key={sh} value={sh}>
                    {sh}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Workers Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredWorkers.map((worker) => (
              <WorkerCard key={worker.id} worker={worker} />
            ))}
          </div>

          {filteredWorkers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No workers found matching your filters.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
