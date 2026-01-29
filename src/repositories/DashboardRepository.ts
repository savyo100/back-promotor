import supabase from '../config/supabase';
import { DashboardData } from '../types/dashboard';

export const DashboardRepository = {
  async getDashboardData(): Promise<DashboardData> {
    // 1. Total de Leads (Geral)
    const { count: totalLeads } = await supabase
      .from('leads')
      .select('*', { count: 'exact', head: true });

    // 2. Total de Promotores
    const { count: totalPromotores } = await supabase
      .from('promotores')
      .select('*', { count: 'exact', head: true });

    // 3. Promotores Ativos
    const { count: promotoresAtivos } = await supabase
      .from('promotores')
      .select('*', { count: 'exact', head: true })
      .eq('statusJornada', 'ativo');

    // 4. Leads de Hoje
    const hojeInicio = new Date().setHours(0, 0, 0, 0);

    const { count: totalLeadsHoje } = await supabase
      .from('leads')
      .select('*', { count: 'exact', head: true })
      .gte('criadoEm', hojeInicio);

    return {
      totalLeads: totalLeads || 0,
      totalPromotores: totalPromotores || 0,
      promotoresAtivos: promotoresAtivos || 0,
      totalLeadsHoje: totalLeadsHoje || 0,
      estatisticasGerais: {
        leadsPorStatus: {},
      },
    };
  },
};
