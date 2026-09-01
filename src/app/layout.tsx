import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { GraduationCap } from "lucide-react";

export const metadata: Metadata = {
  title: "Student Marks Management",
  description: "A lightweight app for managing student marks.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header style={{ borderBottom: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)', padding: '1rem 0' }}>
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-primary)', fontWeight: '600', fontSize: '1.25rem' }}>
              <GraduationCap size={28} color="var(--accent-primary)" />
              UniMarks
            </Link>
            <nav style={{ display: 'flex', gap: '1rem' }}>
              <Link href="/login" className="btn-secondary" style={{ padding: '0.5rem 1rem' }}>Login</Link>
            </nav>
          </div>
        </header>
        <main className="page-wrapper container animate-fade-in">
          {children}
        </main>
      </body>
    </html>
  );
}
