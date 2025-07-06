import request from 'supertest';
import app from './index.ts';

describe('GET /hello', () => {
    it('should return 200 with JSON message', async () => {
        const res = await request(app).get('/api/hello');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ message: 'Hello world!' });
    });
});