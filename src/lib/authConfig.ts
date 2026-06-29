export const HUB_CREDENTIALS = {
  user: import.meta.env.VITE_HUB_USER ?? 'equipe',
  password: import.meta.env.VITE_HUB_PASSWORD ?? 'blackline2026',
};

export const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID ?? '';

export function validateHubLogin(usuario: string, password: string): boolean {
  const u = usuario.trim().toLowerCase();
  const validUser = HUB_CREDENTIALS.user.toLowerCase();
  return u === validUser && password === HUB_CREDENTIALS.password;
}
