import { formatarParaBrasil } from '../../services/date.service';

describe('DateService', () => {
  it('deve formatar data para padrão brasileiro', () => {
    console.log('🟡 formatarParaBrasil');

    const date = new Date('2024-01-01T12:00:00Z');
    const result = formatarParaBrasil(date);

    console.log('🟢 Data formatada:', result);

    expect(typeof result).toBe('string');
  });
});