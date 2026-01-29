import SupervisorService from '../../services/supervisor.service';

jest.mock('../../repositories/SupabaseUserRepository', () => ({
  SupabaseRepository: {
    supervisores: {
      getAll: jest.fn().mockResolvedValue([]),
      getById: jest.fn().mockResolvedValue({ id: '1', nome: 'Supervisor' }),
      create: jest.fn().mockResolvedValue({ id: '1' }),
      update: jest.fn().mockResolvedValue({ id: '1' }),
      delete: jest.fn(),
    },
    dashboard: {
      getDashboardData: jest.fn().mockResolvedValue({}),
    },
  },
}));

describe('SupervisorService', () => {
  const service = new SupervisorService();

  it('deve buscar supervisores', async () => {
    console.log('🟡 getAllSupervisors');

    const result = await service.getAllSupervisors();

    expect(Array.isArray(result)).toBe(true);
  });

  it('deve buscar dados do dashboard', async () => {
    console.log('🟡 getDashboardData');

    const result = await service.getDashboardData();

    // ✅ Teste correto para tipo DashboardData desconhecido
    expect(result).toBeDefined();
    expect(typeof result).toBe('object');
  });
});