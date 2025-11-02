
import React, { useState } from "react";
import { Bell } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  message: string;
  time: string;
  read: boolean;
  type: "info" | "warning" | "success";
}

const demoNotifications: Notification[] = [
  {
    id: "1",
    message: "Nouveau devoir d'Anglais à rendre",
    time: "Il y a 5 min",
    read: false,
    type: "info",
  },
  {
    id: "2",
    message: "Cours de Mathématiques annulé demain",
    time: "Il y a 1 heure",
    read: false,
    type: "warning",
  },
  {
    id: "3",
    message: "Félicitations pour votre note en Sciences!",
    time: "Hier",
    read: true,
    type: "success",
  },
];

const NotificationBell: React.FC = () => {
  const [notifications, setNotifications] = useState(demoNotifications);
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };
  
  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <div className="relative p-2">
          <Bell size={24} />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0"
            >
              {unreadCount}
            </Badge>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex justify-between items-center">
          <span>Notifications</span>
          {unreadCount > 0 && (
            <button 
              onClick={markAllAsRead}
              className="text-xs text-e-school-600 hover:text-e-school-800"
            >
              Tout marquer comme lu
            </button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.length > 0 ? (
          <>
            {notifications.map((notification) => (
              <DropdownMenuItem 
                key={notification.id} 
                onClick={() => markAsRead(notification.id)}
                className={cn(
                  "p-3 flex flex-col items-start cursor-pointer",
                  !notification.read && "bg-e-school-50"
                )}
              >
                <div className="flex justify-between w-full">
                  <span className={cn(
                    "text-sm font-medium", 
                    notification.type === "warning" && "text-amber-600",
                    notification.type === "success" && "text-e-school-green-600"
                  )}>
                    {notification.message}
                  </span>
                  {!notification.read && (
                    <span className="h-2 w-2 rounded-full bg-e-school-500"></span>
                  )}
                </div>
                <span className="text-xs text-slate-500 mt-1">{notification.time}</span>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center text-sm text-e-school-600">
              Voir toutes les notifications
            </DropdownMenuItem>
          </>
        ) : (
          <div className="p-4 text-center text-muted-foreground">
            Pas de notifications
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationBell;
