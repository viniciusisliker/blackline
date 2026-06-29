import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { validateHubLogin } from '../lib/authConfig';

export interface MockProfile {
  nome: string;
  cargo: string;
  email: string;
}

interface AuthState {
  session: boolean;
  profile: MockProfile | null;
  loading: boolean;
  signIn: (usuario: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const STORAGE_KEY = 'blackline-hub-session';

const AuthContext = createContext<AuthState | null>(null);

function loadStoredProfile(): MockProfile | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as MockProfile;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<MockProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setProfile(loadStoredProfile());
    setLoading(false);
  }, []);

  const signIn = useCallback(async (usuario: string, password: string) => {
    if (!validateHubLogin(usuario, password)) {
      throw new Error('Usuário ou senha inválidos.');
    }
    const nome = usuario.trim() || 'Equipe BlackLine';
    const next: MockProfile = {
      nome,
      cargo: 'Operações',
      email: nome.includes('@') ? nome : `${nome.toLowerCase().replace(/\s+/g, '.')}@blackline.studio`,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setProfile(next);
  }, []);

  const signOut = useCallback(async () => {
    localStorage.removeItem(STORAGE_KEY);
    setProfile(null);
  }, []);

  const value = useMemo(
    () => ({
      session: Boolean(profile),
      profile,
      loading,
      signIn,
      signOut,
    }),
    [profile, loading, signIn, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
