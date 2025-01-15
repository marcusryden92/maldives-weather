"use client";

import { Sun, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import styles from "./Header.module.css";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "./ui/navigation-menu";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigationLinks = [
    { href: "/forecast", label: "Forecast" },
    { href: "/historical-weather", label: "Historical Weather" },
    { href: "/news", label: "News" },
    { href: "/about", label: "About" },
  ];

  const NavigationLinks = ({ mobile = false }) =>
    navigationLinks.map((link) => (
      <NavigationMenuItem key={link.href}>
        <NavigationMenuLink asChild>
          <Link
            href={link.href}
            className={`group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-white transition-colors hover:bg-accent/50 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 ${
              mobile ? "w-full" : ""
            }`}
            onClick={() => mobile && setIsOpen(false)}
          >
            {link.label}
          </Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
    ));

  return (
    <div className="w-full bg-accent/90 backdrop-blur-sm fixed top-0 z-50 border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Sun
              className={`h-8 w-8 ${styles.pulsateRotate} text-yellow-300`}
            />
            <span className="text-2xl font-bold text-white">
              Weather Maldives
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationLinks />
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Mobile Navigation Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2 transition-colors hover:bg-accent/50 rounded-md"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            <NavigationMenu className="w-full">
              <NavigationMenuList className="flex-col items-start space-y-2">
                <NavigationLinks mobile />
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
