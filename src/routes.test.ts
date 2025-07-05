import request from 'supertest';
import app from './index';

describe('GET /not', () => {
    it('should return 404 with JSON message', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual({ error: "404", message: 'Woop woop, Curious you' });
    });
});