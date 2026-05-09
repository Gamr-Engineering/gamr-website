import { Instagram, Youtube, Linkedin } from "lucide-react";
import { RiTwitterXFill, RiTiktokFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Footer = () => {
  const { toast } = useToast();
  const socialLinks = [
    { icon: Linkedin, href: "https://www.linkedin.com/company/gamr/" },
    { icon: RiTiktokFill, href: "https://www.tiktok.com/@gamrhq?_t=ZS-90oV0Er3uPk&_r=1" },
    { icon: Instagram, href: "https://www.instagram.com/gamrhq/" },
    { icon: Youtube, href: "https://www.youtube.com/@gamr.africa1692" },
    { icon: RiTwitterXFill, href: "https://x.com/GamrHQ" },
  ];

  const footerSections = [
    {
      title: "Company",
      links: [
        { name: "Vision", href: "/vision" },
        { name: "Mission", href: "/mission" },
        { name: "Why Now", href: "/why-now" },
        { name: "Team", href: "/team" },
      ],
    },
    {
      title: "Ecosystem",
      links: [
        { name: "GamrTag", href: "/gamrtag" },
        { name: "Studios", href: "/studios" },
        { name: "Carven", href: "/carven" },
        { name: "Bracket", href: "/bracket", comingSoon: true },
      ],
    },
    {
      title: "Talent",
      links: [
        { name: "Gamers", href: "/gamers" },
        { name: "Creators", href: "/creators" },
        { name: "Developers", href: "/developers" },
      ],
    },
    {
      title: "Industry",
      links: [
        { name: "Education", href: "/education" },
        { name: "Esports", href: "/esports" },
        { name: "Gaming", href: "/gaming" },
        { name: "Youth Development", href: "/youth-development" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Case Studies", href: "/case-studies" },
        { name: "Assets", href: "/assets" },
        { name: "Blog", href: "/insights" },
      ],
    },
  ];

  return (
    <footer className="bg-black text-white py-20 border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-20">

          {/* Logo and Address */}
          <div className="space-y-4 lg:w-1/4">
            <a href="/" className="mb-4 block">
              <img
                src="/lovable-uploads/e44800e5-f2f8-453c-ac9e-09a43a2d85cc.png"
                alt="GAMR Logo"
                className="h-8 w-auto object-contain"
              />
            </a>
            <p className="text-gray-400 text-sm max-w-xs uppercase tracking-wider">
              Carven, Landmark Center,<br />VI, Lagos.
            </p>
            <a href="mailto:hello@gamr.africa" className="text-gray-400 hover:text-white transition-colors text-sm uppercase tracking-wider block">
              hello@gamr.africa
            </a>
          </div>

          {/* Sitemap Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-8 flex-1 w-full">
            {footerSections.map((section) => (
              <div key={section.title} className="flex flex-col space-y-4">
                <h3 className="text-white font-bold uppercase tracking-widest text-sm">
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      {("comingSoon" in link && link.comingSoon) ? (
                        <button
                          onClick={() => toast({
                            title: "Coming Soon",
                            description: "Gamr Bracket is currently in development.",
                          })}
                          className="text-gray-400 hover:text-white text-xs uppercase tracking-wider transition-colors text-left flex items-center gap-2"
                        >
                          {link.name}
                          <span className="text-[8px] bg-blue-500 text-white px-1 py-0.5 rounded-full">SOON</span>
                        </button>
                      ) : (
                        <Link
                          to={link.href}
                          className="text-gray-400 hover:text-white text-xs uppercase tracking-wider transition-colors"
                        >
                          {link.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-white/10">
          <div className="flex items-center gap-6">
            <p className="text-xs text-gray-600 uppercase tracking-widest">© 2026 GAMR. All rights reserved.</p>
            <Link to="/privacy" className="text-xs text-gray-600 hover:text-white uppercase tracking-widest transition-colors">
              Privacy Policy
            </Link>
          </div>

          <div className="flex space-x-6">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;