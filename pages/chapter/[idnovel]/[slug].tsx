import { Affix, Container, Title, Transition } from "@mantine/core";
import { useViewportSize, useWindowScroll } from "@mantine/hooks";
import { Button } from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { baseUrlNovel, getNovelDetails } from "../../../API/APIManage";
import { Layout } from "../../../components/PC/Layout";
import Link from "next/link";
import { NextSeo } from "next-seo";
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
        <NextSeo
          title={`${dataseo?.chaptername} novel - Novel - Best novel reading online website`}
          description={`${dataseo?.chaptername} novel. Read light novel online for free`}
        />
        <div className=" mx-auto">
          <div
            style={{ height: 60 }}
            className="bg-black shadow-sm px-4  w-full"
          >
            <div className="container flex justify-between items-center p-2">
              <Title order={1} className="text-16 text-white max-md:hidden">
                {dataseo?.chaptername}
              </Title>
              <div className="flex items-center justify-between max-md:w-full">
                {prechap ? (
                  <a href={`/chapter/${dataseo.idnovels}/${prechap}`}>
                    <Button className="bg-cyan text-black hover:bg-cyan" leftIcon={<IconChevronLeft />}>Prev chapter</Button>
                  </a>
                ) : null}
                {nextchap ? (
                  <a href={`/chapter/${dataseo.idnovels}/${nextchap}`}>
                    <Button className="bg-cyan text-black hover:bg-cyan mx-2" rightIcon={<IconChevronRight />}>
                      Next chapter
                    </Button>
                  </a>
                ) : null}
              </div>
            </div>
          </div>
          <Container className="chapter-content ">
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
                    <Title order={2} className="text-16 text-white  max-md:hidden">
                      {dataseo?.chaptername}
                    </Title>
                    <div className="flex items-center max-md:w-full justify-between">
                      {prechap ? (
                        <a href={`/chapter/${dataseo.idnovels}/${prechap}`}>
                          <Button className="bg-cyan text-black hover:bg-cyan" leftIcon={<IconChevronLeft />}>
                            Prev chapter
                          </Button>
                        </a>
                      ) : null}
                      {nextchap ? (
                        <a href={`/chapter/${dataseo.idnovels}/${nextchap}`}>
                          <Button className="bg-cyan text-black hover:bg-cyan mx-2"  rightIcon={<IconChevronRight />}>
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
