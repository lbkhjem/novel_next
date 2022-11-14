import { Container, Pagination, Skeleton, Title } from "@mantine/core";
import { NextSeo } from "next-seo";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Router from "next/router";
import { useEffect, useState } from "react";
import { baseUrlNovel, getNovelUpdate } from "../../API/APIManage";
import { Layout } from "../../components/PC/Layout";
import { PUBLIC_URL } from "../../config";
const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

export default function Index({ dataseo, query }) {
  console.log(dataseo);
  const [isLoading, setIsLoading] = useState(false);
  const [datanovel, setDatanovel] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    getNovelUpdate({ page: 1 })
      .then((res: any) => {
        setIsLoading(false);
        setDatanovel(res?.data);
      })
      .catch((e) => {});
  }, []);
  const [activePage, setPage] = useState(query?.page);
  useEffect(() => {
    if (activePage !== query?.page) {
      Router.push(`/novel_list?type=${query.type}&page=${activePage}`);
    }
  }, [activePage]);
  return (
    <>
      <Layout>
        <Head>
        <link rel="canonical" href={`${PUBLIC_URL}/novel_list?type=${query.type}&page=${activePage}`} />
        </Head>
        <NextSeo
          title={`${
            query.type == "topview"
              ? "Hot Novel"
              : query.type == "update"
              ? "Novel Update"
              : "Completed Novel"
          } | NovelFav | Read Novels online free`}
          description="NovelFav is the foremost English publisher of Chinese and Korean webnovels and light novels"
        />
        <Container className=" mx-auto">
          <div className="w-full flex justify-between py-2">
            <Title className="max-md:text-14" size={20} order={1}>
              NOVEL LIST
            </Title>
            {/* <Link href="#">MORE</Link> */}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
            {dataseo.map((item, index) => (
              <Link
                key={index}
                className="max-w-sm rounded-lg h-full border border-gray-200 shadow-md"
                href={`/novel/${item.idnovel}`}
              >
                <Image
                  src={item.cover}
                  className="px-2 "
                  placeholder="blur"
                  width={250}
                  height={210}
                  sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
                  alt={"ddv"}
                  style={{
                    // maxWidth: "100%",
                    maxHeight: 210,
                    height: "auto",
                    objectFit: "cover",
                  }}
                  blurDataURL={`data:image/svg+xml;base64,${toBase64(
                    shimmer(700, 475)
                  )}`}
                  priority
                />
                <div className="py-5 px-2">
                  <Title order={2} size={14}>
                    {item.novelsname}
                  </Title>
                  <Title order={3} className="font-normal" size={12}>
                    {item.lasterchapter}
                  </Title>
                </div>
              </Link>
            ))}
          </div>
          <Pagination
            page={Number(activePage)}
            className="py-2"
            onChange={setPage}
            total={2164}
          />
          ;
        </Container>
      </Layout>
    </>
  );
}
export async function getServerSideProps({
  params,
  req,
  res,
  query,
  preview,
  previewData,
  resolvedUrl,
  locale,
  locales,
  defaultLocale,
}) {
  console.log(query);
  if (query.type === "topview") {
    const res1 = await fetch(`${baseUrlNovel}api/hot?page=${query.page}`);
    const dataseo = await res1?.json();
    let dataseos = dataseo.data;
    return { props: { dataseo: dataseos, query: query } };
  } else {
    if (query.type === "update") {
      const res1 = await fetch(`${baseUrlNovel}api/update?page=${query.page}`);
      const dataseo = await res1?.json();
      let dataseos = dataseo.data;
      return { props: { dataseo: dataseos, query: query } };
    } else {
      const res1 = await fetch(
        `${baseUrlNovel}api/complete?page=${query.page}`
      );
      const dataseo = await res1?.json();
      let dataseos = dataseo.data;
      return { props: { dataseo: dataseos, query: query } };
    }
  }
}
