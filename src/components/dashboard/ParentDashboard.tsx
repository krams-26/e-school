
import React from "react";
import { Calendar, BookOpen, Award, Bell } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import DashboardCard from "@/components/common/DashboardCard";

const ParentDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard
          title="Mes Enfants"
          icon={<BookOpen size={20} />}
          variant="primary"
        >
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-3xl font-bold">2</span>
              <div className="flex -space-x-2">
                {children.map((child, index) => (
                  <Avatar key={index} className="h-8 w-8 border-2 border-white">
                    <AvatarImage src={child.avatar} alt={child.name} />
                    <AvatarFallback>{child.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Classes: 3ème A, 5ème B</p>
          </div>
        </DashboardCard>

        <DashboardCard
          title="Réunions"
          icon={<Calendar size={20} />}
          variant="secondary"
        >
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-3xl font-bold">1</span>
              <span className="text-e-school-green-600 bg-e-school-green-50 px-2 py-1 rounded text-xs">
                Cette semaine
              </span>
            </div>
            <p className="text-sm text-muted-foreground">Parents-professeurs: 15 avril</p>
          </div>
        </DashboardCard>

        <DashboardCard
          title="Messages"
          icon={<Bell size={20} />}
          variant="neutral"
        >
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-3xl font-bold">8</span>
              <span className="text-red-600 bg-red-50 px-2 py-1 rounded text-xs">
                3 non lus
              </span>
            </div>
            <p className="text-sm text-muted-foreground">2 de l'administration</p>
          </div>
        </DashboardCard>

        <DashboardCard
          title="Points & Badges"
          icon={<Award size={20} />}
          variant="primary"
        >
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-3xl font-bold">215</span>
              <span className="text-e-school-600 bg-e-school-50 px-2 py-1 rounded text-xs">
                +45 ce mois
              </span>
            </div>
            <p className="text-sm text-muted-foreground">Total pour vos enfants</p>
          </div>
        </DashboardCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Progression Académique</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {children.map((child, childIndex) => (
                <div key={childIndex} className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={child.avatar} alt={child.name} />
                      <AvatarFallback>{child.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{child.name}</p>
                      <p className="text-xs text-muted-foreground">{child.class}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {child.subjects.map((subject, subjectIndex) => (
                      <div key={subjectIndex} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{subject.name}</span>
                          <span className={getGradeTextColor(subject.average)}>{subject.average}/20</span>
                        </div>
                        <Progress 
                          value={(subject.average / 20) * 100} 
                          className={getGradeProgressColor(subject.average)} 
                        />
                      </div>
                    ))}
                  </div>
                  
                  <div className="pt-2">
                    <Button variant="outline" size="sm" className="w-full text-xs">
                      Voir tous les résultats
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Absences & Retards</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {children.map((child, childIndex) => (
                <div key={childIndex} className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={child.avatar} alt={child.name} />
                      <AvatarFallback>{child.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{child.name}</p>
                      <p className="text-xs text-muted-foreground">{child.class}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Absences</p>
                      <div className="flex items-end gap-1">
                        <span className="text-2xl font-bold">{child.attendance.absences}</span>
                        <span className="text-xs text-muted-foreground pb-1">jours</span>
                      </div>
                      <div className="flex gap-1 items-center">
                        <Badge variant={child.attendance.absences > 2 ? "destructive" : "outline"} className="text-xs">
                          {child.attendance.absencesStatus}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Retards</p>
                      <div className="flex items-end gap-1">
                        <span className="text-2xl font-bold">{child.attendance.lates}</span>
                        <span className="text-xs text-muted-foreground pb-1">fois</span>
                      </div>
                      <div className="flex gap-1 items-center">
                        <Badge variant={child.attendance.lates > 4 ? "destructive" : "outline"} className="text-xs">
                          {child.attendance.latesStatus}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  {child.attendance.toJustify > 0 && (
                    <div className="bg-amber-50 text-amber-800 p-3 rounded-md text-sm">
                      <span className="font-medium">{child.attendance.toJustify} absence(s) à justifier</span>
                      <Button variant="outline" size="sm" className="ml-3 h-7 text-xs bg-white">
                        Justifier
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Événements à venir</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="min-w-16 text-center">
                  <div className="bg-muted rounded-md p-2">
                    <p className="text-sm font-bold">{event.date.day}</p>
                    <p className="text-xs">{event.date.month}</p>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap justify-between items-start gap-2">
                    <div>
                      <p className="font-medium">{event.title}</p>
                      <p className="text-sm text-muted-foreground">{event.description}</p>
                    </div>
                    <Badge variant={event.type === "meeting" ? "default" : "secondary"}>
                      {event.type === "meeting" ? "Réunion" : "Événement"}
                    </Badge>
                  </div>
                  <div className="flex gap-2 mt-2">
                    {event.forChildren.map((childName, childIndex) => (
                      <Badge key={childIndex} variant="outline" className="text-xs">
                        {childName}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const children = [
  {
    name: "Thomas Germain",
    class: "3ème A",
    avatar: "https://ui-avatars.com/api/?name=Thomas+Germain&background=3b82f6&color=fff",
    subjects: [
      { name: "Mathématiques", average: 14.5 },
      { name: "Français", average: 12 },
      { name: "Histoire-Géo", average: 16 },
      { name: "Anglais", average: 15.5 },
    ],
    attendance: {
      absences: 3,
      absencesStatus: "À surveiller",
      lates: 2,
      latesStatus: "Normal",
      toJustify: 1
    }
  },
  {
    name: "Julie Germain",
    class: "5ème B",
    avatar: "https://ui-avatars.com/api/?name=Julie+Germain&background=10b981&color=fff",
    subjects: [
      { name: "Mathématiques", average: 16 },
      { name: "Français", average: 17.5 },
      { name: "Histoire-Géo", average: 15 },
      { name: "Anglais", average: 18 },
    ],
    attendance: {
      absences: 1,
      absencesStatus: "Excellent",
      lates: 0,
      latesStatus: "Excellent",
      toJustify: 0
    }
  }
];

const getGradeTextColor = (average: number) => {
  if (average >= 14) return "text-e-school-green-600 font-medium";
  if (average >= 10) return "text-e-school-600 font-medium";
  return "text-red-600 font-medium";
};

const getGradeProgressColor = (average: number) => {
  if (average >= 14) return "h-2 bg-e-school-green-100 [&>div]:bg-e-school-green-500";
  if (average >= 10) return "h-2 bg-e-school-100 [&>div]:bg-e-school-500";
  return "h-2 bg-red-100 [&>div]:bg-red-500";
};

const upcomingEvents = [
  {
    title: "Réunion parents-professeurs",
    description: "Rencontre avec les enseignants principaux",
    type: "meeting",
    date: {
      day: "15",
      month: "Avr"
    },
    forChildren: ["Thomas", "Julie"]
  },
  {
    title: "Sortie scolaire au musée",
    description: "Visite du musée d'histoire naturelle",
    type: "event",
    date: {
      day: "22",
      month: "Avr"
    },
    forChildren: ["Julie"]
  },
  {
    title: "Conseils de classe",
    description: "Bilan du deuxième trimestre",
    type: "meeting",
    date: {
      day: "29",
      month: "Avr"
    },
    forChildren: ["Thomas"]
  }
];

export default ParentDashboard;
