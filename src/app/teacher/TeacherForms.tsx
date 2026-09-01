'use client';

import { useActionState } from 'react';
import { enrollStudent, updateMarks } from '@/app/actions/teacher';
import { UserPlus, Edit3 } from 'lucide-react';

export function EnrollStudentForm({ students, courses, semesters }: any) {
  const [state, formAction, isPending] = useActionState(enrollStudent as any, { error: '', success: false });

  return (
    <form action={formAction} className="glass-panel" style={{ padding: '2rem' }}>
      <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <UserPlus size={20} color="var(--success)" />
        Enroll Student
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <select name="studentId" required>
          <option value="">Select Student</option>
          {students.map((s: any) => <option key={s.id} value={s.id}>{s.name} ({s.rollNo})</option>)}
        </select>
        <select name="courseId" required>
          <option value="">Select Course</option>
          {courses.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <select name="semesterId" required>
          <option value="">Select Semester</option>
          {semesters.map((s: any) => <option key={s.id} value={s.id}>{s.course.name} - {s.name}</option>)}
        </select>
        
        {state?.error && <div style={{ color: 'var(--danger)', fontSize: '0.9rem' }}>{state.error}</div>}
        {state?.success && <div style={{ color: 'var(--success)', fontSize: '0.9rem' }}>Student Enrolled!</div>}
        <button type="submit" className="btn-primary" disabled={isPending}>
          {isPending ? 'Enrolling...' : 'Enroll Student'}
        </button>
      </div>
    </form>
  );
}

export function MarksForm({ students, subjects }: any) {
  const [state, formAction, isPending] = useActionState(updateMarks as any, { error: '', success: false });

  return (
    <form action={formAction} className="glass-panel" style={{ padding: '2rem' }}>
      <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Edit3 size={20} color="var(--accent-primary)" />
        Update Marks
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <select name="studentId" required>
          <option value="">Select Student</option>
          {students.map((s: any) => <option key={s.id} value={s.id}>{s.name} ({s.rollNo})</option>)}
        </select>
        <select name="subjectId" required>
          <option value="">Select Subject</option>
          {subjects.map((s: any) => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Insem Marks</label>
            <input type="number" step="0.1" name="insem" placeholder="0" />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Endsem Marks</label>
            <input type="number" step="0.1" name="endsem" placeholder="0" />
          </div>
        </div>
        
        {state?.error && <div style={{ color: 'var(--danger)', fontSize: '0.9rem' }}>{state.error}</div>}
        {state?.success && <div style={{ color: 'var(--success)', fontSize: '0.9rem' }}>Marks updated!</div>}
        <button type="submit" className="btn-primary" disabled={isPending}>
          {isPending ? 'Updating...' : 'Save Marks'}
        </button>
      </div>
    </form>
  );
}
