// app/notes/filter/[...slug]/page.tsx

import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";

interface NotesPageProps {
  params: Promise<{ slug?: string[] }>;
}

export default async function NotesPage({ params }: NotesPageProps) {
  const { slug } = await params; // ✅ await!
  const tag = slug ? slug[0] : "All";
  const search = tag === "All" ? "" : tag;

  // Получаем начальные данные на сервере
  const initialData = await fetchNotes({ page: 1, search });

  return (
    <NotesClient
      initialNotes={initialData.notes}
      initialTotalPages={initialData.totalPages}
      initialTag={search}
    />
  );
}
