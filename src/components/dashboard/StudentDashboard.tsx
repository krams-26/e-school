
import React from "react";
import { BookOpen, Calendar, Award, ClipboardCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DashboardCard from "@/components/common/DashboardCard";

const StudentDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard
          title="Mes Cours"
          icon={<BookOpen size={20} />}
          variant="primary"
        >
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-3xl font-bold">8</span>
              <span className="text-e-school-600 bg-e-school-50 px-2 py-1 rounded text-xs">
                6 aujourd'hui
              </span>
            </div>
            <p className="text-sm text-muted-foreground">Prochain: Mathématiques</p>
          </div>
        </DashboardCard>

        <DashboardCard
          title="Devoirs"
          icon={<ClipboardCheck size={20} />}
          variant="secondary"
        >
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-3xl font-bold">5</span>
              <span className="text-red-600 bg-red-50 px-2 py-1 rounded text-xs">
                2 à rendre
              </span>
            </div>
            <p className="text-sm text-muted-foreground">Prochain: Français (demain)</p>
          </div>
        </DashboardCard>

        <DashboardCard
          title="Mes Points"
          icon={<Award size={20} />}
          variant="primary"
        >
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-3xl font-bold">156</span>
              <span className="text-e-school-green-600 bg-e-school-green-50 px-2 py-1 rounded text-xs">
                +12 cette semaine
              </span>
            </div>
            <p className="text-sm text-muted-foreground">Niveau: Avancé</p>
          </div>
        </DashboardCard>

        <DashboardCard
          title="Événements"
          icon={<Calendar size={20} />}
          variant="neutral"
        >
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-3xl font-bold">2</span>
              <span className="text-amber-600 bg-amber-50 px-2 py-1 rounded text-xs">
                Cette semaine
              </span>
            </div>
            <p className="text-sm text-muted-foreground">Excursion: Vendredi</p>
          </div>
        </DashboardCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Emploi du temps d'aujourd'hui</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {todaySchedule.map((cls, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className={`h-14 w-2 rounded-full ${getClassStatusColor(cls.status)}`} />
                  <div className="flex-1 grid grid-cols-6 gap-4">
                    <div className="col-span-1 space-y-1">
                      <p className="text-sm font-medium">{cls.time}</p>
                      <p className="text-xs text-muted-foreground">{cls.duration} min</p>
                    </div>
                    <div className="col-span-3 space-y-1">
                      <div className="flex items-center">
                        <p className="text-sm font-medium">{cls.subject}</p>
                        {cls.status === "current" && (
                          <Badge variant="secondary" className="ml-2 bg-e-school-100 text-e-school-800 hover:bg-e-school-100 hover:text-e-school-800">
                            En cours
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">Salle {cls.room} - {cls.teacher}</p>
                    </div>
                    <div className="col-span-2 flex justify-end">
                      {cls.status === "upcoming" && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 text-xs"
                        >
                          Details
                        </Button>
                      )}
                      {cls.status === "current" && (
                        <Button
                          variant="default"
                          size="sm"
                          className="h-8 text-xs"
                        >
                          Rejoindre
                        </Button>
                      )}
                      {cls.status === "completed" && (
                        <Badge variant="outline" className="h-8 text-xs">
                          Terminé
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mes Badges</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {badges.map((badge, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center ${badge.bgColor}`}>
                    {badge.icon}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{badge.name}</p>
                    <p className="text-xs text-muted-foreground">{badge.description}</p>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full text-xs mt-2">
                Voir tous les badges
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Mes Notes Récentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentGrades.map((grade, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={grade.subjectAvatar} />
                        <AvatarFallback>{grade.subject.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{grade.subject}</p>
                        <p className="text-xs text-muted-foreground">{grade.date}</p>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${getGradeColor(grade.score)}`}>
                      {grade.score}/20
                    </div>
                  </div>
                  <Progress 
                    value={(grade.score / 20) * 100} 
                    className={`h-1 ${
                      grade.score >= 14 
                        ? "bg-e-school-green-100 [&>div]:bg-e-school-green-500" 
                        : grade.score >= 10 
                          ? "bg-e-school-100 [&>div]:bg-e-school-500" 
                          : "bg-red-100 [&>div]:bg-red-500"
                    }`} 
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Prochains Devoirs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingAssignments.map((assignment, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="min-w-10 h-10 rounded-full flex items-center justify-center bg-muted">
                    <span className="text-sm font-medium">{assignment.dueDate.split(" ")[0]}</span>
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{assignment.title}</p>
                      <Badge variant={assignment.urgent ? "destructive" : "outline"}>
                        {assignment.urgent ? "Urgent" : "À venir"}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{assignment.subject} - {assignment.dueDate}</p>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full text-xs mt-2">
                Voir tous les devoirs
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const todaySchedule = [
  {
    time: "08:00",
    duration: 55,
    subject: "Histoire-Géographie",
    room: "102",
    teacher: "M. Durand",
    status: "completed"
  },
  {
    time: "09:00",
    duration: 55,
    subject: "Mathématiques",
    room: "205",
    teacher: "Mme Curie",
    status: "completed"
  },
  {
    time: "10:30",
    duration: 55,
    subject: "Français",
    room: "108",
    teacher: "M. Hugo",
    status: "current"
  },
  {
    time: "13:30",
    duration: 55,
    subject: "Sciences",
    room: "307",
    teacher: "M. Pasteur",
    status: "upcoming"
  },
  {
    time: "14:30",
    duration: 55,
    subject: "Anglais",
    room: "103",
    teacher: "Mme Brown",
    status: "upcoming"
  }
];

const getClassStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-e-school-green-500";
    case "current":
      return "bg-e-school-600 animate-pulse";
    default:
      return "bg-slate-300";
  }
};

const badges = [
  {
    name: "Excellence Académique",
    description: "Obtenu pour des résultats excellents",
    bgColor: "bg-amber-100",
    icon: <Award className="h-5 w-5 text-amber-600" />,
  },
  {
    name: "Assiduité Parfaite",
    description: "Présent à tous les cours du mois",
    bgColor: "bg-e-school-100",
    icon: <Calendar className="h-5 w-5 text-e-school-600" />,
  },
  {
    name: "Participation Active",
    description: "Contribue activement en classe",
    bgColor: "bg-e-school-green-100",
    icon: <BookOpen className="h-5 w-5 text-e-school-green-600" />,
  },
];

const recentGrades = [
  {
    subject: "Mathématiques",
    score: 16,
    date: "15 avril",
    subjectAvatar: "https://ui-avatars.com/api/?name=Math&background=3b82f6&color=fff"
  },
  {
    subject: "Français",
    score: 14,
    date: "12 avril",
    subjectAvatar: "https://ui-avatars.com/api/?name=FR&background=10b981&color=fff"
  },
  {
    subject: "Histoire",
    score: 12,
    date: "10 avril",
    subjectAvatar: "https://ui-avatars.com/api/?name=HG&background=f59e0b&color=fff"
  },
  {
    subject: "Anglais",
    score: 18,
    date: "5 avril",
    subjectAvatar: "https://ui-avatars.com/api/?name=EN&background=6366f1&color=fff"
  },
];

const getGradeColor = (score: number) => {
  if (score >= 14) return "bg-e-school-green-100 text-e-school-green-800";
  if (score >= 10) return "bg-e-school-100 text-e-school-800";
  return "bg-red-100 text-red-800";
};

const upcomingAssignments = [
  {
    title: "Dissertation sur Molière",
    subject: "Français",
    dueDate: "Avr 12 - 23:59",
    urgent: true
  },
  {
    title: "Exercices d'algèbre ch. 5",
    subject: "Mathématiques",
    dueDate: "Avr 15 - 08:00",
    urgent: false
  },
  {
    title: "Présentation sur les énergies",
    subject: "SVT",
    dueDate: "Avr 18 - 10:00",
    urgent: false
  },
];

export default StudentDashboard;
