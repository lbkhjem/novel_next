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
            ACME
          </Text>
          <Navbar.Content hideIn="xs" variant="highlight">
            <Navbar.Link isActive href="#">
              Dashboard
            </Navbar.Link>
            <Navbar.Link href="#">Team</Navbar.Link>
            <Navbar.Link href="#">Activity</Navbar.Link>
            <Navbar.Link href="#">Settings</Navbar.Link>
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
      {/* <Content /> */}
    </Box>
  );
};
