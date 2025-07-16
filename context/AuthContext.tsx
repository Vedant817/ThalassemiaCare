import { router, useSegments } from 'expo-router';
import React, { createContext, useContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';

const API_URL = process.env.EXPO_PUBLIC_API_URL;
const TOKEN_KEY = '5ad568770261481479d095153620edb5';

interface AuthContextType {
  signIn: (data: any) => Promise<void>;
  signOut: () => void;
  signUp: (data: any) => Promise<void>;
  user: any;
  isLoading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const segments = useSegments();

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY!);
      if (token) {
        // Here you might want to verify the token with your backend
        // For simplicity, we'll just assume the token is valid
        // and decode it to get user info if needed.
        // For now, we'll just set a placeholder user.
        setUser({ token }); // In a real app, fetch user profile here
      }
      setIsLoading(false);
    };

    loadToken();
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === 'sign';

    if (user && inAuthGroup) {
      router.replace('/home' as any);
    } else if (!user && segments[0] !== 'sign') {
      router.replace('/sign');
    }
  }, [user, segments, isLoading]);

  const handleAuth = async (endpoint: 'signin' | 'signup', data: any) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/auth/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Authentication failed');
      }

      const { token, data: { user: userData } } = result;

      await SecureStore.setItemAsync(TOKEN_KEY!, token);
      setUser(userData);
      router.replace('/home' as any);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const authContextValue: AuthContextType = {
    signIn: (data) => handleAuth('signin', data),
    signUp: (data) => handleAuth('signup', data),
    signOut: async () => {
      await SecureStore.deleteItemAsync(TOKEN_KEY!);
      setUser(null);
      router.replace('/sign');
    },
    user,
    isLoading,
    error,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}
