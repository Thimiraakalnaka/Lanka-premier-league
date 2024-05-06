const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const createError = require('../utils/appError');
const User = require('../models/userModel');
const authController = require('../controllers/authController');

jest.mock('../models/userModel');
jest.mock('jsonwebtoken');
jest.mock('bcryptjs');
jest.mock('../utils/appError');

describe('Auth Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('signup', () => {
    it('should create a new user', async () => {
      const req = {
        body: {
          name: 'John Doe',
          email: 'john@example.com',
          password: 'password123',
        },
      };
      const newUser = {
        _id: 'user123',
        name: 'John Doe',
        email: 'john@example.com',
        role: 'user',
      };
      const token = 'token123';
      User.findOne.mockResolvedValue(null);
      bcrypt.hash.mockResolvedValue('hashedPassword123');
      User.create.mockResolvedValue(newUser);
      jwt.sign.mockReturnValue(token);

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const next = jest.fn();

      await authController.signup(req, res, next);

      expect(User.findOne).toHaveBeenCalledWith({ email: req.body.email });
      expect(bcrypt.hash).toHaveBeenCalledWith(req.body.password, 12);
      expect(User.create).toHaveBeenCalledWith({
        ...req.body,
        password: 'hashedPassword123',
      });
      expect(jwt.sign).toHaveBeenCalledWith({ id: 'user123' }, 'secretkey123', {
        expiresIn: '90d',
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        status: 'success',
        message: 'User registered sucessfully',
        token,
        user: {
          _id: 'user123',
          name: 'John Doe',
          email: 'john@example.com',
          role: 'user',
        },
      });
      expect(next).not.toHaveBeenCalled();
    });

    it('should return an error if user already exists', async () => {
      const req = {
        body: {
          email: 'john@example.com',
        },
      };

      User.findOne.mockResolvedValue(true);

      const next = jest.fn();

      await authController.signup(req, {}, next);

      expect(createError).toHaveBeenCalledWith('User already exists!', 400);
    });

    it('should pass error to next middleware if an error occurs', async () => {
      const req = {
        body: {
          email: 'john@example.com',
        },
      };

      User.findOne.mockRejectedValue(new Error('Database error'));

      const next = jest.fn();

      await authController.signup(req, {}, next);

      expect(next).toHaveBeenCalledWith(new Error('Database error'));
    });
  });

  describe('login', () => {
    it('should log in a user with valid credentials', async () => {
      const req = {
        body: {
          email: 'john@example.com',
          password: 'password123',
        },
      };

      const user = {
        _id: 'user123',
        name: 'John Doe',
        email: 'john@example.com',
        role: 'user',
        password: 'hashedPassword123',
      };

      User.findOne.mockResolvedValue(user);
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue('token123');

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await authController.login(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ email: 'john@example.com' });
      expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedPassword123');
      expect(jwt.sign).toHaveBeenCalledWith({ id: 'user123' }, 'secretkey123', {
        expiresIn: '90d',
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: 'success',
        token: 'token123',
        message: 'Logged in successfully',
        user: {
          _id: 'user123',
          name: 'John Doe',
          email: 'john@example.com',
          role: 'user',
        },
      });
    });

    it('should return an error if user does not exist', async () => {
      const req = {
        body: {
          email: 'john@example.com',
          password: 'password123',
        },
      };

      User.findOne.mockResolvedValue(null);

      const next = jest.fn();

      await authController.login(req, {}, next);

      expect(createError).toHaveBeenCalledWith('User not found', 404);
    });

    it('should return an error if password is incorrect', async () => {
      const req = {
        body: {
          email: 'john@example.com',
          password: 'password123',
        },
      };

      const user = {
        _id: 'user123',
        name: 'John Doe',
        email: 'john@example.com',
        role: 'user',
        password: 'hashedPassword123',
      };

      User.findOne.mockResolvedValue(user);
      bcrypt.compare.mockResolvedValue(false);

      const next = jest.fn();

      await authController.login(req, {}, next);

      expect(createError).toHaveBeenCalledWith('Invalid email or password', 401);
    });

    it('should pass error to next middleware if an error occurs', async () => {
      const req = {
        body: {
          email: 'john@example.com',
          password: 'password123',
        },
      };

      User.findOne.mockRejectedValue(new Error('Database error'));

      const next = jest.fn();

      await authController.login(req, {}, next);

      expect(next).toHaveBeenCalledWith(new Error('Database error'));
    });
  });
});
