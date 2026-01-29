import { LocalizacaoService } from '../../services/localizacao.service';

jest.mock('../../repositories/SupabaseUserRepository', () => ({
  SupabaseRepository: {
    localizacao: {
      registrar: jest.fn().mockResolvedValue({
        id: '1',
        promotorId: 'p1',
        latitude: 1,
        longitude: 2,
        registrado_em: new Date().toISOString(),
      }),
      getByPromotor: jest.fn().mockResolvedValue([]),
      getById: jest.fn().mockResolvedValue({ id: '1' }),
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

describe('LocalizacaoService', () => {
  const service = new LocalizacaoService();

  it('deve registrar localização', async () => {
    console.log('🟡 registrarLocalizacao');

    const result = await service.registrarLocalizacao('p1', 1, 2);

    expect(result.promotorId).toBe('p1');
  });
});