import { Skeleton, Title } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getNovelHotest, getNovelUpdate } from "../../../API/APIManage";
const dataloading = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
];
export default function NovelHot({dataseo}) {
    const [chaptxt, setChaptxt] = useState("");
  return (
    <>
     <div id="list_chapter" className="list_chapter w-full">
            <div className="flex row justify-between w-full title-list-chapter">
              <h2 className="h2-manga">{dataseo.novelsname} Chapters</h2>
              <span>Time uploaded</span>
            </div>

            <div className="chapter-list">
              {(chaptxt !== ""
                ? dataseo.chapterlist.filter(function (o) {
                    return (
                      o.chaptername
                        .toLowerCase()
                        .search(chaptxt.toLowerCase()) !== -1
                    );
                  })
                : dataseo.chapterlist
              )?.map((item, index) => (
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
          </>
  );
}
