import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { IconMoonStars, IconSun } from "@tabler/icons";
import { useTheme as useNextTheme } from "next-themes";
import Script from "next/script";
import { AnalyticsWrapper } from "../analytics";

export const Layout = ({ children }) => {
  const { setTheme } = useNextTheme();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  return (
    <div className="w-full">
      <nav className=" px-2 sm:px-4 py-2.5  drop-shadow-xl  border-b mb-2 ">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <a href="/" className="flex items-center">
          
            <span className="text-xl font-semibold whitespace-nowrap">
              Novel
            </span>
          </a>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="flex flex-col p-4 mt-4 items-center rounded-lg border  md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 ">
              <li>
                <a
                  href="/"
                  className="block py-2 pr-4 pl-3 rounded md:bg-transparent  md:p-0"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/novel_list?type=update&page=1"
                  className="block py-2 pr-4 pl-3 rounded md:bg-transparent  md:p-0"
                >
                  Novel Update
                </a>
              </li>
              <li>
                <a
                  href="/novel_list?type=topview&page=1"
                  className="block py-2 pr-4 pl-3 rounded md:bg-transparent  md:p-0"
                >
                  Hot Novel
                </a>
              </li>
              <li>
                <a
                  href="/novel_list?type=complete&page=1"
                  className="block py-2 pr-4 pl-3 rounded md:bg-transparent  md:p-0"
                >
                  Completed Novel
                </a>
              </li>
              <li>
                <ActionIcon
                  variant="outline"
                  color={dark ? "yellow" : "blue"}
                  onClick={() => toggleColorScheme()}
                  title="Toggle color scheme"
                >
                  {dark ? <IconSun size={18} /> : <IconMoonStars size={18} />}
                </ActionIcon>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {children}
      <footer className="p-4  shadow md:flex md:items-center md:justify-between md:p-6">
        <span className="text-sm sm:text-center ">
          © 2022{" "}
          <a href="/" className="hover:underline">
            Novel
          </a>
          . All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm  sm:mt-0">
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6 ">
              About
            </a>
          </li>
          <li>
            <a href="/privacy-policy" className="mr-4 hover:underline md:mr-6">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="/termsofuse" className="mr-4 hover:underline md:mr-6">
            Terms of Use
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Contact
            </a>
          </li>
        </ul>
      </footer>
      <AnalyticsWrapper />
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-6L1QYHQKF5');
        `}
      </Script>
    </div>
  );
};
