import { SupabaseRepository } from '../repositories/SupabaseUserRepository';
import { Supervisor } from '../types/supervisor';
import { DashboardData } from '../types/dashboard';
import { CreateSupervisorDTO } from '../dto/create-supervisor.dto';

export default class SupervisorService {
  async getAllSupervisors(): Promise<Supervisor[]> {
    try {
      return await SupabaseRepository.supervisores.getAll();
    } catch (error) {
      console.error('Erro ao buscar supervisores:', error instanceof Error ? error.message : String(error));
      throw new Error('Falha ao buscar supervisores');
    }
  }

  async getSupervisorById(id: string): Promise<Supervisor | null> {
    try {
      return await SupabaseRepository.supervisores.getById(id);
    } catch (error) {
      console.error(`Erro ao buscar supervisor com ID ${id}:`, error instanceof Error ? error.message : String(error));
      throw new Error('Falha ao buscar supervisor');
    }
  }

  async createSupervisor(supervisor: CreateSupervisorDTO): Promise<Supervisor> {
    try {
      return await SupabaseRepository.supervisores.create(supervisor);
    } catch (error) {
      console.error('Erro ao criar supervisor:', error instanceof Error ? error.message : String(error));
      throw new Error('Falha ao criar supervisor');
    }
  }

  async updateSupervisor(id: string, supervisor: Omit<Supervisor, 'id'>): Promise<Supervisor> {
    try {
      return await SupabaseRepository.supervisores.update(id, supervisor);
    } catch (error) {
      console.error(`Erro ao atualizar supervisor com ID ${id}:`, error instanceof Error ? error.message : String(error));
      throw new Error('Falha ao atualizar supervisor');
    }
  }

  async deleteSupervisor(id: string): Promise<void> {
    try {
      await SupabaseRepository.supervisores.delete(id);
    } catch (error) {
      console.error(`Erro ao deletar supervisor com ID ${id}:`, error instanceof Error ? error.message : String(error));
      throw new Error('Falha ao deletar supervisor');
    }
  }
  async getDashboardData(): Promise<DashboardData> {
    try {
      return await SupabaseRepository.dashboard.getDashboardData();
    } catch (error) {
      console.error('Erro ao buscar dados do dashboard:', error instanceof Error ? error.message : String(error));
      throw new Error('Falha ao buscar dados do dashboard');
    }
  }
}
