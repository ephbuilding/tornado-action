import NextHead from "next/head";
import NextLink from "next/link";
import { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { Drawer, Menu, Navbar } from "react-daisyui";

import { Footer, Header } from "components";

export const PageLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleIsOpen = useCallback(() => setIsOpen((isOpen) => !isOpen), []);

  return (
    <>
      <Meta />

      <Drawer open={isOpen} onClickOverlay={toggleIsOpen} side={<MobileNav />}>
        <div className="flex flex-col min-h-screen">
          <Header callback={toggleIsOpen} />
          <main className="flex-1 flex flex-col p-4">{children}</main>
          <Footer />
        </div>
      </Drawer>
    </>
  );
};

const Meta = () => {
  return (
    <NextHead>
      <title>Tornado Warned</title>
      <link rel="icon" href="/favicon.ico" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta
        name="keywords"
        content="severe weather, tornadoes, tornado, tornado alley, tornado warning, tornado watch, weather alerts, national weather service"
      />
      <meta
        name="description"
        content="tornadowarned.com | real-time tornado alerts, news, safety info, stats, and graphics"
      />
      <meta property="og:title" name="title" content="tornadowarned.com" />
      <meta property="og:type" content="website" />
      <meta
        name="image"
        property="og:image"
        content="https://repository-images.githubusercontent.com/450166464/d5820a8c-ce6a-438a-bca8-af79668f2e57"
      />
      <meta
        name="description"
        property="og:description"
        content="tornadowarned.com | real-time tornado alerts, news, safety info, stats, and graphics."
      />
      <meta name="author" content="Ephraim Smith" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@ephraimsmithdev" />
      <meta name="twitter:site" content="@ephraimsmithdev" />
      <meta name="twitter:title" content="tornadowarned.com" />
      <meta
        name="twitter:image:src"
        content="https://www.tornadowarned.com/images/twitter-card.png"
      />
      <meta
        name="twitter:description"
        content="tornadowarned.com | real-time tornado alerts, news, safety info, stats, and graphics."
      />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Archivo:wght@900&display=swap"
        rel="stylesheet"
      />
    </NextHead>
  );
};

const MobileNav = () => (
  <Menu className="p-4 w-60 md:w-80 h-full bg-base-200">
    <Menu.Item className="text-sm">
      <NextLink href="/">alerts</NextLink>
    </Menu.Item>
    <Menu.Item className="text-sm">
      <NextLink href="/convective-outlooks">outlooks</NextLink>
    </Menu.Item>
  </Menu>
);
