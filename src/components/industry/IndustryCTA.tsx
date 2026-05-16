import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface IndustryCTAProps {
  heading: string;
  body?: string;
  ctaText: string;
  ctaHref: string;
  ctaExternal?: boolean;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  secondaryCtaExternal?: boolean;
  image?: string;
}

const IndustryCTA = ({
  heading,
  body,
  ctaText,
  ctaHref,
  ctaExternal,
  secondaryCtaText,
  secondaryCtaHref,
  secondaryCtaExternal,
  image,
}: IndustryCTAProps) => {
  return (
    <section className="relative py-32 md:py-40 bg-black text-white overflow-hidden">
      {/* Geometric background */}
      <div className="absolute inset-0 z-0">
        {image ? (
          <>
            <img 
              src={image} 
              alt="Background" 
              className="w-full h-full object-cover opacity-45"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
          </>
        ) : (
          <>
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `repeating-linear-gradient(
                  45deg,
                  transparent,
                  transparent 40px,
                  rgba(6, 182, 212, 0.3) 40px,
                  rgba(6, 182, 212, 0.3) 41px
                )`,
              }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-cyan-950/10 via-black to-black" />
          </>
        )}
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Teal top accent */}
          <div className="w-12 h-0.5 bg-cyan-500 mx-auto" />

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-none uppercase">
            {heading}
          </h2>

          {body && (
            <p className="text-lg text-gray-400 leading-relaxed max-w-xl mx-auto">
              {body}
            </p>
          )}

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Button
              className="bg-transparent border-2 border-cyan-500 text-white hover:bg-cyan-600 hover:border-cyan-600 rounded-none px-12 py-8 text-sm font-bold uppercase tracking-widest transition-all duration-300"
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
                className="bg-transparent border border-white/20 text-white hover:bg-white/5 rounded-none px-12 py-8 text-sm font-bold uppercase tracking-widest transition-all duration-300"
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

export default IndustryCTA;
