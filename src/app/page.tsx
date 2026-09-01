import Link from "next/link";
import { ArrowRight, BookOpen, UserCheck, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem', alignItems: 'center', textAlign: 'center', paddingTop: '4rem' }}>
      
      <div style={{ maxWidth: '800px' }}>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', background: 'linear-gradient(to right, #f1f5f9, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Modern Student Marks Management
        </h1>
        <p className="text-muted" style={{ fontSize: '1.25rem', marginBottom: '2.5rem' }}>
          A sleek, lightweight platform for administrators, teachers, and students to seamlessly manage and track academic performance.
        </p>
        <Link href="/login" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.125rem' }}>
          Get Started <ArrowRight size={20} />
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', width: '100%', marginTop: '2rem' }}>
        
        <div className="glass-panel" style={{ padding: '2rem', textAlign: 'left' }}>
          <ShieldCheck size={40} color="var(--accent-primary)" style={{ marginBottom: '1.5rem' }} />
          <h3 style={{ marginBottom: '1rem' }}>Administrator</h3>
          <p className="text-muted">Create courses, manage semesters, and structure subjects seamlessly across the institution.</p>
        </div>

        <div className="glass-panel" style={{ padding: '2rem', textAlign: 'left' }}>
          <UserCheck size={40} color="var(--success)" style={{ marginBottom: '1.5rem' }} />
          <h3 style={{ marginBottom: '1rem' }}>Teacher</h3>
          <p className="text-muted">Enroll students into courses and smoothly input in-semester and end-semester marks.</p>
        </div>

        <div className="glass-panel" style={{ padding: '2rem', textAlign: 'left' }}>
          <BookOpen size={40} color="var(--warning)" style={{ marginBottom: '1.5rem' }} />
          <h3 style={{ marginBottom: '1rem' }}>Student</h3>
          <p className="text-muted">Log in to your personalized dashboard to view your enrolled courses and track your academic progress.</p>
        </div>

      </div>

    </div>
  );
}
