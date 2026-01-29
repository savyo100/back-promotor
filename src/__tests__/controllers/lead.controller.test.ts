import { LeadController } from '../../controllers/lead.controller';
import { mockRequest, mockResponse } from '../../test-utils/mockExpress';

jest.mock('../../services/lead.service', () => {
  return {
    LeadService: jest.fn().mockImplementation(() => ({
      createLead: jest.fn().mockResolvedValue({
        id: '1',
        nome: 'João',
        criadoEm: Date.now(),
      }),
      getLeadsByPromotor: jest.fn().mockResolvedValue([]),
    })),
  };
});

describe('LeadController', () => {
  const controller = new LeadController();

  it('deve criar lead', async () => {
    const req = mockRequest({
      user: { id: 'promotor-1' },
      body: { nome: 'João', telefone: '999', cpf: '000' },
    });
    const res = mockResponse();

    await controller.createLead(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
  });
});