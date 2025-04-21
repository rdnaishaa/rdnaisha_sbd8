import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";
import Logo from '../assets/Logo.svg'; // Ensure the logo path is correct

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white dark:bg-gray-900 shadow-lg py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-2">
            <img src={Logo} alt="Network Laboratory Logo" className="h-10 w-10" />
            <span
              className={`text-xl font-bold ${
                isScrolled ? "text-gray-800 dark:text-white" : "text-white"
              }`}
            >
              Network <span className="text-pink-500">Laboratory</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {["Home", "Subjects", "Schedule", "Contact"].map((item) => (
              <Link
                key={item}
                to={item.toLowerCase()}
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                className={`px-4 py-2 mx-1 rounded-full font-medium transition-all ${
                  isScrolled
                    ? "text-gray-700 hover:bg-pink-100 dark:text-gray-200 dark:hover:bg-gray-700"
                    : "text-white hover:bg-white hover:bg-opacity-20"
                } hover:text-pink-500 cursor-pointer`}
              >
                {item}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className={`p-2 rounded-md ${
                isScrolled ? "text-gray-700 dark:text-white" : "text-white"
              }`}
            >
              <div className="w-6 flex flex-col items-end space-y-1">
                <span
                  className={`block h-0.5 ${mobileMenuOpen ? "w-6" : "w-6"} bg-current transform transition ${
                    mobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
                  }`}></span>
                <span
                  className={`block h-0.5 ${mobileMenuOpen ? "w-0" : "w-4"} bg-current transition`}></span>
                <span
                  className={`block h-0.5 ${mobileMenuOpen ? "w-6" : "w-5"} bg-current transform transition ${
                    mobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
                  }`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 max-h-0 ${
            mobileMenuOpen ? "max-h-60" : ""
          }`}
        >
          <div
            className={`pt-4 pb-3 space-y-1 ${
              isScrolled ? "text-gray-800 dark:text-white" : "text-white"
            }`}
          >
            {["Home", "Subjects", "Schedule", "Contact"].map((item) => (
              <Link
                key={item}
                to={item.toLowerCase()}
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-md font-medium ${
                  isScrolled
                    ? "hover:bg-pink-100 dark:hover:bg-gray-700"
                    : "hover:bg-white hover:bg-opacity-10"
                } hover:text-pink-500 cursor-pointer`}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
