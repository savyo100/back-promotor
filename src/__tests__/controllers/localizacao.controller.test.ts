import { LocalizacaoController } from '../../controllers/localizacao.controller';
import { mockRequest, mockResponse } from '../../test-utils/mockExpress';

jest.mock('../../services/localizacao.service', () => ({
  LocalizacaoService: jest.fn().mockImplementation(() => ({
    registrarLocalizacao: jest.fn().mockResolvedValue({
      id: '1',
      registrado_em: new Date().toISOString(),
    }),
    getLastLocalizacaoByPromotor: jest.fn().mockResolvedValue(null),
    getLocalizacoesHistoricoByPromotor: jest.fn().mockResolvedValue([]),
  })),
}));

describe('LocalizacaoController', () => {
  const controller = new LocalizacaoController();

  it('deve registrar localização', async () => {
    const req = mockRequest({
      user: { id: 'p1' },
      body: { latitude: 1, longitude: 2 },
    });

    const res = mockResponse();

    await controller.registerLocation(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
  });
});