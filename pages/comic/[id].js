import { useTranslation } from "react-i18next";
import Seo from "../components/SEO";

export async function getServerSideProps({ params }) {
  const resp = await fetch(
    `https://fake-comic-api.herokuapp.com/comic/${params.id}`
  );

  return {
    props: {
      comic: await resp.json(),
    },
  };
}

export default function Details({ comic, url }) {
  const { t } = useTranslation(["default"]);

  return (
    <div>
      <Seo
        title={comic.title}
        description={comic.team.writer}
        image="https:/bsfd"
        keywords="test, rewds"
        url={url}
      />

      <div className="container">
        <a href="/">Back to Home</a>

        <div className="detail">
          <img src={comic.imageSrc} alt={comic.title} />

          <div className="information">
            <h2>{t("def-cat")}</h2>
            <h2>{t("def-cow")}</h2>
            <h2>{t("def-dog")}</h2>
            <h2>{t("def-rat")}</h2>
            <h2>{t("def-pillow")}</h2>

            <h2>{comic.title}</h2>

            <p>{comic.description}</p>

            <div>
              <span>
                <p>Ratings:</p>
                <p>{comic.ratings}</p>
              </span>

              <span>
                <p>Price:</p>
                <p>{comic.price}</p>
              </span>

              <span>
                <p>Published:</p>
                <p>{comic.publicationDate}</p>
              </span>

              <h2>Author</h2>

              <span>
                <p>Writer:</p>
                <p>{comic.team.writer}</p>
              </span>

              <span>
                <p>Penciler:</p>
                <p>{comic.team.penciler}</p>
              </span>

              <span>
                <p>Inker:</p>
                <p>{comic.team.inker}</p>
              </span>

              <span>
                <p>Editor:</p>
                <p>{comic.team.editor}</p>
              </span>

              <span>
                <p>Letterer:</p>
                <p>{comic.team.letterer}</p>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
