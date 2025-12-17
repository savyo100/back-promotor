export interface Supervisor {
  id: string; // UID do Firebase
  nome: string;
  email: string;
  telefone: string;
  role: 'supervisor';
  criadoEm: number;
}
