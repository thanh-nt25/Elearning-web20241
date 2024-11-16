const request = require('supertest');
const { expect } = require('chai');
const app = require('../../app'); // Adjust path as needed
const { User } = require('../../models'); // Adjust path as needed

describe('Account Routes - Role Management', () => {
    let testUser;
    let adminUser;
    let authToken;

    before(async () => {
        // Create test users
        testUser = await User.create({
            email: 'testuser@test.com',
            password: 'password123',
            role: 'user'
        });

        adminUser = await User.create({
            email: 'admin@test.com',
            password: 'admin123',
            role: 'admin'
        });

        // Get admin auth token
        const response = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'admin@test.com',
                password: 'admin123'
            });
        
        authToken = response.body.token;
    });

    describe('PUT /api/account/role', () => {
        it('should change user role to instructor', async () => {
            const response = await request(app)
                .put('/api/account/role')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    userId: testUser.id,
                    newRole: 'instructor'
                });

            expect(response.status).to.equal(200);
            expect(response.body.message).to.equal('Role updated successfully');
            expect(response.body.user.role).to.equal('instructor');
        });

        it('should not allow role change without admin privileges', async () => {
            // Login as regular user
            const userResponse = await request(app)
                .post('/api/auth/login')
                .send({
                    email: 'testuser@test.com',
                    password: 'password123'
                });

            const response = await request(app)
                .put('/api/account/role')
                .set('Authorization', `Bearer ${userResponse.body.token}`)
                .send({
                    userId: adminUser.id,
                    newRole: 'user'
                });

            expect(response.status).to.equal(403);
        });
    });

    after(async () => {
        // Cleanup test data
        await User.destroy({
            where: {
                email: ['testuser@test.com', 'admin@test.com']
            }
        });
    });
});