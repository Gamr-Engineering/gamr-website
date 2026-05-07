import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface ClosingCTAProps {
  heading: string;
  body?: string;
  ctaText: string;
  ctaHref: string;
  ctaExternal?: boolean;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  secondaryCtaExternal?: boolean;
}

const ClosingCTA = ({
  heading,
  body,
  ctaText,
  ctaHref,
  ctaExternal,
  secondaryCtaText,
  secondaryCtaHref,
  secondaryCtaExternal,
}: ClosingCTAProps) => {
  return (
    <section className="relative py-32 md:py-40 bg-black text-white overflow-hidden">
      {/* Subtle radial glow */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-blue-900/10 via-black to-black" />
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-7xl font-bold tracking-tighter leading-none uppercase">
            {heading}
          </h2>

          {body && (
            <p className="text-xl text-gray-300 leading-relaxed max-w-xl mx-auto">
              {body}
            </p>
          )}

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Button
              className="bg-white text-black hover:bg-gray-200 rounded-none px-12 py-8 text-sm font-bold uppercase tracking-widest transition-all duration-300"
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
                className="bg-transparent border border-white text-white hover:bg-white hover:text-black rounded-none px-12 py-8 text-sm font-bold uppercase tracking-widest transition-all duration-300"
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

export default ClosingCTA;
