import bcrypt from 'bcryptjs';
import { query } from '../config/database.js';
import dotenv from 'dotenv';

dotenv.config();

const seedData = async () => {
  try {
    // Hash default password
    const hashedPassword = await bcrypt.hash('password', 10);

    // Create admin user
    await query(
      `INSERT IGNORE INTO users (email, password, name, role, avatar) VALUES 
      ('admin@eschool.com', ?, 'Admin User', 'admin', 'https://ui-avatars.com/api/?name=Admin+User&background=3b82f6&color=fff')`,
      [hashedPassword]
    );

    // Create teacher
    await query(
      `INSERT IGNORE INTO users (email, password, name, role, avatar) VALUES 
      ('teacher@eschool.com', ?, 'Marie Curie', 'teacher', 'https://ui-avatars.com/api/?name=Marie+Curie&background=10b981&color=fff')`,
      [hashedPassword]
    );

    // Get teacher ID
    const [teachers] = await query('SELECT id FROM users WHERE email = ?', ['teacher@eschool.com']);
    const teacherId = teachers[0]?.id;

    if (teacherId) {
      // Create classes
      await query(
        `INSERT IGNORE INTO classes (name, description, teacher_id) VALUES 
        ('6ème A', 'Classe de 6ème année A', ?),
        ('5ème B', 'Classe de 5ème année B', ?),
        ('4ème C', 'Classe de 4ème année C', ?)`,
        [teacherId, teacherId, teacherId]
      );
    }

    // Create student
    await query(
      `INSERT IGNORE INTO users (email, password, name, role, avatar) VALUES 
      ('student@eschool.com', ?, 'Albert Einstein', 'student', 'https://ui-avatars.com/api/?name=Albert+Einstein&background=6366f1&color=fff')`,
      [hashedPassword]
    );

    // Create parent
    await query(
      `INSERT IGNORE INTO users (email, password, name, role, avatar) VALUES 
      ('parent@eschool.com', ?, 'Sophie Germain', 'parent', 'https://ui-avatars.com/api/?name=Sophie+Germain&background=f59e0b&color=fff')`,
      [hashedPassword]
    );

    // Link parent to student
    const [students] = await query('SELECT id FROM users WHERE email = ?', ['student@eschool.com']);
    const [parents] = await query('SELECT id FROM users WHERE email = ?', ['parent@eschool.com']);

    if (students[0] && parents[0]) {
      await query(
        'INSERT IGNORE INTO parent_students (parent_id, student_id) VALUES (?, ?)',
        [parents[0].id, students[0].id]
      );
    }

    console.log('✅ Données de seed créées');
  } catch (error) {
    console.error('❌ Erreur lors du seed:', error);
    throw error;
  }
};

const main = async () => {
  try {
    await seedData();
    console.log('✅ Seed terminé avec succès');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur:', error);
    process.exit(1);
  }
};

main();

