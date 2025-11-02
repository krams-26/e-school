
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Users, Award, MessageSquare, Calendar, CheckSquare } from "lucide-react";
import Navbar from "@/components/layout/Navbar";

const Index = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-e-school-50 to-white">
      <Navbar />
      
      <main className="flex-1">
        {isAuthenticated ? (
          <AuthenticatedHome />
        ) : (
          <LandingPage />
        )}
      </main>
      
      <footer className="bg-white border-t py-6">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <div>
              &copy; {new Date().getFullYear()} E-School. Tous droits réservés.
            </div>
            <div className="flex items-center gap-4">
              <a 
                href="https://t.me/+243997204211" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-e-school-600 transition-colors flex items-center gap-2"
              >
                <MessageSquare className="h-4 w-4" />
                Support & Assistance
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Using the existing component renamed to avoid conflicts
const SchoolIcon = BookOpen;

const LandingPage = () => {
  return (
    <div className="space-y-24 py-12">
      <section className="container px-4 md:px-6 space-y-10 py-12">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="h-16 w-16 rounded-full bg-e-school-100 flex items-center justify-center mb-4">
            <SchoolIcon className="h-8 w-8 text-e-school-600" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
            Bienvenue sur la plateforme <span className="text-e-school-600">E-School</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-[700px] mx-auto">
            La solution complète pour connecter enseignants, élèves, parents et administrateurs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Button asChild size="lg" className="h-12 px-8">
              <Link to="/login">Se connecter</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 px-8">
              <Link to="/about">En savoir plus</Link>
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          <FeatureCard 
            icon={<CheckSquare className="h-8 w-8 text-e-school-600" />}
            title="Présence en un clic"
            description="Système d'appel simplifié permettant aux enseignants de marquer les présences rapidement."
          />
          <FeatureCard 
            icon={<Award className="h-8 w-8 text-e-school-green-600" />}
            title="Système de points"
            description="Récompensez les élèves pour leur performance et suivez leur progression."
          />
          <FeatureCard 
            icon={<Calendar className="h-8 w-8 text-e-school-600" />}
            title="Calendrier des cours"
            description="Vue claire de l'emploi du temps pour tous les utilisateurs."
          />
          <FeatureCard 
            icon={<MessageSquare className="h-8 w-8 text-e-school-green-600" />}
            title="Messagerie intégrée"
            description="Communication facile entre enseignants, élèves et parents."
          />
          <FeatureCard 
            icon={<Users className="h-8 w-8 text-e-school-600" />}
            title="Espaces dédiés"
            description="Interfaces adaptées aux besoins spécifiques de chaque utilisateur."
          />
          <FeatureCard 
            icon={<BookOpen className="h-8 w-8 text-e-school-green-600" />}
            title="Suivi académique"
            description="Suivi détaillé des notes et de la progression des élèves."
          />
        </div>
      </section>
      
      <section className="bg-e-school-600 text-white py-20">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold">Une plateforme pour tous</h2>
              <p className="text-e-school-50 text-lg">
                E-School connecte tous les acteurs de l'écosystème éducatif dans un environnement numérique intuitif et sécurisé.
              </p>
              <ul className="space-y-2 mt-6">
                {["Accès facile depuis tous les appareils", "Interface intuitive et moderne", "Expérience utilisateur optimisée", "Sécurité des données garantie"].map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-e-school-300"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {["Enseignants", "Élèves", "Parents", "Administrateurs"].map((user, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-sm border-0">
                  <CardContent className="p-6 text-center">
                    <h3 className="text-xl font-semibold mb-2">{user}</h3>
                    <p className="text-e-school-100">
                      Interface adaptée aux besoins spécifiques.
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      <section className="container px-4 md:px-6 py-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl font-bold">Prêt à transformer l'expérience éducative?</h2>
          <p className="text-lg text-slate-600">
            Rejoignez des milliers d'établissements qui utilisent déjà E-School pour améliorer leur gestion administrative et pédagogique.
          </p>
          <Button asChild size="lg" className="mt-6 h-12 px-8">
            <Link to="/login">Commencer maintenant</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <Card className="bg-white h-full hover:shadow-md transition-shadow border-b-4 border-e-school-300">
    <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
      <div className="p-3 rounded-full bg-muted">{icon}</div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

const AuthenticatedHome = () => {
  return (
    <div className="container py-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Tableau de bord</h1>
        <Button asChild>
          <Link to="/dashboard">
            Voir mon tableau de bord complet
          </Link>
        </Button>
      </div>
      
      <section className="space-y-6">
        <h2 className="text-xl font-semibold">Accès rapide</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <QuickAccessCard 
            icon={<Users className="h-6 w-6" />} 
            title="Classes" 
            href="/classes" 
            color="bg-e-school-600"
          />
          <QuickAccessCard 
            icon={<Calendar className="h-6 w-6" />} 
            title="Calendrier" 
            href="/calendar" 
            color="bg-e-school-green-600"
          />
          <QuickAccessCard 
            icon={<CheckSquare className="h-6 w-6" />} 
            title="Présence" 
            href="/attendance" 
            color="bg-amber-600"
          />
          <QuickAccessCard 
            icon={<MessageSquare className="h-6 w-6" />} 
            title="Messages" 
            href="/messages" 
            color="bg-purple-600"
          />
        </div>
      </section>
      
      <section className="space-y-6">
        <h2 className="text-xl font-semibold">Activités récentes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-6">
              <h3 className="text-lg font-medium">Derniers messages</h3>
              <div className="space-y-3">
                {[
                  { sender: "Marie Curie", message: "Bonjour, pouvons-nous discuter des progrès de votre enfant ?" },
                  { sender: "Admin", message: "La réunion de demain est confirmée à 14h" },
                ].map((msg, index) => (
                  <div key={index} className="p-3 bg-muted rounded-lg">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{msg.sender}</span>
                      <span className="text-muted-foreground">Aujourd'hui</span>
                    </div>
                    <p className="text-sm mt-1">{msg.message}</p>
                  </div>
                ))}
              </div>
              <Button asChild variant="outline" className="w-full">
                <Link to="/messages">Voir tous les messages</Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 space-y-6">
              <h3 className="text-lg font-medium">Événements à venir</h3>
              <div className="space-y-3">
                {[
                  { title: "Réunion parents-professeurs", date: "15 avril", time: "18:00" },
                  { title: "Examen de Sciences", date: "18 avril", time: "14:00" },
                ].map((event, index) => (
                  <div key={index} className="p-3 bg-muted rounded-lg">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{event.title}</span>
                      <span className="text-muted-foreground">{event.date}</span>
                    </div>
                    <p className="text-sm mt-1">Heure: {event.time}</p>
                  </div>
                ))}
              </div>
              <Button asChild variant="outline" className="w-full">
                <Link to="/calendar">Voir le calendrier</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

const QuickAccessCard = ({ icon, title, href, color }: { icon: React.ReactNode, title: string, href: string, color: string }) => (
  <Link to={href}>
    <Card className="h-full hover:shadow-md transition-all cursor-pointer border-l-4" style={{ borderLeftColor: color }}>
      <CardContent className="p-4 flex items-center space-x-4">
        <div className={`${color} text-white p-3 rounded-full`}>
          {icon}
        </div>
        <h3 className="font-medium">{title}</h3>
      </CardContent>
    </Card>
  </Link>
);

export default Index;
