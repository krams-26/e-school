import express from 'express';
import { query } from '../config/database.js';
import { authenticateToken } from '../middleware/auth.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

router.use(authenticateToken);

// Get points
router.get('/', async (req, res) => {
  try {
    const { studentId, classId, page = 1, limit = 6 } = req.query;
    const offset = (page - 1) * limit;

    let sql = `
      SELECT p.*, u.name as student_name, u.email as student_email, u.avatar as student_avatar,
             c.name as class_name
      FROM points p
      JOIN users u ON p.student_id = u.id
      LEFT JOIN classes c ON p.class_id = c.id
      WHERE 1=1
    `;
    const params = [];

    if (req.user.role === 'student') {
      sql += ' AND p.student_id = ?';
      params.push(req.user.id);
    } else if (req.user.role === 'parent') {
      sql += ' AND p.student_id IN (SELECT student_id FROM parent_students WHERE parent_id = ?)';
      params.push(req.user.id);
    }

    if (studentId) {
      sql += ' AND p.student_id = ?';
      params.push(studentId);
    }

    if (classId) {
      sql += ' AND p.class_id = ?';
      params.push(classId);
    }

    sql += ' ORDER BY p.created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), offset);

    const [points] = await query(sql, params);

    // Get total points for each student
    if (studentId) {
      const [total] = await query(
        'SELECT SUM(points) as total FROM points WHERE student_id = ?',
        [studentId]
      );
      res.json({
        points,
        total: total[0].total || 0
      });
    } else {
      res.json({ points });
    }
  } catch (error) {
    console.error('Get points error:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Add points (teacher/admin only)
router.post('/',
  authenticateToken,
  [
    body('student_id').isInt().withMessage('ID étudiant requis'),
    body('points').isInt().withMessage('Points requis'),
    body('reason').notEmpty().withMessage('Raison requise')
  ],
  async (req, res) => {
    try {
      if (!['teacher', 'admin'].includes(req.user.role)) {
        return res.status(403).json({ error: 'Accès refusé' });
      }

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { student_id, points, reason, class_id } = req.body;

      const [result] = await query(
        'INSERT INTO points (student_id, points, reason, class_id, created_by) VALUES (?, ?, ?, ?, ?)',
        [student_id, points, reason, class_id || null, req.user.id]
      );

      res.status(201).json({
        message: 'Points ajoutés',
        pointId: result.insertId
      });
    } catch (error) {
      console.error('Add points error:', error);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  }
);

export default router;

