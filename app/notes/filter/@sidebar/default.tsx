"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import css from "@/components/TagsMenu/TagsMenu.module.css";

const tags = [
  { name: "All", slug: "All" },
  { name: "Todo", slug: "Todo" },
  { name: "Work", slug: "Work" },
  { name: "Personal", slug: "Personal" },
  { name: "Meeting", slug: "Meeting" },
  { name: "Shopping", slug: "Shopping" },
];

export default function SidebarPage() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Закрытие меню при клике вне компонента
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const container = document.querySelector(`.${css.menuContainer}`);
      if (container && !container.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="sidebar">
      <h2>Фільтри за тегами</h2>
      <div className={css.menuContainer}>
        <button className={css.menuButton} onClick={toggleMenu}>
          Notes ▾
        </button>
        {isOpen && (
          <ul className={css.menuList}>
            {tags.map((tag) => (
              <li key={tag.slug} className={css.menuItem}>
                <Link
                  href={`/notes/filter/${tag.slug}`}
                  className={`${css.menuLink} ${
                    pathname === `/notes/filter/${tag.slug}` ? "active" : ""
                  }`}
                  onClick={toggleMenu}
                >
                  {tag.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
      <style jsx>{`
        .sidebar {
          padding: 1rem;
          background: #f5f5f5;
          border-right: 1px solid #ddd;
          min-height: 100vh; /* Чтобы панель занимала всю высоту */
        }
        h2 {
          font-size: 1.2rem;
          margin-bottom: 1rem;
        }
      `}</style>
    </nav>
  );
}
