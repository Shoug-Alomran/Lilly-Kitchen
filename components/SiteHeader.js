"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { localizeHref, switchLocalePath } from "@/lib/i18n";
import { getCurrentUser, getSupabaseBrowserClient, signOutUser } from "@/lib/supabase";

export default function SiteHeader({ locale = "en", dictionary }) {
  const pathname = usePathname();
  const router = useRouter();
  const navItems = [
    { href: "/", label: dictionary.nav.home },
    { href: "/recipes", label: dictionary.nav.recipes },
    { href: "/categories", label: dictionary.nav.categories },
    { href: "/collections", label: dictionary.nav.collections },
    { href: "/about", label: dictionary.nav.about },
    { href: "/saved", label: dictionary.nav.saved }
  ];
  const [query, setQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function loadUser() {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch {
        setUser(null);
      }
    }

    const supabase = getSupabaseBrowserClient();
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    loadUser();

    return () => subscription.unsubscribe();
  }, []);

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
    setIsAccountMenuOpen(false);
  }, [pathname]);

  function handleSearchSubmit(event) {
    event.preventDefault();

    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      router.push(localizeHref(locale, "/recipes"));
      setIsSearchOpen(false);
      return;
    }

    router.push(localizeHref(locale, `/recipes?search=${encodeURIComponent(trimmedQuery)}`));
    setIsSearchOpen(false);
  }

  async function handleSignOut() {
    try {
      await signOutUser();
      setUser(null);
      setIsAccountMenuOpen(false);
      router.push(localizeHref(locale, "/"));
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  }

  const homePath = localizeHref(locale, "/");
  const alternateLocale = locale === "ar" ? "en" : "ar";
  const alternatePath = switchLocalePath(pathname, alternateLocale);
  const isTransparent = pathname === homePath && !isScrolled && !isMenuOpen && !isSearchOpen;

  return (
    <header className={`site-header ${isTransparent ? "is-transparent" : ""}`}>
      <div className="site-header__inner">
        <Link href={homePath} className="site-brand">
          {dictionary.brand}
        </Link>

        <nav className="site-nav" aria-label={dictionary.nav.primaryNav}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={localizeHref(locale, item.href)}
              className={pathname === localizeHref(locale, item.href) ? "is-active" : ""}
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
                placeholder={dictionary.nav.searchPlaceholder}
                aria-label={dictionary.nav.searchAria}
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
              {dictionary.nav.search}
            </button>
          </form>
          <Link href={alternatePath} className="site-locale-toggle" hrefLang={alternateLocale}>
            <span>{dictionary.language.label}</span>
            <strong>{alternateLocale === "ar" ? dictionary.language.arabic : dictionary.language.english}</strong>
          </Link>
          <button
            type="button"
            className="site-menu-toggle"
            aria-expanded={isMenuOpen}
            aria-label={dictionary.nav.menuToggle}
            onClick={() => setIsMenuOpen((value) => !value)}
          >
            {dictionary.nav.menu}
          </button>
          <div className="site-account-menu">
            <button
              type="button"
              className="site-avatar"
              aria-label={dictionary.nav.accountAria}
              aria-expanded={isAccountMenuOpen}
              onClick={() => setIsAccountMenuOpen((value) => !value)}
            >
              {user?.email?.[0]?.toUpperCase() || "L"}
            </button>

            <div className={`site-account-dropdown ${isAccountMenuOpen ? "is-open" : ""}`}>
              {user ? (
                <>
                  <p className="site-account-dropdown__label">{user.email}</p>
                  <Link href={localizeHref(locale, "/account")}>{dictionary.nav.account}</Link>
                  <Link href={localizeHref(locale, "/saved")}>{dictionary.nav.savedRecipes}</Link>
                  <button type="button" onClick={handleSignOut}>
                    {dictionary.nav.signOut}
                  </button>
                </>
              ) : (
                <>
                  <p className="site-account-dropdown__label">{dictionary.nav.welcome}</p>
                  <Link href={localizeHref(locale, "/login")}>{dictionary.nav.login}</Link>
                  <Link href={localizeHref(locale, "/signup")}>{dictionary.nav.signup}</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className={`site-mobile-panel ${isMenuOpen ? "is-open" : ""}`}>
        <nav className="site-mobile-nav" aria-label={dictionary.nav.mobileNav}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={localizeHref(locale, item.href)}
              className={pathname === localizeHref(locale, item.href) ? "is-active" : ""}
            >
              {item.label}
            </Link>
          ))}
          <Link href={localizeHref(locale, "/account")}>{dictionary.nav.account}</Link>
          <Link href={localizeHref(locale, "/login")}>{dictionary.nav.login}</Link>
          <Link href={localizeHref(locale, "/signup")}>{dictionary.nav.signup}</Link>
          <Link href={alternatePath} hrefLang={alternateLocale}>
            {dictionary.language.label}: {alternateLocale === "ar" ? dictionary.language.arabic : dictionary.language.english}
          </Link>
        </nav>
      </div>
    </header>
  );
}
