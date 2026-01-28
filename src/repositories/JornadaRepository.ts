import supabase from '../config/supabase';
import { Jornada } from '../types/jornada';

export const JornadaRepository = {
  // Registra ponto (início ou status)
  async registrarPonto(data: {
    promotor_id: string;
    status: 'ativo' | 'inativo';
  }) {
    const { data: jornada, error } = await supabase
      .from('jornadas')
      .insert([data])
      .select()
      .single();

    if (error) throw error;
    return jornada;
  },

  // Finaliza uma jornada
  async finalizarJornada(id: string): Promise<Jornada> {
    const { data, error } = await supabase
      .from('jornadas')
      .update({
        status: 'inativo',
        fim: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Jornada;
  },

  // Retorna a jornada ativa do promotor (se existir)
  async getJornadaAtiva(promotorId: string) {
    const { data, error } = await supabase
      .from('jornadas')
      .select('*')
      .eq('promotor_id', promotorId)
      .eq('status', 'ativo')
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async getByPromotor(promotorId: string): Promise<Jornada[]> {
    const { data, error } = await supabase
      .from('jornadas')
      .select('*')
      .eq('idPromotor', promotorId);

    if (error) throw error;
    return data as Jornada[];
  },

  async getById(id: string): Promise<Jornada> {
    const { data, error } = await supabase
      .from('jornadas')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as Jornada;
  },

  async update(
    id: string,
    jornada: Omit<Jornada, 'id'>
  ): Promise<Jornada> {
    const { data, error } = await supabase
      .from('jornadas')
      .update(jornada)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Jornada;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('jornadas')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },
};
