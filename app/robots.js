const siteUrl = "https://lilly-kitchen.shoug-tech.com";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/account",
        "/folders",
        "/login",
        "/saved",
        "/signup",
        "/en/account",
        "/en/folders",
        "/en/login",
        "/en/saved",
        "/en/signup",
        "/ar/account",
        "/ar/folders",
        "/ar/login",
        "/ar/saved",
        "/ar/signup"
      ]
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl
  };
}
