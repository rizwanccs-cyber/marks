import { Settings } from "lucide-react";
import prisma from "@/lib/db";
import { CourseForm, SemesterForm, SubjectForm } from "./AdminForms";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { LogoutButton } from "@/components/LogoutButton";

export default async function AdminDashboard() {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    redirect("/login");
  }

  const courses = await prisma.course.findMany({ orderBy: { name: 'asc' } });
  const semesters = await prisma.semester.findMany({ 
    include: { course: true, subjects: true },
    orderBy: { name: 'asc' }
  });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div>
          <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Settings size={36} color="var(--accent-primary)" />
            Admin Dashboard
          </h1>
          <p className="text-muted" style={{ marginTop: '0.5rem' }}>Manage institution structure</p>
        </div>
        <LogoutButton />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        <CourseForm />
        <SemesterForm courses={courses} />
        <SubjectForm semesters={semesters} />
      </div>

      <div style={{ marginTop: '4rem' }}>
        <h2 style={{ marginBottom: '1.5rem' }}>Current Structure</h2>
        <div className="glass-panel" style={{ padding: '2rem', overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>Course</th>
                <th>Semester</th>
                <th>Subject</th>
              </tr>
            </thead>
            <tbody>
              {semesters.map(semester => (
                <tr key={semester.id}>
                  <td>{semester.course.name}</td>
                  <td>{semester.name}</td>
                  <td>
                    <ul style={{ listStylePosition: 'inside', color: 'var(--text-secondary)' }}>
                      {semester.subjects?.length > 0 
                        ? semester.subjects.map((sub: any) => <li key={sub.id}>{sub.name}</li>) 
                        : <li>No subjects added</li>}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
