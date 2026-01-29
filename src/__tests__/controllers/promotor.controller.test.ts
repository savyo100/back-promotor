import { PromotorController } from '../../controllers/promotor.controller';
import { mockRequest, mockResponse } from '../../test-utils/mockExpress';

jest.mock('../../services/promotor.service', () => ({
  PromotorService: jest.fn().mockImplementation(() => ({
    getAllPromotores: jest.fn().mockResolvedValue([]),
    getPromotoresBySupervisor: jest.fn().mockResolvedValue([]),
    getPromotorById: jest.fn().mockResolvedValue({
      id: '1',
      supervisorId: 'sup-1',
    }),
  })),
}));

describe('PromotorController', () => {
  const controller = new PromotorController();

  it('deve listar promotores', async () => {
    const req = mockRequest();
    const res = mockResponse();

    await controller.getAllPromotores(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });
});