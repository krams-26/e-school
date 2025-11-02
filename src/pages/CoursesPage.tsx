import React from "react";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock } from "lucide-react";
import api from "@/lib/api";

const CoursesPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const response = await api.get("/classes");
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-1 container py-8">
          <div className="text-center">Chargement...</div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 container py-8">
        <h1 className="text-3xl font-bold mb-6">Mes Cours</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data?.classes?.map((classItem: any) => (
            <Card key={classItem.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  {classItem.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {classItem.description && (
                  <p className="text-sm text-muted-foreground mb-4">
                    {classItem.description}
                  </p>
                )}
                {classItem.teacher_name && (
                  <div className="space-y-2">
                    <p className="text-sm">
                      <span className="font-medium">Enseignant:</span> {classItem.teacher_name}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default CoursesPage;

