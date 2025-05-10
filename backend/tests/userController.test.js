// userController.test.js

const { loginUser } = require('./userController');

describe('User Login', () => {
  test('should log in with valid credentials', async () => {
    const mockRequest = {
      body: { username: 'john_doe', password: 'password123' }
    };

    const response = await loginUser(mockRequest);

    expect(response.success).toBe(true);
    expect(response.token).toBeDefined();
  });

  test('should fail login with invalid credentials', async () => {
    const mockRequest = {
      body: { username: 'john_doe', password: 'wrongpass' }
    };

    const response = await loginUser(mockRequest);

    expect(response.success).toBe(false);
    expect(response.token).toBeUndefined();
  });
});
