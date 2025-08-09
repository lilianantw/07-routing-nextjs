"use client";

import Link from "next/link";

export default function Error() {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Что-то пошло не так.</h1>
      <p>Не удалось загрузить заметки.</p>
      <Link
        href="/notes/filter/All"
        style={{ color: "#0070f3", textDecoration: "underline" }}
      >
        ← Вернуться к списку заметок
      </Link>
    </div>
  );
}
