
import React from "react";
import { Users, BookOpen, CalendarDays, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import DashboardCard from "@/components/common/DashboardCard";

const TeacherDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard
          title="Mes Classes"
          icon={<Users size={20} />}
          variant="primary"
        >
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-3xl font-bold">4</span>
              <span className="text-e-school-600 bg-e-school-50 px-2 py-1 rounded text-xs">
                104 élèves
              </span>
            </div>
            <p className="text-sm text-muted-foreground">Présence moyenne: 92%</p>
          </div>
        </DashboardCard>

        <DashboardCard
          title="Mes Cours"
          icon={<BookOpen size={20} />}
          variant="secondary"
        >
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-3xl font-bold">18</span>
              <span className="text-e-school-green-600 bg-e-school-green-50 px-2 py-1 rounded text-xs">
                Cette semaine
              </span>
            </div>
            <p className="text-sm text-muted-foreground">3 cours aujourd'hui</p>
          </div>
        </DashboardCard>

        <DashboardCard
          title="Prochains Événements"
          icon={<CalendarDays size={20} />}
          variant="neutral"
        >
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-3xl font-bold">5</span>
              <span className="text-amber-600 bg-amber-50 px-2 py-1 rounded text-xs">
                Cette semaine
              </span>
            </div>
            <p className="text-sm text-muted-foreground">1 réunion demain</p>
          </div>
        </DashboardCard>

        <DashboardCard
          title="Devoirs à Corriger"
          icon={<CheckCircle size={20} />}
          variant="primary"
        >
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-3xl font-bold">28</span>
              <span className="text-red-600 bg-red-50 px-2 py-1 rounded text-xs">
                8 en retard
              </span>
            </div>
            <p className="text-sm text-muted-foreground">Pour 3 classes</p>
          </div>
        </DashboardCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Cours d'aujourd'hui</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {todayClasses.map((cls, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className={`h-14 w-2 rounded-full ${getClassPeriodColor(cls.time)}`} />
                  <div className="flex-1 grid grid-cols-3 sm:grid-cols-4 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{cls.time}</p>
                      <p className="text-xs text-muted-foreground">{cls.duration} min</p>
                    </div>
                    <div className="col-span-2 space-y-1">
                      <div className="flex items-center">
                        <p className="text-sm font-medium">{cls.subject}</p>
                        {cls.isNow && (
                          <Badge variant="secondary" className="ml-2 bg-e-school-100 text-e-school-800 hover:bg-e-school-100 hover:text-e-school-800">
                            En cours
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{cls.class}</p>
                    </div>
                    <div className="hidden sm:flex justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 text-xs"
                      >
                        Faire l'appel
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Absence à justifier</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {absenceStudents.map((student, index) => (
                <div key={index} className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={student.avatar} />
                    <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{student.name}</p>
                    <p className="text-xs text-muted-foreground">{student.class}</p>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {student.days}j
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full text-xs mt-2">
                Voir toutes les absences
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Performance par classe</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {classPerfData.map((cls, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{cls.name}</span>
                  <span>{cls.avgGrade}/20</span>
                </div>
                <Progress 
                  value={(cls.avgGrade / 20) * 100} 
                  className={`h-2 ${
                    cls.avgGrade >= 14 
                      ? "bg-e-school-green-100 [&>div]:bg-e-school-green-500" 
                      : cls.avgGrade >= 10 
                        ? "bg-e-school-100 [&>div]:bg-e-school-500" 
                        : "bg-red-100 [&>div]:bg-red-500"
                  }`} 
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Note min: {cls.minGrade}</span>
                  <span>Note max: {cls.maxGrade}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const todayClasses = [
  {
    time: "08:00",
    duration: 55,
    subject: "Mathématiques",
    class: "3ème A - Salle 105",
    isNow: false,
  },
  {
    time: "10:00",
    duration: 55,
    subject: "Mathématiques",
    class: "4ème B - Salle 202",
    isNow: true,
  },
  {
    time: "14:00",
    duration: 55,
    subject: "Mathématiques",
    class: "3ème B - Salle 105",
    isNow: false,
  },
];

const getClassPeriodColor = (time: string) => {
  const hour = parseInt(time.split(':')[0]);
  if (hour < 10) return "bg-e-school-600";
  if (hour < 13) return "bg-amber-500";
  return "bg-e-school-green-500";
};

const absenceStudents = [
  {
    name: "Tom Dupont",
    class: "3ème A",
    days: 3,
    avatar: "https://ui-avatars.com/api/?name=Tom+Dupont&background=3b82f6&color=fff",
  },
  {
    name: "Sarah Martin",
    class: "4ème B",
    days: 2,
    avatar: "https://ui-avatars.com/api/?name=Sarah+Martin&background=10b981&color=fff",
  },
  {
    name: "Lucas Bernard",
    class: "3ème B",
    days: 1,
    avatar: "https://ui-avatars.com/api/?name=Lucas+Bernard&background=f59e0b&color=fff",
  },
];

const classPerfData = [
  {
    name: "3ème A",
    avgGrade: 13.5,
    minGrade: 8,
    maxGrade: 18,
  },
  {
    name: "3ème B",
    avgGrade: 12.8,
    minGrade: 7,
    maxGrade: 17,
  },
  {
    name: "4ème B",
    avgGrade: 11.2,
    minGrade: 6,
    maxGrade: 16,
  },
  {
    name: "4ème C",
    avgGrade: 9.5,
    minGrade: 5,
    maxGrade: 15,
  },
];

export default TeacherDashboard;
