import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "./NoteDetails.client";
import { notFound } from "next/navigation";

export default async function NoteDetailsPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;

  if (!id) {
    notFound();
  }

  const queryClient = new QueryClient();

  try {
    const note = await fetchNoteById(id); // передаем строку
    if (!note || !note.id) {
      notFound();
    }

    await queryClient.prefetchQuery({
      queryKey: ["note", id],
      queryFn: () => Promise.resolve(note),
    });
  } catch {
    notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient noteId={id} /> {/* передаем строку */}
    </HydrationBoundary>
  );
}
