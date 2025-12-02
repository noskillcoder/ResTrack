import { Navigation } from '@/components/Navigation';
import { LoginSelector } from '@/components/LoginSelector';
import { TaskPost } from '@/components/TaskPost';
import { TaskFeed } from '@/components/TaskFeed';
import { SchedulePost } from '@/components/SchedulePost';
import { ScheduleDisplay } from '@/components/ScheduleDisplay';
import { useUser } from '@/contexts/UserContext';
import { useEffect, useState } from 'react';
import { taskStore } from '@/stores/taskStore';
import { Link } from 'react-router-dom';

const Index = () => {
  const { user, isAdmin } = useUser();
  const [, forceUpdate] = useState({});

  useEffect(() => {
    const unsubscribe = taskStore.subscribe(() => {
      forceUpdate({});
    });
    return unsubscribe;
  }, []);

  const handleTaskCreated = () => {
    forceUpdate({});
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-background pb-20 md:pb-8">
        {/* Hero / Header */}
        <section className="landing-hero text-white relative overflow-hidden">
          {/* Animated background orbs */}
          <div className="landing-orb landing-orb-1" />
          <div className="landing-orb landing-orb-2" />
          <div className="landing-orb landing-orb-3" />

          <div className="container mx-auto px-4 py-4 md:py-6 relative z-10">
            <div className="grid gap-6 md:grid-cols-2 items-center">
              {/* Hero text */}
              <div className="space-y-5 max-w-xl">
                {/* Logo + title row, aligned like provided design */}
                <div className="flex items-center gap-8 mb-6">
                  <img
                    src="/Untitled design(3).svg"
                    alt="ResTrack logo"
                    className="w-40 md:w-48 lg:w-56 h-auto drop-shadow-[0_15px_40px_rgba(74,30,112,0.6)]"
                  />
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight hero-title">
                    A Work Tracker
                    <br className="hidden sm:block" />
                    <span className="sm:ml-1">for Workers, By Workers</span>
                  </h1>
                </div>
                <p className="text-sm md:text-base text-white/80 leading-relaxed">
                  Empower student workers and GMWs with a live task feed, smart schedules, and
                  clear visibility into hours — all in one streamlined dashboard.
                </p>

                <div className="flex flex-wrap gap-3">
                  <a
                    href="#task-feed"
                    className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm md:text-base font-semibold bg-accent text-accent-foreground shadow-accent hover:translate-y-[-2px] transition-transform"
                  >
                    Open Task Feed
                  </a>
                  <Link
                    to="/workers"
                    className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm md:text-base font-semibold border border-white/30 text-white/90 hover:bg-white/10 transition-colors"
                  >
                    View Workers
                  </Link>
                </div>

                <div className="flex flex-wrap gap-4 text-xs md:text-sm text-white/70">
                  <div className="flex items-center gap-2">
                    <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    Live task updates
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-block h-2 w-2 rounded-full bg-accent" />
                    Role-aware dashboard for admins & workers
                  </div>
                </div>
              </div>

              {/* Hero visual */}
              <div className="hero-visual-wrapper">
                <div className="dashboard-mockup-card">
                  <div className="mockup-window-dots">
                    <span />
                    <span />
                    <span />
                  </div>
                  <div className="mockup-grid">
                    <div className="mockup-stat-card">
                      <div>
                        <p className="mockup-stat-label">Active workers today</p>
                        <p className="mockup-stat-value">24</p>
                      </div>
                      <span className="mockup-stat-icon">👥</span>
                    </div>
                    <div className="mockup-stat-card">
                      <div>
                        <p className="mockup-stat-label">Tasks in progress</p>
                        <p className="mockup-stat-value">12</p>
                      </div>
                      <span className="mockup-stat-icon">📈</span>
                    </div>
                    <div className="mockup-stat-card">
                      <div>
                        <p className="mockup-stat-label">Hours logged this week</p>
                        <p className="mockup-stat-value">184.5</p>
                      </div>
                      <span className="mockup-stat-icon">⏱️</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature strip (visual only, keeps existing functionality) */}
        <section className="relative bg-background/60 backdrop-blur-sm border-b border-border/60">
          <div className="container mx-auto px-4 py-10 md:py-12">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="feature-pill">
                <div className="feature-pill-icon">⚡</div>
                <div>
                  <p className="feature-pill-title">Real-time task feed</p>
                  <p className="feature-pill-text">
                    Workers see new tasks the moment admins post them.
                  </p>
                </div>
              </div>
              <div className="feature-pill">
                <div className="feature-pill-icon">📊</div>
                <div>
                  <p className="feature-pill-title">Smart scheduling</p>
                  <p className="feature-pill-text">
                    Track availability and hours without spreadsheets.
                  </p>
                </div>
              </div>
              <div className="feature-pill">
                <div className="feature-pill-icon">🔒</div>
                <div>
                  <p className="feature-pill-title">Role-based access</p>
                  <p className="feature-pill-text">
                    Clean separation between admin tools and worker view.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main App Content */}
        <div
          id="task-feed"
          className="container mx-auto px-3 md:px-4 py-4 md:py-5 max-w-4xl"
        >
          {/* Login/User Selector */}
          <div className="mb-4">
            <LoginSelector />
          </div>

          {/* Schedule Display (Workers only) */}
          {user && !isAdmin && (
            <div className="mb-4">
              <ScheduleDisplay />
            </div>
          )}

          {/* Schedule Post Form (Workers only) */}
          {user && !isAdmin && (
            <div className="mb-4">
              <SchedulePost onScheduleUpdated={() => forceUpdate({})} />
            </div>
          )}

          {/* Task Post Form (Admin only) */}
          {user && isAdmin && (
            <div className="mb-4">
              <TaskPost onTaskCreated={handleTaskCreated} />
            </div>
          )}

          {/* Task Feed */}
          {user && <TaskFeed />}

          {/* Welcome Message */}
          {!user && (
            <div className="text-center py-12 md:py-16">
              <p className="text-lg text-muted-foreground mb-4">
                Sign in to view and manage tasks
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Index;
