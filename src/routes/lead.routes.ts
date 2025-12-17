import { Router } from 'express';
import { LeadController } from '../controllers/lead.controller';

const router = Router();
const leadController = new LeadController();

// Rota para criar um novo lead
router.post('/', (req, res) => leadController.createLead(req, res));

// Rota para atualizar um lead existente
router.put('/:id', (req, res) => leadController.updateLead(req, res));

// Rota para obter todos os leads criados por um promotor
router.get('/promotor/:promotorId', (req, res) => leadController.getLeadsByPromotor(req, res));

// Rota para obter um lead pelo ID
router.get('/:id', (req, res) => leadController.getLeadById(req, res));

// Rota para excluir um lead pelo ID
router.delete('/:id', (req, res) => leadController.deleteLead(req, res));

export default router;
