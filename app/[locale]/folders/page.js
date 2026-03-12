import FoldersPage from "../../folders/page";

export default async function LocalizedFoldersPage({ params }) {
  const { locale } = await params;
  return <FoldersPage locale={locale} />;
}
