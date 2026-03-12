import AccountPage from "../../account/page";

export default async function LocalizedAccountPage({ params }) {
  const { locale } = await params;
  return <AccountPage locale={locale} />;
}
