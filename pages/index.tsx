import { Card, Container, Grid, Link, Text } from "@nextui-org/react";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getNovelUpdate } from "../API/APIManage";
import { Layout } from "../components/PC/Layout";
import Post from "../interfaces/post";
import { CMS_NAME } from "../lib/constants";

type Props = {
  allPosts: Post[];
};

export default function Index() {
  const [datanovel, setDatanovel] = useState([]);
  useEffect(() => {
    getNovelUpdate({ page: 1 })
      .then((res: any) => {
        setDatanovel(res?.data);
      })
      .catch((e) => {});
  }, []);

  return (
    <>
      <Layout>
        <Head>
          <title>Next.js Blog Example with {CMS_NAME}</title>
        </Head>
        <Container>
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
          <Grid.Container gap={1} justify="space-between">
            {datanovel?.slice(0, 18).map((item, index) => (
              <Grid xs={6} sm={2} key={index}>
                <Card isHoverable isPressable>
                  <Card.Body css={{ p: 0 }}>
                    <div
                      style={{
                        width: '100%',
                        height: 210,
                        position: "relative",
                      }}
                    >
                      <Image
                        src={item.cover}
                        className="px-2 "
                        fill
                        sizes="100vw"
                        alt={"ddv"}
                        style={{
                          objectFit: 'contain',
                        }}
                      />
                    </div>
                    {/* <Image
                      src={item.cover}
                      objectFit=""
                      // width="100%"
                      // height={210}
                      alt={item.novelsname}
                    /> */}
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
