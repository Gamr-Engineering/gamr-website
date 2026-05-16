import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface ResourcesCTAProps {
  heading: string;
  body?: string;
  ctaText: string;
  ctaHref: string;
  ctaExternal?: boolean;
  backgroundImage?: string;
  imageFit?: "cover" | "contain";
}

const ResourcesCTA = ({ heading, body, ctaText, ctaHref, ctaExternal, backgroundImage, imageFit = "cover" }: ResourcesCTAProps) => {
  return (
    <section className="relative py-24 md:py-32 bg-zinc-950 text-white overflow-hidden">
      {/* Background Image */}
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <img
            src={backgroundImage}
            alt="CTA Background"
            className={cn(
              "w-full h-full opacity-85",
              imageFit === "cover" ? "object-cover" : "object-contain"
            )}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80" />
        </div>
      )}

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter leading-none uppercase">
            {heading}
          </h2>

          {body && (
            <p className="text-base text-gray-400 leading-relaxed max-w-lg mx-auto font-light">
              {body}
            </p>
          )}

          {/* Simple text link with arrow */}
          {ctaExternal ? (
            <a
              href={ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-violet-200 hover:text-white text-sm uppercase tracking-[0.15em] font-bold transition-colors duration-300 mt-4 group"
            >
              {ctaText}
              <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            </a>
          ) : (
            <Link
              to={ctaHref}
              className="inline-flex items-center text-violet-200 hover:text-white text-sm uppercase tracking-[0.15em] font-bold transition-colors duration-300 mt-4 group"
            >
              {ctaText}
              <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default ResourcesCTA;
