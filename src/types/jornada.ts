export interface Jornada {
  idPromotor: string;
  status: 'ativo' | 'inativo';
  inicio: number;
  fim: number;
}
