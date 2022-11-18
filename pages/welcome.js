import Head from "next/head";
import { setCookie } from "cookies-next";
import locale from "../utils/locale";

export default function Home({ comic }) {
  const countrySymbol = locale.countries();

  return (
    <>
      <Head>
        <title>CSR- Comic books</title>
        <meta name="description" content="CSR - comic book study" />
      </Head>

      <div className="container">
        <h2>Welcome</h2>

        {countrySymbol.map((x, index) => (
          <div
            key={index}
            onClick={() => {
              setCookie("locale", x);
            }}
          >
            <a href="/">{x}</a>
          </div>
        ))}
      </div>
    </>
  );
}
