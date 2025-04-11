
import React, { useState } from "react";
import { Check, X, Users, Clock, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

interface Student {
  id: string;
  name: string;
  avatar?: string;
  attendance: "present" | "absent" | "late" | "pending";
}

interface Class {
  id: string;
  name: string;
  students: Student[];
}

const AttendanceTracker: React.FC = () => {
  const [classes] = useState<Class[]>(demoClasses);
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  
  const handleSelectClass = (classItem: Class) => {
    setSelectedClass(classItem);
  };
  
  const handleMarkAttendance = (studentId: string, status: "present" | "absent" | "late") => {
    if (!selectedClass) return;
    
    // In a real app, you would call an API to update the attendance
    // For this demo, we're just updating the local state
    
    const updatedClasses = classes.map(cls => 
      cls.id === selectedClass.id
        ? {
            ...cls,
            students: cls.students.map(student => 
              student.id === studentId
                ? { ...student, attendance: status }
                : student
            )
          }
        : cls
    );
    
    // Update the selected class too
    const updatedSelectedClass = updatedClasses.find(cls => cls.id === selectedClass.id) || null;
    setSelectedClass(updatedSelectedClass);
    
    toast({
      description: `Présence marquée: ${updatedSelectedClass?.students.find(s => s.id === studentId)?.name} est ${getStatusText(status)}.`,
    });
  };
  
  const handleMarkAllPresent = () => {
    if (!selectedClass) return;
    
    const updatedClasses = classes.map(cls => 
      cls.id === selectedClass.id
        ? {
            ...cls,
            students: cls.students.map(student => 
              ({ ...student, attendance: "present" as const })
            )
          }
        : cls
    );
    
    const updatedSelectedClass = updatedClasses.find(cls => cls.id === selectedClass.id) || null;
    setSelectedClass(updatedSelectedClass);
    
    toast({
      description: `Tous les élèves de ${selectedClass.name} ont été marqués présents.`,
    });
  };
  
  const filteredStudents = selectedClass?.students.filter(student => 
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];
  
  const attendanceStats = selectedClass?.students.reduce(
    (acc, student) => {
      acc[student.attendance]++;
      return acc;
    },
    { present: 0, absent: 0, late: 0, pending: 0 }
  ) || { present: 0, absent: 0, late: 0, pending: 0 };
  
  const getStatusText = (status: "present" | "absent" | "late") => {
    switch (status) {
      case "present": return "présent";
      case "absent": return "absent";
      case "late": return "en retard";
      default: return "";
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <Card className="flex-1 md:max-w-xs">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-muted-foreground" />
              Classes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {classes.map((classItem) => (
                <Button
                  key={classItem.id}
                  variant={selectedClass?.id === classItem.id ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => handleSelectClass(classItem)}
                >
                  {classItem.name}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="flex-1">
          <CardHeader className="flex flex-col md:flex-row justify-between md:items-center space-y-2 md:space-y-0">
            <CardTitle>
              {selectedClass 
                ? `Présence - ${selectedClass.name}` 
                : "Sélectionnez une classe"}
            </CardTitle>
            
            {selectedClass && (
              <div className="flex items-center space-x-2">
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleMarkAllPresent}
                >
                  <Check className="h-4 w-4 mr-2" />
                  Tous présents
                </Button>
              </div>
            )}
          </CardHeader>
          <CardContent>
            {selectedClass ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <Card className="bg-e-school-green-50">
                    <CardContent className="p-4 flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Présents</p>
                        <p className="text-2xl font-bold text-e-school-green-700">{attendanceStats.present}</p>
                      </div>
                      <Check className="h-8 w-8 text-e-school-green-500" />
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-red-50">
                    <CardContent className="p-4 flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Absents</p>
                        <p className="text-2xl font-bold text-red-700">{attendanceStats.absent}</p>
                      </div>
                      <X className="h-8 w-8 text-red-500" />
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-amber-50">
                    <CardContent className="p-4 flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">En retard</p>
                        <p className="text-2xl font-bold text-amber-700">{attendanceStats.late}</p>
                      </div>
                      <Clock className="h-8 w-8 text-amber-500" />
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-slate-50">
                    <CardContent className="p-4 flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">En attente</p>
                        <p className="text-2xl font-bold text-slate-700">{attendanceStats.pending}</p>
                      </div>
                      <Users className="h-8 w-8 text-slate-500" />
                    </CardContent>
                  </Card>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher un élève..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1"
                  />
                </div>
                
                <div className="space-y-2">
                  {filteredStudents.map((student) => (
                    <div 
                      key={student.id} 
                      className={`p-3 border rounded-lg flex items-center justify-between ${
                        student.attendance === "present" ? "bg-e-school-green-50" :
                        student.attendance === "absent" ? "bg-red-50" :
                        student.attendance === "late" ? "bg-amber-50" : "bg-white"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={student.avatar} />
                          <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{student.name}</p>
                          {student.attendance !== "pending" && (
                            <Badge 
                              variant={
                                student.attendance === "present" ? "outline" :
                                student.attendance === "absent" ? "destructive" : "secondary"
                              }
                              className="mt-1"
                            >
                              {student.attendance === "present" ? "Présent" :
                               student.attendance === "absent" ? "Absent" : "En retard"}
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 bg-e-school-green-100 text-e-school-green-700 hover:bg-e-school-green-200 hover:text-e-school-green-800"
                          onClick={() => handleMarkAttendance(student.id, "present")}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 bg-red-100 text-red-700 hover:bg-red-200 hover:text-red-800"
                          onClick={() => handleMarkAttendance(student.id, "absent")}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 bg-amber-100 text-amber-700 hover:bg-amber-200 hover:text-amber-800"
                          onClick={() => handleMarkAttendance(student.id, "late")}
                        >
                          <Clock className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center p-8 text-muted-foreground">
                Veuillez sélectionner une classe pour faire l'appel
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Demo data
const demoClasses: Class[] = [
  {
    id: "class-1",
    name: "3ème A",
    students: [
      {
        id: "student-1",
        name: "Alexandre Martin",
        avatar: "https://ui-avatars.com/api/?name=Alexandre+Martin&background=3b82f6&color=fff",
        attendance: "pending"
      },
      {
        id: "student-2",
        name: "Sophie Dubois",
        avatar: "https://ui-avatars.com/api/?name=Sophie+Dubois&background=10b981&color=fff",
        attendance: "pending"
      },
      {
        id: "student-3",
        name: "Lucas Bernard",
        avatar: "https://ui-avatars.com/api/?name=Lucas+Bernard&background=f59e0b&color=fff",
        attendance: "pending"
      },
      {
        id: "student-4",
        name: "Emma Petit",
        avatar: "https://ui-avatars.com/api/?name=Emma+Petit&background=6366f1&color=fff",
        attendance: "pending"
      },
      {
        id: "student-5",
        name: "Nathan Durand",
        avatar: "https://ui-avatars.com/api/?name=Nathan+Durand&background=ec4899&color=fff",
        attendance: "pending"
      }
    ]
  },
  {
    id: "class-2",
    name: "4ème B",
    students: [
      {
        id: "student-6",
        name: "Camille Leroy",
        avatar: "https://ui-avatars.com/api/?name=Camille+Leroy&background=0ea5e9&color=fff",
        attendance: "pending"
      },
      {
        id: "student-7",
        name: "Thomas Moreau",
        avatar: "https://ui-avatars.com/api/?name=Thomas+Moreau&background=22c55e&color=fff",
        attendance: "pending"
      },
      {
        id: "student-8",
        name: "Chloé Simon",
        avatar: "https://ui-avatars.com/api/?name=Chloé+Simon&background=f97316&color=fff",
        attendance: "pending"
      },
      {
        id: "student-9",
        name: "Hugo Fournier",
        avatar: "https://ui-avatars.com/api/?name=Hugo+Fournier&background=8b5cf6&color=fff",
        attendance: "pending"
      }
    ]
  },
  {
    id: "class-3",
    name: "5ème C",
    students: [
      {
        id: "student-10",
        name: "Léa Girard",
        avatar: "https://ui-avatars.com/api/?name=Léa+Girard&background=06b6d4&color=fff",
        attendance: "pending"
      },
      {
        id: "student-11",
        name: "Maxime Rousseau",
        avatar: "https://ui-avatars.com/api/?name=Maxime+Rousseau&background=84cc16&color=fff",
        attendance: "pending"
      },
      {
        id: "student-12",
        name: "Inès Gauthier",
        avatar: "https://ui-avatars.com/api/?name=Inès+Gauthier&background=facc15&color=fff",
        attendance: "pending"
      }
    ]
  }
];

export default AttendanceTracker;
