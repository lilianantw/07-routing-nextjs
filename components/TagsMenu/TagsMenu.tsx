import css from "./TagsMenu.module.css";
import Link from "next/link";

const tags = [
  { name: "All", slug: "All" },
  { name: "Todo", slug: "Todo" },
  { name: "Work", slug: "Work" },
  { name: "Personal", slug: "Personal" },
  { name: "Meeting", slug: "Meeting" },
  { name: "Shopping", slug: "Shopping" },
];

export default function TagsMenu() {
  return (
    <div className={css.menuContainer}>
      <button className={css.menuButton}>Notes ▾</button>
      <ul className={css.menuList}>
        {tags.map((tag) => (
          <li key={tag.slug} className={css.menuItem}>
            <Link href={`/notes/filter/${tag.slug}`} className={css.menuLink}>
              {tag.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
