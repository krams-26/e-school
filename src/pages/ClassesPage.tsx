import React from "react";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";
import api from "@/lib/api";

const ClassesPage = () => {
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
        <h1 className="text-3xl font-bold mb-6">Mes Classes</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.classes?.map((classItem: any) => (
            <Card key={classItem.id}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{classItem.name}</span>
                  <Badge variant="secondary">
                    {classItem.students?.length || 0} élèves
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {classItem.description && (
                  <p className="text-sm text-muted-foreground mb-4">
                    {classItem.description}
                  </p>
                )}
                {classItem.teacher_name && (
                  <p className="text-sm mb-4">
                    Enseignant: <span className="font-medium">{classItem.teacher_name}</span>
                  </p>
                )}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>{classItem.students?.length || 0} élèves inscrits</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ClassesPage;

