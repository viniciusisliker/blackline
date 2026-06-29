export const HUB_NAV_ITEMS = [
  { to: '/dashboard', label: 'Painel', icon: 'dashboard' },
  { to: '/produtos', label: 'Produtos', icon: 'inventory' },
  { to: '/clientes', label: 'Clientes', icon: 'groups' },
  { to: '/agenda', label: 'Agenda', icon: 'calendar_month' },
  { to: '/configuracoes', label: 'Configurações', icon: 'settings' },
] as const;

export type HubNavIcon = (typeof HUB_NAV_ITEMS)[number]['icon'];
