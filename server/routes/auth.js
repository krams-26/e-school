import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { body, validationResult } from 'express-validator';
import { query } from '../config/database.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Login
router.post('/login',
  [
    body('email').isEmail().withMessage('Email invalide'),
    body('password').notEmpty().withMessage('Mot de passe requis')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;

      console.log('Login attempt for:', email);
      
      const users = await query(
        'SELECT id, name, email, password, role, avatar FROM users WHERE email = ?',
        [email]
      );

      console.log('Query result:', { usersCount: users?.length, isArray: Array.isArray(users) });

      if (!users || !Array.isArray(users) || users.length === 0) {
        console.log('No user found for email:', email);
        return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
      }

      const user = users[0];
      console.log('User found:', { id: user.id, email: user.email, hasPassword: !!user.password });

      if (!user || !user.password) {
        console.error('User data invalid:', user);
        return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
      }

      // Utiliser JWT_SECRET avec fallback
      const jwtSecret = process.env.JWT_SECRET || 'eschool_jwt_secret_key_change_in_production_2024';
      
      if (!jwtSecret) {
        console.error('❌ JWT_SECRET is not defined');
        return res.status(500).json({ error: 'Configuration serveur invalide' });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        jwtSecret,
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
      );
      
      console.log('✅ Token généré avec succès pour:', user.email);

      res.json({
        token,
        user: {
          id: String(user.id),
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Erreur serveur lors de la connexion' });
    }
  }
);

// Get current user
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const users = await query(
      'SELECT id, name, email, role, avatar FROM users WHERE id = ?',
      [req.user.id]
    );

    if (!users || users.length === 0) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    const user = users[0];
    res.json({ 
      user: {
        id: String(user.id),
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar
      }
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Register (pour les admins uniquement)
router.post('/register',
  authenticateToken,
  [
    body('email').isEmail().withMessage('Email invalide'),
    body('password').isLength({ min: 6 }).withMessage('Mot de passe doit contenir au moins 6 caractères'),
    body('name').notEmpty().withMessage('Nom requis'),
    body('role').isIn(['admin', 'teacher', 'student', 'parent']).withMessage('Rôle invalide')
  ],
  async (req, res) => {
    try {
      if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Seuls les administrateurs peuvent créer des comptes' });
      }

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password, name, role, avatar } = req.body;

      const [existingUsers] = await query('SELECT id FROM users WHERE email = ?', [email]);
      if (existingUsers.length > 0) {
        return res.status(400).json({ error: 'Cet email est déjà utilisé' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const [result] = await query(
        'INSERT INTO users (email, password, name, role, avatar) VALUES (?, ?, ?, ?, ?)',
        [email, hashedPassword, name, role, avatar || null]
      );

      res.status(201).json({
        message: 'Utilisateur créé avec succès',
        user: {
          id: result.insertId,
          email,
          name,
          role
        }
      });
    } catch (error) {
      console.error('Register error:', error);
      res.status(500).json({ error: 'Erreur serveur lors de la création du compte' });
    }
  }
);

export default router;

