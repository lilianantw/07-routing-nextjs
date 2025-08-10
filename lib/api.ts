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
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});

// Отримати всі нотатки (із пагінацією, пошуком і фільтрацією за тегом)
export async function fetchNotes({
  page = 1,
  search = "",
  tag,
}: {
  page?: number;
  search?: string;
  tag?: string;
}): Promise<FetchNotesResponse> {
  try {
    // Заменяем Record<string, any> на более конкретный тип
    const params: Record<string, string | number | undefined> = {
      page,
      search,
    };

    // Передаємо тег тільки якщо він заданий і не "all"
    if (tag && tag.toLowerCase() !== "all") {
      params.tag = tag;
    }

    const response = await api.get<FetchNotesResponse>("/notes", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching notes:", error);
    throw error;
  }
}

// Створити нову нотатку
export async function createNote(payload: CreateNoteData): Promise<Note> {
  try {
    const response = await api.post<Note>("/notes", payload);
    return response.data;
  } catch (error) {
    console.error("Error creating note:", error);
    throw error;
  }
}

// Видалити нотатку за ID
export async function deleteNote(id: string): Promise<Note> {
  try {
    const response = await api.delete<Note>(`/notes/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting note:", error);
    throw error;
  }
}

// Отримати одну нотатку за ID
export async function fetchNoteById(id: string): Promise<Note> {
  try {
    const response = await api.get<Note>(`/notes/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching note by ID:", error);
    throw error;
  }
}
