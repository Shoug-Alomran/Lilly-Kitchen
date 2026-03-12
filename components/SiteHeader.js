"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/recipes", label: "Recipes" },
  { href: "/categories", label: "Categories" },
  { href: "/collections", label: "Collections" },
  { href: "/about", label: "About" },
  { href: "/saved", label: "Saved" }
];

export default function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("search") || "");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  function handleSearchSubmit(event) {
    event.preventDefault();

    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      router.push("/recipes");
      setIsSearchOpen(false);
      return;
    }

    router.push(`/recipes?search=${encodeURIComponent(trimmedQuery)}`);
    setIsSearchOpen(false);
  }

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" className="site-brand">
          Lilly Kitchen
        </Link>

        <nav className="site-nav" aria-label="Primary">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={pathname === item.href ? "is-active" : ""}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="site-header__actions">
          <form className={`site-search ${isSearchOpen ? "is-open" : ""}`} onSubmit={handleSearchSubmit}>
            {isSearchOpen ? (
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search recipes..."
                aria-label="Search recipes"
                autoFocus
              />
            ) : null}
            <button
              type={isSearchOpen ? "submit" : "button"}
              className="site-search__button"
              onClick={() => {
                if (!isSearchOpen) {
                  setIsSearchOpen(true);
                }
              }}
            >
              Search
            </button>
          </form>
          <Link href="/account" className="site-avatar" aria-label="Account">
            L
          </Link>
        </div>
      </div>
    </header>
  );
}
