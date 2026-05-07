import { cn } from "@/lib/utils";

interface ContentSectionProps {
  heading: string;
  body?: string;
  bullets?: string[];
  /** Optional sub-sections with title + bullet list (e.g. Team categories) */
  subsections?: { title: string; description: string }[];
  /** Alternate between bg-black and bg-zinc-950 */
  variant?: "dark" | "darker";
  className?: string;
}

const ContentSection = ({
  heading,
  body,
  bullets,
  subsections,
  variant = "dark",
  className,
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
        <div className="max-w-4xl space-y-8">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter leading-none uppercase">
            {heading}
          </h2>

          {body && (
            <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-2xl">
              {body}
            </p>
          )}

          {bullets && bullets.length > 0 && (
            <ul className="space-y-4 pt-4">
              {bullets.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2.5 flex-shrink-0" />
                  <span className="text-gray-300 text-lg leading-relaxed">{item}</span>
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
                  <p className="text-gray-400 leading-relaxed">{sub.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContentSection;
