import supabase from '../config/supabase';
import { Promotor } from '../types/promotor';
import { CreatePromotorDTO } from '../dto/create-promotor.dto';

export const PromotorRepository = {
  async getAll(): Promise<Promotor[]> {
    const { data, error } = await supabase
      .from('promotores')
      .select('*');

    if (error) throw error;
    return data as Promotor[];
  },

  async getBySupervisorId(supervisorId: string): Promise<Promotor[]> {
    const { data, error } = await supabase
      .from('promotores')
      .select('*')
      .eq('supervisor_id', supervisorId);

    if (error) throw error;
    return data as Promotor[];
  },

  async getById(id: string): Promise<Promotor> {
    const { data, error } = await supabase
      .from('promotores')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as Promotor;
  },

  async create(data: CreatePromotorDTO): Promise<Promotor> {
    // 1️⃣ Criar no Auth
    const { data: authData, error: authError } =
      await supabase.auth.admin.createUser({
        email: data.email,
        password: data.password,
        email_confirm: true,
        user_metadata: {
          role: 'promotor',
          supervisorId: data.supervisorId,
        },
      });

    if (authError || !authData.user) throw authError;

    // 2️⃣ Criar no banco
    const { data: dbData, error: dbError } = await supabase
      .from('promotores')
      .insert({
        id: authData.user.id,
        nome: data.nome,
        email: data.email,
        telefone: data.telefone,
        supervisor_id: data.supervisorId,
        status_jornada: 'inativo',
      })
      .select()
      .single();

    if (dbError) throw dbError;
    return dbData as Promotor;
  },

  async update(
    id: string,
    promotor: Partial<Promotor>
  ): Promise<Promotor> {
    const { data, error } = await supabase
      .from('promotores')
      .update(promotor)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Promotor;
  },

  // Atualiza localização do promotor (lat/lng)
  async updateLocalizacao(
    id: string,
    lat: number,
    lng: number
  ): Promise<Promotor> {
    const { data, error } = await supabase
      .from('promotores')
      .update({ lat, lng })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Promotor;
  },

  async delete(id: string): Promise<void> {
    // Remove do Auth
    await supabase.auth.admin.deleteUser(id);

    // Remove do banco
    const { error } = await supabase
      .from('promotores')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },
};
