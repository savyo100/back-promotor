"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockResponse = exports.mockRequest = void 0;
/**
 * Mock simples de Request
 */
const mockRequest = (data = {}) => ({
    body: data.body || {},
    params: data.params || {},
    headers: data.headers || {},
    user: data.user,
});
exports.mockRequest = mockRequest;
/**
 * Mock simples de Response
 */
const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res;
};
exports.mockResponse = mockResponse;
