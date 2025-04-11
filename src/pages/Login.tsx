
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SchoolIcon } from "lucide-react";
import LoginForm from "@/components/auth/LoginForm";

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <div className="hidden lg:flex lg:w-1/2 bg-e-school-600 text-white items-center justify-center">
        <div className="max-w-md p-8 text-center">
          <SchoolIcon className="h-16 w-16 mx-auto mb-6 text-white" />
          <h1 className="text-3xl font-bold mb-4">E-School</h1>
          <p className="text-e-school-100 text-lg mb-8">
            Une plateforme éducative complète qui connecte enseignants, élèves, parents et administrateurs.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <FeatureItem text="Présence en un clic" />
            <FeatureItem text="Système de points" />
            <FeatureItem text="Calendrier des cours" />
            <FeatureItem text="Messagerie intégrée" />
          </div>
        </div>
      </div>
      
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="flex flex-col items-center mb-8 lg:hidden">
            <SchoolIcon className="h-12 w-12 text-e-school-600 mb-4" />
            <h1 className="text-2xl font-bold text-e-school-600">E-School</h1>
          </div>
          
          <LoginForm />
          
          <div className="mt-8 text-center text-sm text-muted-foreground">
            <Link to="/" className="hover:text-e-school-600 underline underline-offset-4">
              Retour à l'accueil
            </Link>
            <p className="mt-4">
              &copy; {new Date().getFullYear()} E-School. Tous droits réservés.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureItem = ({ text }: { text: string }) => (
  <div className="flex items-center space-x-2 text-left">
    <div className="rounded-full bg-white/20 h-2 w-2"></div>
    <span className="text-sm">{text}</span>
  </div>
);

const SchoolIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="m2 22 10-10 10 10" />
    <path d="M4 15v-3a8 8 0 0 1 16 0v3" />
  </svg>
);

export default Login;
