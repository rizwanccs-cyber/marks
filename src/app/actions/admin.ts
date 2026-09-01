'use server';

import prisma from "@/lib/db";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

async function verifyAdmin() {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }
}

export async function createCourse(prevState: any, formData: FormData) {
  await verifyAdmin();
  const name = formData.get("name") as string;
  if (!name) return { error: "Course name is required" };

  try {
    await prisma.course.create({ data: { name } });
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    return { error: "Failed to create course" };
  }
}

export async function createSemester(prevState: any, formData: FormData) {
  await verifyAdmin();
  const name = formData.get("name") as string;
  const courseId = formData.get("courseId") as string;
  
  if (!name || !courseId) return { error: "Semester name and Course are required" };

  try {
    await prisma.semester.create({ data: { name, courseId } });
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    return { error: "Failed to create semester" };
  }
}

export async function createSubject(prevState: any, formData: FormData) {
  await verifyAdmin();
  const name = formData.get("name") as string;
  const semesterId = formData.get("semesterId") as string;

  if (!name || !semesterId) return { error: "Subject name and Semester are required" };

  try {
    await prisma.subject.create({ data: { name, semesterId } });
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    return { error: "Failed to create subject" };
  }
}
