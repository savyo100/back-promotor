import supabase from '../config/supabase';
import { Lead } from '../types/lead';
import { CreateLeadDTO } from '../dto/create-lead.dto';

/* ===============================
   MAPPERS (iguais ao original)
================================ */

function mapLeadFromDB(data: any): Lead {
  return {
    id: data.id,
    nome: data.nome,
    telefone: data.telefone,
    cpf: data.cpf,
    criadoPor: data.criado_por,
    criadoEm: new Date(data.criado_em).getTime(),
  };
}

function mapLeadsFromDB(data: any[]): Lead[] {
  return data.map(mapLeadFromDB);
}

/* ===============================
   REPOSITORY
================================ */

export const LeadRepository = {
  /* ---------- CREATE ---------- */
  async create(
    promotorId: string,
    data: CreateLeadDTO
  ): Promise<Lead> {
    const { data: lead, error } = await supabase
      .from('leads')
      .insert({
        nome: data.nome,
        telefone: data.telefone,
        cpf: data.cpf,
        criado_por: promotorId,
      })
      .select()
      .single();

    if (error) throw error;
    return mapLeadFromDB(lead);
  },

  /* ---------- UPDATE ---------- */
  async update(
    promotorId: string,
    id: string,
    lead: Omit<Lead, 'id' | 'criadoPor' | 'criadoEm'>
  ): Promise<Lead> {
    const existingLead = await this.getById(promotorId, id);

    if (existingLead.criadoPor !== promotorId) {
      throw new Error('Acesso negado ao lead');
    }

    const { data, error } = await supabase
      .from('leads')
      .update({
        nome: lead.nome,
        telefone: lead.telefone,
        cpf: lead.cpf,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return mapLeadFromDB(data);
  },

  /* ---------- GET BY PROMOTOR ---------- */
  async getByPromotor(promotorId: string): Promise<Lead[]> {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .eq('criado_por', promotorId);

    if (error) throw error;
    return mapLeadsFromDB(data);
  },

  /* ---------- GET BY ID (PROMOTOR) ---------- */
  async getById(
    promotorId: string,
    id: string
  ): Promise<Lead> {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;

    if (data.criado_por !== promotorId) {
      throw new Error('Acesso negado ao lead');
    }

    return mapLeadFromDB(data);
  },

  /* ---------- GET BY ID (SUPERVISOR) ---------- */
  async getByIdSupervisor(id: string): Promise<Lead> {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return mapLeadFromDB(data);
  },

  /* ---------- GET ALL BY SUPERVISOR ---------- */
  async getBySupervisor(supervisorId: string): Promise<Lead[]> {
    const { data, error } = await supabase
      .from('leads')
      .select(`
        *,
        promotores!inner (
          id,
          supervisor_id
        )
      `)
      .eq('promotores.supervisor_id', supervisorId)
      .order('criado_em', { ascending: false });

    if (error) throw error;
    return mapLeadsFromDB(data);
  },

  /* ---------- DELETE ---------- */
  async delete(
    promotorId: string,
    id: string
  ): Promise<void> {
    const lead = await this.getById(promotorId, id);

    if (lead.criadoPor !== promotorId) {
      throw new Error('Acesso negado ao lead');
    }

    const { error } = await supabase
      .from('leads')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },
};
