import { cn } from "@/lib/utils";

interface EcosystemSectionProps {
  heading: React.ReactNode;
  body?: string;
  bullets?: string[];
  subsections?: { title: string; description: string }[];
  variant?: "dark" | "darker";
  className?: string;
  image?: string;
}

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
        "py-24 md:py-32 text-white",
        variant === "dark" ? "bg-black" : "bg-zinc-950",
        className
      )}
    >
      <div className="container mx-auto px-6">
        {/* Glassmorphism card wrapper */}
        <div className={cn(
          "bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12 lg:p-16",
          "shadow-2xl shadow-red-900/5 hover:shadow-red-900/10 transition-shadow duration-700"
        )}>
          <div className={cn(
            "grid grid-cols-1 gap-10 items-center",
            image ? "lg:grid-cols-2" : "max-w-4xl mx-auto"
          )}>
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-none">
                {heading}
              </h2>

              {body && (
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl">
                  {body}
                </p>
              )}

              {bullets && bullets.length > 0 && (
                <ul className="space-y-4 pt-4">
                  {bullets.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-200 text-lg leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              )}

              {subsections && subsections.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
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
