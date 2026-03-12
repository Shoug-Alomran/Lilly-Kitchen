export default function RecipeDetailPage({ params }) {
  return (
    <main className="page">
      <h1>Recipe Detail</h1>
      <p>Placeholder for recipe slug: {params.slug}</p>
    </main>
  );
}
