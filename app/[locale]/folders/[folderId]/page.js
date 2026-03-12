import FolderDetailPage from "../../../folders/[folderId]/page";

export default async function LocalizedFolderDetailPage({ params }) {
  const { locale } = await params;
  return <FolderDetailPage locale={locale} />;
}
