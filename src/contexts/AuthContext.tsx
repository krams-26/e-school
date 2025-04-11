
import React, { createContext, useContext, useState, useEffect } from "react";

export type UserRole = "admin" | "teacher" | "student" | "parent";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Sample users for demo
const DEMO_USERS: Record<string, User> = {
  "admin@eschool.com": {
    id: "admin-1",
    name: "Admin User",
    email: "admin@eschool.com",
    role: "admin",
    avatar: "https://ui-avatars.com/api/?name=Admin+User&background=3b82f6&color=fff"
  },
  "teacher@eschool.com": {
    id: "teacher-1",
    name: "Marie Curie",
    email: "teacher@eschool.com",
    role: "teacher",
    avatar: "https://ui-avatars.com/api/?name=Marie+Curie&background=10b981&color=fff"
  },
  "student@eschool.com": {
    id: "student-1",
    name: "Albert Einstein",
    email: "student@eschool.com",
    role: "student",
    avatar: "https://ui-avatars.com/api/?name=Albert+Einstein&background=6366f1&color=fff"
  },
  "parent@eschool.com": {
    id: "parent-1",
    name: "Sophie Germain",
    email: "parent@eschool.com",
    role: "parent",
    avatar: "https://ui-avatars.com/api/?name=Sophie+Germain&background=f59e0b&color=fff"
  }
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  logout: () => {}
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem('eschool_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // For demo, password validation is simple
    if (password !== "password") {
      throw new Error("Invalid credentials");
    }
    
    const user = DEMO_USERS[email];
    if (!user) {
      throw new Error("User not found");
    }
    
    // Store user in localStorage for persistence
    localStorage.setItem('eschool_user', JSON.stringify(user));
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem('eschool_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      isLoading,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};
