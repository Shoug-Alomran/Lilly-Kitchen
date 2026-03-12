"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
  const [query, setQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 24);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
  }, [pathname]);

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

  const isTransparent = pathname === "/" && !isScrolled && !isMenuOpen && !isSearchOpen;

  return (
    <header className={`site-header ${isTransparent ? "is-transparent" : ""}`}>
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
          <button
            type="button"
            className="site-menu-toggle"
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation menu"
            onClick={() => setIsMenuOpen((value) => !value)}
          >
            Menu
          </button>
          <Link href="/account" className="site-avatar" aria-label="Account">
            L
          </Link>
        </div>
      </div>

      <div className={`site-mobile-panel ${isMenuOpen ? "is-open" : ""}`}>
        <nav className="site-mobile-nav" aria-label="Mobile">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={pathname === item.href ? "is-active" : ""}>
              {item.label}
            </Link>
          ))}
          <Link href="/account">Account</Link>
          <Link href="/login">Login</Link>
          <Link href="/signup">Sign Up</Link>
        </nav>
      </div>
    </header>
  );
}
