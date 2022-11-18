import { Skeleton, Title } from "@mantine/core";
import { NextSeo } from "next-seo";
import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { getNovelHotest, getNovelnew, getNovelUpdate } from "../API/APIManage";
import { Layout } from "../components/PC/Layout";
import { PUBLIC_URL } from "../config";
import Post from "../interfaces/post";
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
const DynamicNew = dynamic(
  () => import("../components/PC/BoxNovel/NovelNew"),
  {
    suspense: true,
  }
);
const DynamicHot = dynamic(
  () => import("../components/PC/BoxNovel/NovelHot"),
  {
    suspense: true,
  }
);
const DynamicUpdate = dynamic(
  () => import("../components/PC/BoxNovel/NovelUpdate"),
  {
    suspense: true,
  }
);


const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);
type Props = {
  allPosts: Post[];
};
const dataloading = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];
export default function Index() {
  const [isLoading, setIsLoading] = useState(false);
  const [datanovel, setDatanovel] = useState([]);
  const [dataHotnovel, setDataHotnovel] = useState([]);
  const [dataNewnovel, setDataNewnovel] = useState([]);
  useEffect(() => {
    setIsLoading(true);
   
   
  }, []);

  return (
    <>
      <Layout>
        <Head>
          <link rel="canonical" href={`${PUBLIC_URL}`} />
        </Head>
        <NextSeo
          title="NovelFav | Read Novels online free"
          description="NovelFav is the foremost English publisher of Chinese and Korean webnovels and light novels"
        />
        <div className="container mx-auto px-8">
        <Suspense fallback={`Loading...`}>
            <DynamicHot />
          </Suspense>
          <Suspense fallback={`Loading...`}>
            <DynamicNew />
          </Suspense>
          <Suspense fallback={`Loading...`}>
            <DynamicUpdate />
          </Suspense>
        </div>
      </Layout>
    </>
  );
}
