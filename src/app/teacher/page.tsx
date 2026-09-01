import prisma from "@/lib/db";
import { EnrollStudentForm, MarksForm } from "./TeacherForms";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { UserCheck } from "lucide-react";
import { LogoutButton } from "@/components/LogoutButton";

export default async function TeacherDashboard() {
  const session = await getSession();
  if (!session || session.role !== "TEACHER") {
    redirect("/login");
  }

  const students = await prisma.user.findMany({ where: { role: 'STUDENT' }, orderBy: { name: 'asc' } });
  const courses = await prisma.course.findMany({ orderBy: { name: 'asc' } });
  const semesters = await prisma.semester.findMany({ include: { course: true }, orderBy: { name: 'asc' } });
  const subjects = await prisma.subject.findMany({ orderBy: { name: 'asc' } });
  
  const enrollments = await prisma.enrollment.findMany({
    include: {
      student: true,
      course: true,
      semester: true
    },
    orderBy: { student: { name: 'asc' } }
  });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div>
          <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <UserCheck size={36} color="var(--success)" />
            Teacher Dashboard
          </h1>
          <p className="text-muted" style={{ marginTop: '0.5rem' }}>Manage enrollments and marks</p>
        </div>
        <LogoutButton />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
        <EnrollStudentForm students={students} courses={courses} semesters={semesters} />
        <MarksForm students={students} subjects={subjects} />
      </div>

      <div style={{ marginTop: '4rem' }}>
        <h2 style={{ marginBottom: '1.5rem' }}>Enrolled Students</h2>
        <div className="glass-panel" style={{ padding: '2rem', overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>Roll No</th>
                <th>Name</th>
                <th>Course</th>
                <th>Semester</th>
              </tr>
            </thead>
            <tbody>
              {enrollments.length > 0 ? enrollments.map(e => (
                <tr key={e.id}>
                  <td>{e.student.rollNo}</td>
                  <td>{e.student.name}</td>
                  <td>{e.course.name}</td>
                  <td>{e.semester.name}</td>
                </tr>
              )) : <tr><td colSpan={4}>No students enrolled yet.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
