import { cn } from "@/lib/utils";

interface IndustrySectionProps {
  heading: React.ReactNode;
  body?: string;
  bullets?: string[];
  subsections?: { title: string; description: string }[];
  variant?: "dark" | "darker";
  className?: string;
  image?: string;
}

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
        "py-24 md:py-32 text-white",
        variant === "dark" ? "bg-black" : "bg-zinc-950",
        className
      )}
    >
      <div className="container mx-auto px-6">
        <div
          className={cn(
            "grid grid-cols-1 gap-12 items-start",
            image ? "lg:grid-cols-2" : "max-w-4xl"
          )}
        >
          <div className="space-y-8">
            {/* Heading with teal top border */}
            <div className="border-t-2 border-cyan-500 pt-6 inline-block">
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-none">
                {heading}
              </h2>
            </div>

            {body && (
              <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-2xl">
                {body}
              </p>
            )}

            {/* Pill tag cloud for bullets */}
            {bullets && bullets.length > 0 && (
              <div className="flex flex-wrap gap-3 pt-4">
                {bullets.map((item, i) => (
                  <span
                    key={i}
                    className="border border-cyan-500/30 text-gray-200 rounded-full px-5 py-2.5 text-sm hover:bg-cyan-500/10 hover:border-cyan-500/50 transition-colors duration-300 cursor-default"
                  >
                    {item}
                  </span>
                ))}
              </div>
            )}

            {subsections && subsections.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
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
