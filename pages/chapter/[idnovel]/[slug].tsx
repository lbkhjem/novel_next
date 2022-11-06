import { Affix, Transition } from "@mantine/core";
import { useViewportSize, useWindowScroll } from "@mantine/hooks";
import { Button } from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { baseUrlNovel, getNovelDetails } from "../../../API/APIManage";
import { Layout } from "../../../components/PC/Layout";
import Link from "next/link";
export default function Index({ dataseo }) {
  const [datanovel, setDatanovel] = useState<any>([]);
  const [showmore, setShowmore] = useState(false);
  const { height, width } = useViewportSize();
  const [prechap, setPrechap] = useState(null);
  const [nextchap, setNextchap] = useState(null);
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
          <title>{dataseo?.novelsname}</title>
        </Head>
        <div className=" mx-auto">
          <div
            style={{ height: 60, width: width }}
            className="bg-black shadow-sm px-4  w-full"
          >
            <div className="container flex justify-between items-center p-2">
              <p className="font-bold text-16 text-white">
                {dataseo?.chaptername}
              </p>
              <div className="flex items-center">
                {prechap ? (
                  <a href={`/chapter/${dataseo.idnovels}/${prechap}`}>
                    <Button leftIcon={<IconChevronLeft />}>Prev chapter</Button>
                  </a>
                ) : null}
                {nextchap ? (
                  <a href={`/chapter/${dataseo.idnovels}/${nextchap}`}>
                    <Button rightIcon={<IconChevronRight />}>
                      Next chapter
                    </Button>
                  </a>
                ) : null}
              </div>
            </div>
          </div>
          <div className="chapter-content ">
            <div
              ref={ref}
              className="relative antialiased text-16  text-justify"
              dangerouslySetInnerHTML={{
                __html: dataseo.content,
              }}
            />
          </div>
          <Affix position={{ bottom: 0, left: 0 }}>
            <Transition transition="slide-up" mounted={scroll.y > 0}>
              {(transitionStyles) => (
                <div
                  style={{ height: 60, width: width }}
                  className="bg-black shadow-sm px-4  w-full"
                >
                  <div className="container flex justify-between items-center p-2">
                    <p className="font-bold text-16 text-white">
                      {dataseo?.chaptername}
                    </p>
                    <div className="flex items-center">
                      {prechap ? (
                        <a href={`/chapter/${dataseo.idnovels}/${prechap}`}>
                          <Button leftIcon={<IconChevronLeft />}>
                            Prev chapter
                          </Button>
                        </a>
                      ) : null}
                      {nextchap ? (
                        <a href={`/chapter/${dataseo.idnovels}/${nextchap}`}>
                          <Button rightIcon={<IconChevronRight />}>
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
