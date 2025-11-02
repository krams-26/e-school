import React from "react";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Users, School, Calendar, TrendingUp } from "lucide-react";
import DashboardCard from "@/components/common/DashboardCard";
import api from "@/lib/api";

const StatsPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const response = await api.get("/stats");
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
        <h1 className="text-3xl font-bold mb-6">Statistiques</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <DashboardCard
            title="Élèves"
            icon={<Users size={20} />}
            variant="primary"
          >
            <div className="text-3xl font-bold">{data?.stats?.students || 0}</div>
          </DashboardCard>

          <DashboardCard
            title="Enseignants"
            icon={<School size={20} />}
            variant="secondary"
          >
            <div className="text-3xl font-bold">{data?.stats?.teachers || 0}</div>
          </DashboardCard>

          <DashboardCard
            title="Classes"
            icon={<Calendar size={20} />}
            variant="neutral"
          >
            <div className="text-3xl font-bold">{data?.stats?.classes || 0}</div>
          </DashboardCard>

          <DashboardCard
            title="Taux de présence"
            icon={<TrendingUp size={20} />}
            variant="primary"
          >
            <div className="text-3xl font-bold">
              {data?.stats?.attendanceToday?.rate || 0}%
            </div>
          </DashboardCard>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Présence par classe</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data?.attendanceByClass?.map((item: any, index: number) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{item.class_name}</span>
                      <span className="font-medium">{item.rate}%</span>
                    </div>
                    <Progress value={item.rate} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Détails de présence aujourd'hui</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Présents</span>
                    <span className="font-bold text-e-school-600">
                      {data?.stats?.attendanceToday?.present || 0}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Total</span>
                    <span className="font-bold">
                      {data?.stats?.attendanceToday?.total || 0}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default StatsPage;

