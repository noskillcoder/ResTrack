import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useUser } from '@/contexts/UserContext';
import { authService } from '@/services/authService';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { UserCog, User, LogOut, CheckCircle2, Sparkles, Mail, Lock, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function LoginSelector() {
  const { user, signOut, loading } = useUser();
  const { toast } = useToast();
  const [isSignUp, setIsSignUp] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Login form
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  
  // Sign up form
  const [signUpData, setSignUpData] = useState({
    email: '',
    password: '',
    name: '',
    role: 'worker' as 'admin' | 'worker',
    workerType: 'student' as 'student' | 'gmw',
    confirmPassword: '',
  });

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await authService.signIn({
        email: loginData.email,
        password: loginData.password,
      });
      toast({
        title: 'Welcome back!',
        description: 'You have successfully signed in.',
      });
      setLoginData({ email: '', password: '' });
    } catch (error: any) {
      toast({
        title: 'Sign in failed',
        description: error.message || 'Invalid email or password',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (signUpData.password !== signUpData.confirmPassword) {
      toast({
        title: 'Password mismatch',
        description: 'Passwords do not match',
        variant: 'destructive',
      });
      return;
    }

    if (signUpData.password.length < 6) {
      toast({
        title: 'Password too short',
        description: 'Password must be at least 6 characters',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await authService.signUp({
        email: signUpData.email,
        password: signUpData.password,
        name: signUpData.name,
        role: signUpData.role,
        workerType: signUpData.role === 'worker' ? signUpData.workerType : undefined,
      });
      toast({
        title: 'Account created!',
        description: 'Please check your email to verify your account.',
      });
      setSignUpData({
        email: '',
        password: '',
        name: '',
        role: 'worker',
        workerType: 'student',
        confirmPassword: '',
      });
      setIsSignUp(false);
    } catch (error: any) {
      toast({
        title: 'Sign up failed',
        description: error.message || 'Failed to create account',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: 'Signed out',
        description: 'You have been successfully signed out.',
      });
    } catch (error: any) {
      toast({
        title: 'Sign out failed',
        description: error.message || 'Failed to sign out',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return (
      <Card className="mb-4 border-primary/20 bg-gradient-to-br from-card to-primary/5 shadow-lg">
        <CardContent className="p-8 text-center">
          <Loader2 className="w-8 h-8 mx-auto mb-4 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading...</p>
        </CardContent>
      </Card>
    );
  }

  if (user) {
    return (
      <Card className="mb-4 border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent shadow-lg overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-8 translate-x-8"></div>
        <CardContent className="p-4 md:p-5 relative">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="w-12 h-12 border-2 border-primary/30 shadow-md">
                  <AvatarFallback className="gradient-primary text-primary-foreground font-bold text-lg">
                    {user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-background flex items-center justify-center">
                  <CheckCircle2 className="w-3 h-3 text-white" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-bold text-base md:text-lg text-foreground">{user.name}</p>
                  <Sparkles className="w-4 h-4 text-primary" />
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs capitalize">
                    {user.role}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{user.email}</span>
                </div>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleSignOut}
              className="gap-2 hover:bg-primary/10 hover:border-primary/50 transition-all"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-4 border-primary/20 bg-gradient-to-br from-card to-primary/5 shadow-lg overflow-hidden relative">
      <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-3xl -translate-y-12 translate-x-12"></div>
      <CardContent className="p-5 md:p-6 relative">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center shadow-md">
              <User className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground">Welcome</h3>
              <p className="text-sm text-muted-foreground">Sign in or create an account</p>
            </div>
          </div>
        </div>

        <Tabs value={isSignUp ? 'signup' : 'login'} onValueChange={(v) => setIsSignUp(v === 'signup')} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4 mt-0">
            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <Label htmlFor="login-email" className="text-sm font-semibold mb-2 block">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="you@example.com"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    className="pl-10 h-11"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="login-password" className="text-sm font-semibold mb-2 block">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="••••••••"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    className="pl-10 h-11"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-11 text-base font-semibold shadow-md hover:shadow-lg transition-all"
                size="lg"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5 mr-2" />
                    Sign In
                  </>
                )}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="signup" className="space-y-4 mt-0">
            <form onSubmit={handleSignUp} className="space-y-4">
              <div>
                <Label htmlFor="signup-name" className="text-sm font-semibold mb-2 block">
                  Full Name
                </Label>
                <Input
                  id="signup-name"
                  type="text"
                  placeholder="John Doe"
                  value={signUpData.name}
                  onChange={(e) => setSignUpData({ ...signUpData, name: e.target.value })}
                  className="h-11"
                  required
                />
              </div>

              <div>
                <Label htmlFor="signup-email" className="text-sm font-semibold mb-2 block">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="you@example.com"
                    value={signUpData.email}
                    onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                    className="pl-10 h-11"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="signup-role" className="text-sm font-semibold mb-2 block">
                  Role
                </Label>
                <Select
                  value={signUpData.role}
                  onValueChange={(value: 'admin' | 'worker') =>
                    setSignUpData({ ...signUpData, role: value })
                  }
                >
                  <SelectTrigger className="h-11">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="worker">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Worker
                      </div>
                    </SelectItem>
                    <SelectItem value="admin">
                      <div className="flex items-center gap-2">
                        <UserCog className="w-4 h-4" />
                        Admin
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {signUpData.role === 'worker' && (
                <div>
                  <Label htmlFor="signup-worker-type" className="text-sm font-semibold mb-2 block">
                    Worker Type
                  </Label>
                  <Select
                    value={signUpData.workerType}
                    onValueChange={(value: 'student' | 'gmw') =>
                      setSignUpData({ ...signUpData, workerType: value })
                    }
                  >
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Select worker type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          Student Worker
                        </div>
                      </SelectItem>
                      <SelectItem value="gmw">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          GMW Worker
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div>
                <Label htmlFor="signup-password" className="text-sm font-semibold mb-2 block">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="••••••••"
                    value={signUpData.password}
                    onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                    className="pl-10 h-11"
                    required
                    minLength={6}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="signup-confirm" className="text-sm font-semibold mb-2 block">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="signup-confirm"
                    type="password"
                    placeholder="••••••••"
                    value={signUpData.confirmPassword}
                    onChange={(e) =>
                      setSignUpData({ ...signUpData, confirmPassword: e.target.value })
                    }
                    className="pl-10 h-11"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-11 text-base font-semibold shadow-md hover:shadow-lg transition-all"
                size="lg"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  <>
                    <User className="w-5 h-5 mr-2" />
                    Create Account
                  </>
                )}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
