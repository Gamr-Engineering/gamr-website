import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface EcosystemHeroProps {
  eyebrow?: React.ReactNode;
  headline: React.ReactNode;
  body: string;
  primaryCTA?: { text: string; href?: string; external?: boolean; onClick?: () => void };
  secondaryCTA?: { text: string; href?: string; external?: boolean; onClick?: () => void };
  backgroundImage?: string;
}

const EcosystemHero = ({ eyebrow, headline, body, primaryCTA, secondaryCTA, backgroundImage }: EcosystemHeroProps) => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center pt-32 pb-24 md:pb-32 bg-black overflow-hidden">
      {/* Background with vignette */}
      <div className="absolute inset-0 z-0">
        {backgroundImage ? (
          <>
            <img
              src={backgroundImage}
              alt={typeof headline === "string" ? headline : "Hero image"}
              className="w-full h-full object-cover opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
            {/* Vignette */}
            <div className="absolute inset-0" style={{
              background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.8) 100%)"
            }} />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-950/10 via-black to-black" />
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                backgroundSize: "32px 32px",
              }}
            />
          </>
        )}
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Floating product badge */}
          <div className="inline-flex items-center justify-center px-6 py-3 bg-white/[0.06] backdrop-blur-md border border-white/10 rounded-full mb-4">
            <span className="text-white font-bold tracking-widest text-sm">
              {eyebrow}
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-none text-white">
            {headline}
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
            {body}
          </p>

          {(primaryCTA || secondaryCTA) && (
            <div className="pt-6 flex flex-wrap justify-center gap-4">
              {primaryCTA && (
                <Button
                  className="bg-red-600 border-2 border-red-600 text-white hover:bg-red-700 hover:border-red-700 rounded-full px-10 py-7 text-sm font-bold uppercase tracking-widest transition-all duration-300 shadow-lg shadow-red-900/20"
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
                  className="bg-white/[0.06] backdrop-blur-sm border border-white/20 text-white hover:bg-white/10 rounded-full px-10 py-7 text-sm font-bold uppercase tracking-widest transition-all duration-300"
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
    </section>
  );
};

export default EcosystemHero;
