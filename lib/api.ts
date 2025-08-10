import axios from "axios";
import type { Note, NoteTag, CreateNoteData } from "../types/note"; // Убрал UpdateNoteData

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
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN || ""}`, // Добавлен fallback на пустую строку
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
    const params: Record<string, string | number | undefined> = {
      page,
      search,
    };

    if (tag && tag.toLowerCase() !== "all") {
      params.tag = tag;
    }

    const response = await api.get<FetchNotesResponse>("/notes", { params });
    return response.data;
  } catch (error: unknown) {
    console.error("Error fetching notes:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to fetch notes: ${error.message}`);
    }
    throw new Error("Unknown error occurred while fetching notes");
  }
}

// Створити нову нотатку
export async function createNote(payload: CreateNoteData): Promise<Note> {
  try {
    const response = await api.post<Note>("/notes", payload);
    return response.data;
  } catch (error: unknown) {
    console.error("Error creating note:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to create note: ${error.message}`);
    }
    throw new Error("Unknown error occurred while creating note");
  }
}

// Видалити нотатку за ID
export async function deleteNote(id: string): Promise<Note> {
  try {
    const response = await api.delete<Note>(`/notes/${id}`);
    return response.data;
  } catch (error: unknown) {
    console.error("Error deleting note:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to delete note: ${error.message}`);
    }
    throw new Error("Unknown error occurred while deleting note");
  }
}

// Отримати одну нотатку за ID
export async function fetchNoteById(id: string): Promise<Note> {
  try {
    const response = await api.get<Note>(`/notes/${id}`);
    return response.data;
  } catch (error: unknown) {
    console.error("Error fetching note by ID:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to fetch note by ID: ${error.message}`);
    }
    throw new Error("Unknown error occurred while fetching note by ID");
  }
}
