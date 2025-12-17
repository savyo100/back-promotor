import { Router } from 'express';
import { LocalizacaoController } from '../controllers/localizacao.controller';

const router = Router();
const localizacaoController = new LocalizacaoController();

// Rota para registrar uma nova localização
router.post('/promotor/localizacao', (req, res) => localizacaoController.registerLocation(req, res));

// Rota para obter a última localização de um promotor
router.get('/promotor/:idPromotor/localizacao-atual', (req, res) => localizacaoController.getLastLocation(req, res));

// Rota para obter o histórico de localizações de um promotor
router.get('/promotor/:idPromotor/historico-localizacao', (req, res) => localizacaoController.getLocationHistory(req, res));

export default router;
