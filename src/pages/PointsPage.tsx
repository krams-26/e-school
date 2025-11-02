
import React from "react";
import Navbar from "@/components/layout/Navbar";
import PointsSystem from "@/components/rewards/PointsSystem";

const PointsPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-1 container py-8">
        <h1 className="text-3xl font-bold mb-6">Système de points</h1>
        <PointsSystem />
      </main>
    </div>
  );
};

export default PointsPage;
