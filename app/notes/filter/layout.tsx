import "./LayoutNotes.module.css";

export const metadata = {
  title: "NoteHub",
  description: "Заметки с фильтрацией и модалками",
};

export default function FilterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      {/* Контейнер для модальных окон через портал */}
      <div id="modal-root"></div>
    </>
  );
}
