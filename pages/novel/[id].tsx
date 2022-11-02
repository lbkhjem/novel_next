import { Card, Container, Grid, Link, Text } from "@nextui-org/react";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Layout } from "../../components/PC/Layout";


export default function Index() {
  const [datanovel, setDatanovel] = useState([]);
 
 
  return (
    <>
      <Layout>
        <Head>
          <title>Next.js Blog Example with </title>
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
            <Link href="#">
              MORE
            </Link>
          </div>
          <Grid.Container gap={2} justify="flex-start">
            {datanovel?.slice(0, 18).map((item, index) => (
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
