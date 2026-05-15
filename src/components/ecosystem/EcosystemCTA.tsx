import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface EcosystemCTAProps {
  heading: string;
  body?: string;
  ctaText: string;
  ctaHref: string;
  ctaExternal?: boolean;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  secondaryCtaExternal?: boolean;
}

const EcosystemCTA = ({
  heading,
  body,
  ctaText,
  ctaHref,
  ctaExternal,
  secondaryCtaText,
  secondaryCtaHref,
  secondaryCtaExternal,
}: EcosystemCTAProps) => {
  return (
    <section className="relative py-32 md:py-40 text-white overflow-hidden">
      {/* Gradient bar background */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-950/15 via-black to-red-950/15" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/10 via-transparent to-transparent" />

      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-none uppercase">
            {heading}
          </h2>

          {body && (
            <p className="text-xl text-gray-300 leading-relaxed max-w-xl mx-auto">
              {body}
            </p>
          )}

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Button
              className="bg-transparent border-2 border-red-500 text-white hover:bg-red-600 hover:border-red-600 rounded-full px-12 py-8 text-sm font-bold uppercase tracking-widest transition-all duration-300"
              asChild
            >
              {ctaExternal ? (
                <a href={ctaHref} target="_blank" rel="noopener noreferrer">
                  {ctaText}
                </a>
              ) : (
                <Link to={ctaHref}>{ctaText}</Link>
              )}
            </Button>

            {secondaryCtaText && secondaryCtaHref && (
              <Button
                className="bg-white/[0.06] backdrop-blur-sm border border-white/20 text-white hover:bg-white/10 rounded-full px-12 py-8 text-sm font-bold uppercase tracking-widest transition-all duration-300"
                asChild
              >
                {secondaryCtaExternal ? (
                  <a href={secondaryCtaHref} target="_blank" rel="noopener noreferrer">
                    {secondaryCtaText}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                ) : (
                  <Link to={secondaryCtaHref}>
                    {secondaryCtaText}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EcosystemCTA;
