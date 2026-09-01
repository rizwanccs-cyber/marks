import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { hashPassword } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const adminCount = await prisma.user.count({ where: { role: 'ADMIN' } });
    if (adminCount > 0) {
      return NextResponse.json({ message: 'Database already seeded' });
    }

    const passwordHash = await hashPassword('password123');

    await prisma.user.create({
      data: {
        name: 'Super Admin',
        username: 'admin',
        passwordHash,
        role: 'ADMIN'
      }
    });

    await prisma.user.create({
      data: {
        name: 'John Teacher',
        username: 'teacher',
        passwordHash,
        role: 'TEACHER'
      }
    });

    await prisma.user.create({
      data: {
        name: 'Alice Student',
        username: 'student',
        rollNo: 'CS101',
        passwordHash,
        role: 'STUDENT'
      }
    });

    return NextResponse.json({ message: 'Seed successful! Login with admin/password123, teacher/password123, student/password123' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to seed' }, { status: 500 });
  }
}
