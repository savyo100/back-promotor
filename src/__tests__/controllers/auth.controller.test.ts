import { AuthController } from '../../controllers/auth.controller';
import { mockRequest, mockResponse } from '../../test-utils/mockExpress';

jest.mock('../../services/auth.service', () => {
  return {
    AuthService: jest.fn().mockImplementation(() => ({
      login: jest.fn().mockResolvedValue({ token: 'fake-token' }),
      logout: jest.fn().mockResolvedValue(undefined),
      me: jest.fn().mockResolvedValue({ id: '1', email: 'test@test.com' }),
    })),
  };
});

describe('AuthController', () => {
  const controller = new AuthController();

  it('deve fazer login com sucesso', async () => {
    const req = mockRequest({
      body: { email: 'test@test.com', password: '123456' },
    });
    const res = mockResponse();

    await controller.login(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ token: 'fake-token' });
  });

  it('deve retornar erro se faltar email ou senha', async () => {
    const req = mockRequest({ body: {} });
    const res = mockResponse();

    await controller.login(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });
});