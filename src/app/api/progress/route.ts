import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth';
import { getDb, initDb } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const session = await getSessionUser();
    if (!session) {
      return NextResponse.json({ error: 'Não autenticado.' }, { status: 401 });
    }

    const { completedSkills, completedProjects } = await req.json();

    const db = getDb();
    await initDb();

    await db.execute({
      sql: `INSERT INTO user_progress (user_id, completed_skills, completed_projects, updated_at)
            VALUES (?, ?, ?, datetime('now'))
            ON CONFLICT(user_id)
            DO UPDATE SET completed_skills = ?, completed_projects = ?, updated_at = datetime('now')`,
      args: [
        session.userId,
        JSON.stringify(completedSkills || []),
        JSON.stringify(completedProjects || []),
        JSON.stringify(completedSkills || []),
        JSON.stringify(completedProjects || []),
      ],
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Progress save error:', error);
    return NextResponse.json({ error: 'Erro ao salvar progresso.' }, { status: 500 });
  }
}
