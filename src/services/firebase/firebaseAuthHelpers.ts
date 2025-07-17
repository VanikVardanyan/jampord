// src/api/helpers/firebaseAuthHelpers.ts
import { auth } from "@/firebase/firebase";

export async function getTokenOrThrow() {
  const token = await auth.currentUser?.getIdToken();
  if (!token) {
    throw new Error("Пользователь не авторизован");
  }
  return token;
}

export function getCurrentUserIdOrThrow() {
  const uid = auth.currentUser?.uid;
  if (!uid) {
    throw new Error("Пользователь не авторизован");
  }
  return uid;
}
