const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');
const Course = require('../../models/Course');

describe('Course Routes', () => {
    beforeAll(async () => {
        // Connect to test database before running tests
        await mongoose.connect(process.env.MONGO_URI);
    });

    afterAll(async () => {
        // Disconnect after tests complete
        await mongoose.connection.close();
    });

    beforeEach(async () => {
        // Clear the courses collection before each test
        await Course.deleteMany({});
    });

    describe('GET /api/courses', () => {
        it('should get all courses', async () => {
            const response = await request(app)
                .get('/api/courses')
                .expect(200);

            expect(Array.isArray(response.body)).toBeTruthy();
        });
    });

    describe('POST /api/courses', () => {
        it('should create a new course', async () => {
            const courseData = {
                title: 'Test Course',
                description: 'Test Description',
                price: 99.99,
                instructor: '507f1f77bcf86cd799439011', // Mock ObjectId
                category: 'Programming'
            };

            const response = await request(app)
                .post('/api/courses')
                .send(courseData)
                .expect(201);

            expect(response.body.title).toBe(courseData.title);
            expect(response.body.description).toBe(courseData.description);
        });
    });

    describe('GET /api/courses/:id', () => {
        it('should get a course by id', async () => {
            // First create a course
            const course = await Course.create({
                title: 'Test Course',
                description: 'Test Description',
                price: 99.99,
                instructor: '507f1f77bcf86cd799439011',
                category: 'Programming'
            });

            const response = await request(app)
                .get(`/api/courses/${course._id}`)
                .expect(200);

            expect(response.body.title).toBe(course.title);
        });
    });

    describe('PUT /api/courses/:id', () => {
        it('should update a course', async () => {
            const course = await Course.create({
                title: 'Original Title',
                description: 'Original Description',
                price: 99.99,
                instructor: '507f1f77bcf86cd799439011',
                category: 'Programming'
            });

            const updateData = {
                title: 'Updated Title',
                description: 'Updated Description'
            };

            const response = await request(app)
                .put(`/api/courses/${course._id}`)
                .send(updateData)
                .expect(200);

            expect(response.body.title).toBe(updateData.title);
        });
    });

    describe('DELETE /api/courses/:id', () => {
        it('should delete a course', async () => {
            const course = await Course.create({
                title: 'Test Course',
                description: 'Test Description',
                price: 99.99,
                instructor: '507f1f77bcf86cd799439011',
                category: 'Programming'
            });

            await request(app)
                .delete(`/api/courses/${course._id}`)
                .expect(200);

            const deletedCourse = await Course.findById(course._id);
            expect(deletedCourse).toBeNull();
        });
    });
});