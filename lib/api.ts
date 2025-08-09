// lib/api.ts

import axios from "axios";
import type {
  Note,
  NoteTag,
  CreateNoteData,
  UpdateNoteData,
} from "../types/note";

// Тип відповіді для списку нотаток
export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

// Payload для створення нотатки
export interface CreateNotePayload {
  title: string;
  content: string;
  tag: NoteTag;
}

const api = axios.create({
  baseURL: "https://notehub-public.goit.study/api", // ✅ Виправлено: видалено пробіли
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});

// Отримати всі нотатки (із пагінацією та фільтром за тегом)
export async function fetchNotes({
  page = 1,
  search = "",
}: {
  page?: number;
  search?: string;
}): Promise<FetchNotesResponse> {
  const response = await api.get<FetchNotesResponse>("/notes", {
    params: { page, search },
  });
  return response.data;
}

// Створити нову нотатку
export async function createNote(payload: CreateNoteData): Promise<Note> {
  const response = await api.post<Note>("/notes", payload);
  return response.data;
}

// Видалити нотатку за ID
export async function deleteNote(id: string): Promise<Note> {
  const response = await api.delete<Note>(`/notes/${id}`);
  return response.data;
}

// Отримати одну нотатку за ID
export async function fetchNoteById(id: string): Promise<Note> {
  const response = await api.get<Note>(`/notes/${id}`);
  return response.data;
}
