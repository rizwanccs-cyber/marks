import prisma from "@/lib/db";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { BookOpen } from "lucide-react";
import { LogoutButton } from "@/components/LogoutButton";

export default async function StudentDashboard() {
  const session = await getSession();
  if (!session || session.role !== "STUDENT") {
    redirect("/login");
  }

  const studentId = session.id as string;

  const enrollments = await prisma.enrollment.findMany({
    where: { studentId },
    include: {
      course: true,
      semester: {
        include: {
          subjects: true
        }
      }
    }
  });

  const marks = await prisma.mark.findMany({
    where: { studentId },
    include: { subject: true }
  });

  const getMarksForSubject = (subjectId: string) => {
    return marks.find(m => m.subjectId === subjectId);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div>
          <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <BookOpen size={36} color="var(--warning)" />
            Student Dashboard
          </h1>
          <p className="text-muted" style={{ marginTop: '0.5rem' }}>Welcome back, {session.name as string}</p>
        </div>
        <LogoutButton />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        {enrollments.length === 0 ? (
          <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
            You are not enrolled in any courses yet.
          </div>
        ) : (
          enrollments.map(enrollment => (
            <div key={enrollment.id}>
              <h2 style={{ marginBottom: '1.5rem', color: 'var(--accent-primary)' }}>
                {enrollment.course.name} <span style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', fontWeight: 400 }}>- {enrollment.semester.name}</span>
              </h2>
              
              <div className="glass-panel" style={{ overflowX: 'auto' }}>
                <table>
                  <thead>
                    <tr>
                      <th>Subject</th>
                      <th>Insem Marks</th>
                      <th>Endsem Marks</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {enrollment.semester.subjects.length > 0 ? (
                      enrollment.semester.subjects.map(subject => {
                        const m = getMarksForSubject(subject.id);
                        const insem = m?.insemMarks ?? 0;
                        const endsem = m?.endsemMarks ?? 0;
                        return (
                          <tr key={subject.id}>
                            <td style={{ fontWeight: 500 }}>{subject.name}</td>
                            <td>{m?.insemMarks !== null ? insem : '-'}</td>
                            <td>{m?.endsemMarks !== null ? endsem : '-'}</td>
                            <td style={{ color: 'var(--success)', fontWeight: 600 }}>
                              {m?.insemMarks !== null || m?.endsemMarks !== null ? (Number(insem) + Number(endsem)) : '-'}
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={4} style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>No subjects mapped for this semester.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
