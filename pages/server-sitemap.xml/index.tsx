import { getServerSideSitemap } from "next-sitemap";
import { GetServerSideProps } from "next";
import { baseUrlNovel } from "../../API/APIManage";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // Method to source urls from cms
  const urls = await fetch(baseUrlNovel + `api/update?page=1`);
  const dataseo = await urls?.json();
  console.log(dataseo);
  let fields = [
    {
      loc: baseUrlNovel, // Absolute url
      lastmod: new Date().toISOString(),
      // changefreq
      // priority
    },
  ];
  for (let i = 0; i < dataseo.data.length; i++) {
    fields.push({
      loc: `${baseUrlNovel}novel/${dataseo.data[i].idnovel}`, // Absolute url
      lastmod: new Date().toISOString(),
      // changefreq
      // priority
    });
  }

  return getServerSideSitemap(ctx, fields);
};

// Default export to prevent next.js errors
export default function Sitemap() {}
