import NotePreviewModal from "./NotePreview.client";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function NotePage({ params }: PageProps) {
  const { id } = await params;

  return <NotePreviewModal noteId={id} />;
}
