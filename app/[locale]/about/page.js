import AboutPage from "../../about/page";

export default async function LocalizedAboutPage({ params }) {
  const { locale } = await params;
  return <AboutPage locale={locale} />;
}
