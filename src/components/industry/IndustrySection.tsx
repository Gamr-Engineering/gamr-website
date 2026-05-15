import { cn } from "@/lib/utils";
import { 
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
  Globe,
  Database,
  Briefcase,
  GraduationCap
} from "lucide-react";

interface IndustrySectionProps {
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
  if (t.includes("developer") || t.includes("code") || t.includes("script") || t.includes("build") || t.includes("design")) return Code2;
  if (t.includes("gamer") || t.includes("play") || t.includes("match") || t.includes("tournament") || t.includes("esports")) return Gamepad2;
  if (t.includes("community") || t.includes("group") || t.includes("network") || t.includes("campus")) return Users;
  if (t.includes("reward") || t.includes("trophy") || t.includes("prize") || t.includes("payout")) return Trophy;
  if (t.includes("tech") || t.includes("system") || t.includes("infrastructure") || t.includes("platform")) return Cpu;
  if (t.includes("trust") || t.includes("identity") || t.includes("secure") || t.includes("rules")) return ShieldCheck;
  if (t.includes("growth") || t.includes("future") || t.includes("opportunity") || t.includes("development")) return Rocket;
  if (t.includes("voice") || t.includes("story") || t.includes("content") || t.includes("media")) return Zap;
  if (t.includes("education") || t.includes("training") || t.includes("learn") || t.includes("workshop")) return Lightbulb;
  if (t.includes("global") || t.includes("country") || t.includes("continental")) return Globe;
  if (t.includes("data") || t.includes("analytic") || t.includes("registration")) return Database;
  if (t.includes("management") || t.includes("organize") || t.includes("operation") || t.includes("business")) return Briefcase;
  if (t.includes("school") || t.includes("institution") || t.includes("foundations")) return GraduationCap;
  return Star;
};

const IndustrySection = ({
  heading,
  body,
  bullets,
  subsections,
  variant = "dark",
  className,
  image,
}: IndustrySectionProps) => {
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
          <div className="space-y-12">
            <div className="space-y-8">
              {/* Heading with teal top border */}
              <div className="border-t-2 border-cyan-500 pt-6 inline-block">
                <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter leading-[0.9] uppercase">
                  {heading}
                </h2>
              </div>

              {body && (
                <p className="text-lg md:text-xl text-gray-400 font-light leading-relaxed max-w-xl">
                  {body}
                </p>
              )}
            </div>

            {/* Graphic Bullets */}
            {bullets && bullets.length > 0 && (
              <div className={cn(
                "grid gap-6",
                image ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1 md:grid-cols-3"
              )}>
                {bullets.map((item, i) => {
                  const Icon = getIcon(item);
                  return (
                    <div 
                      key={i} 
                      className="group p-6 border border-cyan-500/10 bg-cyan-950/10 hover:bg-cyan-500/[0.05] hover:border-cyan-500/30 transition-all duration-500 rounded-sm flex flex-col gap-4 relative overflow-hidden"
                    >
                      {/* Grid background for technical feel */}
                      <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.05] pointer-events-none transition-opacity" 
                           style={{ backgroundImage: 'radial-gradient(#06b6d4 0.5px, transparent 0.5px)', backgroundSize: '10px 10px' }} />
                      
                      <div className="w-12 h-12 rounded-none bg-cyan-500/5 flex items-center justify-center border border-cyan-500/20 group-hover:border-cyan-500/40 transition-colors">
                        <Icon className="h-6 w-6 text-cyan-500" />
                      </div>
                      <span className="text-cyan-50 font-bold uppercase tracking-tight text-sm leading-tight relative z-10">
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
                    className="p-6 border border-white/10 bg-white/[0.02] hover:border-cyan-500/20 transition-colors duration-300"
                  >
                    <h3 className="text-lg font-bold uppercase tracking-tight mb-3 text-white font-mono">
                      {sub.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">{sub.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Image with structured border */}
          {image && (
            <div className="relative border border-white/10 overflow-hidden">
              <img
                src={image}
                alt={typeof heading === "string" ? heading : "Content image"}
                className="w-full h-full object-cover aspect-video lg:aspect-square transition-all duration-700"
              />
              {/* Teal accent corner */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-500" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-500" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default IndustrySection;
