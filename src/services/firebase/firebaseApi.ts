import axios from "axios";

export const firebaseApi = axios.create({
  baseURL: "https://firestore.googleapis.com/v1", // базовый URL для Firestore API
  headers: {
    "Content-Type": "application/json",
  },
});
