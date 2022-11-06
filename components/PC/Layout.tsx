import { Box } from "./Box";
import { Content } from "./Content";
import {
  Avatar,
  Container,
  Dropdown,
  Input,
  Navbar,
  Switch,
  Text,
  useTheme,
} from "@nextui-org/react";
import { SearchIcon } from "../../components/Icon/SearchIcon";
import { useTheme as useNextTheme } from "next-themes";
import { SunIcon } from "../../components/Icon/SunIcon";
import { MoonIcon } from "../../components/Icon/MoonIcon";

export const Layout = ({ children }) => {
  const { setTheme } = useNextTheme();
  const { isDark, type } = useTheme();
  return (
    <Box
      css={{
        maxW: "100%",
      }}
    >
      <Navbar className="" isBordered variant="sticky">
        <Navbar.Brand css={{ mr: "$4" }}>
          {/* <AcmeLogo /> */}
          <Text b color="inherit" css={{ mr: "$11" }} hideIn="xs">
            Novel
          </Text>
          <Navbar.Content hideIn="xs" variant="highlight">
            <Navbar.Link isActive href="#">
              Hot Novel
            </Navbar.Link>
            <Navbar.Link href="#">Completed Novel</Navbar.Link>
            <Navbar.Link href="#">Update Novel</Navbar.Link>
          </Navbar.Content>
        </Navbar.Brand>
        <Navbar.Content
          css={{
            "@xsMax": {
              w: "100%",
              jc: "space-between",
            },
          }}
        >
          <Navbar.Item
            css={{
              "@xsMax": {
                w: "100%",
                jc: "center",
              },
            }}
          >
            <Input
              clearable
              contentLeft={
                <SearchIcon fill="var(--nextui-colors-accents6)" size={16} />
              }
              contentLeftStyling={false}
              css={{
                w: "100%",
                "@xsMax": {
                  mw: "300px",
                },
                "& .nextui-input-content--left": {
                  h: "100%",
                  ml: "$4",
                  dflex: "center",
                },
              }}
              placeholder="Search..."
            />
          </Navbar.Item>

          <Navbar.Item>
            <Switch
              checked={isDark}
              iconOn={<SunIcon filled />}
              iconOff={<MoonIcon filled />}
              onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
            />
          </Navbar.Item>
        </Navbar.Content>
      </Navbar>
      {children}
      <footer className="p-4 bg-white shadow md:flex md:items-center md:justify-between md:p-6">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2022{" "}
          <a href="/" className="hover:underline">
            Flowbite™
          </a>
          . All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6 ">
              About
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              Licensing
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Contact
            </a>
          </li>
        </ul>
      </footer>
    </Box>
  );
};
