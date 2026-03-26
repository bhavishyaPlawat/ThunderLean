import React , { useState, useEffect }from "react";
import { FaTwitter, FaGithub, FaLinkedin,FaArrowUp } from "react-icons/fa";

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
    <footer className="bg-[#1F2937] text-white pt-12 pb-8 md:pt-16">
      {/* Why Us Section */}
      <section id="whyus" className="max-w-7xl mx-auto px-6 lg:px-8 mb-12">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Why Choose ThunderLean?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">AI-Powered</h3>
              <p className="text-gray-400">Advanced AI technology for accurate calorie tracking and personalized insights.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Easy to Use</h3>
              <p className="text-gray-400">Simple interface designed for everyone, from beginners to fitness enthusiasts.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Comprehensive</h3>
              <p className="text-gray-400">Complete fitness tracking with detailed analytics and progress monitoring.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="max-w-7xl mx-auto px-6 lg:px-8 mb-12">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Get In Touch</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Have questions or feedback? We'd love to hear from you. Reach out to us and we'll get back to you as soon as possible.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="mailto:support@thunderlean.com" 
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full transition-colors duration-300"
            >
              Email Us
            </a>
            <a 
              href="https://github.com/bhavishyaPlawat/ThunderLean" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-full transition-colors duration-300"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </section>
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

          {/* Footer Links */}
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:col-span-4">
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
        </div>

        {/* Mobile Quick Links */}
        <div className="md:hidden mt-6 pt-4 border-t border-gray-700">
          <div className="flex justify-center flex-wrap gap-x-6 gap-y-2 text-sm">
            <a href="/" className="text-gray-400 hover:text-white transition-colors">
              Home
            </a>
            <a href="/#features" className="text-gray-400 hover:text-white transition-colors">
              Features
            </a>
            <a href="/faqs" className="text-gray-400 hover:text-white transition-colors">
              FAQs
            </a>
            <a href="/#whyus" className="text-gray-400 hover:text-white transition-colors">
              About
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-4 border-t border-gray-700 pt-4 text-center text-sm text-gray-500 md:mt-12 md:pt-6">
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
      animation: 'float 3s ease-in-out infinite',
      background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
    }}
  >
    <FaArrowUp className="text-lg" />
    <style jsx>{`
      @keyframes float {
        0%, 100% {
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
