import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface PageHeroProps {
  eyebrow: string;
  headline: string;
  body: string;
  primaryCTA?: { text: string; href: string; external?: boolean };
  secondaryCTA?: { text: string; href: string; external?: boolean };
}

const PageHero = ({ eyebrow, headline, body, primaryCTA, secondaryCTA }: PageHeroProps) => {
  return (
    <section className="relative min-h-[80vh] flex items-end pb-24 md:pb-32 bg-black overflow-hidden">
      {/* Atmospheric background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/15 via-black to-black" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <div className="max-w-3xl space-y-8 animate-fade-in">
          <span className="text-blue-500 font-bold uppercase tracking-widest text-sm">
            {eyebrow}
          </span>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-none uppercase">
            {headline}
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 leading-relaxed max-w-2xl">
            {body}
          </p>

          {(primaryCTA || secondaryCTA) && (
            <div className="pt-4 flex flex-wrap gap-4">
              {primaryCTA && (
                <Button
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black rounded-none px-10 py-7 text-sm font-bold uppercase tracking-widest transition-all duration-300"
                  asChild
                >
                  {primaryCTA.external ? (
                    <a href={primaryCTA.href} target="_blank" rel="noopener noreferrer">
                      {primaryCTA.text}
                    </a>
                  ) : (
                    <Link to={primaryCTA.href}>{primaryCTA.text}</Link>
                  )}
                </Button>
              )}
              {secondaryCTA && (
                <Button
                  className="bg-white border-2 border-white text-black hover:bg-transparent hover:text-white rounded-none px-10 py-7 text-sm font-bold uppercase tracking-widest transition-all duration-300"
                  asChild
                >
                  {secondaryCTA.external ? (
                    <a href={secondaryCTA.href} target="_blank" rel="noopener noreferrer">
                      {secondaryCTA.text}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  ) : (
                    <Link to={secondaryCTA.href}>
                      {secondaryCTA.text}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
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
