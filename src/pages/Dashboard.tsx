
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/layout/Navbar";
import AdminDashboard from "@/components/dashboard/AdminDashboard";
import TeacherDashboard from "@/components/dashboard/TeacherDashboard";
import StudentDashboard from "@/components/dashboard/StudentDashboard";
import ParentDashboard from "@/components/dashboard/ParentDashboard";

const Dashboard = () => {
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-1 container py-8">
        <h1 className="text-3xl font-bold mb-6">Bienvenue, {user?.name}</h1>
        
        {user?.role === "admin" && <AdminDashboard />}
        {user?.role === "teacher" && <TeacherDashboard />}
        {user?.role === "student" && <StudentDashboard />}
        {user?.role === "parent" && <ParentDashboard />}
      </main>
    </div>
  );
};

export default Dashboard;
