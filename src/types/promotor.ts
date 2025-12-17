export interface Promotor {
  id: string;
  nome: string;
  telefone: string;
  email: string;
  statusJornada: 'ativo' | 'inativo';
  ultimaLocalizacao?: {
    lat: number;
    lng: number;
    timestamp: number;
  };
  criadoEm: number;
}
