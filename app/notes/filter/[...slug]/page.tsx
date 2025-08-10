import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

type Props = {
  params: { slug?: string[] };
};

export default async function NotesPage({ params }: Props) {
  const slug = params?.slug || [];
  const tag = slug[0] === "all" ? undefined : slug[0];

  const { notes, totalPages } = await fetchNotes({ page: 1, search: "", tag });

  return (
    <NotesClient
      initialNotes={notes}
      initialTotalPages={totalPages}
      selectedTag={tag}
    />
  );
}
