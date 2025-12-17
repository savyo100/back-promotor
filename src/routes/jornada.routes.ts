import { Router } from 'express';
import { JornadaController } from '../controllers/jornada.controller';

const router = Router();
const jornadaController = new JornadaController();

// Rotas para Jornada
router.post('/registrar', (req, res) => jornadaController.registrarPonto(req, res)); // Registra um novo ponto na jornada
router.put('/:id', (req, res) => jornadaController.updateJornada(req, res)); // Atualiza uma jornada existente
router.get('/promotor/:promotorId', (req, res) => jornadaController.getJornadasByPromotor(req, res)); // Obtém todas as jornadas de um promotor
router.get('/:id', (req, res) => jornadaController.getJornadaById(req, res)); // Obtém uma jornada específica pelo ID
router.delete('/:id', (req, res) => jornadaController.deleteJornada(req, res)); // Exclui uma jornada pelo ID

export default router;
