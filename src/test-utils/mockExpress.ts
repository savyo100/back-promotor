/**
 * Mock simples de Request
 */
export const mockRequest = (data: any = {}) =>
  ({
    body: data.body || {},
    params: data.params || {},
    headers: data.headers || {},
    user: data.user,
  } as any);

/**
 * Mock simples de Response
 */
export const mockResponse = () => {
  const res: any = {};

  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);

  return res;
};
