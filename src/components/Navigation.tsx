import { Link, useLocation } from 'react-router-dom';
import { Home, Users, UserCog, Settings, Menu } from 'lucide-react';
import { useState } from 'react';
import { useUser } from '@/contexts/UserContext';

export function Navigation() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, isAdmin } = useUser();

  const links = [
    { to: '/', icon: Home, label: 'Home', requireAdmin: false },
    { to: '/student-gmws', icon: Users, label: 'Students', requireAdmin: true },
    { to: '/gmws', icon: UserCog, label: 'GMWs', requireAdmin: true },
    { to: '/admin', icon: Settings, label: 'Admin', requireAdmin: true },
  ] as const;

  return (
    <>
      {/* Top Navigation (desktop + tablet) */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/90 backdrop-blur-xl border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14 md:h-16">
            {/* Left side: welcome / brand */}
            <Link to="/" className="flex items-center gap-2 group">
              <span className="text-sm md:text-base font-semibold text-white group-hover:opacity-90 transition-opacity">
                {user ? `Welcome, ${user.name}` : 'Welcome'}
              </span>
            </Link>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-3 lg:gap-4">
              {links
                .filter((link) => !link.requireAdmin || isAdmin)
                .map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-white text-slate-900 shadow-md'
                        : 'bg-white/5 text-white/90 hover:bg-white/10'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}

              <Link
                to="/"
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-amber-400 text-slate-900 hover:bg-amber-300 transition-colors shadow-md ml-2"
              >
                <span>Open Task Feed</span>
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center rounded-full border border-white/20 p-2 text-white"
              onClick={() => setMobileOpen((open) => !open)}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile slide-in menu */}
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <button
              type="button"
              className="md:hidden fixed inset-0 z-40 bg-slate-950/80"
              onClick={() => setMobileOpen(false)}
            />

            {/* Right sidebar */}
            <div className="md:hidden fixed inset-y-0 right-0 z-50 w-4/5 max-w-xs bg-gradient-to-b from-slate-900 via-slate-800 to-slate-700 border-l border-white/10 shadow-2xl flex flex-col py-8 px-6 space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-white">
                  {user ? `Welcome, ${user.name}` : 'Menu'}
                </span>
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 p-2 text-white"
                  onClick={() => setMobileOpen(false)}
                >
                  <Menu className="w-5 h-5" />
                </button>
              </div>

              <nav className="mt-4 space-y-3">
                {links
                  .filter((link) => !link.requireAdmin || isAdmin)
                  .map((link) => {
                  const Icon = link.icon;
                  const isActive = location.pathname === link.to;
                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setMobileOpen(false)}
                      className={`w-full block rounded-2xl px-5 py-4 text-base font-medium transition-all ${
                        isActive
                          ? 'bg-white text-slate-900 shadow-lg'
                          : 'bg-slate-800 text-white hover:bg-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-5 h-5 shrink-0" />
                        <span>{link.label}</span>
                      </div>
                    </Link>
                  );
                })}
              </nav>

              <Link
                to="/"
                onClick={() => setMobileOpen(false)}
                className="w-full block rounded-2xl px-5 py-4 text-base font-semibold bg-amber-400 text-slate-900 hover:bg-amber-300 transition-colors shadow-md mt-2 text-center"
              >
                Open Task Feed
              </Link>
            </div>
          </>
        )}
      </nav>

      {/* Spacer for fixed navigation */}
      <div className="h-14 md:h-16" />
    </>
  );
}
