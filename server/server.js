import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import rateLimit from 'express-rate-limit';
import authRoutes from './routes/auth.js';
import usersRoutes from './routes/users.js';
import attendanceRoutes from './routes/attendance.js';
import messagesRoutes from './routes/messages.js';
import statsRoutes from './routes/stats.js';
import classesRoutes from './routes/classes.js';
import pointsRoutes from './routes/points.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Charger .env depuis le dossier server explicitement
dotenv.config({ path: join(__dirname, '.env') });

// Vérifier que JWT_SECRET est chargé, sinon utiliser fallback
if (!process.env.JWT_SECRET) {
  console.warn('⚠️  ATTENTION: JWT_SECRET n\'est pas défini dans .env');
  console.warn('   Utilisation d\'un secret par défaut (changez en production !)');
  process.env.JWT_SECRET = 'eschool_jwt_secret_key_change_in_production_2024';
}

const app = express();
const PORT = process.env.PORT || 3000;

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Trop de requêtes depuis cette IP, veuillez réessayer plus tard.'
});

app.use(limiter);

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:8080',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'E-School API is running' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/messages', messagesRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/classes', classesRoutes);
app.use('/api/points', pointsRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route non trouvée' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Erreur serveur interne' });
});

app.listen(PORT, () => {
  console.log(`🚀 Serveur API E-School démarré sur le port ${PORT}`);
  console.log(`📍 Base de données: ${process.env.DB_NAME || 'eschool'}`);
  console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:8080'}`);
  console.log(`🔑 JWT_SECRET: ${process.env.JWT_SECRET ? '✅ Défini' : '❌ Manquant'}`);
});

