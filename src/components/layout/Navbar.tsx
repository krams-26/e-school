
import React from "react";
import { Link } from "react-router-dom";
import { Menu, X, LogOut, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/contexts/AuthContext";
import NotificationBell from "@/components/common/NotificationBell";

const Navbar: React.FC = () => {
  const isMobile = useIsMobile();
  const { user, logout, isAuthenticated } = useAuth();
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 md:gap-4">
          {isAuthenticated && isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="pr-0">
                <MobileNav />
              </SheetContent>
            </Sheet>
          )}
          
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-e-school-600 font-display font-bold text-2xl">E-School</span>
          </Link>
        </div>

        {!isMobile && isAuthenticated && <DesktopNav />}

        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <>
              <NotificationBell />
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar>
                      <AvatarImage src={user?.avatar} alt={user?.name} />
                      <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{user?.name}</p>
                      <p className="text-sm text-muted-foreground">{user?.email}</p>
                    </div>
                  </div>
                  <DropdownMenuItem asChild>
                    <Link to="/profile">Mon profil</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings">Paramètres</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout} className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Déconnexion</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button asChild variant="default">
              <Link to="/login">Se connecter</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

const DesktopNav: React.FC = () => {
  const { user } = useAuth();
  
  const navItems = getNavItemsByRole(user?.role);
  
  return (
    <nav className="hidden md:flex items-center gap-6">
      {navItems.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className="text-sm font-medium transition-colors hover:text-primary"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
};

const MobileNav: React.FC = () => {
  const { user } = useAuth();
  
  const navItems = getNavItemsByRole(user?.role);
  
  return (
    <nav className="flex flex-col gap-4 mt-8">
      {navItems.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className="text-base font-medium transition-colors hover:text-primary px-2 py-1"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
};

const getNavItemsByRole = (role?: string) => {
  const commonItems = [
    { label: "Accueil", href: "/" },
    { label: "Calendrier", href: "/calendar" },
    { label: "Messages", href: "/messages" },
  ];

  switch (role) {
    case "admin":
      return [
        ...commonItems,
        { label: "Utilisateurs", href: "/users" },
        { label: "Statistiques", href: "/stats" },
      ];
    case "teacher":
      return [
        ...commonItems,
        { label: "Mes Classes", href: "/classes" },
        { label: "Présence", href: "/attendance" },
        { label: "Notes", href: "/grades" },
      ];
    case "student":
      return [
        ...commonItems,
        { label: "Mes Cours", href: "/courses" },
        { label: "Devoirs", href: "/assignments" },
        { label: "Points", href: "/points" },
      ];
    case "parent":
      return [
        ...commonItems,
        { label: "Mes Enfants", href: "/children" },
        { label: "Progression", href: "/progress" },
        { label: "Réunions", href: "/meetings" },
      ];
    default:
      return commonItems;
  }
};

export default Navbar;
