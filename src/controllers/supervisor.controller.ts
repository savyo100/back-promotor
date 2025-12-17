import { Request, Response } from 'express';
import SupervisorService from '../services/supervisor.service';

const supervisorService = new SupervisorService();

export class SupervisorController {

  //Obtem todos os dados pra usar no dashboard
  async getDashboardData(req: Request, res: Response): Promise<void> {
    try {
      const dashboardData = await supervisorService.getDashboardData();
      res.status(200).json(dashboardData);
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
    }
  }

  // Obtém todos os supervisores
  async getAllSupervisors(req: Request, res: Response): Promise<void> {
    try {
      const supervisors = await supervisorService.getAllSupervisors();
      res.status(200).json(supervisors);
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
    }
  }

  // Obtém um supervisor pelo ID
  async getSupervisorById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const supervisor = await supervisorService.getSupervisorById(id);
      res.status(200).json(supervisor);
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
    }
  }

  // Cria um novo supervisor
  async createSupervisor(req: Request, res: Response): Promise<void> {
    try {
      const supervisorData = req.body;
      const newSupervisor = await supervisorService.createSupervisor(supervisorData);
      res.status(201).json(newSupervisor);
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
    }
  }

  // Atualiza um supervisor pelo ID
  async updateSupervisor(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const supervisorData = req.body;
      const updatedSupervisor = await supervisorService.updateSupervisor(id, supervisorData);
      res.status(200).json(updatedSupervisor);
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
    }
  }

  // Exclui um supervisor pelo ID
  async deleteSupervisor(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await supervisorService.deleteSupervisor(id);
      res.status(200).json({ message: 'Supervisor excluído com sucesso' });
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
    }
  }
}
