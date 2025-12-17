import { Router } from 'express';
import { SupervisorController } from '../controllers/supervisor.controller';
import localizacaoRoutes from './localizacao.routes';
import leadRoutes from './lead.routes';
import promotorRoutes from './promotor.routes';

const router = Router();
const supervisorController = new SupervisorController();


// 5.2.1 Dashboard
// Passamos a referência da função. O Express cuidará de passar (req, res).
router.get('/dashboard', supervisorController.getDashboardData.bind(supervisorController));

// 5.2.2 Promotores
router.use('/promotores', promotorRoutes); // Reutiliza as rotas de promotores definidas em promotor.routes.ts

// 5.2.3 Localização
router.use('/promotores', localizacaoRoutes); // Rotas de localização dentro do contexto de promotores

// 5.2.4 Leads
router.use('/leads', leadRoutes); // Rotas de leads

export default router;
