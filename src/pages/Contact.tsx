import { useState } from "react";
import ContentPage from "@/components/ContentPage";
import PageHero from "@/components/PageHero";
import ClosingCTA from "@/components/ClosingCTA";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Handshake,
  Trophy,
  Palette,
  GraduationCap,
  Newspaper,
  MessageSquare,
} from "lucide-react";

const INQUIRY_TYPES = [
  "Partnership",
  "Esports",
  "Creator",
  "Education",
  "Press",
  "Community",
  "General",
];

const CONTACT_CATEGORIES = [
  {
    icon: Handshake,
    title: "Partnerships",
    description:
      "For brand activations, sponsorships, campaigns, events, and ecosystem partnerships.",
  },
  {
    icon: Trophy,
    title: "Tournaments & Esports",
    description:
      "For tournament hosting, league operations, community competitions, and esports collaborations.",
  },
  {
    icon: Palette,
    title: "Creators & Talent",
    description:
      "For creator network applications, talent partnerships, and content opportunities.",
  },
  {
    icon: GraduationCap,
    title: "Education & Programs",
    description:
      "For schools, institutions, foundations, and organizations interested in gaming education.",
  },
  {
    icon: Newspaper,
    title: "Press & Media",
    description:
      "For interviews, media features, press kits, and company information.",
  },
  {
    icon: MessageSquare,
    title: "General Inquiries",
    description:
      "For everything else, reach out and the team will direct your message.",
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    inquiryType: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `[${formData.inquiryType || "General"}] Website Inquiry from ${formData.name}`
    );
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company || "N/A"}\nInquiry Type: ${formData.inquiryType || "General"}\n\n${formData.message}`
    );
    window.location.href = `mailto:hello@gamr.africa?subject=${subject}&body=${body}`;
  };

  const inputClasses =
    "bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-none h-14 focus:border-white/40 focus:ring-0 transition-colors";
  const labelClasses =
    "text-xs font-bold uppercase tracking-widest text-white/60 block mb-3";

  return (
    <ContentPage
      title="Contact Gamr | Partnerships, Events, Press and Community"
      description="Contact Gamr for partnerships, tournaments, brand activations, media requests, creator programs, education programs, and community inquiries."
    >
      <PageHero
        headline="LET'S BUILD THE FUTURE OF PLAY TOGETHER."
        body="Whether you are a gamer, creator, brand, partner, investor, school, media platform, or community organizer, we would love to hear from you. Tell us what you are building, and let's explore how Gamr can help."
        backgroundImage="/assets/contact-page/hero.jpg"
        imageOpacity={0.85}
        primaryCTA={{
          text: "Send a Message",
          href: "#contact-form",
        }}
        secondaryCTA={{
          text: "Join Community",
          href: "https://discord.gg/qV9e4ErZN2",
          external: true,
        }}
      />

      {/* Contact Categories — Cinematic Slab Implementation */}
      <section className="py-24 md:py-32 bg-black text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mb-16">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter leading-none uppercase">
              HOW CAN WE HELP?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CONTACT_CATEGORIES.map((category, i) => (
              <div
                key={i}
                className="group p-10 border border-white/5 bg-white/[0.02] hover:bg-violet-500/[0.03] hover:border-violet-500/20 transition-all duration-500 rounded-3xl relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/0 via-transparent to-violet-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <category.icon className="w-10 h-10 text-violet-500 mb-6 group-hover:scale-110 transition-transform duration-500" />
                  <h3 className="text-xl font-bold uppercase tracking-tight mb-4 text-white">
                    {category.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed font-light">
                    {category.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form + Details */}
      <section id="contact-form" className="py-24 md:py-32 bg-black text-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Form */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter leading-none uppercase mb-12">
                SEND A MESSAGE
              </h2>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <label className={labelClasses}>Tell us who you are</label>
                  <Input
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    placeholder="Your name"
                    className={inputClasses}
                    required
                  />
                </div>

                <div>
                  <label className={labelClasses}>Where should we reply?</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, email: e.target.value }))
                    }
                    placeholder="your@email.com"
                    className={inputClasses}
                    required
                  />
                </div>

                <div>
                  <label className={labelClasses}>
                    Company / Organization{" "}
                    <span className="text-white/20">(Optional)</span>
                  </label>
                  <Input
                    value={formData.company}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, company: e.target.value }))
                    }
                    placeholder="Your company or organization"
                    className={inputClasses}
                  />
                </div>

                <div>
                  <label className={labelClasses}>Inquiry Type</label>
                  <Select
                    value={formData.inquiryType}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, inquiryType: value }))
                    }
                  >
                    <SelectTrigger className="bg-white/5 border-white/10 text-white rounded-none h-14 focus:ring-0 focus:border-white/40">
                      <SelectValue placeholder="Select inquiry type" />
                    </SelectTrigger>
                    <SelectContent className="bg-black border-white/10 rounded-none">
                      {INQUIRY_TYPES.map((type) => (
                        <SelectItem
                          key={type}
                          value={type}
                          className="text-white focus:bg-white/10 focus:text-white rounded-none"
                        >
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className={labelClasses}>
                    Tell us what you are working on
                  </label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, message: e.target.value }))
                    }
                    placeholder="Your message..."
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-none min-h-[160px] focus:border-white/40 focus:ring-0 transition-colors resize-none"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-white text-black hover:bg-gray-200 rounded-none py-7 text-sm font-bold uppercase tracking-widest transition-all duration-300"
                >
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Details */}
            <div className="lg:pt-16">
              <div className="space-y-12">
                <div>
                  <h3 className="text-blue-500 font-bold uppercase tracking-widest text-xs mb-4">
                    Email
                  </h3>
                  <a
                    href="mailto:hello@gamr.africa"
                    className="text-2xl font-bold text-white hover:text-blue-400 transition-colors tracking-tight"
                  >
                    hello@gamr.africa
                  </a>
                </div>

                <div>
                  <h3 className="text-blue-500 font-bold uppercase tracking-widest text-xs mb-4">
                    Location
                  </h3>
                  <p className="text-lg text-gray-300 leading-relaxed">
                    Carven, Landmark Center,
                    <br />
                    Victoria Island, Lagos, Nigeria
                  </p>
                </div>

                <div>
                  <h3 className="text-blue-500 font-bold uppercase tracking-widest text-xs mb-4">
                    Community
                  </h3>
                  <a
                    href="https://discord.gg/qV9e4ErZN2"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg text-white hover:text-blue-400 transition-colors font-bold"
                  >
                    Join the Gamr Discord →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ClosingCTA
        heading="READY WHEN YOU ARE."
        body="The next chapter of African gaming will be built by communities, creators, players, and partners working together."
        ctaText="Contact Gamr"
        ctaHref="mailto:hello@gamr.africa"
        ctaExternal
      />
    </ContentPage>
  );
};

export default Contact;
