"use client";
import { useLanguage } from "../context/LanguageContext";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const [open, setOpen] = React.useState(false);

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
      {/* Logo */}
      <Link href={"/"}>
        <Image
          src="/logo.png"
          width={100}
          height={100}
          alt="logo"
          style={{ height: "auto", width: "auto" }}
        />
      </Link>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8">
        <Link href={"/"}>{t.home}</Link>
        <Link href={"/about"}>{t.about}</Link>
        <Link href={"/contact"}>{t.contact}</Link>
        <Link href={"/gallery"}>{t.gallery}</Link>
        <Link href={"/donate"}>{t.donate}</Link>
        <button
          onClick={toggleLanguage}
          className="ml-4 px-2 py-1 bg-gray-200 rounded"
        >
          {language === "en" ? "🇳🇱 Dutch" : "🇬🇧 English"}
        </button>
      </div>

      {/* Mobile Menu Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Menu"
        className="sm:hidden"
      >
        {/* SVG */}
        <svg
          width="21"
          height="15"
          viewBox="0 0 21 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="21" height="1.5" rx=".75" fill="#426287" />
          <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="#426287" />
          <rect x="6" y="13" width="15" height="1.5" rx=".75" fill="#426287" />
        </svg>
      </button>

      {/* Mobile Menu */}
      <div
        className={`${
          open ? "flex" : "hidden"
        } absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden mt-12 z-10`}
      >
        <Link href={"/"} className="block">
          {t.home}
        </Link>
        <Link href={"/about"} className="block">
          {t.about}
        </Link>
        <Link href={"/contact"} className="block">
          {t.contact}
        </Link>
        <Link href={"/gallery"} className="block">
          {t.gallery}
        </Link>
        <Link href={"/donate"} className="block">
          {t.donate}
        </Link>
        <button
          onClick={toggleLanguage}
          className="mt-2 px-2 py-1 bg-gray-200 rounded"
        >
          {language === "en" ? "🇳🇱 Dutch" : "🇬🇧 English"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
