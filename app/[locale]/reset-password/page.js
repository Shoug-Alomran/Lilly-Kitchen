import ResetPasswordPage from "../../reset-password/page";

export default async function LocalizedResetPasswordPage({ params }) {
  const { locale } = await params;
  return <ResetPasswordPage locale={locale} />;
}
