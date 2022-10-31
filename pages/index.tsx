import { Card, Container, Grid, Row, Text } from "@nextui-org/react";
import Head from "next/head";
import { useEffect, useState } from "react";
import { getNovelUpdate } from "../API/APIManage";
import { Layout } from "../components/PC/Layout";
import Post from "../interfaces/post";
import { getAllPosts } from "../lib/api";
import { CMS_NAME } from "../lib/constants";

type Props = {
  allPosts: Post[];
};

export default function Index() {
  const [datanovel, setDatanovel] = useState([]);
  useEffect(() => {
    getNovelUpdate({page:1})
      .then((res: any) => {
        setDatanovel(res?.data);
      })
      .catch((e) => {});
  }, []);
  const list = [
    {
      id: 1,
      novelName: "Almighty Sword Domain",
      img: "https://avatar.novelonlinefree.com/avatar_novels/34167-1608768308.jpg",
      newchap: "Almighty Sword Domain Chapter 2297 – Its For Your Own Good!",
    },
    {
      id: 1,
      novelName: "Almighty Sword Domain",
      img: "https://avatar.novelonlinefree.com/avatar_novels/34167-1608768308.jpg",
      newchap: "Almighty Sword Domain Chapter 2297 – Its For Your Own Good!",
    },
    {
      id: 1,
      novelName: "Almighty Sword Domain",
      img: "https://avatar.novelonlinefree.com/avatar_novels/34167-1608768308.jpg",
      newchap: "Almighty Sword Domain Chapter 2297 – Its For Your Own Good!",
    },
    {
      id: 1,
      novelName: "Almighty Sword Domain",
      img: "https://avatar.novelonlinefree.com/avatar_novels/34167-1608768308.jpg",
      newchap: "Almighty Sword Domain Chapter 2297 – Its For Your Own Good!",
    },
    {
      id: 1,
      novelName: "Almighty Sword Domain",
      img: "https://avatar.novelonlinefree.com/avatar_novels/34167-1608768308.jpg",
      newchap: "Almighty Sword Domain Chapter 2297 – Its For Your Own Good!",
    },
  ];
  return (
    <>
      <Layout>
        <Head>
          <title>Next.js Blog Example with {CMS_NAME}</title>
        </Head>
        <Container>
          <Grid.Container gap={2} justify="flex-start">
            {datanovel?.slice(0,18).map((item, index) => (
              <Grid xs={2} sm={2} key={index}>
                <Card isHoverable isPressable>
                  <Card.Body css={{ p: 0 }}>
                    <Card.Image
                      src={item.cover}
                      objectFit="cover"
                      width="100%"
                      height={210}
                      alt={item.novelsname}
                    />
                    <div className="items-start flex flex-col px-2 py-2">
                      <Text h2 className="font-medium text-left">
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
                  </Card.Body>

                </Card>
              </Grid>
            ))}
          </Grid.Container>
        </Container>
      </Layout>
    </>
  );
}
