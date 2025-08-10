"use client";

import { useRouter } from "next/navigation";
import Modal from "@/components/Modal/Modal";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import Loader from "@/components/Loader/Loader";
import css from "./NotePreview.module.css";
import { Note } from "@/types/note";

interface NotePreviewProps {
  id: string;
}

export default function NotePreview({ id }: NotePreviewProps) {
  const router = useRouter();

  const { data: note, isLoading } = useQuery<Note>({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  const handleClose = () => {
    router.back();
  };

  if (isLoading) return <Loader />;
  if (!note) return null;

  return (
    <Modal onClose={handleClose}>
      <div className={css.preview}>
        <div className={css.header}>
          <h2 className={css.title}>{note.title}</h2>
        </div>
        <div className={css.body}>
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>
            {new Date(note.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          {note.tag && <span className={css.tag}>{note.tag}</span>}
        </div>
      </div>
    </Modal>
  );
}
