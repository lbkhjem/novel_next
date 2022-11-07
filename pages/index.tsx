import { Skeleton } from "@mantine/core";
import { Link, Text } from "@nextui-org/react";
import { NextSeo } from "next-seo";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getNovelUpdate } from "../API/APIManage";
import { Layout } from "../components/PC/Layout";
import Post from "../interfaces/post";
import { CMS_NAME } from "../lib/constants";
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
type Props = {
  allPosts: Post[];
};
const dataloading = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
export default function Index() {
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

  return (
    <>
      <Layout>
      <NextSeo
      title="NovelWorld | Read Novels online free"
      description="NovelWorld is the foremost English publisher of Chinese and Korean webnovels and light novels"
    />
        <div className="container mx-auto">
          <div className="w-full flex justify-between">
            <Text
              h1
              size={20}
              css={{
                textGradient: "45deg, $blue600 -20%, $pink600 50%",
              }}
              weight="bold"
            >
              RECENTLY UPDATED NOVEL
            </Text>
            <Link href="#">MORE</Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {isLoading
              ? dataloading.map((item, index) => (
                  <div
                    key={index}
                    className="max-w-sm rounded-lg h-full border border-gray-200 shadow-md"
                  >
                    <Skeleton height={210} mb="xl" />
                    <Skeleton height={18} radius="xl" mb="xl" />
                  </div>
                ))
              : datanovel?.slice(0, 18).map((item, index) => (
                  <Link href={`/novel/${item.idnovel}`}>
                    <a
                      key={index}
                      className="max-w-sm rounded-lg h-full border border-gray-200 shadow-md"
                    >
                      <Image
                        src={item.cover}
                        className="px-2 "
                        placeholder="blur"
                        width={250}
                        height={210}
                        alt={"ddv"}
                        style={{
                          maxWidth: "100%",
                          maxHeight: 210,
                          height: "auto",
                          objectFit: "cover",
                        }}
                        blurDataURL={`data:image/svg+xml;base64,${toBase64(
                          shimmer(700, 475)
                        )}`}
                        priority
                      />
                      <div className="p-5">
                        <Text
                          h2
                          css={{
                            // color: "$black",
                            fontWeight: "$semibold",
                          }}
                          className="font-medium text-left"
                        >
                          {item.novelsname}
                        </Text>
                        <Text
                          css={{
                            color: "$accents7",
                            fontWeight: "$semibold",
                            fontSize: "$sm",
                          }}
                        >
                          {item.lasterchapter}
                        </Text>
                      </div>
                    </a>
                  </Link>
                ))}
          </div>
        </div>
      </Layout>
    </>
  );
}
