import { Router } from 'express';
import { SupervisorController } from '../controllers/supervisor.controller';
import { PromotorController } from '../controllers/promotor.controller';
import { LocalizacaoController } from '../controllers/localizacao.controller';
import { LeadController } from '../controllers/lead.controller';

const router = Router();

const supervisorController = new SupervisorController();
const promotorController = new PromotorController();
const localizacaoController = new LocalizacaoController();
const leadController = new LeadController();

// rotas d supervisor para desenvolvimento
router.get('/supervisores', supervisorController.getAllSupervisors);
router.get('/supervisores/:id', supervisorController.getSupervisorById);
router.post('/supervisores', supervisorController.createSupervisor);
router.delete('/supervisores/:id', supervisorController.deleteSupervisor);


// Dashboard
router.get('/dashboard', supervisorController.getDashboardData);

// Promotores
router.post('/promotores', promotorController.createPromotor);
router.get('/promotores', promotorController.getAllPromotores);
router.get('/promotores/:id', promotorController.getPromotorById);
router.put('/promotores/:id', promotorController.updatePromotor);
router.delete('/promotores/:id', promotorController.deletePromotor);

// Localização (Supervisor)
router.get(
  '/promotores/:id/localizacao-atual',
  localizacaoController.getLastLocation
);
router.get(
  '/promotores/:id/historico-localizacao',
  localizacaoController.getLocationHistory
);

// Leads (Supervisor)
router.get('/leads', leadController.getLeadsByPromotor);
router.get('/leads/:id', leadController.getLeadById);


export default router;
