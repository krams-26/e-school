
import React from "react";
import { BarChart, Users, Calendar, School, Bell } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import DashboardCard from "@/components/common/DashboardCard";

const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard
          title="Élèves"
          icon={<Users size={20} />}
          variant="primary"
        >
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-3xl font-bold">486</span>
              <span className="text-e-school-600 bg-e-school-50 px-2 py-1 rounded text-xs">
                +12 ce mois
              </span>
            </div>
            <p className="text-sm text-muted-foreground">Répartis dans 18 classes</p>
          </div>
        </DashboardCard>

        <DashboardCard
          title="Enseignants"
          icon={<School size={20} />}
          variant="secondary"
        >
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-3xl font-bold">32</span>
              <span className="text-e-school-green-600 bg-e-school-green-50 px-2 py-1 rounded text-xs">
                2 nouveaux
              </span>
            </div>
            <p className="text-sm text-muted-foreground">8 matières enseignées</p>
          </div>
        </DashboardCard>

        <DashboardCard
          title="Événements"
          icon={<Calendar size={20} />}
          variant="neutral"
        >
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-3xl font-bold">8</span>
              <span className="text-amber-600 bg-amber-50 px-2 py-1 rounded text-xs">
                Cette semaine
              </span>
            </div>
            <p className="text-sm text-muted-foreground">2 réunions à venir</p>
          </div>
        </DashboardCard>

        <DashboardCard
          title="Messages"
          icon={<Bell size={20} />}
          variant="primary"
        >
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-3xl font-bold">24</span>
              <span className="text-red-600 bg-red-50 px-2 py-1 rounded text-xs">
                12 non lus
              </span>
            </div>
            <p className="text-sm text-muted-foreground">5 messages parents</p>
          </div>
        </DashboardCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="h-5 w-5 text-muted-foreground" />
              Taux de présence par classe
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>6ème A</span>
                <span className="text-e-school-600 font-medium">95%</span>
              </div>
              <Progress value={95} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>5ème B</span>
                <span className="text-e-school-600 font-medium">92%</span>
              </div>
              <Progress value={92} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>4ème C</span>
                <span className="text-amber-600 font-medium">78%</span>
              </div>
              <Progress value={78} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>3ème A</span>
                <span className="text-e-school-600 font-medium">88%</span>
              </div>
              <Progress value={88} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Activités récentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`h-2 w-2 rounded-full ${getActivityColor(activity.type)}`} />
                    {index < recentActivities.length - 1 && (
                      <div className="h-8 w-px bg-border" />
                    )}
                  </div>
                  <div className="space-y-1 flex-1">
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">{activity.description}</p>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {activity.time}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const recentActivities = [
  {
    type: "teacher",
    title: "Nouvelle enseignante ajoutée",
    description: "Marie Dubois - Professeur de Sciences",
    time: "Il y a 15 min",
  },
  {
    type: "alert",
    title: "Alerte d'absence",
    description: "Taux d'absence élevé en 4ème C",
    time: "Il y a 1h",
  },
  {
    type: "event",
    title: "Événement planifié",
    description: "Réunion parents-enseignants prévue",
    time: "Il y a 3h",
  },
  {
    type: "system",
    title: "Mise à jour du système",
    description: "Nouveaux modules de notation installés",
    time: "Il y a 5h",
  },
];

const getActivityColor = (type: string) => {
  switch (type) {
    case "teacher":
      return "bg-e-school-green-500";
    case "alert":
      return "bg-red-500";
    case "event":
      return "bg-amber-500";
    case "system":
      return "bg-e-school-600";
    default:
      return "bg-slate-500";
  }
};

export default AdminDashboard;
