import CollectionsPage from "../../collections/page";

export default async function LocalizedCollectionsPage({ params, searchParams }) {
  const { locale } = await params;
  const resolvedSearchParams = await searchParams;
  return <CollectionsPage locale={locale} searchParams={resolvedSearchParams} />;
}
