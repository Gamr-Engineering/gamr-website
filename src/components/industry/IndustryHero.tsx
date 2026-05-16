import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface IndustryHeroProps {
  eyebrow?: React.ReactNode;
  headline: React.ReactNode;
  body: string;
  primaryCTA?: { text: string; href?: string; external?: boolean; onClick?: () => void };
  secondaryCTA?: { text: string; href?: string; external?: boolean; onClick?: () => void };
  backgroundImage?: string;
  image?: string; // Alias for backgroundImage
  stats?: { value: string; label: string }[];
}

const IndustryHero = ({ 
  eyebrow, 
  headline, 
  body, 
  primaryCTA, 
  secondaryCTA, 
  backgroundImage, 
  image,
  stats 
}: IndustryHeroProps) => {
  const finalImage = image || backgroundImage;
  return (
    <section className="relative min-h-[70vh] flex flex-col justify-end pt-32 pb-0 bg-black overflow-hidden">
      {/* Grid-dot pattern background */}
      <div className="absolute inset-0 z-0">
        {finalImage ? (
          <>
            <img
              src={finalImage}
              alt={typeof headline === "string" ? headline : "Hero image"}
              className="w-full h-full object-cover opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-950/15 via-black to-black" />
          </>
        )}
        {/* Grid dot overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, #06b6d4 0.5px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-6 pb-16">
        <div className="max-w-4xl space-y-8">
          {eyebrow && (
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-cyan-500 rounded-sm" />
              <span className="text-cyan-400 font-mono font-bold tracking-widest text-xs uppercase">
                {eyebrow}
              </span>
            </div>
          )}

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-none text-white">
            {headline}
          </h1>

          <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-2xl">
            {body}
          </p>

          {(primaryCTA || secondaryCTA) && (
            <div className="pt-4 flex flex-wrap gap-4">
              {primaryCTA && (
                <Button
                  className="bg-cyan-600 border border-cyan-600 text-white hover:bg-cyan-500 rounded-none px-10 py-7 text-sm font-bold uppercase tracking-widest transition-all duration-300"
                  asChild={!!primaryCTA.href}
                  onClick={primaryCTA.onClick}
                >
                  {primaryCTA.href ? (
                    primaryCTA.external ? (
                      <a href={primaryCTA.href} target="_blank" rel="noopener noreferrer">
                        {primaryCTA.text}
                      </a>
                    ) : (
                      <Link to={primaryCTA.href}>{primaryCTA.text}</Link>
                    )
                  ) : (
                    <span>{primaryCTA.text}</span>
                  )}
                </Button>
              )}
              {secondaryCTA && (
                <Button
                  className="bg-transparent border border-cyan-500/30 text-cyan-100 hover:bg-cyan-500/10 hover:border-cyan-500/50 rounded-none px-10 py-7 text-sm font-bold uppercase tracking-widest transition-all duration-300"
                  asChild={!!secondaryCTA.href}
                  onClick={secondaryCTA.onClick}
                >
                  {secondaryCTA.href ? (
                    secondaryCTA.external ? (
                      <a href={secondaryCTA.href} target="_blank" rel="noopener noreferrer">
                        {secondaryCTA.text}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    ) : (
                      <Link to={secondaryCTA.href}>
                        {secondaryCTA.text}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    )
                  ) : (
                    <span className="flex items-center">
                      {secondaryCTA.text}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </span>
                  )}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Stat counter row */}
      {stats && stats.length > 0 && (
        <div className="relative z-10 border-t border-cyan-500/10 bg-black/60 backdrop-blur-sm">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-cyan-500/10">
              {stats.map((stat, i) => (
                <div key={i} className="py-8 px-6 text-center">
                  <div className="text-3xl md:text-4xl font-bold text-cyan-400 font-mono tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest mt-2 font-mono">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default IndustryHero;
