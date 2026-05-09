import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";


import TopBar from "@/components/TopBar";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openMobileSection, setOpenMobileSection] = useState<string | null>(null);
  const { user, isAdmin, signOut } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const toggleMobileSection = (section: string) => {
    setOpenMobileSection((prev) => (prev === section ? null : section));
  };

  const navigationData = [
    {
      title: "Company",
      items: [
        { title: "Vision", href: "/vision" },
        { title: "Mission", href: "/mission" },
        { title: "Why Now", href: "/why-now" },
        { title: "Team", href: "/team" },
      ],
    },
    {
      title: "Ecosystem",
      items: [
        { title: "GamrTag", href: "/gamrtag" },
        { title: "Studios", href: "/studios" },
        { title: "Carven", href: "/carven" },
        { title: "Bracket", href: "/bracket", comingSoon: true },
      ],
    },
    {
      title: "Talent",
      items: [
        { title: "Gamers", href: "/gamers" },
        { title: "Creators", href: "/creators" },
        { title: "Developers", href: "/developers" },
      ],
    },
    {
      title: "Industry",
      items: [
        { title: "Education", href: "/education" },
        { title: "Esports", href: "/esports" },
        { title: "Gaming", href: "/gaming" },
        { title: "Youth Development", href: "/youth-development" },
      ],
    },
    {
      title: "Resources",
      items: [
        { title: "Case Studies", href: "/case-studies" },
        { title: "Assets", href: "/assets" },
        { title: "Blog", href: "/insights" },
      ],
    },
  ];



  // ... inside Header component
  return (
    <>
      <header className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled || isOpen ? "bg-black/80 backdrop-blur-md pb-2" : "bg-transparent pb-4"
      )}>
        <TopBar />
      <nav className="container mx-auto px-6 flex items-center justify-between pt-2">
        <div className="flex-shrink-0 z-50">
          <a href="/" className="flex items-center">
            <img
              src="/lovable-uploads/e44800e5-f2f8-453c-ac9e-09a43a2d85cc.png"
              alt="GAMR Logo"
              className="h-6 md:h-8 w-auto object-contain"
            />
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-center flex-1 ml-8">
          <NavigationMenu>
            <NavigationMenuList>
              {navigationData.map((section) => (
                <NavigationMenuItem key={section.title} className="relative">
                  <NavigationMenuTrigger className="bg-transparent text-white hover:bg-white/10 hover:text-white uppercase tracking-widest text-xs font-bold data-[state=open]:bg-white/10">
                    {section.title}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="flex flex-col w-[200px] gap-2 p-4 bg-black/80 backdrop-blur-md">
                      {section.items.map((item) => (
                        <li key={item.title}>
                          <NavigationMenuLink asChild>
                            {("comingSoon" in item && item.comingSoon) ? (
                              <button
                                onClick={() => toast({
                                  title: "Coming Soon",
                                  description: "Gamr Bracket is currently in development. Stay tuned!",
                                })}
                                className="block w-full text-left select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-white/10 hover:text-white focus:bg-accent focus:text-accent-foreground text-gray-300"
                              >
                                <div className="text-sm font-medium leading-none text-white uppercase tracking-wider">
                                  {item.title}
                                  <span className="ml-2 text-[10px] bg-blue-500 text-white px-1.5 py-0.5 rounded-full">SOON</span>
                                </div>
                              </button>
                            ) : (
                              <Link
                                to={item.href}
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-white/10 hover:text-white focus:bg-accent focus:text-accent-foreground text-gray-300"
                              >
                                <div className="text-sm font-medium leading-none text-white uppercase tracking-wider">{item.title}</div>
                              </Link>
                            )}
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    to="/contact"
                    className={cn(navigationMenuTriggerStyle(), "bg-transparent text-white hover:bg-white/10 hover:text-white uppercase tracking-widest text-xs font-bold cursor-pointer")}
                  >
                    Contact
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              {isAdmin && (
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <a
                      href="/insights/admin"
                      className={cn(navigationMenuTriggerStyle(), "bg-transparent text-blue-400 hover:bg-blue-500/10 hover:text-blue-300 uppercase tracking-widest text-xs font-bold cursor-pointer")}
                    >
                      Admin
                    </a>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              )}
              {user && (
                <NavigationMenuItem>
                  <button
                    onClick={() => signOut()}
                    className={cn(navigationMenuTriggerStyle(), "bg-transparent text-gray-500 hover:text-white uppercase tracking-widest text-[10px] font-bold cursor-pointer")}
                  >
                    Log Out
                  </button>
                </NavigationMenuItem>
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* CTA */}
        <div className="hidden md:block">
          <Button
            className="bg-transparent border border-white text-white hover:bg-white hover:text-black rounded-none px-6 text-xs font-bold uppercase tracking-widest transition-all duration-300"
            asChild
          >
            <a href="https://discord.gg/qV9e4ErZN2" target="_blank" rel="noopener noreferrer">
              Join Community
            </a>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-white z-50"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>
    </header>

    {/* Mobile Navigation Overlay */}
        <div className={cn(
          "fixed inset-0 bg-black z-40 flex flex-col pt-24 px-6 overflow-y-auto transition-transform duration-300 ease-in-out md:hidden",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}>
          <div className="w-full max-w-sm mx-auto flex flex-col grow">
            <div className="w-full border-t border-white/20 pointer-events-auto">
              {navigationData.map((section) => (
                <div key={section.title} className="border-b border-white/10">
                  <button
                    onClick={() => toggleMobileSection(section.title)}
                    className="flex w-full items-center justify-between py-4 text-left group pointer-events-auto"
                  >
                    <span className="text-xl font-bold text-white uppercase tracking-widest group-hover:no-underline">
                      {section.title}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 text-white transition-transform duration-300 ${
                        openMobileSection === section.title ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openMobileSection === section.title && (
                    <div className="relative z-50 overflow-visible">
                      <div className="flex flex-col space-y-4 pb-4 pl-4 border-l border-white/10 ml-2 overflow-visible max-h-[500px] opacity-100 transition-all duration-300 ease-in-out pointer-events-auto">
                        {section.items.map((item) => (
                          ("comingSoon" in item && item.comingSoon) ? (
                            <button
                              key={item.title}
                              onClick={() => {
                                toast({
                                  title: "Coming Soon",
                                  description: "Gamr Bracket is currently in development.",
                                });
                                setIsOpen(false);
                              }}
                              className="text-gray-400 hover:text-white uppercase tracking-wider text-sm transition-colors text-left flex items-center gap-2"
                            >
                              {item.title}
                              <span className="text-[10px] bg-blue-500 text-white px-1.5 py-0.5 rounded-full">SOON</span>
                            </button>
                          ) : (
                            <Link
                              key={item.title}
                              to={item.href}
                              onClick={() => setIsOpen(false)}
                              className="text-gray-400 hover:text-white uppercase tracking-wider text-sm transition-colors pointer-events-auto"
                            >
                              {item.title}
                            </Link>
                          )
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="text-xl font-bold text-white uppercase tracking-widest py-4 border-b border-white/10"
            >
              Contact
            </Link>
            
            {isAdmin && (
              <a
                href="/insights/admin"
                onClick={() => setIsOpen(false)}
                className="text-xl font-bold text-blue-400 uppercase tracking-widest py-4 border-b border-white/10"
              >
                Admin Dashboard
              </a>
            )}

            {user && (
               <button
                onClick={() => {
                  signOut();
                  setIsOpen(false);
                }}
                className="text-left text-xl font-bold text-gray-500 uppercase tracking-widest py-4 border-b border-white/10"
              >
                Log Out
              </button>
            )}

            <div className="mt-8 mb-8">
              <Button
                className="w-full bg-transparent border border-white text-white hover:bg-white hover:text-black rounded-none py-6 text-sm font-bold uppercase tracking-widest"
                asChild
              >
                <a href="https://discord.gg/qV9e4ErZN2" target="_blank" rel="noopener noreferrer">
                  Join Community
                </a>
              </Button>
            </div>
          </div>
        </div>

      </>
  );
};

export default Header;