import { cn } from "@/lib/utils";
import { 
  Target, 
  Lightbulb, 
  Users, 
  Cpu, 
  Globe, 
  Rocket, 
  Zap, 
  ShieldCheck, 
  Star,
  Layers,
  Search,
  Settings,
  Briefcase
} from "lucide-react";

interface CompanySectionProps {
  heading: React.ReactNode;
  body?: string;
  bullets?: string[];
  subsections?: { title: string; description: string }[];
  variant?: "dark" | "darker";
  className?: string;
  image?: string;
  sectionIndex?: number;
}

const getIcon = (text: string) => {
  const t = text.toLowerCase();
  if (t.includes("vision") || t.includes("future") || t.includes("moment")) return Target;
  if (t.includes("idea") || t.includes("strategy") || t.includes("think")) return Lightbulb;
  if (t.includes("team") || t.includes("people") || t.includes("community")) return Users;
  if (t.includes("tech") || t.includes("system") || t.includes("os") || t.includes("infrastructure")) return Cpu;
  if (t.includes("africa") || t.includes("global") || t.includes("continent")) return Globe;
  if (t.includes("mission") || t.includes("purpose") || t.includes("build") || t.includes("launch")) return Rocket;
  if (t.includes("energy") || t.includes("vibe") || t.includes("power")) return Zap;
  if (t.includes("trust") || t.includes("reliable") || t.includes("standard")) return ShieldCheck;
  if (t.includes("layer") || t.includes("stack") || t.includes("culture")) return Layers;
  if (t.includes("explore") || t.includes("discovery") || t.includes("why")) return Search;
  if (t.includes("operation") || t.includes("management") || t.includes("build")) return Settings;
  if (t.includes("partner") || t.includes("brand") || t.includes("business")) return Briefcase;
  return Star;
};

const CompanySection = ({
  heading,
  body,
  bullets,
  subsections,
  variant = "dark",
  className,
  image,
  sectionIndex = 1,
}: CompanySectionProps) => {
  const isEven = sectionIndex % 2 === 0;

  return (
    <section
      className={cn(
        "relative py-32 md:py-40 text-white overflow-hidden",
        variant === "dark" ? "bg-black" : "bg-zinc-950/80",
        className
      )}
    >
      <div className="container mx-auto px-6 relative z-10">
        {/* Section divider line */}
        <div className="mb-16 flex items-center gap-6">
          <span className="text-white/20 font-mono text-xs tracking-widest">
            {String(sectionIndex).padStart(2, "0")}
          </span>
          <div className="h-px bg-white/10 flex-1" />
        </div>

        <div
          className={cn(
            "grid grid-cols-1 gap-16 md:gap-24 items-start",
            image ? "lg:grid-cols-2" : "max-w-5xl mx-auto"
          )}
        >
          {/* Text content */}
          <div className={cn("space-y-12", image && isEven && "lg:order-2")}>
            <div className="space-y-8">
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
                "grid gap-6",
                image ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1 md:grid-cols-3"
              )}>
                {bullets.map((item, i) => {
                  const Icon = getIcon(item);
                  return (
                    <div 
                      key={i} 
                      className="group p-6 border-l border-white/10 bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/40 transition-all duration-500 flex flex-col gap-5"
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-white/20 font-mono text-xs">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div className="h-px w-8 bg-white/10 group-hover:w-12 transition-all duration-500" />
                      </div>
                      <div className="flex items-start gap-4">
                        <Icon className="h-5 w-5 text-white/60 group-hover:text-white transition-colors flex-shrink-0 mt-1" />
                        <span className="text-white font-bold uppercase tracking-tight text-sm leading-tight">
                          {item}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {subsections && subsections.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                {subsections.map((sub, i) => (
                  <div
                    key={i}
                    className="p-8 border-l border-white/10 hover:border-white/30 transition-colors duration-500"
                  >
                    <h3 className="text-lg font-bold uppercase tracking-tight mb-3 text-white">
                      {sub.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed font-light">{sub.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Image */}
          {image && (
            <div className={cn("relative", isEven && "lg:order-1")}>
              <div className="relative overflow-hidden">
                <img
                  src={image}
                  alt={typeof heading === "string" ? heading : "Section image"}
                  className="w-full h-auto object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute bottom-0 left-0 right-0 h-px bg-white/20" />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CompanySection;
