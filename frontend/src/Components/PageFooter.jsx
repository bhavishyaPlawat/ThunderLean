import React from "react";
import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";

const PageFooter = () => {
  const socialLinks = [
    { icon: <FaGithub />, href: "https://github.com/bhavishyaPlawat/ThunderLean" },
    { icon: <FaLinkedin />, href: "https://www.linkedin.com/in/bhavishya-plawat-165184303/" },
  ];

  const footerLinks = [
    { title: "Product", links: ["Features", "Pricing", "Updates"] },
    { title: "Company", links: ["About", "Contact Us", "Careers"] },
    { title: "Legal", links: ["Privacy Policy", "Terms of Service"] },
  ];

  return (
    <footer id="whyus" className="bg-[#1F2937] text-white pt-12 pb-8 md:pt-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* The grid now adapts better to tablets (`sm:grid-cols-2`).
          The main brand section (`sm:col-span-2`) spans the full width on tablets for better balance.
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title} className="mb-6 hidden md:block">
              <h4 className="font-semibold text-lg tracking-wider mb-4">
                {section.title}
              </h4>
              <ul className="space-y-2 text-sm">
                {section.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
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
