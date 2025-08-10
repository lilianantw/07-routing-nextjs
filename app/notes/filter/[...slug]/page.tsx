import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

type Props = {
  params: Promise<{ slug?: string[] }>;
};

export default async function NotesPage({ params }: Props) {
  const { slug } = await params;
  const tag = slug?.[0]?.toLowerCase() === "all" ? undefined : slug?.[0];

  const { notes, totalPages } = await fetchNotes({ page: 1, search: "", tag });

  return (
    <NotesClient
      initialNotes={notes}
      initialTotalPages={totalPages}
      selectedTag={tag}
    />
  );
}
