import { cn } from "@/lib/utils";

interface ContentSectionProps {
  heading: React.ReactNode;
  body?: string;
  bullets?: string[];
  /** Optional sub-sections with title + bullet list (e.g. Team categories) */
  subsections?: { title: string; description: string }[];
  /** Alternate between bg-black and bg-zinc-950 */
  variant?: "dark" | "darker";
  className?: string;
  image?: string;
}

const ContentSection = ({
  heading,
  body,
  bullets,
  subsections,
  variant = "dark",
  className,
  image,
}: ContentSectionProps) => {
  return (
    <section
      className={cn(
        "py-24 md:py-32 text-white",
        variant === "dark" ? "bg-black" : "bg-zinc-950",
        className
      )}
    >
      <div className="container mx-auto px-6">
        <div className={cn("grid grid-cols-1 gap-12 items-center", image ? "lg:grid-cols-2" : "max-w-4xl")}>
          <div className="space-y-8">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter leading-none">
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
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2.5 flex-shrink-0" />
                    <span className="text-gray-200 text-lg leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            )}

            {subsections && subsections.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
                {subsections.map((sub, i) => (
                  <div
                    key={i}
                    className="p-8 border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-colors duration-300"
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

          {image && (
            <div className="relative aspect-video lg:aspect-square overflow-hidden border border-white/10">
              <img 
                src={image} 
                alt={typeof heading === "string" ? heading : "Content image"}
                className="w-full h-full object-cover transition-all duration-700"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContentSection;
