import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface ResourcesCTAProps {
  heading: string;
  body?: string;
  ctaText: string;
  ctaHref: string;
  ctaExternal?: boolean;
}

const ResourcesCTA = ({ heading, body, ctaText, ctaHref, ctaExternal }: ResourcesCTAProps) => {
  return (
    <section className="relative py-24 md:py-32 bg-zinc-950 text-white overflow-hidden">
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter leading-none uppercase">
            {heading}
          </h2>

          {body && (
            <p className="text-base text-gray-500 leading-relaxed max-w-lg mx-auto">
              {body}
            </p>
          )}

          {/* Simple text link with arrow */}
          {ctaExternal ? (
            <a
              href={ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-violet-400 hover:text-violet-300 text-sm uppercase tracking-[0.15em] font-bold transition-colors duration-300 mt-4"
            >
              {ctaText}
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          ) : (
            <Link
              to={ctaHref}
              className="inline-flex items-center text-violet-400 hover:text-violet-300 text-sm uppercase tracking-[0.15em] font-bold transition-colors duration-300 mt-4"
            >
              {ctaText}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default ResourcesCTA;
