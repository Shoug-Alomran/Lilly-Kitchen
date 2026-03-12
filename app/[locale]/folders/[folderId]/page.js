import FolderDetailPage from "../../../folders/[folderId]/page";

export default async function LocalizedFolderDetailPage({ params }) {
  const resolvedParams = await params;
  return <FolderDetailPage params={resolvedParams} locale={resolvedParams.locale} />;
}
