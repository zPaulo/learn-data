import { NextRequest, NextResponse } from 'next/server';
import { getDb, initDb } from '@/lib/db';
import { hashPassword, createToken, setSessionCookie } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ error: 'Usuário e senha são obrigatórios.' }, { status: 400 });
    }

    if (username.length < 2 || username.length > 30) {
      return NextResponse.json({ error: 'O nome deve ter entre 2 e 30 caracteres.' }, { status: 400 });
    }

    if (password.length < 4) {
      return NextResponse.json({ error: 'A senha deve ter pelo menos 4 caracteres.' }, { status: 400 });
    }

    const db = getDb();
    await initDb();

    // Check if username exists
    const existing = await db.execute({
      sql: 'SELECT id FROM users WHERE username = ?',
      args: [username],
    });

    if (existing.rows.length > 0) {
      return NextResponse.json({ error: 'Este nome de usuário já está em uso.' }, { status: 409 });
    }

    const passwordHash = await hashPassword(password);

    const result = await db.execute({
      sql: 'INSERT INTO users (username, password_hash) VALUES (?, ?)',
      args: [username, passwordHash],
    });

    const userId = Number(result.lastInsertRowid);

    // Create empty progress
    await db.execute({
      sql: 'INSERT INTO user_progress (user_id) VALUES (?)',
      args: [userId],
    });

    const token = await createToken(userId, username);
    await setSessionCookie(token);

    return NextResponse.json({
      username,
      createdAt: new Date().toISOString(),
      completedSkills: [],
      completedProjects: [],
    });
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json({ error: 'Erro interno do servidor.' }, { status: 500 });
  }
}
