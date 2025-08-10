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
    // Предварительно загружаем данные на сервере
    await queryClient.prefetchQuery({
      queryKey: ["note", id], // Уникальный ключ для заметки
      queryFn: () => fetchNoteById(id), // Выполняем реальный запрос
    });

    // Получаем данные для проверки (опционально, для валидации)
    const note = await queryClient.getQueryData(["note", id]);
    if (!note || !note.id) {
      notFound();
    }
  } catch (error) {
    console.error("Failed to fetch note:", error);
    notFound();
  }

  // Рендерим клиентский компонент с дегидратированным состоянием
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient noteId={id} />
    </HydrationBoundary>
  );
}
