import express from 'express';
import { query } from '../config/database.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticateToken);

// Get classes
router.get('/', async (req, res) => {
  try {
    let sql = `
      SELECT c.*, u.name as teacher_name, u.email as teacher_email
      FROM classes c
      LEFT JOIN users u ON c.teacher_id = u.id
      WHERE 1=1
    `;
    const params = [];

    if (req.user.role === 'teacher') {
      sql += ' AND c.teacher_id = ?';
      params.push(req.user.id);
    } else if (req.user.role === 'student') {
      sql += ' AND c.id IN (SELECT class_id FROM class_students WHERE student_id = ?)';
      params.push(req.user.id);
    }

    sql += ' ORDER BY c.name';

    const [classes] = await query(sql, params);

    // Get students for each class
    for (const classItem of classes) {
      const [students] = await query(
        `SELECT u.id, u.name, u.email, u.avatar
         FROM users u
         JOIN class_students cs ON u.id = cs.student_id
         WHERE cs.class_id = ?`,
        [classItem.id]
      );
      classItem.students = students;
    }

    res.json({ classes });
  } catch (error) {
    console.error('Get classes error:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Get class by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const [classes] = await query(
      `SELECT c.*, u.name as teacher_name, u.email as teacher_email
       FROM classes c
       LEFT JOIN users u ON c.teacher_id = u.id
       WHERE c.id = ?`,
      [id]
    );

    if (classes.length === 0) {
      return res.status(404).json({ error: 'Classe non trouvée' });
    }

    const [students] = await query(
      `SELECT u.id, u.name, u.email, u.avatar
       FROM users u
       JOIN class_students cs ON u.id = cs.student_id
       WHERE cs.class_id = ?`,
      [id]
    );

    res.json({
      class: {
        ...classes[0],
        students
      }
    });
  } catch (error) {
    console.error('Get class error:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

export default router;

