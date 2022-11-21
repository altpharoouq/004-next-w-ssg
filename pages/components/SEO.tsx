import { useId } from "react";
import Head from "next/head";

type IStatus = "crawl" | "nocrawl";

interface ISeo {
  status: IStatus;
  title: string;
  description: string;
  image?: string;
  keywords?: string;
  url?: string;
}

export default function Seo({
  status = "crawl",
  title,
  description,
  image,
  keywords,
  url,
}: ISeo) {
  const env = process.env.NODE_ENV;
  const key = useId();

  if (env === "production" && status === "crawl") {
    return (
      <>
        <Head key={key}>
          {/* Regular */}
          <title>{title}</title>
          <meta name="description" content={description} />
          <link rel="Canonical" href={url} />
          <meta name="robot" content="index, follow" />
          {/* OG & Twitter */}
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary" />
          {image ? <meta property="og:image" content={image} /> : <></>}
          <meta property="og:url" content={url} />
          <meta name="keywords" content={keywords} />
        </Head>
      </>
    );
  } else {
    return (
      <Head key={key}>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robot" content="noindex, nofollow" />
      </Head>
    );
  }
}
