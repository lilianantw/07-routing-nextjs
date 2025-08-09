// app/@modal/(.)notes/[id]/NotePreview.tsx

"use client";

import { useRouter } from "next/navigation";
import Modal from "@/components/Modal/Modal";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import Loader from "@/components/Loader/Loader";
import css from "./NotePreview.module.css";

interface NotePreviewProps {
  id: string;
}

export default function NotePreview({ id }: NotePreviewProps) {
  const router = useRouter();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  const handleClose = () => {
    router.back();
  };

  if (isLoading) {
    return (
      <Modal onClose={handleClose}>
        <div className={css.container}>
          <div className={css.item}>
            <Loader />
          </div>
        </div>
      </Modal>
    );
  }

  if (error || !note) {
    return (
      <Modal onClose={handleClose}>
        <div className={css.container}>
          <div className={css.item}>
            <p>Failed to load note.</p>
            <button onClick={handleClose} className={css.backBtn}>
              Back
            </button>
          </div>
        </div>
      </Modal>
    );
  }

  return (
    <Modal onClose={handleClose}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
            <button onClick={handleClose} className={css.backBtn}>
              Back
            </button>
          </div>
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
