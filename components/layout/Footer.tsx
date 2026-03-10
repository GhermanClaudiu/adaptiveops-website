import Link from "next/link";

const footerLinks = {
  company: [
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/solutions", label: "Solutions" },
    { href: "/contact", label: "Contact" },
  ],
  services: [
    { href: "/solutions", label: "Digital Solutions" },
    { href: "/services", label: "Training Programs" },
    { href: "/services", label: "Operational Coaching" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="mb-4">
              <div className="leading-none">
                <span className="text-xl font-bold text-white" style={{ letterSpacing: "-0.5px" }}>Adaptive</span>
                <span className="text-xl font-light text-accent" style={{ letterSpacing: "-0.5px" }}>Ops</span>
              </div>
            </div>
            <p className="text-white/60 text-sm max-w-md leading-relaxed">
              Helping organizations build better operational systems through people, processes and technology. Built from the shop floor up.
            </p>
          </div>

          {/* Company links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/40 mb-4">
              Company
            </h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/40 mb-4">
              Services
            </h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-white/40">
          &copy; {new Date().getFullYear()} AdaptiveOps. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
