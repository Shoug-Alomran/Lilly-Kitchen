import { notFound } from "next/navigation";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { getDictionary, getDirection, isValidLocale, locales } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const dictionary = getDictionary(locale);
  const direction = getDirection(locale);

  return (
    <div className="site-shell locale-shell" dir={direction} data-locale={locale}>
      <SiteHeader locale={locale} dictionary={dictionary} />
      {children}
      <SiteFooter locale={locale} dictionary={dictionary} />
    </div>
  );
}
