import { Text } from "@nextui-org/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { baseUrlNovel } from "../../API/APIManage";
import { Layout } from "../../components/PC/Layout";
import { shimmer, toBase64 } from "../../utils";

export default function Index({ dataseo }) {
  const [datanovel, setDatanovel] = useState([]);
  const [showmore, setShowmore] = useState(false);
  const [height, setHeight] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    setHeight(ref.current.clientHeight);
  });
  // console.log(dataseo);
  const _renderHeader = () => {
    return (
      <div className="p-4 grid grid-cols-3 gap-4 my-4 w-full text-center  rounded-lg border shadow-md sm:p-8">
        <div className="col-span-1">
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
        <div className="col-span-2 flex flex-col">
          <Text
            h1
            css={{
              fontSize: 24,
              // fontWeight: "$semibold",
            }}
            className="font-medium text-left text-4xl py-1"
          >
            {dataseo.novelsname}
          </Text>
          <Text
            h3
            css={{
              fontSize: 15,
            }}
            className="font-medium text-left py-1"
          >
            {dataseo.othername}
          </Text>
          <Text
            h3
            css={{
              // color: "$black",
              fontSize: 15,
            }}
            className="font-medium text-left py-1"
          >
            Author: {dataseo.author}
          </Text>
          <Text
            h4
            css={{
              // color: "$black",
              fontSize: 15,
            }}
            className="font-medium text-left py-1"
          >
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
              {/* {showmore ? null : (
                <button
                  onClick={() => setShowmore(true)}
                  className="more-content py-2 flex items-center justify-center absolute z-50 bottom-0 left-0"
                >
                  <p className="text-ddv text-center font-bold text-16">
                    Show more
                  </p>
                </button>
              )} */}
            </div>
          </Text>
          <button
            type="button"
            className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            START READING
          </button>
        </div>
      </div>
    );
  };
  const _renderContent = () => {
    return (
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col col-span-2 shadow-md p-2">
          <Text
            h4
            css={{
              color: "#9e9e9e",
              fontSize: 14,
            }}
            className="font-medium text-left py-1"
          >
            Chapters
          </Text>
          <Text
            h4
            css={{
              fontSize: 16,
            }}
            className="font-bold text-left py-1"
          >
            {dataseo.chapterlist?.length} Chapters
          </Text>
          <div className="flex items-center py-2 mb-4">
            {dataseo.genresdata?.map((item, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300"
              >
                {item.genrename}
              </span>
            ))}
          </div>
          <Text
            h4
            css={{
              fontSize: 20,
            }}
            className="font-bold text-left py-1"
          >
            Table of contents
          </Text>
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
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <input
                  type="text"
                  id="table-search"
                  className="block p-2 pl-10 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search for chapter"
                />
              </div>
            </div>
          </div>
          <div id="list_chapter" className="list_chapter w-full">
            <div className="flex row justify-between w-full title-list-chapter">
              <h2 className="h2-manga">{dataseo.novelsname} Chapters</h2>
              <span>Time uploaded</span>
            </div>

            <div className="chapter-list">
              {dataseo.chapterlist?.map((item, index) => (
                <Link
                  href={`/chapter/${dataseo?.idnovels}/${item?.idchapter}`}
                  key={index}
                  className="row"
                >
                  <span title={`${dataseo?.novelsname} ${item.chaptername}`}>
                    <p>{item?.chaptername}</p>
                  </span>
                  <span>{item?.timeupdate}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col col-span-1 shadow-md p-2">
          <Text
            h3
            css={{
              fontSize: 18,
            }}
            className="font-bold text-left py-1"
          >
            You may also like
          </Text>
          {dataseo.othernovel?.map((item, index) => (
            <div className="grid grid-cols-3 gap-2 py-2 shadow-md">
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
                  priority
                />
              </div>
              <div className="col-span-2">
                <Text
                  h2
                  css={{
                    fontSize: 18,
                  }}
                  className="font-bold text-left py-1"
                >
                  {item.novelsname}
                </Text>
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
          <title>{dataseo?.novelsname}</title>
        </Head>
        <div className="container mx-auto">
          {_renderHeader()}
          {_renderContent()}
        </div>
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
