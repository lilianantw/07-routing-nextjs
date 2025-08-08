import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

export default async function NotesPage() {
  const { notes, totalPages } = await fetchNotes({ page: 1, search: "" });

  return <NotesClient initialNotes={notes} initialTotalPages={totalPages} />;
}
