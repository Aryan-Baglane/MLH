import { Button } from "@/components/ui/button";
import { Database, LogOut } from "lucide-react";
import { NavLink } from "./NavLink";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface NavigationProps {
  // keep props optional for backward compatibility
  isLoggedIn?: boolean;
  onLogin?: () => void;
  onLogout?: () => void;
}

export const Navigation = ({ isLoggedIn: _isLoggedIn, onLogin, onLogout }: NavigationProps) => {
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // simple localStorage-based auth flag so navigation updates when route changes
    setIsLogged(localStorage.getItem("loggedIn") === "true");
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    setIsLogged(false);
    onLogout?.();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-card/95 shadow-sm backdrop-blur-lg border-b border-border">
      <nav className="container mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">
        {/* Logo */}
        <NavLink to="/" className="flex items-center space-x-2 group">
          <div className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center shadow-glow transition-all duration-300 group-hover:scale-110">
            <Database className="h-5 w-5 text-white" />
          </div>
          <span className="text-2xl font-bold text-foreground">DataQuery AI</span>
        </NavLink>

        {/* Navigation Links */}
        {!isLogged ? (
          <div className="flex items-center space-x-6">
            <a
              href="#features"
              className="hidden text-sm font-medium text-muted-foreground hover:text-primary transition-colors md:block"
            >
              Features
            </a>
            <a
              href="#tech-stack"
              className="hidden text-sm font-medium text-muted-foreground hover:text-primary transition-colors md:block"
            >
              Tech Stack
            </a>
            <a
              href="#use-cases"
              className="hidden text-sm font-medium text-muted-foreground hover:text-primary transition-colors md:block"
            >
              Use Cases
            </a>
            <NavLink to="/signin" className="text-sm font-medium">
              <Button variant="ghost" className="text-sm font-medium">
                Sign In
              </Button>
            </NavLink>
            <NavLink to="/signup">
              <Button className="gradient-primary-hover shadow-glow hover:shadow-glow-lg transition-all duration-300">
                Sign Up
              </Button>
            </NavLink>
          </div>
        ) : (
          <div className="flex items-center space-x-6">
            <NavLink to="/dashboard" className="text-sm font-medium">
              <span className="text-sm font-medium text-foreground">Dashboard</span>
            </NavLink>
            <span className="text-sm font-medium text-foreground">
              Welcome, <span className="text-primary">HackCBS User!</span>
            </span>
            <Button variant="outline" onClick={handleLogout} className="gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        )}
      </nav>
    </header>
  );
};
