"use client";

import type { Note } from "@/types/note";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "@/lib/api";
import { useRouter } from "next/navigation";
import css from "./NoteList.module.css";

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: removeNote, isPending } = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (window.confirm("Delete this note? This action cannot be undone.")) {
      removeNote(id);
    }
  };

  const openModal = (id: string) => {
    router.push(`/notes/${id}`);
  };

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          <h3 className={css.title}>{note.title}</h3>
          <p className={css.content}>
            {note.content.substring(0, 120)}
            {note.content.length > 120 ? "…" : ""}
          </p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <div style={{ display: "flex", gap: "8px", marginLeft: "auto" }}>
              <button
                type="button"
                className={css.link}
                onClick={() => openModal(note.id)}
              >
                View details
              </button>
              <button
                className={css.button}
                onClick={(e) => handleDelete(note.id, e)}
                disabled={isPending}
                aria-label={`Delete note: ${note.title}`}
              >
                {isPending ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
