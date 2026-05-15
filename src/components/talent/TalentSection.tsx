import { cn } from "@/lib/utils";

interface TalentSectionProps {
  heading: React.ReactNode;
  body?: string;
  bullets?: string[];
  subsections?: { title: string; description: string }[];
  variant?: "dark" | "darker";
  className?: string;
  image?: string;
}

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
        "py-24 md:py-32 text-white",
        variant === "dark" ? "bg-black" : "bg-zinc-950",
        className
      )}
    >
      <div className="container mx-auto px-6">
        <div
          className={cn(
            "grid grid-cols-1 gap-12 items-center",
            image ? "lg:grid-cols-2" : "max-w-4xl"
          )}
        >
          {/* Text with left amber border */}
          <div className="border-l-4 border-amber-500/40 pl-8 space-y-8">
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
                    <span className="text-amber-500 mt-0.5 flex-shrink-0 font-bold">→</span>
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
