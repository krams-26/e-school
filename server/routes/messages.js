import express from 'express';
import { query } from '../config/database.js';
import { authenticateToken } from '../middleware/auth.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

router.use(authenticateToken);

// Get conversations
router.get('/conversations', async (req, res) => {
  try {
    const sql = `
      SELECT DISTINCT
        CASE
          WHEN m.sender_id = ? THEN m.receiver_id
          ELSE m.sender_id
        END as other_user_id,
        u.name as other_user_name,
        u.avatar as other_user_avatar,
        u.role as other_user_role,
        m.message as last_message,
        m.created_at as last_message_date
      FROM messages m
      JOIN users u ON (CASE WHEN m.sender_id = ? THEN m.receiver_id ELSE m.sender_id END) = u.id
      WHERE m.sender_id = ? OR m.receiver_id = ?
      ORDER BY m.created_at DESC
    `;

    const [conversations] = await query(sql, [req.user.id, req.user.id, req.user.id, req.user.id]);

    res.json({ conversations });
  } catch (error) {
    console.error('Get conversations error:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Get messages with a specific user
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    const [messages] = await query(
      `SELECT m.*, 
        u1.name as sender_name, u1.avatar as sender_avatar,
        u2.name as receiver_name, u2.avatar as receiver_avatar
      FROM messages m
      JOIN users u1 ON m.sender_id = u1.id
      JOIN users u2 ON m.receiver_id = u2.id
      WHERE (m.sender_id = ? AND m.receiver_id = ?) OR (m.sender_id = ? AND m.receiver_id = ?)
      ORDER BY m.created_at DESC
      LIMIT ? OFFSET ?`,
      [req.user.id, userId, userId, req.user.id, parseInt(limit), offset]
    );

    // Mark as read
    await query(
      'UPDATE messages SET is_read = 1 WHERE receiver_id = ? AND sender_id = ?',
      [req.user.id, userId]
    );

    res.json({ messages: messages.reverse() });
  } catch (error) {
    console.error('Get messages error:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Send message
router.post('/',
  [
    body('receiver_id').isInt().withMessage('ID destinataire requis'),
    body('message').notEmpty().withMessage('Message requis')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { receiver_id, message } = req.body;

      const [result] = await query(
        'INSERT INTO messages (sender_id, receiver_id, message) VALUES (?, ?, ?)',
        [req.user.id, receiver_id, message]
      );

      res.status(201).json({
        message: 'Message envoyé',
        messageId: result.insertId
      });
    } catch (error) {
      console.error('Send message error:', error);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  }
);

// Get unread count
router.get('/unread/count', async (req, res) => {
  try {
    const [result] = await query(
      'SELECT COUNT(*) as count FROM messages WHERE receiver_id = ? AND is_read = 0',
      [req.user.id]
    );

    res.json({ count: result[0].count });
  } catch (error) {
    console.error('Get unread count error:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

export default router;

