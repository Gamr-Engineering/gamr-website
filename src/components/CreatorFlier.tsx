import { Button } from "@/components/ui/button";
import creatorKhalamanja from "@/assets/creator-khalamanja.jpg";
import creatorStefkaly from "@/assets/creator-stefkaly.jpg";
import creatorBloodsport from "@/assets/creator-bloodsport.jpg";

const CreatorFlier = () => {
  const creators = [
    {
      image: creatorKhalamanja,
      name: "Khalamanja",
      tagline: "PRO GAMER",
    },
    {
      image: creatorStefkaly,
      name: "Stefkaly",
      tagline: "CONTENT CREATOR",
    },
    {
      image: creatorBloodsport,
      name: "Bloodsport",
      tagline: "STORYTELLER",
    },
  ];

  return (
    <section id="creators" className="bg-black text-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-20 items-center justify-between">
          <div className="max-w-xl space-y-8 animate-fade-in">
            <span className="text-blue-500 font-bold uppercase tracking-widest text-sm">Talent Network</span>
            <h2 className="text-5xl md:text-8xl font-bold tracking-tighter leading-none uppercase">
              The Next<br />Generation.
            </h2>
            <p className="text-xl text-gray-400 leading-relaxed max-w-lg">
              Empowering Africa's elite content creators. We provide the platform, you provide the passion. join the vanguard of digital storytelling.
            </p>
            <div className="pt-8">
              <Button
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black rounded-none px-10 py-7 text-sm font-bold uppercase tracking-widest transition-all duration-300"
                asChild
              >
                <a href="https://forms.gle/6SCjP3D4Zn4qiWU17" target="_blank" rel="noopener noreferrer">
                  Apply To Join
                </a>
              </Button>
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {creators.map((creator, index) => (
                <div key={index} className="group relative aspect-[3/4] overflow-hidden bg-zinc-900">
                  <img
                    src={creator.image}
                    alt={creator.name}
                    className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-0 left-0 p-6 space-y-1">
                    <h4 className="text-lg font-bold uppercase tracking-tighter">{creator.name}</h4>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">
                      {creator.tagline}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreatorFlier;
