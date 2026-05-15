import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface TalentCTAProps {
  heading: string;
  body?: string;
  ctaText: string;
  ctaHref: string;
  ctaExternal?: boolean;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  secondaryCtaExternal?: boolean;
}

const TalentCTA = ({
  heading,
  body,
  ctaText,
  ctaHref,
  ctaExternal,
  secondaryCtaText,
  secondaryCtaHref,
  secondaryCtaExternal,
}: TalentCTAProps) => {
  return (
    <section className="relative py-32 md:py-40 bg-black text-white overflow-hidden">
      {/* Circular amber glow */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/[0.04] rounded-full blur-3xl" />
      </div>

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
              className="bg-amber-500 text-black hover:bg-amber-400 rounded-full px-12 py-8 text-sm font-bold uppercase tracking-widest transition-all duration-300 shadow-lg shadow-amber-500/20"
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
                className="bg-transparent border-2 border-amber-500/30 text-amber-100 hover:bg-amber-500/10 rounded-full px-12 py-8 text-sm font-bold uppercase tracking-widest transition-all duration-300"
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

export default TalentCTA;
