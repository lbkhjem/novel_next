import {
  ColorScheme,
  ColorSchemeProvider, MantineProvider
} from "@mantine/core";
import { getCookie, setCookie } from "cookies-next";
import NextApp, { AppContext, AppProps } from "next/app";
import Head from "next/head";
import { useState } from "react";
import '../build.css';
import { RouterTransition } from "../components/RouterTransition";
import "../styles/index.css";
export default function App(props: AppProps & { colorScheme: ColorScheme }) {
  const { Component, pageProps } = props;
  const [colorScheme, setColorScheme] = useState<ColorScheme>(
    props.colorScheme
  );

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme =
      value || (colorScheme === "dark" ? "light" : "dark");
    setColorScheme(nextColorScheme);
    setCookie("mantine-color-scheme", nextColorScheme, {
      maxAge: 60 * 60 * 24 * 30,
    });
  };

  return (
    <>
      <Head>
        <title>Novel - Best novel reading online website</title>
        <meta
          content="width=device-width,  initial-scale=1.0"
          name="viewport"
        />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32"></link>
        <link rel="icon" href="/android-chrome-192x192.png" sizes="192x192"></link>
        <link rel="apple-touch-icon" href="/apple-touch-icon.png"></link>
        <meta name="msapplication-TileImage" content="/android-chrome-512x512.png"></meta>
      </Head>

      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          theme={{
            colorScheme,
            fontFamily: "Verdana, sans-serif",
            fontFamilyMonospace: "Monaco, Courier, monospace",
          }}
          withGlobalStyles
          withNormalizeCSS
        >
            <RouterTransition />
            <Component {...pageProps} />
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}

App.getInitialProps = async (appContext: AppContext) => {
  const appProps = await NextApp.getInitialProps(appContext);
  return {
    ...appProps,
    colorScheme: getCookie("mantine-color-scheme", appContext.ctx) || "dark",
  };
};
