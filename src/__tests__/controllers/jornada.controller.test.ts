import { JornadaController } from '../../controllers/jornada.controller';
import { mockRequest, mockResponse } from '../../test-utils/mockExpress';

jest.mock('../../services/jornada.service', () => {
  return {
    JornadaService: jest.fn().mockImplementation(() => ({
      registrarPonto: jest.fn().mockResolvedValue({
        id: '1',
        inicio: new Date(),
      }),
      finalizarJornada: jest.fn().mockResolvedValue({
        id: '1',
        inicio: new Date(),
        fim: new Date(),
      }),
      status: jest.fn().mockResolvedValue(null),
    })),
  };
});

describe('JornadaController', () => {
  const controller = new JornadaController();

  it('deve registrar ponto', async () => {
    const req = mockRequest({
      user: { id: 'promotor-1' },
    });
    const res = mockResponse();

    await controller.registrarPonto(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
  });

  it('deve retornar erro se não autenticado', async () => {
    const req = mockRequest();
    const res = mockResponse();

    await controller.registrarPonto(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
  });
});