import { LeadService } from '../../services/lead.service';

jest.mock('../../repositories/SupabaseUserRepository', () => ({
  SupabaseRepository: {
    leads: {
      create: jest.fn().mockResolvedValue({
        id: '1',
        nome: 'Teste',
        criadoEm: Date.now(),
      }),
    },
  },
}));

describe('LeadService', () => {
  const service = new LeadService();

  it('deve criar um lead', async () => {
    const lead = await service.createLead('promotor-1', {
      nome: 'Teste',
      telefone: '999',
      cpf: '000',
    });

    expect(lead.id).toBe('1');
  });
});