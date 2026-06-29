export interface BlackLineProduct {
  id: string;
  name: string;
  category: string;
  warranty: string;
  highlight: string;
  features: string[];
}

export const BLACKLINE_PRODUCTS: BlackLineProduct[] = [
  {
    id: 'shield-glass',
    name: 'Shield GLASS',
    category: 'Sistemas de proteção',
    warranty: '7 anos',
    highlight: 'Reforço 20× no vidro',
    features: [
      'Proteção contra objetos cortantes',
      'Mantém integridade do vidro em impactos',
      'Shield Glass Plus: rejeição de calor',
    ],
  },
  {
    id: 'defense-glass',
    name: 'Defense GLASS',
    category: 'Sistemas de proteção',
    warranty: '10 anos',
    highlight: 'Reforço 30× · suporta 180 kg',
    features: [
      'Máxima resistência a impactos',
      'Defense Glass Plus: rejeição de calor',
      'Ideal para veículos premium',
    ],
  },
  {
    id: 'carbon-black',
    name: 'carbon BLACK',
    category: 'Películas térmicas',
    warranty: '7 anos',
    highlight: 'Alta performance térmica',
    features: [
      'Estabilidade de cor',
      'Conforto térmico superior',
      'Proteção UV',
    ],
  },
  {
    id: 'ceramic-black',
    name: 'Ceramic BLACK',
    category: 'Películas térmicas',
    warranty: '10 anos',
    highlight: 'Cerâmica de última geração',
    features: [
      'Máxima rejeição de calor',
      'Visibilidade noturna preservada',
      'Durabilidade prolongada',
    ],
  },
  {
    id: 'ps4',
    name: 'Ps4',
    category: 'Antivandalismo',
    warranty: '10 anos',
    highlight: 'Suporta impacto de 40 kg',
    features: ['Película de segurança', 'Proteção contra arrombamento'],
  },
  {
    id: 'ps8',
    name: 'Ps8',
    category: 'Antivandalismo',
    warranty: '10 anos',
    highlight: 'Suporta impacto de 65 kg',
    features: ['Máxima proteção antivandalismo', 'Testada em condições extremas'],
  },
  {
    id: 'ppf',
    name: 'PPF',
    category: 'Paint Protection Film',
    warranty: '10 anos',
    highlight: 'Proteção da pintura',
    features: [
      'Capô, para-choques, retrovisores, faróis',
      'Aplicação parcial ou veículo completo',
      'Auto-regeneração de micro-riscos',
    ],
  },
];

export const MOCK_CLIENTS = [
  { id: '1', nome: 'Rafael M.', veiculo: 'Porsche 911', servico: 'PPF Full + Ceramic BLACK', status: 'Em andamento' },
  { id: '2', nome: 'Camila S.', veiculo: 'BMW X5', servico: 'Defense GLASS + Ps8', status: 'Agendado' },
  { id: '3', nome: 'Eduardo L.', veiculo: 'Mercedes AMG GT', servico: 'Shield GLASS', status: 'Concluído' },
  { id: '4', nome: 'Patricia R.', veiculo: 'Audi RS6', servico: 'carbon BLACK + PPF capô', status: 'Em andamento' },
];
