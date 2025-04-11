
import React from "react";
import Navbar from "@/components/layout/Navbar";
import ClassCalendar from "@/components/calendar/ClassCalendar";

const CalendarPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-1 container py-8">
        <h1 className="text-3xl font-bold mb-6">Calendrier des cours</h1>
        <ClassCalendar />
      </main>
    </div>
  );
};

export default CalendarPage;
