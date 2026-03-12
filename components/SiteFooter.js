import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <div className="footer-logo">Lilly Kitchen</div>
          <p className="footer-desc">
            Simple ingredients. Honest cooking. Recipes made to be shared, from Lilly&apos;s kitchen to yours.
          </p>
        </div>
        <div>
          <div className="footer-col-title">Explore</div>
          <Link href="/recipes" className="footer-link">
            All Recipes
          </Link>
          <Link href="/categories" className="footer-link">
            Categories
          </Link>
          <Link href="/collections" className="footer-link">
            Collections
          </Link>
        </div>
        <div>
          <div className="footer-col-title">Account</div>
          <Link href="/signup" className="footer-link">
            Sign Up
          </Link>
          <Link href="/login" className="footer-link">
            Log In
          </Link>
          <Link href="/saved" className="footer-link">
            Saved Recipes
          </Link>
          <Link href="/folders" className="footer-link">
            Folders
          </Link>
        </div>
        <div>
          <div className="footer-col-title">About</div>
          <Link href="/about" className="footer-link">
            Our Story
          </Link>
          <a className="footer-link" href="https://www.instagram.com/" target="_blank" rel="noreferrer">
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}
