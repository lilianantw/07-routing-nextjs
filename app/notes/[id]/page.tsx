import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "./NoteDetails.client";
import { notFound } from "next/navigation";

export default async function NoteDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Разворачиваем Promise для получения id
  const { id } = await params;

  // Проверяем, существует ли id
  if (!id) {
    notFound();
  }

  const queryClient = new QueryClient();

  try {
    // Загружаем заметку по id
    const note = await fetchNoteById(id);
    if (!note || !note.id) {
      notFound();
    }

    // Предварительно загружаем данные в TanStack Query
    await queryClient.prefetchQuery({
      queryKey: ["note", id],
      queryFn: () => Promise.resolve(note),
    });
  } catch (error) {
    // Обрабатываем ошибку загрузки
    console.error("Failed to fetch note:", error);
    notFound();
  }

  // Рендерим клиентский компонент с предзагруженными данными
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient noteId={id} />
    </HydrationBoundary>
  );
}
