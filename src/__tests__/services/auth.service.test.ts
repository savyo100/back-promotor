import { AuthService } from '../../services/auth.service';
import supabase from '../../config/supabase';

jest.mock('../../config/supabase', () => ({
  __esModule: true,
  default: {
    auth: {
      signInWithPassword: jest.fn(),
      signOut: jest.fn(),
      getUser: jest.fn(),
    },
  },
}));

describe('AuthService', () => {
  const service = new AuthService();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve realizar login com sucesso', async () => {
    console.log('🟡 Testando login');

    (supabase.auth.signInWithPassword as jest.Mock).mockResolvedValue({
      data: {
        // 🔥 EXATAMENTE como o service espera
        user: {
          id: '1',
          email: 'test@test.com',
        },
        session: {
          access_token: 'fake-access-token',
          refresh_token: 'fake-refresh-token',
          expires_in: 3600,
        },
      },
      error: null,
    });

    const result = await service.login('test@test.com', '123456');

    console.log('🟢 Login result:', result);

    expect(result.accessToken).toBe('fake-access-token');
    expect(result.user.id).toBe('1');
    expect(result.user.email).toBe('test@test.com');
  });

  it('deve realizar logout', async () => {
    console.log('🟡 Testando logout');

    (supabase.auth.signOut as jest.Mock).mockResolvedValue({ error: null });

    await service.logout('fake-token');

    expect(supabase.auth.signOut).toHaveBeenCalled();
  });

  it('deve retornar usuário autenticado', async () => {
    console.log('🟡 Testando me()');

    (supabase.auth.getUser as jest.Mock).mockResolvedValue({
      data: {
        user: { id: '1', email: 'test@test.com' },
      },
      error: null,
    });

    const user = await service.me('fake-token');

    console.log('🟢 User:', user);

    expect(user.email).toBe('test@test.com');
  });
});