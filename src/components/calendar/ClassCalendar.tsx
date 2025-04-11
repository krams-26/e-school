
import React, { useState } from "react";
import { Calendar, Clock, Users, MapPin, CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

interface Event {
  id: string;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  location: string;
  type: "class" | "exam" | "meeting" | "activity";
  for?: string[];
}

const ClassCalendar: React.FC = () => {
  const [currentView, setCurrentView] = useState<"weekly" | "daily">("weekly");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  
  // Generate dates for the current week
  const weekDates = getWeekDates(currentDate);
  
  // Get the events for the selected filter
  const filteredEvents = selectedFilter === "all" 
    ? demoEvents
    : demoEvents.filter(event => 
        !event.for || event.for.includes(selectedFilter)
      );
  
  // Navigate to previous/next week
  const goToPreviousWeek = () => {
    const prevWeek = new Date(currentDate);
    prevWeek.setDate(prevWeek.getDate() - 7);
    setCurrentDate(prevWeek);
  };
  
  const goToNextWeek = () => {
    const nextWeek = new Date(currentDate);
    nextWeek.setDate(nextWeek.getDate() + 7);
    setCurrentDate(nextWeek);
  };
  
  // Get events for a specific date
  const getEventsForDate = (date: Date) => {
    const dateStr = date.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
    return filteredEvents.filter(event => event.date === dateStr);
  };
  
  // Get the color for an event type
  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "class": return "bg-e-school-100 text-e-school-800 border-e-school-300";
      case "exam": return "bg-red-100 text-red-800 border-red-300";
      case "meeting": return "bg-amber-100 text-amber-800 border-amber-300";
      case "activity": return "bg-e-school-green-100 text-e-school-green-800 border-e-school-green-300";
      default: return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };
  
  // Get the icon for an event type
  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case "class": return <Book className="h-4 w-4" />;
      case "exam": return <FileText className="h-4 w-4" />;
      case "meeting": return <Users className="h-4 w-4" />;
      case "activity": return <Activity className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };
  
  // Format time
  const formatTime = (time: string) => {
    return time;
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-col md:flex-row justify-between md:items-center space-y-2 md:space-y-0">
          <CardTitle className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-muted-foreground" />
            Calendrier des cours
          </CardTitle>
          
          <div className="flex items-center space-x-2">
            <Tabs value={currentView} onValueChange={(v) => setCurrentView(v as "weekly" | "daily")}>
              <TabsList>
                <TabsTrigger value="weekly">Semaine</TabsTrigger>
                <TabsTrigger value="daily">Jour</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <Select
              value={selectedFilter}
              onValueChange={setSelectedFilter}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Tous les événements" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les événements</SelectItem>
                <SelectItem value="3ème A">3ème A</SelectItem>
                <SelectItem value="4ème B">4ème B</SelectItem>
                <SelectItem value="5ème C">5ème C</SelectItem>
                <SelectItem value="teachers">Enseignants</SelectItem>
                <SelectItem value="parents">Parents</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Button variant="ghost" size="icon" onClick={goToPreviousWeek}>
                <ChevronLeft className="h-5 w-5" />
              </Button>
              
              <h3 className="text-lg font-medium">
                {currentDate.toLocaleDateString('fr-FR', { 
                  day: 'numeric', 
                  month: 'long', 
                  year: 'numeric'
                })}
              </h3>
              
              <Button variant="ghost" size="icon" onClick={goToNextWeek}>
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
            
            <TabsContent value="weekly" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {weekDates.map((date, index) => (
                  <div key={index} className="space-y-3">
                    <div className={`text-center p-2 rounded-t-lg font-medium ${
                      isToday(date) ? "bg-e-school-600 text-white" : "bg-muted"
                    }`}>
                      <p>{date.toLocaleDateString('fr-FR', { weekday: 'short' })}</p>
                      <p>{date.getDate()}</p>
                    </div>
                    
                    <div className="space-y-2">
                      {getEventsForDate(date).map((event) => (
                        <div
                          key={event.id}
                          className={`p-2 rounded-lg border-l-4 ${getEventTypeColor(event.type)}`}
                        >
                          <p className="font-medium text-sm">{event.title}</p>
                          <div className="flex items-center text-xs text-muted-foreground mt-1">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>{formatTime(event.startTime)} - {formatTime(event.endTime)}</span>
                          </div>
                          <div className="flex items-center text-xs text-muted-foreground mt-1">
                            <MapPin className="h-3 w-3 mr-1" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                      ))}
                      
                      {getEventsForDate(date).length === 0 && (
                        <div className="text-center p-3 text-muted-foreground text-sm">
                          Aucun événement
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="daily" className="mt-0">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className={`text-lg font-medium py-2 px-4 rounded-lg ${
                    isToday(currentDate) ? "bg-e-school-100 text-e-school-800" : ""
                  }`}>
                    {currentDate.toLocaleDateString('fr-FR', { 
                      weekday: 'long', 
                      day: 'numeric', 
                      month: 'long'
                    })}
                  </h3>
                </div>
                
                <div className="space-y-4">
                  {getEventsForDate(currentDate).map((event) => (
                    <Card key={event.id} className="overflow-hidden">
                      <div className={`h-1 ${
                        event.type === "class" ? "bg-e-school-500" :
                        event.type === "exam" ? "bg-red-500" :
                        event.type === "meeting" ? "bg-amber-500" :
                        "bg-e-school-green-500"
                      }`} />
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{event.title}</h4>
                            {event.description && (
                              <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                            )}
                          </div>
                          <Badge variant="outline" className={getEventTypeColor(event.type)}>
                            {event.type === "class" ? "Cours" :
                             event.type === "exam" ? "Examen" :
                             event.type === "meeting" ? "Réunion" :
                             "Activité"}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mt-4">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{formatTime(event.startTime)} - {formatTime(event.endTime)}</span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                        
                        {event.for && (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {event.for.map((item, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {item}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                  
                  {getEventsForDate(currentDate).length === 0 && (
                    <div className="text-center p-8 text-muted-foreground">
                      Aucun événement prévu ce jour
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Helper functions
function getWeekDates(date: Date) {
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
  
  const monday = new Date(date);
  monday.setDate(diff);
  
  const weekDates = [];
  for (let i = 0; i < 5; i++) { // Monday to Friday
    const currentDate = new Date(monday);
    currentDate.setDate(monday.getDate() + i);
    weekDates.push(currentDate);
  }
  
  return weekDates;
}

function isToday(date: Date) {
  const today = new Date();
  return date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();
}

// Import the necessary icons
const Book = Calendar;
const FileText = Calendar;
const Activity = Calendar;

// Demo data
const demoEvents: (Event & { date: string })[] = [
  {
    id: "event-1",
    title: "Mathématiques",
    startTime: "08:00",
    endTime: "09:00",
    location: "Salle 102",
    type: "class",
    date: "lundi 11 avril",
    for: ["3ème A"]
  },
  {
    id: "event-2",
    title: "Français",
    startTime: "09:00",
    endTime: "10:00",
    location: "Salle 105",
    type: "class",
    date: "lundi 11 avril",
    for: ["3ème A"]
  },
  {
    id: "event-3",
    title: "Examen de Sciences",
    description: "Chapitres 5 à 8",
    startTime: "14:00",
    endTime: "16:00",
    location: "Salle 201",
    type: "exam",
    date: "mardi 12 avril",
    for: ["3ème A"]
  },
  {
    id: "event-4",
    title: "Réunion parents-professeurs",
    description: "Bilan du trimestre",
    startTime: "18:00",
    endTime: "20:00",
    location: "Amphithéâtre",
    type: "meeting",
    date: "jeudi 14 avril",
    for: ["teachers", "parents"]
  },
  {
    id: "event-5",
    title: "Sport",
    startTime: "10:00",
    endTime: "12:00",
    location: "Gymnase",
    type: "class",
    date: "mercredi 13 avril",
    for: ["4ème B"]
  },
  {
    id: "event-6",
    title: "Sortie au musée",
    description: "Visite guidée",
    startTime: "13:00",
    endTime: "17:00",
    location: "Musée d'Histoire",
    type: "activity",
    date: "vendredi 15 avril",
    for: ["5ème C"]
  }
];

export default ClassCalendar;
