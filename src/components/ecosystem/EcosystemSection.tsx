import { cn } from "@/lib/utils";
import { 
  Gamepad2, 
  Users, 
  Trophy, 
  Cpu, 
  ShieldCheck, 
  Zap, 
  Star, 
  Rocket,
  Download,
  Link,
  MapPin,
  Clock,
  Layout,
  Briefcase
} from "lucide-react";

interface EcosystemSectionProps {
  heading: React.ReactNode;
  body?: string;
  bullets?: string[];
  subsections?: { title: string; description: string }[];
  variant?: "dark" | "darker";
  className?: string;
  image?: string;
}

const getIcon = (text: string) => {
  const t = text.toLowerCase();
  if (t.includes("gamer") || t.includes("play") || t.includes("game") || t.includes("console")) return Gamepad2;
  if (t.includes("community") || t.includes("group") || t.includes("check-in") || t.includes("gather")) return Users;
  if (t.includes("reward") || t.includes("trophy") || t.includes("prize") || t.includes("perk")) return Trophy;
  if (t.includes("tech") || t.includes("infrastructure") || t.includes("digital") || t.includes("program")) return Cpu;
  if (t.includes("identity") || t.includes("profile") || t.includes("reputation") || t.includes("passport")) return ShieldCheck;
  if (t.includes("voice") || t.includes("story") || t.includes("creator") || t.includes("mentorship")) return Zap;
  if (t.includes("growth") || t.includes("launch") || t.includes("opportunity")) return Rocket;
  if (t.includes("download") || t.includes("asset")) return Download;
  if (t.includes("connect") || t.includes("link")) return Link;
  if (t.includes("location") || t.includes("hub") || t.includes("space") || t.includes("landmark")) return MapPin;
  if (t.includes("time") || t.includes("payout") || t.includes("scheduling")) return Clock;
  if (t.includes("bracket") || t.includes("structure") || t.includes("layout")) return Layout;
  if (t.includes("brand") || t.includes("partner") || t.includes("business")) return Briefcase;
  return Star;
};

const EcosystemSection = ({
  heading,
  body,
  bullets,
  subsections,
  variant = "dark",
  className,
  image,
}: EcosystemSectionProps) => {
  return (
    <section
      className={cn(
        "relative py-24 md:py-32 text-white overflow-hidden",
        variant === "dark" ? "bg-black" : "bg-zinc-950",
        className
      )}
    >
      <div className="container mx-auto px-6 relative z-10">
        {/* Glassmorphism card wrapper */}
        <div className={cn(
          "bg-white/[0.02] backdrop-blur-md border border-white/5 rounded-3xl p-8 md:p-12 lg:p-16",
          "shadow-2xl shadow-red-900/5 hover:shadow-red-900/10 transition-shadow duration-700"
        )}>
          <div className={cn(
            "grid grid-cols-1 gap-16 items-start",
            image ? "lg:grid-cols-2" : "max-w-5xl mx-auto"
          )}>
            <div className="space-y-12">
              <div className="space-y-6">
                <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter leading-[0.9] uppercase">
                  {heading}
                </h2>
                {body && (
                  <p className="text-lg md:text-xl text-gray-400 font-light leading-relaxed max-w-xl">
                    {body}
                  </p>
                )}
              </div>

              {/* Graphic Bullets */}
              {bullets && bullets.length > 0 && (
                <div className={cn(
                  "grid gap-4",
                  image ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1 md:grid-cols-3"
                )}>
                  {bullets.map((item, i) => {
                    const Icon = getIcon(item);
                    return (
                      <div 
                        key={i} 
                        className="group p-5 border border-white/5 bg-white/[0.03] hover:bg-red-600/[0.04] hover:border-red-600/20 transition-all duration-500 rounded-xl flex flex-col gap-4"
                      >
                        <div className="w-10 h-10 rounded-full bg-red-600/10 flex items-center justify-center border border-red-600/10 group-hover:bg-red-600/20 transition-colors">
                          <Icon className="h-5 w-5 text-red-600" />
                        </div>
                        <span className="text-white font-bold uppercase tracking-tight text-xs leading-tight">
                          {item}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}

              {subsections && subsections.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  {subsections.map((sub, i) => (
                    <div
                      key={i}
                      className="p-6 bg-white/[0.03] border border-white/10 rounded-xl hover:bg-white/[0.06] transition-colors duration-300"
                    >
                      <h3 className="text-lg font-bold uppercase tracking-tight mb-3 text-white">
                        {sub.title}
                      </h3>
                      <p className="text-gray-400 leading-relaxed">{sub.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {image && (
              <div className="relative overflow-hidden rounded-xl border border-white/10">
                <img
                  src={image}
                  alt={typeof heading === "string" ? heading : "Content image"}
                  className="w-full h-full object-cover aspect-video lg:aspect-square transition-transform duration-700 hover:scale-105"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EcosystemSection;
