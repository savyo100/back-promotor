export interface DashboardData {
  totalLeads: number;          // Total de leads (Geral)
  totalPromotores: number;     // Total de promotores cadastrados
  promotoresAtivos: number;    // Promotores com status 'ativo'
  totalLeadsHoje: number;      // Estatística de hoje (bom manter para o dashboard)
  estatisticasGerais: {        // Atende ao item "Estatísticas gerais"
    leadsPorStatus: Record<string, number>;
  };
}