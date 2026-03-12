import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="page-shell">
      <section className="page-hero">
        <div>
          <div className="page-eyebrow">About Lilly Kitchen</div>
          <h1 className="page-title">A recipe home built from shared tables.</h1>
          <p className="page-subtitle">
            Lilly Kitchen turns food stories into a browseable cookbook experience with warm visuals and clear cooking flows.
          </p>
        </div>
      </section>

      <section className="section-shell story-grid">
        <article className="story-card">
          <h2 className="display-title">Editorial warmth</h2>
          <p>
            The platform is designed to feel like an open cookbook on a bright kitchen counter, calm, tactile, and made for lingering.
          </p>
        </article>
        <article className="story-card">
          <h2 className="display-title">Built for saving</h2>
          <p>
            Recipes can be saved, organised into folders, and revisited later without losing the emotional feel of the original post.
          </p>
        </article>
        <article className="story-card">
          <h2 className="display-title">Start exploring</h2>
          <p>
            Browse the current recipe library, seasonal collections, or sign in to begin building your own saved dashboard.
          </p>
          <Link href="/recipes" className="btn-primary">
            Browse Recipes →
          </Link>
        </article>
      </section>
    </main>
  );
}
