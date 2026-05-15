import { cn } from "@/lib/utils";

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
        "py-32 md:py-40 text-white",
        variant === "dark" ? "bg-black" : "bg-zinc-950/80",
        className
      )}
    >
      <div className="container mx-auto px-6">
        {/* Section divider line */}
        <div className="mb-16 flex items-center gap-6">
          <span className="text-white/20 font-mono text-xs tracking-widest">
            {String(sectionIndex).padStart(2, "0")}
          </span>
          <div className="h-px bg-white/10 flex-1" />
        </div>

        <div
          className={cn(
            "grid grid-cols-1 gap-16 md:gap-24 items-center",
            image ? "lg:grid-cols-2" : "max-w-4xl"
          )}
        >
          {/* Text content */}
          <div className={cn("space-y-8", image && isEven && "lg:order-2")}>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[0.95]">
              {heading}
            </h2>

            {body && (
              <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-2xl font-light">
                {body}
              </p>
            )}

            {bullets && bullets.length > 0 && (
              <ul className="space-y-5 pt-4">
                {bullets.map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="w-6 h-px bg-white/30 mt-3 flex-shrink-0" />
                    <span className="text-gray-300 text-lg leading-relaxed font-light">{item}</span>
                  </li>
                ))}
              </ul>
            )}

            {subsections && subsections.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
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
