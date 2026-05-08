import ballantinesLogo from "@/assets/partners/ballantines.png";
import carvenLogo from "@/assets/partners/carven.png";
import goldenpennyLogo from "@/assets/partners/goldenpenny.png";
import googleLogo from "@/assets/partners/google.png";
import lenovoLogo from "@/assets/partners/lenovo.png";
import logitechLogo from "@/assets/partners/logitech.png";
import niveaLogo from "@/assets/partners/nivea.png";
import spotifyLogo from "@/assets/partners/spotify.png";
import techstarsLogo from "@/assets/partners/techstars.png";

const PartnersSection = () => {
  const partners = [
    { name: "Google", logo: googleLogo },
    { name: "Spotify", logo: spotifyLogo },
    { name: "Lenovo", logo: lenovoLogo },
    { name: "Techstars", logo: techstarsLogo },
    { name: "Logitech", logo: logitechLogo },
    { name: "Nivea", logo: niveaLogo },
    { name: "Ballantines", logo: ballantinesLogo },
    { name: "Carven", logo: carvenLogo },
    { name: "Golden Penny", logo: goldenpennyLogo },
  ];

  return (
    <section id="partners" className="relative py-24 bg-black overflow-hidden">
      <div className="container mx-auto px-6 mb-12 text-center">
        <p className="text-sm font-bold tracking-widest text-gray-400 uppercase">
          Trusted by Industry Leaders
        </p>
      </div>

      <div className="relative w-full">
        <div className="flex w-max animate-marquee space-x-20 items-center">
          {[...partners, ...partners, ...partners, ...partners].map((partner, index) => (
            <div
              key={`${partner.name}-${index}`}
              className="flex-shrink-0 w-40 h-20 flex items-center justify-center filter grayscale opacity-50 hover:grayscale-0 hover:opacity-100 hover:scale-110 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] transition-all duration-500 cursor-pointer"
            >
              <img
                src={partner.logo}
                alt={`${partner.name} logo`}
                className="max-w-full max-h-full object-contain"
                draggable="false"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;

