const siteUrl = "https://lilly-kitchen.shoug-tech.com";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/account", "/folders", "/login", "/saved", "/signup"]
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl
  };
}
