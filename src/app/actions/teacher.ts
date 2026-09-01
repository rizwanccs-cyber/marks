'use server';

import prisma from "@/lib/db";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

async function verifyTeacher() {
  const session = await getSession();
  if (!session || session.role !== "TEACHER") {
    throw new Error("Unauthorized");
  }
}

export async function enrollStudent(prevState: any, formData: FormData) {
  await verifyTeacher();
  const studentId = formData.get("studentId") as string;
  const courseId = formData.get("courseId") as string;
  const semesterId = formData.get("semesterId") as string;

  if (!studentId || !courseId || !semesterId) {
    return { error: "All fields are required" };
  }

  try {
    await prisma.enrollment.create({
      data: { studentId, courseId, semesterId }
    });
    revalidatePath("/teacher");
    return { success: true };
  } catch (error) {
    return { error: "Student may already be enrolled or error occurred." };
  }
}

export async function updateMarks(prevState: any, formData: FormData) {
  await verifyTeacher();
  const studentId = formData.get("studentId") as string;
  const subjectId = formData.get("subjectId") as string;
  const insem = formData.get("insem") as string;
  const endsem = formData.get("endsem") as string;

  if (!studentId || !subjectId) return { error: "Student and Subject are required" };

  try {
    await prisma.mark.upsert({
      where: {
        studentId_subjectId: { studentId, subjectId }
      },
      update: {
        insemMarks: insem ? parseFloat(insem) : null,
        endsemMarks: endsem ? parseFloat(endsem) : null,
      },
      create: {
        studentId,
        subjectId,
        insemMarks: insem ? parseFloat(insem) : null,
        endsemMarks: endsem ? parseFloat(endsem) : null,
      }
    });
    revalidatePath("/teacher");
    return { success: true };
  } catch (error) {
    return { error: "Failed to update marks" };
  }
}
