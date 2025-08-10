"use client"; // для использования useRouter и хуков

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Modal from "@/components/Modal/Modal";
import { fetchNoteById } from "@/lib/api";
import type { Note } from "@/types/note";

type Props = {
  params: { id: string };
};

export default function NotePreview({ params }: Props) {
  const router = useRouter();
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNoteById(params.id)
      .then((data) => setNote(data))
      .finally(() => setLoading(false));
  }, [params.id]);

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
