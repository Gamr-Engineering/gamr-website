import StatisticsInfographic from "./StatisticsInfographic";
import gamrSquadImage from "@/assets/gamr-squad.jpg";
import aboutGallery1 from "@/assets/about-gallery-1.jpg";
import aboutGallery2 from "@/assets/about-gallery-2.jpg";

const SectionSeparator = () => (
  <div className="w-full h-16 md:h-20 bg-black shrink-0" />
);

const AboutSection = () => {
  return (
    <section id="about" className="bg-black text-white">
      {/* Intro Block - Vision */}
      <div id="vision" className="container mx-auto px-6">
        <div className="max-w-4xl space-y-8 animate-fade-in">
          <span className="text-blue-500 font-bold uppercase tracking-widest text-sm">Who We Are</span>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none uppercase">
            Constructing the<br />Future of Play.
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 leading-relaxed max-w-2xl">
            Gamr is the engine powering African esports. We are building the infrastructure, community, and technology to unlock the potential of 500 million gamers.
          </p>
        </div>
      </div>

      <SectionSeparator />

      {/* Immersive Image Block 1 - Mission */}
      <div id="mission" className="relative h-[80vh] w-full overflow-hidden">
        <img
          src={aboutGallery1}
          alt="Gamr Event Crowd"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 p-12 md:p-24 w-full">
          <div className="container mx-auto">
            <h3 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-4">Our Mission</h3>
            <p className="text-lg md:text-xl text-gray-300 max-w-xl">
              To connect gamers, creators, and brands through thrilling experiences and seamless technology.
            </p>
          </div>
        </div>
      </div>

      <SectionSeparator />

      {/* Statistics Block - Why Now */}
      <div id="why-now" className="py-12 md:py-16 bg-zinc-950">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-blue-500 font-bold uppercase tracking-widest text-sm mb-4 block">Our Impact</span>
              <h3 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-6 relative">
                By The<br />Numbers
              </h3>
              <p className="text-gray-400 text-lg">
                In just a few years, we've established the largest gaming network on the continent.
              </p>
            </div>
            <div>
              <StatisticsInfographic />
            </div>
          </div>
        </div>
      </div>

      <SectionSeparator />

      {/* Squad Block - Team */}
      <div id="team" className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src={gamrSquadImage}
            alt="The Gamr Squad"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <h2 className="text-5xl md:text-8xl font-bold uppercase tracking-tighter mb-8">The Squad</h2>
          <p className="text-xl md:text-2xl text-gray-300">
            Diverse thinkers. Passionate gamers. Industry leaders. <br />
            United by a single mission.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

