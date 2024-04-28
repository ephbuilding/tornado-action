import { Footer as DaisyFooter } from "react-daisyui";
import NextImage from "next/image";
import NextLink from "next/link";

import { HiOutlineMail } from "react-icons/hi";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";

const LOGOS = [
  {
    fileName: "logo-nws.png",
    alt: "National Weather Serviec logo",
    href: "https://www.weather.gov/",
  },
  {
    fileName: "logo-spc.png",
    alt: "Storm Prediction Center logo",
    href: "https://www.spc.noaa.gov/",
  },
  {
    fileName: "logo-d3.png",
    alt: "D3 logo",
    href: "https://d3js.org",
  },
];

const LINKS = {
  resources: [
    {
      title: "NWS API Web Service",
      href: "https://www.weather.gov/documentation/services-web-api",
    },
    {
      title: "SPC Outlook MapServer",
      href: "https://mapservices.weather.noaa.gov/vector/rest/services/outlooks/SPC_wx_outlks/MapServer",
    },
    {
      title: "SPC Outlook Text Products",
      href: "https://tgftp.nws.noaa.gov/data/raw/ac/",
    },
    {
      title: "SPC RSS Feeds",
      href: "https://www.spc.noaa.gov/aboutrss.html",
    },
  ],
  project: [
    {
      title: "Feedback",
      href: "mailto:tornadowarned@ephraimsmith.dev",
    },
    {
      title: "GitHub Repo",
      href: "https://github.com/modevx/tornado-warned",
    },
    {
      title: "Tornado API",
      href: "https://github.com/ephcoding/tornado-api",
    },
  ],
  me: [
    {
      title: "Email",
      href: "mailto:hi@ephraimsmith.dev",
      icon: HiOutlineMail,
      handle: "@ephraimsmith.dev",
    },
    {
      title: "GitHub",
      href: "https://github.com/ephcoding",
      icon: FaGithub,
      handle: "/ephcoding",
    },
    {
      title: "LinkedIn",
      href: "https://www.linkedin.com/in/ephraimsmithdev",
      icon: FaLinkedin,
      handle: "/in/ephraimsmithdev",
    },
    {
      title: "Twitter / X",
      href: "https://twitter.com/ephraimsmithdev",
      icon: FaXTwitter,
      handle: "@ephraimsmithdev",
    },
  ],
};

export const Footer = () => {
  return (
    <div data-testid="Footer">
      <DaisyFooter className="p-10 bg-primary">
        {/* <LinkSection title="Resources" links={LINKS.resources} /> */}
        {/* <LinkSection title="Tornado Warned" links={LINKS.project} /> */}
        {/* <LinkSection title="Contact" links={LINKS.me} /> */}

        <div>
          <PoweredBySection logos={LOGOS} />
          <div className="h-10" />

          <Copyright />
        </div>
      </DaisyFooter>
    </div>
  );
};

const PoweredBySection = ({ logos }) => {
  return (
    <div>
      <p className="mb-4 text-sm">Powered By:</p>
      <div className="flex">
        {logos.map(({ fileName, alt, href }) => (
          <div
            key={fileName}
            style={{ position: "relative", height: "30px", width: "60px" }}
          >
            <NextLink href={href} passHref>
              <a
                target="_blank"
                rel="noreferrer noopener"
                referrerPolicy="no-referrer"
              >
                <NextImage
                  src={`/images/${fileName}`}
                  alt={alt}
                  layout="fill"
                  objectFit="contain"
                  objectPosition="center"
                />
              </a>
            </NextLink>
          </div>
        ))}
      </div>
    </div>
  );
  lt;
};

const Copyright = () => (
  <p className="text-center text-xs mb-3">
    &copy; {new Date().getFullYear()} Tornado Warned&trade;. &nbsp; All Rights
    Reserved.
  </p>
);

const LinkSection = ({ title, links }) => {
  return (
    <div>
      <DaisyFooter.Title>{title}</DaisyFooter.Title>
      {links.map(({ title, href, icon, handle }) => {
        const Icon = icon;

        return (
          <NextLink key={title} href={`${href}`}>
            <a
              target="_blank"
              rel="noreferrer noopener"
              referrerPolicy="no-referrer"
              className="text-primary-content hover:text-primary-focus"
            >
              {icon ? (
                <div className="flex">
                  <Icon size={20} />
                  <span className="ml-2.5">{handle}</span>
                </div>
              ) : (
                title
              )}
            </a>
          </NextLink>
        );
      })}
    </div>
  );
};
