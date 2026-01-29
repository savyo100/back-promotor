import { SupervisorController } from '../../controllers/supervisor.controller';
import { mockRequest, mockResponse } from '../../test-utils/mockExpress';

jest.mock('../../services/supervisor.service', () => {
  return {
    __esModule: true,
    default: jest.fn().mockImplementation(() => ({
      getAllSupervisors: jest.fn().mockResolvedValue([]),
      getDashboardData: jest.fn().mockResolvedValue({ total: 10 }),
    })),
  };
});

describe('SupervisorController', () => {
  const controller = new SupervisorController();

  it('deve retornar dados do dashboard', async () => {
    const req = mockRequest();
    const res = mockResponse();

    await controller.getDashboardData(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });
});