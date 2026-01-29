import supabase from '../config/supabase';
import { Localizacao } from '../types/localizacao';

export const LocalizacaoRepository = {
  async registrar(localizacao: Localizacao): Promise<Localizacao> {
    const { data, error } = await supabase
      .from('localizacoes')
      .insert([
        {
          promotor_id: localizacao.promotorId,
          latitude: localizacao.latitude,
          longitude: localizacao.longitude,
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return data as Localizacao;
  },

  async update(
    id: string,
    localizacao: Omit<Localizacao, 'id'>
  ): Promise<Localizacao> {
    const { data, error } = await supabase
      .from('localizacoes')
      .update(localizacao)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Localizacao;
  },

  async getByPromotor(promotorId: string): Promise<Localizacao[]> {
    const { data, error } = await supabase
      .from('localizacoes')
      .select('*')
      .eq('idPromotor', promotorId);

    if (error) throw error;
    return data as Localizacao[];
  },

  async getById(id: string): Promise<Localizacao> {
    const { data, error } = await supabase
      .from('localizacoes')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as Localizacao;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('localizacoes')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },
};
