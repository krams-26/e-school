import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import { MessageSquare } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-6">
          <h1 className="text-6xl font-bold text-e-school-600">404</h1>
          <p className="text-xl text-gray-600">Page non trouvée</p>
          <p className="text-muted-foreground">
            La page que vous recherchez n'existe pas ou a été déplacée.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/" className="text-e-school-600 hover:text-e-school-700 underline">
              Retour à l'accueil
            </Link>
            <a 
              href="https://t.me/+243997204211" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-e-school-600 hover:text-e-school-700 underline flex items-center justify-center gap-2"
            >
              <MessageSquare className="h-4 w-4" />
              Contactez le support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
