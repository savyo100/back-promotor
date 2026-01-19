import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

const authService = new AuthService();

export class AuthController {
  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({ error: 'Email e senha são obrigatórios' });
        return;
      }

      const result = await authService.login(email, password);
      res.status(200).json(result);
    } catch (error) {
      res.status(401).json({
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  async logout(req: Request, res: Response): Promise<void> {
    try {
      const token = req.headers.authorization?.replace('Bearer ', '');

      if (!token) {
        res.status(401).json({ error: 'Token não informado' });
        return;
      }

      await authService.logout(token);
      res.status(200).json({ message: 'Logout realizado com sucesso' });
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }
}
