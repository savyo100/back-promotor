import supabase from '../config/supabase';
import { Supervisor } from '../types/supervisor';
import { CreateSupervisorDTO } from '../dto/create-supervisor.dto';

export const SupervisorRepository = {
  async getAll(): Promise<Supervisor[]> {
    const { data, error } = await supabase
      .from('supervisores')
      .select('*');

    if (error) throw error;
    return data as Supervisor[];
  },

  async getById(id: string): Promise<Supervisor> {
    const { data, error } = await supabase
      .from('supervisores')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as Supervisor;
  },

  async create(data: CreateSupervisorDTO): Promise<Supervisor> {
    const { data: authData, error: authError } =
      await supabase.auth.admin.createUser({
        email: data.email,
        password: data.password,
        email_confirm: true,
        user_metadata: { role: 'supervisor' },
      });

    if (authError || !authData.user) throw authError;

    const { data: dbData, error: dbError } = await supabase
      .from('supervisores')
      .insert({
        id: authData.user.id,
        nome: data.nome,
        email: data.email,
        telefone: data.telefone,
      })
      .select()
      .single();

    if (dbError) throw dbError;
    return dbData as Supervisor;
  },

  async update(
    id: string,
    supervisor: Partial<Supervisor>
  ): Promise<Supervisor> {
    const { data, error } = await supabase
      .from('supervisores')
      .update(supervisor)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Supervisor;
  },

  async delete(id: string): Promise<void> {
    await supabase.auth.admin.deleteUser(id);

    const { error } = await supabase
      .from('supervisores')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },
};
