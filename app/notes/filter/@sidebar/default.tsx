"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import css from "@/components/TagsMenu/TagsMenu.module.css";

const tags = [
  { name: "All notes", slug: "All" },
  { name: "Todo", slug: "Todo" },
  { name: "Work", slug: "Work" },
  { name: "Personal", slug: "Personal" },
  { name: "Meeting", slug: "Meeting" },
  { name: "Shopping", slug: "Shopping" },
];

export default function TagsMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const container = document.querySelector(`.${css.menuContainer}`);
      if (container && !container.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={css.menuContainer}>
      <button className={css.menuButton} onClick={() => setIsOpen(!isOpen)}>
        Notes ▾
      </button>
      {isOpen && (
        <ul className={css.menuList}>
          {tags.map((tag) => (
            <li key={tag.slug} className={css.menuItem}>
              <Link
                href={`/notes/filter/${tag.slug}`}
                className={`${css.menuLink} ${
                  pathname === `/notes/filter/${tag.slug}` ? css.active : ""
                }`}
                onClick={() => setIsOpen(false)}
              >
                {tag.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
