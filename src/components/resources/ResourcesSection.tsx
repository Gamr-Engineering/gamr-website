import { cn } from "@/lib/utils";
import { 
  FileText, 
  Archive, 
  Image as ImageIcon, 
  Film, 
  User, 
  Mail, 
  Briefcase, 
  BookOpen, 
  Download,
  Info,
  Layers,
  Search,
  Globe,
  Settings,
  Star
} from "lucide-react";

interface ResourcesSectionProps {
  heading: React.ReactNode;
  body?: string;
  bullets?: string[];
  subsections?: { title: string; description: string }[];
  variant?: "dark" | "darker";
  className?: string;
  image?: string;
  backgroundImage?: string;
  imageFit?: "cover" | "contain";
  category?: string;
}

const getIcon = (text: string) => {
  const t = text.toLowerCase();
  if (t.includes("case study") || t.includes("insight") || t.includes("read") || t.includes("boilerplate")) return BookOpen;
  if (t.includes("logo") || t.includes("asset") || t.includes("brand") || t.includes("media kit")) return Layers;
  if (t.includes("photo") || t.includes("image") || t.includes("gallery")) return ImageIcon;
  if (t.includes("video") || t.includes("film") || t.includes("media")) return Film;
  if (t.includes("founder") || t.includes("team") || t.includes("press")) return User;
  if (t.includes("contact") || t.includes("hello") || t.includes("mail")) return Mail;
  if (t.includes("partner") || t.includes("sponsor") || t.includes("business")) return Briefcase;
  if (t.includes("download") || t.includes("file")) return Download;
  if (t.includes("info") || t.includes("guideline") || t.includes("usage")) return Info;
  if (t.includes("search") || t.includes("discovery") || t.includes("explore")) return Search;
  if (t.includes("global") || t.includes("network") || t.includes("continent")) return Globe;
  if (t.includes("system") || t.includes("tool") || t.includes("operation")) return Settings;
  return Star;
};

const ResourcesSection = ({
  heading,
  body,
  bullets,
  subsections,
  variant = "dark",
  className,
  image,
  backgroundImage,
  imageFit = "cover",
  category,
}: ResourcesSectionProps) => {
  return (
    <section
      className={cn(
        "relative py-24 md:py-32 text-white overflow-hidden",
        variant === "dark" ? "bg-black" : "bg-zinc-950",
        className
      )}
    >
      {/* Background Image Layer */}
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <img
            src={backgroundImage}
            alt="Section background"
            className={cn(
              "w-full h-full opacity-85 transition-opacity duration-700",
              imageFit === "cover" ? "object-cover" : "object-contain"
            )}
          />
          <div className={cn(
            "absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60",
            variant === "darker" && "from-zinc-950/70 via-zinc-950/40 to-zinc-950/70"
          )} />
        </div>
      )}
      <div className="container mx-auto px-6 relative z-10">
        <div
          className={cn(
            "grid grid-cols-1 gap-16 items-start",
            image ? "lg:grid-cols-2" : "max-w-5xl mx-auto"
          )}
        >
          <div className="space-y-10">
            <div className="space-y-6">
              {/* Category tag */}
              {category && (
                <span className="inline-block bg-violet-500/10 border border-violet-500/20 text-violet-300 rounded-full px-4 py-1.5 text-xs font-mono uppercase tracking-widest">
                  {category}
                </span>
              )}

              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter leading-none uppercase">
                {heading}
              </h2>

              {body && (
                <p className="text-lg text-gray-400 font-light leading-relaxed max-w-xl">
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
                      className="group p-5 border border-white/5 bg-white/[0.02] hover:bg-violet-500/[0.03] hover:border-violet-500/20 transition-all duration-500 rounded-lg flex items-center gap-4"
                    >
                      <div className="w-10 h-10 rounded-md bg-violet-500/10 flex items-center justify-center border border-violet-500/10 group-hover:bg-violet-500/20 transition-colors flex-shrink-0">
                        <Icon className="h-5 w-5 text-violet-500" />
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
                    className="p-6 border border-white/10 rounded-lg bg-white/[0.02] hover:border-violet-500/20 hover:bg-violet-500/[0.02] transition-all duration-300"
                  >
                    <h3 className="text-base font-bold uppercase tracking-tight mb-2 text-white">
                      {sub.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed text-sm">{sub.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Image with violet hover glow */}
          {image && (
            <div className="relative overflow-hidden rounded-lg border border-white/10 hover:border-violet-500/20 transition-colors duration-500">
              <img
                src={image}
                alt={typeof heading === "string" ? heading : "Content image"}
                className="w-full h-full object-cover aspect-video transition-all duration-700"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ResourcesSection;
