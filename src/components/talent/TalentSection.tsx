import { cn } from "@/lib/utils";
import { 
  ArrowRight, 
  Code2, 
  Gamepad2, 
  Users, 
  Trophy, 
  Cpu, 
  ShieldCheck, 
  Zap, 
  Star, 
  Target, 
  Layers, 
  Lightbulb,
  Rocket,
  Video,
  Palette,
  Headset,
  Coins
} from "lucide-react";

interface TalentSectionProps {
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
  if (t.includes("developer") || t.includes("code") || t.includes("script") || t.includes("build")) return Code2;
  if (t.includes("gamer") || t.includes("play") || t.includes("match") || t.includes("tournament")) return Gamepad2;
  if (t.includes("community") || t.includes("group") || t.includes("network") || t.includes("connection")) return Users;
  if (t.includes("reward") || t.includes("trophy") || t.includes("prize") || t.includes("visibility")) return Trophy;
  if (t.includes("tech") || t.includes("system") || t.includes("infrastructure") || t.includes("tool")) return Cpu;
  if (t.includes("trust") || t.includes("identity") || t.includes("security")) return ShieldCheck;
  if (t.includes("growth") || t.includes("future") || t.includes("opportunity") || t.includes("pathway")) return Rocket;
  if (t.includes("voice") || t.includes("story") || t.includes("content") || t.includes("creator")) return Zap;
  if (t.includes("education") || t.includes("training") || t.includes("learn") || t.includes("mentorship")) return Lightbulb;
  if (t.includes("video") || t.includes("stream") || t.includes("hosting")) return Video;
  if (t.includes("design") || t.includes("art") || t.includes("fashion")) return Palette;
  if (t.includes("commentary") || t.includes("voice") || t.includes("shoutcast")) return Headset;
  if (t.includes("revenue") || t.includes("earn") || t.includes("monetization") || t.includes("perk")) return Coins;
  return Star;
};

const TalentSection = ({
  heading,
  body,
  bullets,
  subsections,
  variant = "dark",
  className,
  image,
}: TalentSectionProps) => {
  return (
    <section
      className={cn(
        "relative py-24 md:py-32 text-white overflow-hidden",
        variant === "dark" ? "bg-black" : "bg-zinc-950",
        className
      )}
    >
      <div className="container mx-auto px-6 relative z-10">
        <div
          className={cn(
            "grid grid-cols-1 gap-16 items-start",
            image ? "lg:grid-cols-2" : "max-w-5xl mx-auto"
          )}
        >
          {/* Text Content */}
          <div className="space-y-12">
            <div className="space-y-6">
              <div className="h-1 w-12 bg-amber-500/60 mb-8" />
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
                      className="group p-6 border border-white/5 bg-white/[0.02] hover:bg-amber-500/[0.03] hover:border-amber-500/20 transition-all duration-500 rounded-lg flex flex-col gap-4"
                    >
                      <div className="w-10 h-10 rounded-md bg-amber-500/10 flex items-center justify-center border border-amber-500/10 group-hover:bg-amber-500/20 transition-colors">
                        <Icon className="h-5 w-5 text-amber-500" />
                      </div>
                      <span className="text-white font-bold uppercase tracking-tight text-sm leading-tight">
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
                    className="p-8 border border-amber-500/10 bg-amber-500/[0.02] rounded-xl hover:bg-amber-500/[0.05] transition-colors duration-300"
                  >
                    <h3 className="text-xl font-bold uppercase tracking-tight mb-3 text-white">
                      {sub.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">{sub.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Image with overlap effect */}
          {image && (
            <div className="relative lg:-mr-12 xl:-mr-16">
              <div className="relative overflow-hidden rounded-xl">
                <img
                  src={image}
                  alt={typeof heading === "string" ? heading : "Content image"}
                  className="w-full h-full object-cover aspect-video lg:aspect-[4/3] transition-all duration-700"
                />
                {/* Warm overlay on hover */}
                <div className="absolute inset-0 bg-amber-500/0 hover:bg-amber-500/5 transition-colors duration-500" />
              </div>
              {/* Amber accent corner */}
              <div className="absolute -bottom-3 -left-3 w-24 h-24 border-l-2 border-b-2 border-amber-500/20 rounded-bl-2xl" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TalentSection;
