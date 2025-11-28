import { Link } from 'react-router-dom';
import { Users, UserCog, ArrowRight } from 'lucide-react';
import { Navigation } from '@/components/Navigation';

const Index = () => {
  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-background pb-20 md:pb-8">
        {/* Hero Section */}
        <div className="gradient-purple-gold text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40"></div>
          <div className="container mx-auto px-4 py-12 md:py-16 relative z-10">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
                MSU Mankato Worker Management
              </h1>
              <p className="text-lg md:text-xl opacity-95 drop-shadow">
                Track hours, manage schedules, and coordinate tasks across all residence halls.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {/* Student GMWs Card */}
            <Link to="/student-gmws">
              <div className="bg-card rounded-2xl p-8 border-2 border-primary/20 hover:border-primary shadow-lg hover:shadow-glow transition-all duration-200 group h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 gradient-primary opacity-10 blur-3xl rounded-full -translate-y-8 translate-x-8 group-hover:scale-150 transition-transform duration-500"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 gradient-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-lg">
                      <Users className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                      Student GMWs
                    </h2>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    Manage student workers across Crawford, McElroy, Preska, and Julia Sears residence halls.
                  </p>
                  <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                    View Students
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>

            {/* GMWs Card */}
            <Link to="/gmws">
              <div className="bg-card rounded-2xl p-8 border-2 border-accent/30 hover:border-accent shadow-lg hover:shadow-accent transition-all duration-200 group h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 gradient-accent opacity-10 blur-3xl rounded-full -translate-y-8 translate-x-8 group-hover:scale-150 transition-transform duration-500"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 gradient-accent rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-lg">
                      <UserCog className="w-8 h-8 text-accent-foreground" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground group-hover:text-accent-dark transition-colors">
                      GMWs
                    </h2>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    Oversee full-time grounds and maintenance workers responsible for facility operations.
                  </p>
                  <div className="flex items-center gap-2 text-accent-dark font-semibold group-hover:gap-3 transition-all">
                    View GMWs
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
