
import React from "react";
import Navbar from "@/components/layout/Navbar";
import AttendanceTracker from "@/components/attendance/AttendanceTracker";

const AttendancePage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-1 container py-8">
        <h1 className="text-3xl font-bold mb-6">Gestion des présences</h1>
        <AttendanceTracker />
      </main>
    </div>
  );
};

export default AttendancePage;
