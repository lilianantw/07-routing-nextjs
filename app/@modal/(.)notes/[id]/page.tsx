// app/@modal/(.)notes/[id]/page.tsx

import NotePreview from "./NotePreview.client";

interface NoteModalPageProps {
  params: Promise<{ id: string }>; // Оберни в Promise, чтобы подчеркнуть асинхронность
}

export default async function NoteModalPage({ params }: NoteModalPageProps) {
  const { id } = await params; // ✅ await перед использованием
  return <NotePreview id={id} />;
}
