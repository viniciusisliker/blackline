export interface HubClient {
  id: string;
  nome: string;
  telefone: string;
  veiculo: string;
  placa: string;
  servico: string;
  status: 'Agendado' | 'Em andamento' | 'Concluído';
  garantiaAte?: string;
}

export interface HubAppointment {
  id: string;
  clienteId: string;
  clienteNome: string;
  veiculo: string;
  servico: string;
  data: string;
  hora: string;
  status: 'Agendado' | 'Confirmado' | 'Concluído' | 'Cancelado';
}

export interface PortalWarranty {
  placa: string;
  cliente: string;
  veiculo: string;
  servico: string;
  garantiaAte: string;
  status: 'Ativa' | 'Expirada';
}

const CLIENTS_KEY = 'blackline-hub-clients';
const AGENDA_KEY = 'blackline-hub-agenda';
const PORTAL_KEY = 'blackline-portal-warranties';

const SEED_CLIENTS: HubClient[] = [
  {
    id: '1',
    nome: 'Rafael M.',
    telefone: '(11) 98765-4321',
    veiculo: 'Porsche 911',
    placa: 'ABC1D23',
    servico: 'PPF Full + Ceramic BLACK',
    status: 'Em andamento',
    garantiaAte: '2036-03-15',
  },
  {
    id: '2',
    nome: 'Camila S.',
    telefone: '(11) 97654-3210',
    veiculo: 'BMW X5',
    placa: 'FGH4I56',
    servico: 'Defense GLASS + Ps8',
    status: 'Agendado',
    garantiaAte: '2036-06-01',
  },
  {
    id: '3',
    nome: 'Eduardo L.',
    telefone: '(11) 96543-2109',
    veiculo: 'Mercedes AMG GT',
    placa: 'JKL7M89',
    servico: 'Shield GLASS',
    status: 'Concluído',
    garantiaAte: '2033-11-20',
  },
];

const SEED_AGENDA: HubAppointment[] = [
  {
    id: 'a1',
    clienteId: '2',
    clienteNome: 'Camila S.',
    veiculo: 'BMW X5',
    servico: 'Defense GLASS + Ps8',
    data: '2026-07-05',
    hora: '09:00',
    status: 'Agendado',
  },
  {
    id: 'a2',
    clienteId: '1',
    clienteNome: 'Rafael M.',
    veiculo: 'Porsche 911',
    servico: 'PPF Full',
    data: '2026-07-08',
    hora: '14:00',
    status: 'Confirmado',
  },
];

const SEED_PORTAL: PortalWarranty[] = [
  {
    placa: 'ABC1D23',
    cliente: 'Rafael M.',
    veiculo: 'Porsche 911',
    servico: 'PPF + Ceramic BLACK',
    garantiaAte: '2036-03-15',
    status: 'Ativa',
  },
  {
    placa: 'JKL7M89',
    cliente: 'Eduardo L.',
    veiculo: 'Mercedes AMG GT',
    servico: 'Shield GLASS',
    garantiaAte: '2033-11-20',
    status: 'Ativa',
  },
];

function read<T>(key: string, seed: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return seed;
    return JSON.parse(raw) as T;
  } catch {
    return seed;
  }
}

function write<T>(key: string, data: T) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function getClients(): HubClient[] {
  return read(CLIENTS_KEY, SEED_CLIENTS);
}

export function saveClients(clients: HubClient[]) {
  write(CLIENTS_KEY, clients);
}

export function getAgenda(): HubAppointment[] {
  return read(AGENDA_KEY, SEED_AGENDA);
}

export function saveAgenda(items: HubAppointment[]) {
  write(AGENDA_KEY, items);
}

export function getPortalWarranties(): PortalWarranty[] {
  return read(PORTAL_KEY, SEED_PORTAL);
}

export function findWarrantyByPlaca(placa: string): PortalWarranty | undefined {
  const norm = placa.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
  return getPortalWarranties().find(
    (w) => w.placa.replace(/[^a-zA-Z0-9]/g, '').toUpperCase() === norm,
  );
}
