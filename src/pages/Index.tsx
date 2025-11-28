import { Link } from 'react-router-dom';
import { Users, UserCog, ArrowRight } from 'lucide-react';
import { Navigation } from '@/components/Navigation';

const Index = () => {
  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-background pb-20 md:pb-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
          <div className="container mx-auto px-4 py-12 md:py-16">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                MSU Mankato Worker Management
              </h1>
              <p className="text-lg md:text-xl opacity-90">
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
              <div className="bg-card rounded-2xl p-8 border-2 border-border hover:border-primary/50 shadow-md hover:shadow-lg transition-all duration-150 group h-full">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                    Student GMWs
                  </h2>
                </div>
                <p className="text-muted-foreground mb-6">
                  Manage student workers across Crawford, McElroy, Preska, and Julia Sears residence halls.
                </p>
                <div className="flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                  View Students
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </Link>

            {/* GMWs Card */}
            <Link to="/gmws">
              <div className="bg-card rounded-2xl p-8 border-2 border-border hover:border-accent/50 shadow-md hover:shadow-lg transition-all duration-150 group h-full">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <UserCog className="w-8 h-8 text-accent" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground group-hover:text-accent transition-colors">
                    GMWs
                  </h2>
                </div>
                <p className="text-muted-foreground mb-6">
                  Oversee full-time grounds and maintenance workers responsible for facility operations.
                </p>
                <div className="flex items-center gap-2 text-accent font-medium group-hover:gap-3 transition-all">
                  View GMWs
                  <ArrowRight className="w-5 h-5" />
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
