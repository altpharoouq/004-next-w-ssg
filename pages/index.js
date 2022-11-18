import Head from "next/head";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export async function getStaticProps() {
  const resp = await fetch("https://fake-comic-api.herokuapp.com/comic");

  return {
    props: {
      comic: await resp.json(),
    },
  };
}

export default function Home({ comic }) {
  const { t } = useTranslation();

  return (
    <div>
      <Head>
        <title>CSR- Comic books</title>
        <meta name="description" content="CSR - comic book study" />
      </Head>

      <div className="container">
        <h2>Comic List</h2>

        <div className="grid">
          {comic.map((comic) => (
            <div className="card" key={comic.id}>
              <a href={`/comic/${comic.id}`}>
                <img src={comic.imageSrc} alt={comic.title} />
                <h4>{comic.title}</h4>
              </a>
            </div>
          ))}
        </div>

        <h2>{t("good")}</h2>
        <h2>{t("better")}</h2>
        <h2>{t("best")}</h2>
        <h2>{t("bad")}</h2>
        <h2>{t("worse")}</h2>
        <h2>{t("worst")}</h2>
      </div>
    </div>
  );
}
