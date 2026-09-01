'use client';

import { useActionState } from 'react';
import { createCourse, createSemester, createSubject } from '@/app/actions/admin';
import { PlusCircle } from 'lucide-react';

export function CourseForm() {
  const [state, formAction, isPending] = useActionState(createCourse as any, { error: '', success: false });

  return (
    <form action={formAction} className="glass-panel" style={{ padding: '2rem' }}>
      <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <PlusCircle size={20} color="var(--accent-primary)" />
        Create Course
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input type="text" name="name" placeholder="Course Name (e.g., B.Tech Computer Science)" required />
        {state?.error && <div style={{ color: 'var(--danger)', fontSize: '0.9rem' }}>{state.error}</div>}
        {state?.success && <div style={{ color: 'var(--success)', fontSize: '0.9rem' }}>Course created successfully!</div>}
        <button type="submit" className="btn-primary" disabled={isPending}>
          {isPending ? 'Creating...' : 'Create Course'}
        </button>
      </div>
    </form>
  );
}

export function SemesterForm({ courses }: { courses: { id: string, name: string }[] }) {
  const [state, formAction, isPending] = useActionState(createSemester as any, { error: '', success: false });

  return (
    <form action={formAction} className="glass-panel" style={{ padding: '2rem' }}>
      <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <PlusCircle size={20} color="var(--accent-primary)" />
        Create Semester
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <select name="courseId" required>
          <option value="">Select Course</option>
          {courses.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <input type="text" name="name" placeholder="Semester Name (e.g., Semester 1)" required />
        {state?.error && <div style={{ color: 'var(--danger)', fontSize: '0.9rem' }}>{state.error}</div>}
        {state?.success && <div style={{ color: 'var(--success)', fontSize: '0.9rem' }}>Semester created!</div>}
        <button type="submit" className="btn-primary" disabled={isPending}>
          {isPending ? 'Creating...' : 'Create Semester'}
        </button>
      </div>
    </form>
  );
}

export function SubjectForm({ semesters }: { semesters: { id: string, name: string, course: { name: string } }[] }) {
  const [state, formAction, isPending] = useActionState(createSubject as any, { error: '', success: false });

  return (
    <form action={formAction} className="glass-panel" style={{ padding: '2rem' }}>
      <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <PlusCircle size={20} color="var(--accent-primary)" />
        Create Subject
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <select name="semesterId" required>
          <option value="">Select Semester</option>
          {semesters.map(s => <option key={s.id} value={s.id}>{s.course.name} - {s.name}</option>)}
        </select>
        <input type="text" name="name" placeholder="Subject Name (e.g., Data Structures)" required />
        {state?.error && <div style={{ color: 'var(--danger)', fontSize: '0.9rem' }}>{state.error}</div>}
        {state?.success && <div style={{ color: 'var(--success)', fontSize: '0.9rem' }}>Subject created!</div>}
        <button type="submit" className="btn-primary" disabled={isPending}>
          {isPending ? 'Creating...' : 'Create Subject'}
        </button>
      </div>
    </form>
  );
}
