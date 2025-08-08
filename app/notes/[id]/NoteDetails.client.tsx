"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import css from "./NoteDetails.module.css";
import Link from "next/link";

interface NoteDetailsClientProps {
  noteId: string;
}

export default function NoteDetailsClient({ noteId }: NoteDetailsClientProps) {
  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
    refetchOnMount: false,
  });

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (isError || !note) {
    return (
      <div className={css.container}>
        <h2 className={css.header}>Ошибка: заметка не найдена</h2>
        <Link href="/notes" className={css.link}>
          ← Назад
        </Link>
      </div>
    );
  }

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.content}>{note.content}</p>
        <div className={css.date}>{note.date}</div>
        <div className={css.tag}>{note.tag}</div>
        <Link href="/notes" className={css.link}>
          ← Назад
        </Link>
      </div>
    </div>
  );
}
