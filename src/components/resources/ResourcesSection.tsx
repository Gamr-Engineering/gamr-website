import { cn } from "@/lib/utils";

interface ResourcesSectionProps {
  heading: React.ReactNode;
  body?: string;
  bullets?: string[];
  subsections?: { title: string; description: string }[];
  variant?: "dark" | "darker";
  className?: string;
  image?: string;
  category?: string;
}

const ResourcesSection = ({
  heading,
  body,
  bullets,
  subsections,
  variant = "dark",
  className,
  image,
  category,
}: ResourcesSectionProps) => {
  return (
    <section
      className={cn(
        "py-20 md:py-28 text-white",
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
          <div className="space-y-6">
            {/* Category tag */}
            {category && (
              <span className="inline-block bg-violet-500/10 border border-violet-500/20 text-violet-300 rounded-full px-4 py-1.5 text-xs font-mono uppercase tracking-widest">
                {category}
              </span>
            )}

            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter leading-none">
              {heading}
            </h2>

            {body && (
              <p className="text-lg text-gray-400 leading-relaxed max-w-2xl">
                {body}
              </p>
            )}

            {bullets && bullets.length > 0 && (
              <ul className="space-y-3 pt-4">
                {bullets.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 group">
                    <span className="w-1.5 h-1.5 bg-violet-500 rounded-full mt-2.5 flex-shrink-0 group-hover:bg-violet-400 transition-colors" />
                    <span className="text-gray-300 text-base leading-relaxed group-hover:text-white transition-colors">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            {subsections && subsections.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
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
