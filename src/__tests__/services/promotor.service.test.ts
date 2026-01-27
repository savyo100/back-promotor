import { PromotorService } from '../../services/promotor.service';

jest.mock('../../repositories/SupabaseUserRepository', () => ({
  SupabaseRepository: {
    promotores: {
      getAll: jest.fn().mockResolvedValue([]),
      getById: jest.fn().mockResolvedValue({
        id: '1',
        nome: 'Promotor Teste',
        supervisorId: 'sup-1',
      }),
      getBySupervisorId: jest.fn().mockResolvedValue([]),
      create: jest.fn().mockResolvedValue({ id: '1' }),
      update: jest.fn(),
      updateLocalizacao: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

describe('PromotorService', () => {
  const service = new PromotorService();

  it('deve buscar todos os promotores', async () => {
    console.log('🟡 getAllPromotores');
    const result = await service.getAllPromotores();
    expect(Array.isArray(result)).toBe(true);
  });

  it('deve buscar promotor por ID', async () => {
    console.log('🟡 getPromotorById');
    const result = await service.getPromotorById('1');
    expect(result.id).toBe('1');
  });

  it('deve buscar promotores por supervisor', async () => {
    console.log('🟡 getPromotoresBySupervisor');
    const result = await service.getPromotoresBySupervisor('sup-1');
    expect(Array.isArray(result)).toBe(true);
  });
});