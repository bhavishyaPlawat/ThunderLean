import React, { useState, useEffect } from "react";
import { FaTwitter, FaGithub, FaLinkedin, FaArrowUp } from "react-icons/fa";

const PageFooter = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when user scrolls down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const socialLinks = [
    {
      icon: <FaGithub />,
      href: "https://github.com/bhavishyaPlawat/ThunderLean",
    },
    {
      icon: <FaLinkedin />,
      href: "https://www.linkedin.com/in/bhavishya-plawat-165184303/",
    },
  ];

  const footerLinks = [
    {
      title: "Product",
      links: [
        { name: "Features", href: "/#features" },
        { name: "Pricing", href: "#" },
        { name: "Updates", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About", href: "/#whyus" },
        { name: "Contact Us", href: "#" },
        { name: "Careers", href: "#" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "FAQs", href: "/faqs" },
        { name: "Help Center", href: "#" },
        { name: "Community", href: "/community" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "#" },
        { name: "Terms of Service", href: "#" },
      ],
    },
  ];

  return (
    <footer id="whyus" className="bg-[#e3e7f0] text-white pt-12 pb-8 md:pt-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="sm:col-span-2 lg:col-span-1 mb-6 md:mb-0">
            <h1 className="text-2xl font-bold tracking-wide text-black">
              Thunderlean
            </h1>
            <p className="mt-4 text-black text-sm leading-relaxed">
              AI-powered insights to elevate your fitness journey.
            </p>
            <div className="flex gap-4 mt-6">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="text-black hover:text-gray-800 transition-colors text-2xl"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:col-span-4">
            {footerLinks.map((section) => (
              <div key={section.title} className="mb-6">
                <h4 className="font-semibold text-lg tracking-wider mb-4 text-black">
                  {section.title}
                </h4>
                <ul className="space-y-2 text-sm">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-black hover:text-gray-800 transition-colors block py-1"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Quick Links */}
        <div className="md:hidden mt-6 pt-4 border-t border-gray-700">
          <div className="flex justify-center flex-wrap gap-x-6 gap-y-2 text-sm">
            <a
              href="/"
              className="text-black hover:text-gray-800 transition-colors"
            >
              Home
            </a>
            <a
              href="/#features"
              className="text-black hover:text-gray-800 transition-colors"
            >
              Features
            </a>
            <a
              href="/faqs"
              className="text-black hover:text-gray-800 transition-colors"
            >
              FAQs
            </a>
            <a
              href="/#whyus"
              className="text-black hover:text-gray-800 transition-colors"
            >
              About
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-4 border-t border-black pt-4 text-center text-sm text-black md:mt-12 md:pt-6">
          <p>
            &copy; {new Date().getFullYear()} Thunderlean. All rights reserved.
          </p>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-4 rounded-full bg-purple-600 text-white shadow-2xl hover:bg-purple-700 hover:scale-110 hover:shadow-purple-500/25 transition-all duration-300 ease-in-out transform hover:-translate-y-1 animate-bounce z-50"
          style={{
            animation: "float 3s ease-in-out infinite",
            background: "linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)",
          }}
        >
          <FaArrowUp className="text-lg" />
          <style jsx>{`
            @keyframes float {
              0%,
              100% {
                transform: translateY(0px);
              }
              50% {
                transform: translateY(-8px);
              }
            }
          `}</style>
        </button>
      )}
    </footer>
  );
};

export default PageFooter;
