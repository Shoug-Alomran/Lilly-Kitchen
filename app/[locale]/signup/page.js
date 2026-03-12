import SignupPage from "../../signup/page";

export default async function LocalizedSignupPage({ params }) {
  const { locale } = await params;
  return <SignupPage locale={locale} />;
}
