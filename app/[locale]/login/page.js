import LoginPage from "../../login/page";

export default async function LocalizedLoginPage({ params }) {
  const { locale } = await params;
  return <LoginPage locale={locale} />;
}
