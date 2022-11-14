import {
  Affix,
  Anchor,
  Breadcrumbs,
  Container,
  Divider,
  Popover,
  Text,
  Title,
  Transition,
} from "@mantine/core";
import { useViewportSize, useWindowScroll } from "@mantine/hooks";
import { Button } from "@mantine/core";
import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronUp,
} from "@tabler/icons";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { baseUrlNovel, getNovelDetails } from "../../../API/APIManage";
import { Layout } from "../../../components/PC/Layout";
import Link from "next/link";
import { NextSeo } from "next-seo";
import { PUBLIC_URL } from "../../../config";
export default function Index({ dataseo }) {
  const [datanovel, setDatanovel] = useState<any>([]);
  const [showmore, setShowmore] = useState(false);
  const { height, width } = useViewportSize();
  const [prechap, setPrechap] = useState(null);
  const [nextchap, setNextchap] = useState(null);
  const [chaptxt, setChaptxt] = useState("");
  const ref = useRef(null);
  const [scroll, scrollTo] = useWindowScroll();
  useEffect(() => {
    getNovelDetails(dataseo?.idnovels)
      .then((res: any) => {
        setDatanovel(res?.data[0]);
      })
      .catch((e) => {});
  }, []);
  useEffect(() => {
    if (datanovel?.chapterlist && datanovel?.chapterlist?.length > 0) {
      let prechap = datanovel?.chapterlist.findIndex(
        (x) => x.idchapter === dataseo?.idchapter
      );
      if (prechap == 0) {
        setPrechap(null);
        if (datanovel?.chapterlist?.length == 1) {
          setNextchap(null);
        } else {
          setNextchap(datanovel?.chapterlist[prechap + 1]?.idchapter);
        }
      } else {
        setPrechap(datanovel?.chapterlist[prechap - 1]?.idchapter);
        if (datanovel?.chapterlist?.length == prechap + 1) {
          setNextchap(null);
        } else {
          setNextchap(datanovel?.chapterlist[prechap + 1]?.idchapter);
        }
      }
      console.log(prechap);
    }
  }, [datanovel]);
  console.log(prechap);
  console.log(nextchap);
  return (
    <>
      <Layout>
        <Head>
          <link
            rel="canonical"
            href={`${PUBLIC_URL}/chapter/${datanovel.idnovels}/${dataseo.idchapter}`}
          />
        </Head>
        <NextSeo
          title={`${dataseo?.chaptername} novel - Novel - Best novel reading online website`}
          description={`${dataseo?.chaptername} novel. Read light novel online for free`}
        />
        <div className=" mx-auto">
          <Container className="chapter-content ">
            <Breadcrumbs className="py-2">
              <Anchor href={"/"}>Home</Anchor>
              <Anchor href={`/novel/${datanovel.idnovels}`}>
                {datanovel.novelsname}
              </Anchor>
              <Anchor>{dataseo?.chaptername}</Anchor>
            </Breadcrumbs>
            <Divider my="sm" />
            <Title order={1} className="text-16">
              {datanovel.novelsname}
            </Title>
            <Title order={2} className="text-16">
              {dataseo?.chaptername}
            </Title>
            <Divider my="sm" variant="dashed" />
            <div
              ref={ref}
              className="relative antialiased text-16 py-4 text-justify"
              dangerouslySetInnerHTML={{
                __html: dataseo.content,
              }}
            />
          </Container>
          <Affix position={{ bottom: 0, left: 0 }}>
            <Transition transition="slide-up" mounted={scroll.y > 0}>
              {(transitionStyles) => (
                <div
                  style={{ height: 60, width: width }}
                  className="bg-black shadow-sm px-4  w-full"
                >
                  <div className="container flex justify-between items-center p-2">
                    <Popover
                      width={400}
                      position="bottom"
                      withArrow
                      shadow="md"
                    >
                      <Popover.Target>
                        <div className="flex max-md:hidden">
                          <Title order={2} className="text-16 text-white  ">
                            {datanovel?.novelsname}
                          </Title>
                          <IconChevronUp />
                        </div>
                      </Popover.Target>
                      <Popover.Dropdown>
                        <div className="flex flex-col justify-center items-start">
                          <Link href={`/novel/${datanovel.idnovels}`}>
                            <Title order={2} className="text-16">
                              {datanovel?.novelsname}
                            </Title>
                          </Link>
                          <div className="flex flex-col col-span-2 max-sm:col-span-3 shadow-md p-2">
                            <div className="overflow-x-auto relative">
                              <div className="flex justify-between items-center p-2">
                                <label
                                  htmlFor="table-search"
                                  className="sr-only"
                                >
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
                            <div
                              id="list_chapter"
                              className="list_chapter w-full"
                            >
                              <div className="flex row justify-between w-full title-list-chapter">
                                <h2 className="h2-manga">
                                  {datanovel.novelsname} Chapters
                                </h2>
                                <span>Time uploaded</span>
                              </div>

                              <div
                                style={{ maxHeight: 400 }}
                                className="chapter-list"
                              >
                                {(chaptxt !== ""
                                  ? datanovel.chapterlist.filter(function (o) {
                                      return (
                                        o.chaptername
                                          .toLowerCase()
                                          .search(chaptxt.toLowerCase()) !== -1
                                      );
                                    })
                                  : datanovel.chapterlist
                                )?.map((item, index) => (
                                  <Link
                                    href={`/chapter/${datanovel?.idnovels}/${item?.idchapter}`}
                                    key={index}
                                    className="row"
                                  >
                                    <span
                                      title={`${datanovel?.novelsname} ${item.chaptername}`}
                                    >
                                      <p>{item?.chaptername}</p>
                                    </span>
                                    <span>{item?.timeupdate}</span>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Popover.Dropdown>
                    </Popover>

                    <div className="flex items-center max-md:w-full justify-between">
                      {prechap ? (
                        <a href={`/chapter/${dataseo.idnovels}/${prechap}`}>
                          <Button
                            className="bg-cyan text-black hover:bg-cyan"
                            leftIcon={<IconChevronLeft />}
                          >
                            Prev chapter
                          </Button>
                        </a>
                      ) : null}
                      {nextchap ? (
                        <a href={`/chapter/${dataseo.idnovels}/${nextchap}`}>
                          <Button
                            className="bg-cyan text-black hover:bg-cyan mx-2"
                            rightIcon={<IconChevronRight />}
                          >
                            Next chapter
                          </Button>
                        </a>
                      ) : null}
                    </div>
                  </div>
                </div>
              )}
            </Transition>
          </Affix>
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
  //   console.log(params);
  const res1 = await fetch(
    `${baseUrlNovel}api/chapter?novelid=${params.idnovel}&chapterid=${params.slug}`
  );
  const dataseo = await res1?.json();
  let dataseos = dataseo;
  return { props: { dataseo: dataseos } };
}
