import Link from "next/link";
import { localizeHref } from "@/lib/i18n";

export default function SiteFooter({ locale = "en", dictionary }) {
  const footer = dictionary.footer;

  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <div className="footer-logo">{dictionary.brand}</div>
          <p className="footer-desc">{footer.description}</p>
        </div>
        <div>
          <div className="footer-col-title">{footer.explore}</div>
          <Link href={localizeHref(locale, "/recipes")} className="footer-link">
            {footer.allRecipes}
          </Link>
          <Link href={localizeHref(locale, "/categories")} className="footer-link">
            {footer.categories}
          </Link>
          <Link href={localizeHref(locale, "/collections")} className="footer-link">
            {footer.collections}
          </Link>
        </div>
        <div>
          <div className="footer-col-title">{footer.account}</div>
          <Link href={localizeHref(locale, "/signup")} className="footer-link">
            {footer.signUp}
          </Link>
          <Link href={localizeHref(locale, "/login")} className="footer-link">
            {footer.logIn}
          </Link>
          <Link href={localizeHref(locale, "/saved")} className="footer-link">
            {footer.savedRecipes}
          </Link>
          <Link href={localizeHref(locale, "/folders")} className="footer-link">
            {footer.folders}
          </Link>
        </div>
        <div>
          <div className="footer-col-title">{footer.about}</div>
          <Link href={localizeHref(locale, "/about")} className="footer-link">
            {footer.ourStory}
          </Link>
          <a className="footer-link" href="https://www.instagram.com/lilly.kitchen1/" target="_blank" rel="noreferrer">
            {footer.instagram}
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Lilly Kitchen</span>
        <a href="https://blueprint.shoug-tech.com/" target="_blank" rel="noreferrer">
          {footer.madeBy}
        </a>
      </div>
    </footer>
  );
}
