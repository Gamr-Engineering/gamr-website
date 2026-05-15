import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface CompanyHeroProps {
  eyebrow: React.ReactNode;
  headline: React.ReactNode;
  body: string;
  primaryCTA?: { text: string; href?: string; external?: boolean; onClick?: () => void };
  secondaryCTA?: { text: string; href?: string; external?: boolean; onClick?: () => void };
  backgroundImage?: string;
}

const CompanyHero = ({ eyebrow, headline, body, primaryCTA, secondaryCTA, backgroundImage }: CompanyHeroProps) => {
  return (
    <section className="relative min-h-[85vh] flex items-end pt-32 pb-24 md:pb-32 bg-black overflow-hidden">
      {/* Background with slow zoom */}
      <div className="absolute inset-0 z-0">
        {backgroundImage ? (
          <>
            <img
              src={backgroundImage}
              alt={typeof headline === "string" ? headline : (typeof eyebrow === "string" ? eyebrow : "Hero image")}
              className="w-full h-full object-cover opacity-40 scale-105"
              style={{ animation: "companyZoom 20s ease-in-out infinite alternate" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-950/10 via-black to-black" />
            <div
              className="absolute inset-0 opacity-[0.02]"
              style={{
                backgroundImage: "repeating-linear-gradient(0deg, white 0px, white 1px, transparent 1px, transparent 80px)",
              }}
            />
          </>
        )}
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <div className="flex items-stretch gap-8">
          {/* Vertical accent line */}
          <div className="hidden md:flex flex-col items-center">
            <div className="w-px bg-gradient-to-b from-transparent via-white/40 to-white/10 flex-1 min-h-[200px]" />
          </div>

          <div className="max-w-3xl space-y-8">
            {/* Eyebrow with horizontal rule */}
            <div className="flex items-center gap-6">
              <span className="text-white/60 font-light tracking-[0.3em] text-xs uppercase">
                {eyebrow}
              </span>
              <div className="h-px bg-white/20 flex-1 max-w-[120px]" />
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9] text-white">
              {headline}
            </h1>

            <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-2xl font-light">
              {body}
            </p>

            {(primaryCTA || secondaryCTA) && (
              <div className="pt-6 flex flex-wrap gap-6">
                {primaryCTA && (
                  <Button
                    className="bg-transparent border border-white/30 text-white hover:bg-white hover:text-black rounded-none px-10 py-7 text-xs font-light uppercase tracking-[0.2em] transition-all duration-500"
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
                    className="bg-transparent text-white/60 hover:text-white rounded-none px-0 py-7 text-xs font-light uppercase tracking-[0.2em] transition-all duration-500 underline underline-offset-8 decoration-white/20 hover:decoration-white/60"
                    asChild={!!secondaryCTA.href}
                    onClick={secondaryCTA.onClick}
                  >
                    {secondaryCTA.href ? (
                      secondaryCTA.external ? (
                        <a href={secondaryCTA.href} target="_blank" rel="noopener noreferrer">
                          {secondaryCTA.text}
                          <ArrowRight className="ml-2 h-3 w-3" />
                        </a>
                      ) : (
                        <Link to={secondaryCTA.href}>
                          {secondaryCTA.text}
                          <ArrowRight className="ml-2 h-3 w-3" />
                        </Link>
                      )
                    ) : (
                      <span className="flex items-center">
                        {secondaryCTA.text}
                        <ArrowRight className="ml-2 h-3 w-3" />
                      </span>
                    )}
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes companyZoom {
          0% { transform: scale(1.05); }
          100% { transform: scale(1.15); }
        }
      `}</style>
    </section>
  );
};

export default CompanyHero;
