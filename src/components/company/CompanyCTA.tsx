import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface CompanyCTAProps {
  heading: string;
  body?: string;
  ctaText: string;
  ctaHref: string;
  ctaExternal?: boolean;
}

const CompanyCTA = ({ heading, body, ctaText, ctaHref, ctaExternal }: CompanyCTAProps) => {
  return (
    <section className="relative py-32 md:py-44 bg-black text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-950/5 via-black to-black" />
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-10">
          {/* Top rule */}
          <div className="w-16 h-px bg-white/20 mx-auto" />

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[0.9] uppercase">
            {heading}
          </h2>

          {body && (
            <p className="text-lg text-gray-500 leading-relaxed max-w-xl mx-auto font-light">
              {body}
            </p>
          )}

          {/* Underlined link-style CTA */}
          {ctaExternal ? (
            <a
              href={ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-white/60 hover:text-white text-sm uppercase tracking-[0.2em] font-light underline underline-offset-8 decoration-white/20 hover:decoration-white/60 transition-all duration-500"
            >
              {ctaText}
              <ArrowRight className="ml-3 h-4 w-4" />
            </a>
          ) : (
            <Link
              to={ctaHref}
              className="inline-flex items-center text-white/60 hover:text-white text-sm uppercase tracking-[0.2em] font-light underline underline-offset-8 decoration-white/20 hover:decoration-white/60 transition-all duration-500"
            >
              {ctaText}
              <ArrowRight className="ml-3 h-4 w-4" />
            </Link>
          )}

          {/* Bottom rule */}
          <div className="w-16 h-px bg-white/20 mx-auto" />
        </div>
      </div>
    </section>
  );
};

export default CompanyCTA;
