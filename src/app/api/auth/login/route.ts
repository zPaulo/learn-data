import { NextRequest, NextResponse } from 'next/server';
import { getDb, initDb } from '@/lib/db';
import { verifyPassword, createToken, setSessionCookie } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ error: 'Usuário e senha são obrigatórios.' }, { status: 400 });
    }

    const db = getDb();
    await initDb();

    const userResult = await db.execute({
      sql: 'SELECT id, password_hash, created_at FROM users WHERE username = ?',
      args: [username],
    });

    if (userResult.rows.length === 0) {
      return NextResponse.json({ error: 'Usuário ou senha incorretos.' }, { status: 401 });
    }

    const user = userResult.rows[0];
    const valid = await verifyPassword(password, user.password_hash as string);

    if (!valid) {
      return NextResponse.json({ error: 'Usuário ou senha incorretos.' }, { status: 401 });
    }

    const userId = Number(user.id);
    const token = await createToken(userId, username);
    await setSessionCookie(token);

    // Load progress
    const progressResult = await db.execute({
      sql: 'SELECT completed_skills, completed_projects FROM user_progress WHERE user_id = ?',
      args: [userId],
    });

    let completedSkills: string[] = [];
    let completedProjects: string[] = [];

    if (progressResult.rows.length > 0) {
      const row = progressResult.rows[0];
      completedSkills = JSON.parse((row.completed_skills as string) || '[]');
      completedProjects = JSON.parse((row.completed_projects as string) || '[]');
    }

    return NextResponse.json({
      username,
      createdAt: user.created_at as string,
      completedSkills,
      completedProjects,
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Erro interno do servidor.' }, { status: 500 });
  }
}
