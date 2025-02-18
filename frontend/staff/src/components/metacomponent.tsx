interface Props {
  title: string;
  description: string;
  keywords?: string[];
  image: string;
  twitterCard?: string;
  siteName?: string;
  themeColor?: string;
  allowBots: boolean;
  allowSiteSearch?: boolean;
  noTranslate?: boolean;
  author?: string;
  url?: string;
}

export default function MetaTags({
  title,
  description,
  keywords = [],
  image,
  twitterCard = "summary_large_image",
  siteName = "My Awesome Site",
  themeColor = "#ffffff",
  allowBots,
  allowSiteSearch = false,
  noTranslate = false,
  author = "Nutfruits",
  url = typeof window !== "undefined" ? window.location.href : "",
}: Props) {
  const robotsContent = allowBots ? "index, follow" : "noindex, nofollow";

  return (
    <>
      {/* Title and Description */}
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Keywords for SEO */}
      <meta name="keywords" content={keywords.join(", ")} />

      {/* Author */}
      <meta name="author" content={author} />

      {/* Robots Meta Tag */}
      <meta name="robots" content={robotsContent} />

      {/* Disable Site Search Link */}
      {!allowSiteSearch && (
        <meta name="google" content="nositelinkssearchbox" />
      )}

      {/* Prevent Translation */}
      {noTranslate && <meta name="google" content="notranslate" />}

      {/* Viewport for Responsive Design */}
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=5.0"
      />

      {/* Theme Color */}
      <meta name="theme-color" content={themeColor} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:url" content={url} />

      {/* Canonical URL */}
      <link rel="canonical" href={url} />

      {/* Charset */}
      <meta charSet="UTF-8" />

      {/* Optional Extra Headers */}
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    </>
  );
}
