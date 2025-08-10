"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Modal from "@/components/Modal/Modal";
import { fetchNoteById } from "@/lib/api";
import type { Note } from "@/types/note";

interface NotePreviewClientProps {
  noteId: string;
}

export default function NotePreviewClient({ noteId }: NotePreviewClientProps) {
  const router = useRouter();
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNoteById(noteId)
      .then((data) => setNote(data))
      .finally(() => setLoading(false));
  }, [noteId]);

  const closeModal = () => router.back();

  if (loading) return null;

  return (
    <Modal onClose={closeModal}>
      {note ? (
        <>
          <h2>{note.title}</h2>
          <p>{note.content}</p>
        </>
      ) : (
        <p>Note not found</p>
      )}
    </Modal>
  );
}
