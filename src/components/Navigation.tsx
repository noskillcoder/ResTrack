import { Link, useLocation } from 'react-router-dom';
import { Home, Users, UserCog, Settings } from 'lucide-react';

export function Navigation() {
  const location = useLocation();

  const links = [
    { to: '/', icon: Home, label: 'Home' },
    { to: '/student-gmws', icon: Users, label: 'Students' },
    { to: '/gmws', icon: UserCog, label: 'GMWs' },
    { to: '/admin', icon: Settings, label: 'Admin' },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:block fixed top-0 left-0 right-0 bg-primary text-primary-foreground shadow-lg z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center font-bold text-accent-foreground">
                MSU
              </div>
              <div>
                <h1 className="font-bold text-lg">MSU Mankato</h1>
                <p className="text-xs opacity-90">Worker Management</p>
              </div>
            </Link>

            <div className="flex gap-1">
              {links.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-150 ${
                      isActive
                        ? 'bg-primary-foreground text-primary'
                        : 'hover:bg-primary-foreground/10'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{link.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 shadow-lg">
        <div className="flex justify-around items-center h-16">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                <Icon className="w-6 h-6 mb-1" />
                <span className="text-xs font-medium">{link.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Spacer for fixed navigation */}
      <div className="h-16 md:block hidden" />
      <div className="h-16 md:hidden block" />
    </>
  );
}
