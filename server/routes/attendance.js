import express from 'express';
import { query } from '../config/database.js';
import { authenticateToken, authorizeRoles } from '../middleware/auth.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

router.use(authenticateToken);

// Get attendance records
router.get('/', async (req, res) => {
  try {
    const { classId, date, page = 1, limit = 6 } = req.query;
    const offset = (page - 1) * limit;

    let sql = `
      SELECT a.*, u.name as student_name, u.email as student_email, c.name as class_name
      FROM attendance a
      JOIN users u ON a.student_id = u.id
      JOIN classes c ON a.class_id = c.id
      WHERE 1=1
    `;
    const params = [];

    if (classId) {
      sql += ' AND a.class_id = ?';
      params.push(classId);
    }

    if (date) {
      sql += ' AND DATE(a.date) = ?';
      params.push(date);
    }

    // Filter by role
    if (req.user.role === 'teacher') {
      sql += ' AND c.teacher_id = ?';
      params.push(req.user.id);
    } else if (req.user.role === 'student') {
      sql += ' AND a.student_id = ?';
      params.push(req.user.id);
    } else if (req.user.role === 'parent') {
      sql += ' AND u.id IN (SELECT student_id FROM parent_students WHERE parent_id = ?)';
      params.push(req.user.id);
    }

    sql += ' ORDER BY a.date DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), offset);

    const [records] = await query(sql, params);

    res.json({ attendance: records });
  } catch (error) {
    console.error('Get attendance error:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Mark attendance (teacher only)
router.post('/',
  authorizeRoles('teacher'),
  [
    body('student_id').isInt().withMessage('ID étudiant requis'),
    body('class_id').isInt().withMessage('ID classe requis'),
    body('status').isIn(['present', 'absent', 'late']).withMessage('Statut invalide'),
    body('date').isISO8601().withMessage('Date invalide')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { student_id, class_id, status, date, notes } = req.body;

      // Verify teacher owns this class
      const [classes] = await query('SELECT id FROM classes WHERE id = ? AND teacher_id = ?', [class_id, req.user.id]);
      if (classes.length === 0) {
        return res.status(403).json({ error: 'Classe non trouvée ou accès refusé' });
      }

      const [result] = await query(
        'INSERT INTO attendance (student_id, class_id, status, date, notes) VALUES (?, ?, ?, ?, ?)',
        [student_id, class_id, status, date || new Date(), notes || null]
      );

      res.status(201).json({
        message: 'Présence enregistrée',
        attendance: {
          id: result.insertId,
          student_id,
          class_id,
          status,
          date,
          notes
        }
      });
    } catch (error) {
      console.error('Mark attendance error:', error);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  }
);

// Update attendance
router.put('/:id', authorizeRoles('teacher'), async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    await query(
      'UPDATE attendance SET status = ?, notes = ? WHERE id = ?',
      [status, notes, id]
    );

    res.json({ message: 'Présence mise à jour' });
  } catch (error) {
    console.error('Update attendance error:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

export default router;

