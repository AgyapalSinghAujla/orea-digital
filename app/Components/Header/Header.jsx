"use client";
import { useState } from "react";
import Link from "next/link";
import { HiOutlineBars3CenterLeft } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header>
      <div className="header">
        <div className="logo">
          <Link href="/">W.</Link>
        </div>

        <nav className="header-nav">
          <ul>
            <li>
              <Link href="/about-us">About</Link>
            </li>
            <li>
              <Link href="/projects">Projects</Link>
            </li>
            <li>
              <Link href="/services">Services</Link>
            </li>
            <li>
              <Link href="/contact-us">Contact</Link>
            </li>
          </ul>
        </nav>

        <div className="header-cta">CTA</div>

        <div className="hamburger" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? (
            <IoMdClose className="nav-icon nav-icon-close" />
          ) : (
            <HiOutlineBars3CenterLeft className="nav-icon" />
          )}
        </div>
      </div>

      <div
        className={`ag-mobile-navbar ${
          isMobileMenuOpen ? "mobileDrawerOpen" : ""
        }`}
      >
        <nav className="header-nav">
          <ul>
            <li onClick={closeMobileMenu}>
              <Link href="/about-us">About</Link>
            </li>
            <li onClick={closeMobileMenu}>
              <Link href="/projects">Projects</Link>
            </li>
            <li onClick={closeMobileMenu}>
              <Link href="/services">Services</Link>
            </li>
            <li onClick={closeMobileMenu}>
              <Link href="/contact-us">Contact</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
