import { Request, Response } from 'express';
import { LocalizacaoService } from '../services/localizacao.service';

const localizacaoService = new LocalizacaoService();

export class LocalizacaoController {
  // Registra uma nova localização
  async registerLocation(req: Request, res: Response): Promise<void> {
    try {
      const location = await localizacaoService.registrarLocalizacao(req.body);
      res.status(201).json(location);
    } catch (error) {
      res.status(500).json({ error: `Erro ao registrar localização: ${error instanceof Error ? error.message : String(error)}` });
    }
  }

  // Obtém a última localização de um promotor
  async getLastLocation(req: Request, res: Response): Promise<void> {
    try {
      const { idPromotor } = req.params;
      const location = await localizacaoService.getLastLocalizacaoByPromotor(idPromotor);
      res.status(200).json(location);
    } catch (error) {
      res.status(500).json({ error: `Erro ao buscar última localização do promotor com ID ${req.params.idPromotor}: ${error instanceof Error ? error.message : String(error)}` });
    }
  }

  // Obtém o histórico de localizações de um promotor
  async getLocationHistory(req: Request, res: Response): Promise<void> {
    try {
      const { idPromotor } = req.params;
      const locations = await localizacaoService.getLocalizacoesHistoricoByPromotor(idPromotor);
      res.status(200).json(locations);
    } catch (error) {
      res.status(500).json({ error: `Erro ao buscar histórico de localizações do promotor com ID ${req.params.idPromotor}: ${error instanceof Error ? error.message : String(error)}` });
    }
  }
}
