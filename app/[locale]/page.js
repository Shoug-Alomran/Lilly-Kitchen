import HomePage from "../page";

export default async function LocalizedHomePage({ params }) {
  const { locale } = await params;
  return <HomePage locale={locale} />;
}
