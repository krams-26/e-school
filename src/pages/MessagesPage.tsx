
import React from "react";
import Navbar from "@/components/layout/Navbar";
import MessageCenter from "@/components/messaging/MessageCenter";

const MessagesPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-1 container py-8">
        <h1 className="text-3xl font-bold mb-6">Messagerie</h1>
        <MessageCenter />
      </main>
    </div>
  );
};

export default MessagesPage;
