import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface PageHeroProps {
  eyebrow?: React.ReactNode;
  headline: React.ReactNode;
  body: string;
  primaryCTA?: { text: string; href?: string; external?: boolean; onClick?: () => void };
  secondaryCTA?: { text: string; href?: string; external?: boolean; onClick?: () => void };
  backgroundImage?: string;
  imageOpacity?: number;
}

const PageHero = ({ eyebrow, headline, body, primaryCTA, secondaryCTA, backgroundImage, imageOpacity = 0.85 }: PageHeroProps) => {
  return (
    <section className="relative min-h-[80vh] flex items-end pt-32 pb-24 md:pb-32 bg-black overflow-hidden">
      {/* Background Image/Atmosphere */}
      <div className="absolute inset-0 z-0">
        {backgroundImage ? (
          <>
            <img 
              src={backgroundImage} 
              alt={typeof headline === "string" ? headline : (typeof eyebrow === "string" ? eyebrow : "Hero image")}
              className="w-full h-full object-cover transition-opacity duration-700"
              style={{ opacity: imageOpacity }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/15 via-black to-black" />
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                backgroundSize: "48px 48px",
              }}
            />
          </>
        )}
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <div className="max-w-3xl space-y-8 animate-fade-in">
          <span className="text-white font-bold tracking-widest text-sm">
            {eyebrow}
          </span>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-none text-white">
            {headline}
          </h1>

          <p className="text-xl md:text-2xl text-gray-200 leading-relaxed max-w-2xl">
            {body}
          </p>

          {(primaryCTA || secondaryCTA) && (
            <div className="pt-4 flex flex-wrap gap-4">
              {primaryCTA && (
                <Button
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black rounded-none px-10 py-7 text-sm font-bold uppercase tracking-widest transition-all duration-300"
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
                  className="bg-white border-2 border-white text-black hover:bg-transparent hover:text-white rounded-none px-10 py-7 text-sm font-bold uppercase tracking-widest transition-all duration-300"
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

export default PageHero;
