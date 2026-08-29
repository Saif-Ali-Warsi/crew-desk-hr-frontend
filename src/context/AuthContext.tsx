import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { User } from "../types/auth";
import { getAccessToken, removeAccessToken } from "../utils/authStorage";
import { getMe } from "../api/auth";

import i18n from "../i18n";
import { applyLanguage } from "../utils/language";

interface AuthContextValue {
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getAccessToken();

    if (!token) {
      setLoading(false);
      return;
    }

    getMe()
      .then((result) => {
        if (result.success) {
          setUser(result.data);
        }
      })
      .catch((error) => {
        console.error("Failed to restore authentication:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!user) {
      // Reset language and direction after logout
      i18n.changeLanguage("EN");
      applyLanguage("EN");
      document.documentElement.dir = "ltr";

      return;
    }

    // Apply user's saved language and direction
    i18n.changeLanguage(user.language);
    applyLanguage(user.language);

    document.documentElement.dir = user.direction?.toLowerCase() || "ltr";
  }, [user]);

  const logout = () => {
    removeAccessToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
