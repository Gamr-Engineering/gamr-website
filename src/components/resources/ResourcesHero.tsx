import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface ResourcesHeroProps {
  eyebrow: React.ReactNode;
  headline: React.ReactNode;
  body: string;
  primaryCTA?: { text: string; href?: string; external?: boolean; onClick?: () => void };
  secondaryCTA?: { text: string; href?: string; external?: boolean; onClick?: () => void };
  backgroundImage?: string;
}

const ResourcesHero = ({ eyebrow, headline, body, primaryCTA, secondaryCTA, backgroundImage }: ResourcesHeroProps) => {
  return (
    <section className="relative min-h-[50vh] flex items-end pt-32 pb-16 md:pb-20 bg-black overflow-hidden">
      {/* Clean gradient background */}
      <div className="absolute inset-0 z-0">
        {backgroundImage ? (
          <>
            <img
              src={backgroundImage}
              alt={typeof headline === "string" ? headline : "Hero image"}
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-violet-950/20" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-violet-950/10 via-black to-black" />
        )}
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <div className="max-w-3xl space-y-6">
          {/* Breadcrumb-style hint */}
          <div className="flex items-center gap-2 text-violet-400/60 text-xs font-mono uppercase tracking-widest">
            <Link to="/" className="hover:text-violet-300 transition-colors">Gamr</Link>
            <span>/</span>
            <span className="text-violet-300">{typeof eyebrow === "string" ? eyebrow : "Resources"}</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-none text-white">
            {headline}
          </h1>

          <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-2xl">
            {body}
          </p>

          {(primaryCTA || secondaryCTA) && (
            <div className="pt-4 flex flex-wrap gap-4">
              {primaryCTA && (
                <Button
                  className="bg-violet-600 border border-violet-600 text-white hover:bg-violet-500 rounded-lg px-8 py-6 text-sm font-bold uppercase tracking-widest transition-all duration-300"
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
                  className="bg-transparent border border-violet-500/30 text-violet-200 hover:bg-violet-500/10 rounded-lg px-8 py-6 text-sm font-bold uppercase tracking-widest transition-all duration-300"
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

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-violet-500/10" />
    </section>
  );
};

export default ResourcesHero;
