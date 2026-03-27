import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { authors } from "@/data/insights/authors";

const author = authors["williams-falodun"];

const AuthorSpotlight = () => {
  return (
    <Link
      to={`/insights/author/${author.slug}`}
      className="group block"
      aria-label={`View profile of ${author.name}`}
    >
      <div
        className="
          relative flex flex-col md:flex-row items-center md:items-stretch gap-8
          border border-white/10 hover:border-blue-500/50 
          bg-gradient-to-br from-gray-900/80 via-black to-blue-950/30
          p-8 md:p-10 overflow-hidden
          transition-all duration-500
        "
      >
        {/* Ambient glow */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
          <div className="absolute -top-10 -left-10 w-48 h-48 bg-blue-600/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        {/* Editorial label */}
        <div className="absolute top-0 left-0 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5">
          Featured Author
        </div>

        {/* Headshot */}
        <div className="relative flex-shrink-0 mt-4 md:mt-0">
          <div
            className="
              w-32 h-32 md:w-44 md:h-44
              rounded-none overflow-hidden
              border-2 border-white/20 group-hover:border-blue-500/60
              transition-all duration-500
              bg-gray-900
            "
            style={{ aspectRatio: "1/1" }}
          >
            {author.avatar ? (
              <img
                src={author.avatar}
                alt={author.name}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-blue-600/20">
                <span className="text-4xl font-bold text-blue-400">
                  {author.name.charAt(0)}
                </span>
              </div>
            )}
          </div>
          {/* Blue accent line */}
          <div className="absolute -bottom-2 left-0 right-0 h-1 bg-blue-500 group-hover:bg-blue-400 transition-colors" />
        </div>

        {/* Text Content */}
        <div className="relative flex flex-col justify-center text-center md:text-left gap-3 flex-grow">
          <p className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.3em]">
            Staff Writer
          </p>
          <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white group-hover:text-blue-300 transition-colors leading-none">
            {author.name}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed max-w-md group-hover:text-gray-300 transition-colors">
            {author.bio}
          </p>

          {/* Socials */}
          {author.social && (
            <div className="flex items-center gap-4 justify-center md:justify-start mt-1">
              {author.social.twitter && (
                <a
                  href={author.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-blue-400 transition-colors"
                >
                  Twitter
                </a>
              )}
              {author.social.linkedin && (
                <a
                  href={author.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-blue-400 transition-colors"
                >
                  LinkedIn
                </a>
              )}
            </div>
          )}

          <div className="flex items-center gap-2 mt-3 text-blue-400 group-hover:text-white font-bold uppercase text-xs tracking-widest transition-colors justify-center md:justify-start">
            View Profile
            <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-all duration-300" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AuthorSpotlight;
