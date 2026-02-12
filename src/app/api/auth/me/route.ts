import { NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth';
import { getDb, initDb } from '@/lib/db';

export async function GET() {
  try {
    const session = await getSessionUser();
    if (!session) {
      return NextResponse.json({ error: 'Não autenticado.' }, { status: 401 });
    }

    const db = getDb();
    await initDb();

    const progressResult = await db.execute({
      sql: 'SELECT completed_skills, completed_projects FROM user_progress WHERE user_id = ?',
      args: [session.userId],
    });

    const userResult = await db.execute({
      sql: 'SELECT created_at FROM users WHERE id = ?',
      args: [session.userId],
    });

    let completedSkills: string[] = [];
    let completedProjects: string[] = [];

    if (progressResult.rows.length > 0) {
      const row = progressResult.rows[0];
      completedSkills = JSON.parse((row.completed_skills as string) || '[]');
      completedProjects = JSON.parse((row.completed_projects as string) || '[]');
    }

    return NextResponse.json({
      username: session.username,
      createdAt: (userResult.rows[0]?.created_at as string) || new Date().toISOString(),
      completedSkills,
      completedProjects,
    });
  } catch (error) {
    console.error('Me error:', error);
    return NextResponse.json({ error: 'Erro interno do servidor.' }, { status: 500 });
  }
}
