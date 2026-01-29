import { JornadaService } from '../../services/jornada.service';

// 🔹 Mock COMPLETO do repositório usado pelo service
jest.mock('../../repositories/SupabaseUserRepository', () => ({
  SupabaseRepository: {
    jornada: {
      // 👇 Jornada ainda NÃO iniciada
      getJornadaAtiva: jest.fn().mockResolvedValue(null),

      // 👇 Registro do ponto
      registrarPonto: jest.fn().mockResolvedValue({
        id: 'jornada-1',
        inicio: new Date(),
      }),

      // (se existir no service)
      finalizarJornada: jest.fn(),
    },
  },
}));

describe('JornadaService', () => {
  const service = new JornadaService();

  it('deve registrar ponto quando não há jornada ativa', async () => {
    console.log('🟡 Iniciando teste: registrar ponto');

    const result = await service.registrarPonto('promotor-1');

    console.log('🟢 Resultado:', result);

    expect(result).toBeDefined();
    expect(result.id).toBe('jornada-1');
  });
});