"use client";

import { useLanguage } from "../context/LanguageContext";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const { t } = useLanguage();
  const linkSections = [
    {
      title: t.quickLinks,
      links: [
        { name: t.home, href: "/" },
        { name: t.contact, href: "/contact" },
        { name: t.about, href: "/about" },
        { name: t.gallery, href: "/gallery" },
        { name: t.donate, href: "/donate" },
      ],
    },
    {
      title: t.followUs,
      links: [
        { name: "Facebook", href: "https://www.facebook.com/stichtingimedi" },
      ],
    },
  ];

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 border-t border-gray-300">
      <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 text-gray-500">
        <div>
          <Link href={"/"}>
            <Image src="/logo.png" width={100} height={100} alt="logo" />
          </Link>
        </div>

        <div className="flex flex-wrap gap-10 md:gap-20">
          {linkSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-base text-gray-900 md:mb-5 mb-2">
                {section.title}
              </h3>
              <ul className="text-sm space-y-1">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <Link
                      href={link.href}
                      className="hover:underline transition"
                      target={link.href.startsWith("http") ? "_blank" : "_self"}
                      rel={
                        link.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <p className="py-4 text-center text-sm md:text-base text-gray-500/80">
        {t.allRightsReserved}
      </p>
    </div>
  );
};

export default Footer;
