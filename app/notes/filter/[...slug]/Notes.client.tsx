"use client";

import React, { useState } from "react";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { fetchNotes, FetchNotesResponse } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./NotesPage.module.css";
import { Note } from "@/types/note";

interface NotesClientProps {
  initialNotes: Note[];
  initialTotalPages: number;
  initialTag?: string;
}

export default function NotesClient({
  initialNotes,
  initialTotalPages,
  initialTag = "",
}: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState(initialTag);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [debouncedSearch] = useDebounce(search, 500);

  const queryOptions: UseQueryOptions<FetchNotesResponse, Error> = {
    queryKey: ["notes", page, debouncedSearch],
    queryFn: () => fetchNotes({ page, tag: debouncedSearch }),
    keepPreviousData: true,
    initialData: {
      notes: initialNotes,
      totalPages: initialTotalPages,
    },
  };

  const { data, isLoading, error } = useQuery(queryOptions);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handlePageChange = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={search} onChange={handleSearchChange} />
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>

      {isLoading && <p>Loading...</p>}

      {error && (
        <div className={css.error}>
          Error:{" "}
          {error instanceof Error ? error.message : "Something went wrong"}
        </div>
      )}

      {data?.notes?.length ? (
        <>
          <NoteList notes={data.notes} />
          {data.totalPages > 1 && (
            <Pagination
              pageCount={data.totalPages}
              onPageChange={handlePageChange}
              currentPage={page - 1}
            />
          )}
        </>
      ) : (
        !isLoading && <div className={css.noNotes}>No notes found</div>
      )}

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
}
