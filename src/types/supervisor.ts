export interface Supervisor {
  id: string; // auth.users.id
  nome: string;
  email: string;
  telefone: string;
  role: 'supervisor';
  criadoEm: number;
}
