import { Skeleton, Title } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getNovelHotest, getNovelUpdate } from "../../../API/APIManage";
const dataloading = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
export default function NovelHot() {
  const [isLoading, setIsLoading] = useState(false);
  const [datanovel, setDatanovel] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    getNovelHotest({ page: 1 })
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
          Best on NovelFav
        </Title>
        <Link href="/novel_list?type=hot&page=1">MORE</Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
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
          : datanovel.slice(0, 14).map((item, index) => (
              <Link
                key={index}
                title={item.novelsname}
                className="max-w-sm  h-full "
                href={`/novel/${item.idnovel}`}
              >
                <div style={{ height: 194 }} className="overflow-hidden">
                  <Image
                    alt={item.novelsname}
                    src={item.cover}
                    priority
                    width={145}
                    height={194}
                    sizes="100vw"
                    style={{
                      width: "100%",
                      height: "auto",
                      objectFit: "cover",
                    }}
                  />
                </div>

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
    </div>
  );
}
