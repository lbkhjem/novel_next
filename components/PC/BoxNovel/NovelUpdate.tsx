import { Skeleton, Title } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getNovelnew, getNovelUpdate } from "../../../API/APIManage";
const dataloading = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18
];
export default function NovelUpdate() {
  const [isLoading, setIsLoading] = useState(false);
  const [datanovel, setDatanovel] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    getNovelnew({ page: 1 })
      .then((res: any) => {
        setIsLoading(false);
        setDatanovel(res?.data);
      })
      .catch((e) => {});
  }, []);
  return (
    <div className="w-full">
      <div className="w-full flex justify-between py-2">
        <Title className="max-md:text-14" size={20} order={1}>
          RECENTLY UPDATED NOVEL
        </Title>
        <Link
          title="RECENTLY UPDATED NOVEL"
          href="/novel_list?type=update&page=1"
        >
          MORE
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2">
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
          : datanovel?.slice(0, 18)?.map((item, index) => (
              <Link
                key={index}
                className="max-w-sm  h-full flex justify-between items-center w-full"
                href={`/novel/${item.idnovel}`}
              >
                <div
                  style={{
                    position: "relative",
                    width: "20%",
                    // height:'auto'
                  }}
                  className="h-20 max-sm:h-14"
                >
                  <Image
                    alt={item.novelsname}
                    src={item.cover}
                    fill
                    // blurDataURL={`data:image/svg+xml;base64,${toBase64(
                    //   shimmer(700, 475)
                    // )}`}
                    priority
                    // placeholder="blur"
                    sizes="(max-width: 768px) 100vw,
                    (max-width: 1200px) 50vw,
                    33vw"
                    style={{
                      objectFit: "cover",
                    
                    }}
                  />
                </div>
                <div style={{ width: "80%" }} className="px-2 flex flex-col">
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
    </div>
  );
}
