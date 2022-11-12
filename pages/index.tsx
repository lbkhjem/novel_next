import { Container, Skeleton, Title } from "@mantine/core";
import { NextSeo } from "next-seo";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getNovelUpdate } from "../API/APIManage";
import { Layout } from "../components/PC/Layout";
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
        <Container className=" mx-auto">
          <div className="w-full flex justify-between py-2">
            <Title className="max-md:text-14" size={20} order={1}>
              RECENTLY UPDATED NOVEL
            </Title>
            <Link href="#">MORE</Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
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
              : datanovel.map((item, index) => (
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
        </Container>
      </Layout>
    </>
  );
}
