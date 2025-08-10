"use client";

import Link from "next/link";
import css from "./SidebarNotes.module.css";

const tags = ["All", "Work", "Personal", "Other"]; // Можно заменить на динамические теги

export default function SidebarNotes() {
  return (
    <ul className={css.menuList}>
      {tags.map((tag) => (
        <li key={tag} className={css.menuItem}>
          <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}
