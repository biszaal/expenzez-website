import React from "react";
import { SITE_URL } from "../config/links";

interface SeoProps {
  title: string;
  description: string;
  path: string; // e.g. "/support" or "/"
  image?: string; // absolute or site-relative
  noindex?: boolean;
}

const DEFAULT_IMAGE = `${SITE_URL}/logo512.png`;

/**
 * Per-page document metadata. Relies on React 19 native hoisting of
 * <title>/<meta>/<link> into <head>.
 */
const Seo: React.FC<SeoProps> = ({ title, description, path, image, noindex }) => {
  const url = `${SITE_URL}${path}`;
  const img = image
    ? image.startsWith("http")
      ? image
      : `${SITE_URL}${image}`
    : DEFAULT_IMAGE;

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex,follow" />}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Expenzez" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />
      <meta property="og:locale" content="en_GB" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={img} />
    </>
  );
};

export default Seo;
