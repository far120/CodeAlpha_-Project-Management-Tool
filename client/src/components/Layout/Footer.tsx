import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";
import { Sparkles } from "lucide-react";

const socialLinks = [
  { Icon: FaGithub, href: "#", label: "GitHub" },
  { Icon: FaTwitter, href: "#", label: "Twitter" },
  { Icon: FaLinkedinIn, href: "#", label: "LinkedIn" },
  { Icon: FaInstagram, href: "#", label: "Instagram" },
  { Icon: FaFacebookF, href: "#", label: "Facebook" },
];

export default function Footer() {
  return (
    <footer className="w-full bg-slate-950 text-slate-400 border-t border-slate-800/80 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="md:col-span-4 space-y-4">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 flex items-center justify-center shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                ELFAR<span className="text-indigo-400 font-normal ml-1">Starter</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Empowering developers to build full-stack web applications with modern architecture, maximum speed, and uncompromised elegance.
            </p>

            {/* Social Icons */}
            <div className="flex gap-2 pt-2">
              {socialLinks.map((social, index) => {
                const Icon = social.Icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-indigo-500/50 hover:bg-indigo-600/10 transition-all duration-200"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links Grid */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* Product Column */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-4">
                Product
              </h3>
              <ul className="space-y-2.5">
                {[
                  { name: "Features", to: "/features" },
                  { name: "Pricing", to: "/pricing" },
                  { name: "Documentation", to: "/docs" },
                  { name: "API Reference", to: "/api" },
                ].map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.to}
                      className="text-sm text-slate-400 hover:text-indigo-400 transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-4">
                Company
              </h3>
              <ul className="space-y-2.5">
                {[
                  { name: "About Us", to: "/about" },
                  { name: "Careers", to: "/careers" },
                  { name: "Blog", to: "/blog" },
                  { name: "Contact", to: "/contact" },
                ].map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.to}
                      className="text-sm text-slate-400 hover:text-indigo-400 transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal & Safety Column */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-4">
                Legal & Safety
              </h3>
              <ul className="space-y-2.5">
                {[
                  { name: "Privacy Policy", to: "/privacy" },
                  { name: "Terms of Service", to: "/terms" },
                  { name: "Security", to: "/security" },
                ].map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.to}
                      className="text-sm text-slate-400 hover:text-indigo-400 transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} ELFAR Starter. All rights reserved.</p>

          <div className="flex items-center gap-2 bg-slate-900/60 border border-slate-800/80 px-3 py-1.5 rounded-full text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}