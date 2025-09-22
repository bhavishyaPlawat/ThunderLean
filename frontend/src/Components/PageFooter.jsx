import React from "react";
import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";

const PageFooter = () => {
  const socialLinks = [
    { icon: <FaGithub />, href: "https://github.com/bhavishyaPlawat/ThunderLean" },
    { icon: <FaLinkedin />, href: "https://www.linkedin.com/in/bhavishya-plawat-165184303/" },
  ];

  const footerLinks = [
    { title: "Product", links: [
      { name: "Features", href: "/#features" },
      { name: "Pricing", href: "#" },
      { name: "Updates", href: "#" }
    ]},
    { title: "Company", links: [
      { name: "About", href: "/#whyus" },
      { name: "Contact Us", href: "#" },
      { name: "Careers", href: "#" }
    ]},
    { title: "Support", links: [
      { name: "FAQs", href: "/faqs" },
      { name: "Help Center", href: "#" },
      { name: "Community", href: "/community" }
    ]},
    { title: "Legal", links: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" }
    ]},
  ];

  return (
    <footer id="whyus" className="bg-[#1F2937] text-white pt-12 pb-8 md:pt-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="sm:col-span-2 lg:col-span-1 mb-6 md:mb-0">
            <h1 className="text-2xl font-bold tracking-wide text-white">
              Thunderlean
            </h1>
            <p className="mt-4 text-gray-400 text-sm leading-relaxed">
              AI-powered insights to elevate your fitness journey.
            </p>
            <div className="flex gap-4 mt-6">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="text-gray-400 hover:text-white transition-colors text-2xl"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links - Now visible on mobile */}
          {footerLinks.map((section) => (
            <div key={section.title} className="mb-6">
              <h4 className="font-semibold text-lg tracking-wider mb-4 text-white">
                {section.title}
              </h4>
              <ul className="space-y-2 text-sm">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors block py-1"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Mobile Quick Links */}
        <div className="md:hidden mt-8 pt-6 border-t border-gray-700">
          <h4 className="font-semibold text-lg tracking-wider mb-4 text-white text-center">
            Quick Navigation
          </h4>
          <div className="grid grid-cols-2 gap-4 text-center">
            <a href="/" className="text-gray-400 hover:text-white transition-colors py-2">
              Home
            </a>
            <a href="/#features" className="text-gray-400 hover:text-white transition-colors py-2">
              Features
            </a>
            <a href="/faqs" className="text-gray-400 hover:text-white transition-colors py-2">
              FAQs
            </a>
            <a href="/#whyus" className="text-gray-400 hover:text-white transition-colors py-2">
              About
            </a>
          </div>
        </div>

        {/* Reduced top margin for the copyright section on mobile (`mt-8`) */}
        <div className="mt-8 border-t border-gray-700 pt-6 text-center text-sm text-gray-500 md:mt-12">
          <p>
            &copy; {new Date().getFullYear()} Thunderlean. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default PageFooter;
