
import React, { useState } from "react";
import { Search, Send, User, Users, UserPlus, MoreVertical, Phone, Video } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

interface Message {
  id: string;
  content: string;
  senderId: string;
  timestamp: string;
}

interface Conversation {
  id: string;
  participants: {
    id: string;
    name: string;
    avatar?: string;
    role: string;
  }[];
  lastMessage?: {
    content: string;
    timestamp: string;
  };
  messages: Message[];
  unread: number;
  isGroup?: boolean;
}

const MessageCenter: React.FC = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>(demoConversations);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messageInput, setMessageInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter conversations based on search query
  const filteredConversations = conversations.filter(conversation =>
    conversation.participants.some(participant =>
      participant.id !== user?.id && participant.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );
  
  // Handle sending a new message
  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedConversation || !user) return;
    
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      content: messageInput.trim(),
      senderId: user.id,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    const updatedConversations = conversations.map(conversation =>
      conversation.id === selectedConversation.id
        ? {
            ...conversation,
            messages: [...conversation.messages, newMessage],
            lastMessage: {
              content: messageInput.trim(),
              timestamp: new Date().toLocaleString('fr-FR', { 
                hour: '2-digit', 
                minute: '2-digit',
                day: '2-digit',
                month: '2-digit',
              }),
            },
          }
        : conversation
    );
    
    setConversations(updatedConversations);
    setMessageInput("");
    
    // Update selected conversation
    const updatedSelectedConversation = updatedConversations.find(c => c.id === selectedConversation.id) || null;
    setSelectedConversation(updatedSelectedConversation);
  };
  
  // Handle selecting a conversation
  const handleSelectConversation = (conversation: Conversation) => {
    // Mark conversation as read
    const updatedConversations = conversations.map(conv =>
      conv.id === conversation.id ? { ...conv, unread: 0 } : conv
    );
    
    setConversations(updatedConversations);
    setSelectedConversation(conversation);
  };
  
  // Get other participants in a conversation (excluding current user)
  const getOtherParticipants = (conversation: Conversation) => {
    return conversation.participants.filter(participant => participant.id !== user?.id);
  };
  
  // Get conversation title
  const getConversationTitle = (conversation: Conversation) => {
    const otherParticipants = getOtherParticipants(conversation);
    
    if (conversation.isGroup) {
      return conversation.title || `Groupe (${otherParticipants.length + 1})`;
    }
    
    return otherParticipants.length > 0 ? otherParticipants[0].name : "Conversation";
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-180px)] min-h-[500px]">
      <Card className="md:col-span-1 flex flex-col overflow-hidden">
        <div className="p-4 border-b">
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher une conversation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-2">
          {filteredConversations.map((conversation) => {
            const otherParticipants = getOtherParticipants(conversation);
            const mainParticipant = otherParticipants[0];
            
            return (
              <div
                key={conversation.id}
                className={cn(
                  "flex items-center space-x-3 p-3 rounded-lg cursor-pointer hover:bg-muted/50",
                  selectedConversation?.id === conversation.id ? "bg-muted" : ""
                )}
                onClick={() => handleSelectConversation(conversation)}
              >
                {conversation.isGroup ? (
                  <div className="relative flex -space-x-2">
                    {otherParticipants.slice(0, 2).map((participant, index) => (
                      <Avatar key={index} className="h-10 w-10 border-2 border-background">
                        <AvatarImage src={participant.avatar} />
                        <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    ))}
                    {otherParticipants.length > 2 && (
                      <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center border-2 border-background">
                        <span className="text-xs">+{otherParticipants.length - 2}</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={mainParticipant?.avatar} />
                    <AvatarFallback>{mainParticipant?.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                )}
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <p className="font-medium truncate">
                      {getConversationTitle(conversation)}
                    </p>
                    <span className="text-xs text-muted-foreground">
                      {conversation.lastMessage?.timestamp}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-muted-foreground truncate">
                      {conversation.lastMessage?.content}
                    </p>
                    {conversation.unread > 0 && (
                      <Badge variant="default" className="ml-2 h-5 w-5 flex items-center justify-center p-0">
                        {conversation.unread}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          
          {filteredConversations.length === 0 && (
            <div className="text-center p-8 text-muted-foreground">
              Aucune conversation trouvée
            </div>
          )}
        </div>
        
        <div className="p-4 border-t">
          <Button variant="default" className="w-full">
            <UserPlus className="h-4 w-4 mr-2" />
            Nouvelle conversation
          </Button>
        </div>
      </Card>
      
      <Card className="md:col-span-2 flex flex-col overflow-hidden">
        {selectedConversation ? (
          <>
            <div className="p-4 border-b flex justify-between items-center">
              <div className="flex items-center space-x-3">
                {selectedConversation.isGroup ? (
                  <div className="relative flex -space-x-2">
                    {getOtherParticipants(selectedConversation).slice(0, 2).map((participant, index) => (
                      <Avatar key={index} className="h-10 w-10 border-2 border-background">
                        <AvatarImage src={participant.avatar} />
                        <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                ) : (
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={getOtherParticipants(selectedConversation)[0]?.avatar} />
                    <AvatarFallback>{getOtherParticipants(selectedConversation)[0]?.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                )}
                
                <div>
                  <p className="font-medium">{getConversationTitle(selectedConversation)}</p>
                  <p className="text-xs text-muted-foreground">
                    {selectedConversation.isGroup 
                      ? `${selectedConversation.participants.length} participants`
                      : getOtherParticipants(selectedConversation)[0]?.role || ""}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon">
                  <Phone className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Video className="h-5 w-5" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Voir les informations</DropdownMenuItem>
                    <DropdownMenuItem>Rechercher</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">Supprimer la conversation</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {selectedConversation.messages.map((message) => {
                const isCurrentUser = message.senderId === user?.id;
                const sender = selectedConversation.participants.find(p => p.id === message.senderId);
                
                return (
                  <div
                    key={message.id}
                    className={cn(
                      "flex",
                      isCurrentUser ? "justify-end" : "justify-start"
                    )}
                  >
                    <div className="flex items-end space-x-2">
                      {!isCurrentUser && (
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={sender?.avatar} />
                          <AvatarFallback>{sender?.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      )}
                      
                      <div className={cn(
                        "max-w-[80%] px-4 py-2 rounded-lg",
                        isCurrentUser 
                          ? "bg-e-school-600 text-white rounded-br-none" 
                          : "bg-muted rounded-bl-none"
                      )}>
                        {selectedConversation.isGroup && !isCurrentUser && (
                          <p className="text-xs font-medium mb-1">{sender?.name}</p>
                        )}
                        <p>{message.content}</p>
                        <p className={cn(
                          "text-xs mt-1",
                          isCurrentUser ? "text-e-school-100" : "text-muted-foreground"
                        )}>
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="p-4 border-t">
              <div className="flex items-center space-x-2">
                <Input
                  placeholder="Saisissez votre message..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button 
                  variant="default"
                  onClick={handleSendMessage}
                  disabled={!messageInput.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <Users className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">Centre de messagerie</h3>
            <p className="text-muted-foreground mt-2">
              Sélectionnez une conversation pour commencer à discuter
            </p>
          </div>
        )}
      </Card>
    </div>
  );
};

// Demo data
const demoConversations: Conversation[] = [
  {
    id: "conv-1",
    participants: [
      {
        id: "teacher-1",
        name: "Marie Curie",
        avatar: "https://ui-avatars.com/api/?name=Marie+Curie&background=10b981&color=fff",
        role: "Enseignant"
      },
      {
        id: "parent-1",
        name: "Sophie Germain",
        avatar: "https://ui-avatars.com/api/?name=Sophie+Germain&background=f59e0b&color=fff",
        role: "Parent"
      }
    ],
    lastMessage: {
      content: "Bonjour, pouvons-nous discuter des progrès de votre enfant ?",
      timestamp: "11/04 10:30"
    },
    messages: [
      {
        id: "msg-1",
        content: "Bonjour Mme Germain, j'aimerais discuter des progrès de votre enfant en mathématiques.",
        senderId: "teacher-1",
        timestamp: "10:15"
      },
      {
        id: "msg-2",
        content: "Bonjour Mme Curie, bien sûr. Y a-t-il un problème ?",
        senderId: "parent-1",
        timestamp: "10:20"
      },
      {
        id: "msg-3",
        content: "Pas du tout ! En fait, il a fait d'excellents progrès ce trimestre.",
        senderId: "teacher-1",
        timestamp: "10:25"
      },
      {
        id: "msg-4",
        content: "Bonjour, pouvons-nous discuter des progrès de votre enfant ?",
        senderId: "teacher-1",
        timestamp: "10:30"
      }
    ],
    unread: 1
  },
  {
    id: "conv-2",
    participants: [
      {
        id: "admin-1",
        name: "Admin User",
        avatar: "https://ui-avatars.com/api/?name=Admin+User&background=3b82f6&color=fff",
        role: "Administrateur"
      },
      {
        id: "teacher-1",
        name: "Marie Curie",
        avatar: "https://ui-avatars.com/api/?name=Marie+Curie&background=10b981&color=fff",
        role: "Enseignant"
      }
    ],
    lastMessage: {
      content: "La réunion de demain est confirmée à 14h",
      timestamp: "10/04 15:45"
    },
    messages: [
      {
        id: "msg-5",
        content: "Bonjour, je voulais vous informer de la prochaine réunion pédagogique.",
        senderId: "admin-1",
        timestamp: "15:30"
      },
      {
        id: "msg-6",
        content: "Merci pour l'info. Quand aura-t-elle lieu ?",
        senderId: "teacher-1",
        timestamp: "15:35"
      },
      {
        id: "msg-7",
        content: "Elle est prévue pour demain à 14h dans la salle des professeurs.",
        senderId: "admin-1",
        timestamp: "15:40"
      },
      {
        id: "msg-8",
        content: "La réunion de demain est confirmée à 14h",
        senderId: "admin-1",
        timestamp: "15:45"
      }
    ],
    unread: 0
  },
  {
    id: "conv-3",
    participants: [
      {
        id: "teacher-1",
        name: "Marie Curie",
        avatar: "https://ui-avatars.com/api/?name=Marie+Curie&background=10b981&color=fff",
        role: "Enseignant"
      },
      {
        id: "student-1",
        name: "Albert Einstein",
        avatar: "https://ui-avatars.com/api/?name=Albert+Einstein&background=6366f1&color=fff",
        role: "Élève"
      }
    ],
    lastMessage: {
      content: "N'oubliez pas de rendre votre devoir pour demain",
      timestamp: "10/04 13:20"
    },
    messages: [
      {
        id: "msg-9",
        content: "Bonjour M. Einstein, avez-vous des questions sur le dernier cours ?",
        senderId: "teacher-1",
        timestamp: "13:10"
      },
      {
        id: "msg-10",
        content: "Oui, je n'ai pas bien compris la dernière partie sur les équations.",
        senderId: "student-1",
        timestamp: "13:15"
      },
      {
        id: "msg-11",
        content: "N'oubliez pas de rendre votre devoir pour demain",
        senderId: "teacher-1",
        timestamp: "13:20"
      }
    ],
    unread: 0
  },
  {
    id: "conv-4",
    title: "Réunion Pédagogique",
    participants: [
      {
        id: "admin-1",
        name: "Admin User",
        avatar: "https://ui-avatars.com/api/?name=Admin+User&background=3b82f6&color=fff",
        role: "Administrateur"
      },
      {
        id: "teacher-1",
        name: "Marie Curie",
        avatar: "https://ui-avatars.com/api/?name=Marie+Curie&background=10b981&color=fff",
        role: "Enseignant"
      },
      {
        id: "teacher-2",
        name: "Isaac Newton",
        avatar: "https://ui-avatars.com/api/?name=Isaac+Newton&background=ec4899&color=fff",
        role: "Enseignant"
      },
      {
        id: "teacher-3",
        name: "Ada Lovelace",
        avatar: "https://ui-avatars.com/api/?name=Ada+Lovelace&background=8b5cf6&color=fff",
        role: "Enseignant"
      }
    ],
    lastMessage: {
      content: "L'ordre du jour a été mis à jour, merci de le consulter",
      timestamp: "09/04 09:15"
    },
    messages: [
      {
        id: "msg-12",
        content: "Bonjour à tous, nous allons organiser une réunion pédagogique la semaine prochaine.",
        senderId: "admin-1",
        timestamp: "09:00"
      },
      {
        id: "msg-13",
        content: "Quel jour est envisagé ?",
        senderId: "teacher-3",
        timestamp: "09:05"
      },
      {
        id: "msg-14",
        content: "Le mardi 15 avril à 14h.",
        senderId: "admin-1",
        timestamp: "09:10"
      },
      {
        id: "msg-15",
        content: "L'ordre du jour a été mis à jour, merci de le consulter",
        senderId: "admin-1",
        timestamp: "09:15"
      }
    ],
    unread: 2,
    isGroup: true
  }
];

export default MessageCenter;
