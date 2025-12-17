export interface Lead {
  id: string;
  nome: string;
  telefone: string;
  cpf: string;
  criadoPor: string; // UID do promotor
  criadoEm: number;
}
