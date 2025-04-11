
import React, { useState } from "react";
import { Star, Trophy, Award, Search, Plus, Minus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

interface Student {
  id: string;
  name: string;
  avatar?: string;
  class: string;
  points: number;
  level: string;
  progress: number;
  badges: string[];
}

const PointsSystem: React.FC = () => {
  const [students, setStudents] = useState<Student[]>(demoStudents);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState<string>("all");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [pointsToAdd, setPointsToAdd] = useState<number>(5);
  const { toast } = useToast();
  
  const filteredStudents = students.filter(student => 
    (selectedClass === "all" || student.class === selectedClass) &&
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleSelectStudent = (student: Student) => {
    setSelectedStudent(student);
  };
  
  const handleAddPoints = (studentId: string, points: number) => {
    const updatedStudents = students.map(student => {
      if (student.id === studentId) {
        const newPoints = student.points + points;
        const newProgress = (newPoints % 100);
        const newLevel = determineLevel(newPoints);
        
        return {
          ...student,
          points: newPoints,
          progress: newProgress,
          level: newLevel
        };
      }
      return student;
    });
    
    setStudents(updatedStudents);
    
    const student = students.find(s => s.id === studentId);
    if (student) {
      const action = points > 0 ? 'ajoutés à' : 'retirés de';
      toast({
        description: `${Math.abs(points)} points ${action} ${student.name}`,
      });
    }
    
    // Update selected student if it's the one we just modified
    if (selectedStudent?.id === studentId) {
      setSelectedStudent(updatedStudents.find(s => s.id === studentId) || null);
    }
  };
  
  const determineLevel = (points: number) => {
    if (points < 100) return "Débutant";
    if (points < 250) return "Intermédiaire";
    if (points < 500) return "Avancé";
    if (points < 1000) return "Expert";
    return "Maître";
  };
  
  const getLevelColor = (level: string) => {
    switch (level) {
      case "Débutant": return "bg-e-school-100 text-e-school-800";
      case "Intermédiaire": return "bg-blue-100 text-blue-800";
      case "Avancé": return "bg-e-school-green-100 text-e-school-green-800";
      case "Expert": return "bg-purple-100 text-purple-800";
      case "Maître": return "bg-amber-100 text-amber-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };
  
  const getBadgeIcon = (badge: string) => {
    switch (badge) {
      case "Assiduité": return <Star className="h-4 w-4" />;
      case "Excellence": return <Trophy className="h-4 w-4" />;
      case "Participation": return <Award className="h-4 w-4" />;
      default: return <Star className="h-4 w-4" />;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-amber-500" />
                Système de Points
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex items-center space-x-2 flex-1">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher un élève..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1"
                  />
                </div>
                
                <Select
                  value={selectedClass}
                  onValueChange={setSelectedClass}
                >
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Toutes les classes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les classes</SelectItem>
                    <SelectItem value="3ème A">3ème A</SelectItem>
                    <SelectItem value="4ème B">4ème B</SelectItem>
                    <SelectItem value="5ème C">5ème C</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                {filteredStudents.map((student) => (
                  <div 
                    key={student.id} 
                    className={`p-4 border rounded-lg flex items-center justify-between cursor-pointer hover:bg-muted/50 ${
                      selectedStudent?.id === student.id ? "bg-muted" : ""
                    }`}
                    onClick={() => handleSelectStudent(student)}
                  >
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={student.avatar} />
                        <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-xs text-muted-foreground">{student.class}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="font-bold text-e-school-600">{student.points} pts</p>
                        <Badge variant="outline" className={getLevelColor(student.level)}>
                          {student.level}
                        </Badge>
                      </div>
                      
                      <div className="flex space-x-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 bg-e-school-green-100 text-e-school-green-700 hover:bg-e-school-green-200"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddPoints(student.id, 5);
                          }}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 bg-red-100 text-red-700 hover:bg-red-200"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddPoints(student.id, -5);
                          }}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                
                {filteredStudents.length === 0 && (
                  <div className="text-center p-8 text-muted-foreground">
                    Aucun élève trouvé
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        
        {selectedStudent && (
          <Card className="flex-1 md:max-w-xs">
            <CardHeader>
              <CardTitle>Profil de l'élève</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex flex-col items-center space-y-3">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={selectedStudent.avatar} />
                    <AvatarFallback>{selectedStudent.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <p className="font-bold text-lg">{selectedStudent.name}</p>
                    <p className="text-sm text-muted-foreground">{selectedStudent.class}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <p className="font-medium">Points</p>
                    <p className="font-bold text-e-school-600">{selectedStudent.points}</p>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Niveau: {selectedStudent.level}</span>
                      <span className="text-muted-foreground">
                        {selectedStudent.progress}% vers le prochain niveau
                      </span>
                    </div>
                    <Progress value={selectedStudent.progress} className="h-2" />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <p className="font-medium">Badges</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedStudent.badges.map((badge, index) => (
                      <Badge key={index} variant="outline" className="flex items-center gap-1 px-3 py-1">
                        {getBadgeIcon(badge)}
                        {badge}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <p className="font-medium">Ajouter/Retirer des points</p>
                  <div className="flex space-x-2">
                    <Select
                      value={pointsToAdd.toString()}
                      onValueChange={(value) => setPointsToAdd(parseInt(value))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Points" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 point</SelectItem>
                        <SelectItem value="5">5 points</SelectItem>
                        <SelectItem value="10">10 points</SelectItem>
                        <SelectItem value="25">25 points</SelectItem>
                        <SelectItem value="50">50 points</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Button 
                      variant="default"
                      onClick={() => handleAddPoints(selectedStudent.id, pointsToAdd)}
                      className="flex items-center gap-1"
                    >
                      <Plus className="h-4 w-4" />
                      Ajouter
                    </Button>
                    
                    <Button 
                      variant="outline"
                      onClick={() => handleAddPoints(selectedStudent.id, -pointsToAdd)}
                      className="flex items-center gap-1"
                    >
                      <Minus className="h-4 w-4" />
                      Retirer
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

// Demo data
const demoStudents: Student[] = [
  {
    id: "student-1",
    name: "Alexandre Martin",
    avatar: "https://ui-avatars.com/api/?name=Alexandre+Martin&background=3b82f6&color=fff",
    class: "3ème A",
    points: 175,
    level: "Intermédiaire",
    progress: 75,
    badges: ["Assiduité", "Participation"]
  },
  {
    id: "student-2",
    name: "Sophie Dubois",
    avatar: "https://ui-avatars.com/api/?name=Sophie+Dubois&background=10b981&color=fff",
    class: "3ème A",
    points: 320,
    level: "Avancé",
    progress: 20,
    badges: ["Excellence", "Assiduité", "Participation"]
  },
  {
    id: "student-3",
    name: "Lucas Bernard",
    avatar: "https://ui-avatars.com/api/?name=Lucas+Bernard&background=f59e0b&color=fff",
    class: "3ème A",
    points: 90,
    level: "Débutant",
    progress: 90,
    badges: ["Participation"]
  },
  {
    id: "student-4",
    name: "Emma Petit",
    avatar: "https://ui-avatars.com/api/?name=Emma+Petit&background=6366f1&color=fff",
    class: "4ème B",
    points: 210,
    level: "Intermédiaire",
    progress: 10,
    badges: ["Assiduité", "Excellence"]
  },
  {
    id: "student-5",
    name: "Nathan Durand",
    avatar: "https://ui-avatars.com/api/?name=Nathan+Durand&background=ec4899&color=fff",
    class: "4ème B",
    points: 45,
    level: "Débutant",
    progress: 45,
    badges: []
  },
  {
    id: "student-6",
    name: "Léa Girard",
    avatar: "https://ui-avatars.com/api/?name=Léa+Girard&background=06b6d4&color=fff",
    class: "5ème C",
    points: 420,
    level: "Avancé",
    progress: 70,
    badges: ["Excellence", "Assiduité", "Participation"]
  }
];

export default PointsSystem;
