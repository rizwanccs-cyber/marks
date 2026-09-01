'use server';

import prisma from "@/lib/db";
import { comparePassword, setSession, clearSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function login(prevState: any, formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (!username || !password) {
    return { error: "Username and password are required" };
  }

  const user = await prisma.user.findFirst({
    where: {
      OR: [
        { username: username },
        { email: username },
        { rollNo: username }
      ]
    }
  });

  if (!user) {
    return { error: "Invalid credentials" };
  }

  const isValid = await comparePassword(password, user.passwordHash);

  if (!isValid) {
    return { error: "Invalid credentials" };
  }

  await setSession({
    id: user.id,
    role: user.role,
    name: user.name,
  });

  if (user.role === "ADMIN") {
    redirect("/admin");
  } else if (user.role === "TEACHER") {
    redirect("/teacher");
  } else {
    redirect("/student");
  }
}

export async function logout() {
  await clearSession();
  redirect("/login");
}
