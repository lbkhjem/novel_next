import { Anchor, Breadcrumbs, Container, Text, Title } from "@mantine/core";
import { NextSeo } from "next-seo";
import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect, useRef, useState } from "react";
import { baseUrlNovel } from "../../API/APIManage";
import { Layout } from "../../components/PC/Layout";
import { PUBLIC_URL } from "../../config";
import { shimmer, toBase64 } from "../../utils";

const DynamicListChapter = dynamic(
  () => import("../../components/PC/Novel/ChapterList"),
  {
    suspense: true,
  }
);
export default function Index({ dataseo }) {
  const [datanovel, setDatanovel] = useState([]);
  const [showmore, setShowmore] = useState(false);
  const [chaptxt, setChaptxt] = useState("");
  const [height, setHeight] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    setHeight(ref.current.clientHeight);
  });
  // console.log(dataseo);
  const _renderHeader = () => {
    return (
      <div className="p-4 grid grid-cols-3 gap-4 my-4 w-full text-center  rounded-lg border shadow-md sm:p-8">
        <div className="col-span-3 lg:col-span-1 md:col-span-3 sm:col-span-3 items-center justify-center lg:justify-start flex">
          <Image
            src={dataseo.cover}
            className="px-2 "
            placeholder="blur"
            width={240}
            height={350}
            alt={"ddv"}
            style={{
              maxWidth: "100%",
              maxHeight: 350,
              height: "auto",
              objectFit: "cover",
            }}
            blurDataURL={`data:image/svg+xml;base64,${toBase64(
              shimmer(240, 350)
            )}`}
            priority
          />
        </div>
        <div className="col-span-3 lg:col-span-2 md:col-span-3 flex flex-col">
          <Title order={1} className="font-medium text-left text-4xl py-1">
            {dataseo.novelsname}
          </Title>
          <Text className="font-medium text-left py-1">
            {dataseo.othername}
          </Text>
          <Text className="font-medium text-left py-1">
            Author: {dataseo.author}
          </Text>
          <Text className="font-medium text-left py-1">
            <div
              className="flex-col w-full relative py-1"
              style={{
                height: height > 400 ? (showmore ? "auto" : 400) : "auto",
                overflow: "hidden",
              }}
            >
              {/* <h2 className="text-20 text-ddv font-bold pb-3">Đặc điểm nổi bật</h2> */}
              <div
                ref={ref}
                className="relative antialiased text-14  text-justify"
                dangerouslySetInnerHTML={{
                  __html: dataseo.description,
                }}
              />
            </div>
          </Text>
          <Link
            href={`/chapter/${dataseo?.idnovels}/${
              dataseo.chapterlist[0].idchapter
            }`}
          >
            <button
              type="button"
              className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              START READING
            </button>
          </Link>
        </div>
      </div>
    );
  };
  const _renderContent = () => {
    return (
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col col-span-2 max-sm:col-span-3 shadow-md p-2">
          <Text className="font-medium text-left py-1">Chapters</Text>
          <Text className="font-bold text-left py-1">
            {dataseo.chapterlist?.length} Chapters
          </Text>
          <div className="flex items-center py-2 mb-4 flex-wrap">
            {dataseo.genresdata?.map((item, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 my-1 rounded dark:bg-gray-700 dark:text-gray-300"
              >
                {item.genrename}
              </span>
            ))}
          </div>
          <Text className="font-bold text-left py-1">Table of contents</Text>
          <div className="overflow-x-auto relative">
            <div className="flex justify-between items-center p-2">
              <label htmlFor="table-search" className="sr-only">
                Search
              </label>
              <div className="relative">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <input
                  type="text"
                  id="table-search"
                  onChange={(e) => setChaptxt(e.target.value)}
                  className="block p-2 pl-10 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search for chapter"
                />
              </div>
            </div>
          </div>
          <Suspense fallback={`Loading...`}>
            <DynamicListChapter dataseo={dataseo} />
          </Suspense>
        </div>
        <div className="flex flex-col col-span-1 max-sm:col-span-3 shadow-md p-2">
          <Text className="font-bold text-left py-1">You may also like</Text>
          {dataseo.othernovel?.map((item, index) => (
            <div key={index} className="grid grid-cols-3 gap-2 py-2 shadow-md">
              <div className="col-span-1 ">
                <Image
                  src={item.img}
                  className="px-2 "
                  placeholder="blur"
                  width={200}
                  height={300}
                  alt={"ddv"}
                  style={{
                    maxWidth: "100%",
                    maxHeight: 130,
                    height: "auto",
                    objectFit: "cover",
                  }}
                  blurDataURL={`data:image/svg+xml;base64,${toBase64(
                    shimmer(83, 130)
                  )}`}
                />
              </div>
              <div className="col-span-2">
                <Title order={3} size={14} className="text-left py-1">
                  {item.novelsname}
                </Title>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  return (
    <>
      <Layout>
        <Head>
          <link rel="canonical" href={`${PUBLIC_URL}/novel/${dataseo.idnovels}`} />
        </Head>
        <NextSeo
          title={`${dataseo.novelsname} novel - Novel - Best novel reading online website`}
          description={`${dataseo.novelsname} novel, ${
            dataseo.chapterlist[dataseo.chapterlist?.length - 1].chaptername
          }. Read light novel online for free`}
          openGraph={{
            type: 'website',
            url: `${PUBLIC_URL}/novel/${dataseo.idnovels}`,
            title: `${dataseo.novelsname} novel - Novel - Best novel reading online website`,
            description: `${dataseo.novelsname} novel, ${
              dataseo.chapterlist[dataseo.chapterlist?.length - 1].chaptername
            }. Read light novel online for free`,
            images: [
              {
                url: dataseo.cover,
                width: 200,
                height: 300,
                alt: dataseo.novelsname,
              }
            ],
          }}
        />
        
        <Container className=" mx-auto">
          <Breadcrumbs>
            <Anchor href={"/"}>Home</Anchor>
            <Anchor>{dataseo.novelsname}</Anchor>
          </Breadcrumbs>
          {_renderHeader()}
          {_renderContent()}
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
  const res1 = await fetch(`${baseUrlNovel}api/novel?id=${params.id}`);
  const dataseo = await res1?.json();
  let dataseos = dataseo;
  return { props: { dataseo: dataseos[0] } };
}
