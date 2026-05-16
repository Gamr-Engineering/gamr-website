import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface TalentHeroProps {
  eyebrow?: React.ReactNode;
  headline: React.ReactNode;
  body: string;
  primaryCTA?: { text: string; href?: string; external?: boolean; onClick?: () => void };
  secondaryCTA?: { text: string; href?: string; external?: boolean; onClick?: () => void };
  backgroundImage?: string;
}

const TalentHero = ({ eyebrow, headline, body, primaryCTA, secondaryCTA, backgroundImage }: TalentHeroProps) => {
  return (
    <section className="relative min-h-[80vh] flex items-end pt-32 pb-24 md:pb-32 bg-black overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        {backgroundImage ? (
          <>
            {/* Diagonal image on the right */}
            <div
              className="absolute inset-0 opacity-90"
              style={{
                clipPath: "polygon(35% 0, 100% 0, 100% 100%, 15% 100%)",
              }}
            >
              <img
                src={backgroundImage}
                alt={typeof headline === "string" ? headline : "Hero image"}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-amber-950/10 via-black to-black" />
            <div
              className="absolute inset-0 opacity-[0.02]"
              style={{
                backgroundImage: "radial-gradient(circle at 2px 2px, #f59e0b 0.5px, transparent 0)",
                backgroundSize: "40px 40px",
              }}
            />
          </>
        )}
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <div className="max-w-3xl space-y-8">
          {eyebrow && (
            <div className="inline-block">
              <span className="text-amber-400 font-bold tracking-widest text-sm uppercase">
                {eyebrow}
              </span>
              <div className="h-0.5 w-12 bg-amber-500 mt-2" />
            </div>
          )}

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-none text-white">
            {headline}
          </h1>

          <p className="text-xl md:text-2xl text-amber-50/70 leading-relaxed max-w-2xl">
            {body}
          </p>

          {(primaryCTA || secondaryCTA) && (
            <div className="pt-4 flex flex-wrap gap-4">
              {primaryCTA && (
                <Button
                  className="bg-amber-500 border-2 border-amber-500 text-black hover:bg-amber-400 hover:border-amber-400 rounded-full px-10 py-7 text-sm font-bold uppercase tracking-widest transition-all duration-300"
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
                  className="bg-transparent border-2 border-amber-500/30 text-amber-100 hover:bg-amber-500/10 hover:border-amber-500/50 rounded-full px-10 py-7 text-sm font-bold uppercase tracking-widest transition-all duration-300"
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

export default TalentHero;
