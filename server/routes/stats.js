import express from 'express';
import { query } from '../config/database.js';
import { authenticateToken, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticateToken);
router.use(authorizeRoles('admin'));

// Get dashboard stats
router.get('/', async (req, res) => {
  try {
    const [studentsCount] = await query('SELECT COUNT(*) as count FROM users WHERE role = "student"');
    const [teachersCount] = await query('SELECT COUNT(*) as count FROM users WHERE role = "teacher"');
    const [classesCount] = await query('SELECT COUNT(*) as count FROM classes');
    const [attendanceToday] = await query(
      'SELECT COUNT(*) as count FROM attendance WHERE DATE(date) = CURDATE() AND status = "present"'
    );
    const [attendanceTotal] = await query(
      'SELECT COUNT(*) as count FROM attendance WHERE DATE(date) = CURDATE()'
    );

    const attendanceRate = attendanceTotal[0].count > 0
      ? (attendanceToday[0].count / attendanceTotal[0].count * 100).toFixed(1)
      : 0;

    // Get attendance by class
    const [attendanceByClass] = await query(`
      SELECT 
        c.name as class_name,
        COUNT(CASE WHEN a.status = 'present' THEN 1 END) as present,
        COUNT(a.id) as total,
        ROUND(COUNT(CASE WHEN a.status = 'present' THEN 1 END) / COUNT(a.id) * 100, 1) as rate
      FROM classes c
      LEFT JOIN attendance a ON c.id = a.class_id AND DATE(a.date) = CURDATE()
      GROUP BY c.id, c.name
      ORDER BY rate DESC
    `);

    res.json({
      stats: {
        students: studentsCount[0].count,
        teachers: teachersCount[0].count,
        classes: classesCount[0].count,
        attendanceToday: {
          present: attendanceToday[0].count,
          total: attendanceTotal[0].count,
          rate: parseFloat(attendanceRate)
        }
      },
      attendanceByClass
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

export default router;

