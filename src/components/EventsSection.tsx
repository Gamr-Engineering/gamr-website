import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const EventsSection = () => {
  const { toast } = useToast();

  const handleComingSoonClick = () => {
    toast({
      title: "GAMR X 2026",
      description: (
        <div className="mt-2 space-y-3 text-zinc-600 text-sm font-sans">
          <p className="leading-relaxed">
            The ultimate arena for African gaming is booting up! Get ready for the grandest esports showdown, explosive live stages, and ultimate community vibes.
          </p>
          <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-800 bg-zinc-100 border border-zinc-200 px-3 py-1.5 uppercase tracking-widest w-fit rounded">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-zinc-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-zinc-600"></span>
            </span>
            STATUS: PREPARING STAGE & PRIZE POOL 🏆
          </div>
        </div>
      ),
    });
  };

  return (
    <section id="esports" className="relative h-screen flex items-center bg-black text-white overflow-hidden">
      {/* Background Pattern / Subtle Visual */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black" />
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '60px 60px' }}>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-8 animate-fade-in pl-6 md:pl-12">
            <span className="text-blue-500 font-bold uppercase tracking-widest text-sm block">Main Event</span>
            <h2 className="text-6xl md:text-8xl xl:text-9xl font-bold tracking-tight leading-none uppercase">
              GAMR X<br />2026.
            </h2>
            <p className="text-xl text-gray-400 max-w-lg leading-relaxed">
              The biggest stage for African esports. Hosting thousands of attendees with world-class tournaments, live performances, and community experiences.
            </p>

            <div className="pt-8 flex flex-col sm:flex-row gap-4">
              <Button
                className="bg-white text-black hover:bg-gray-200 rounded-none px-12 py-8 text-sm font-bold uppercase tracking-widest transition-all cursor-pointer"
                onClick={handleComingSoonClick}
              >
                Coming Soon
              </Button>
              <Button
                className="bg-transparent border border-white text-white hover:bg-white hover:text-black rounded-none px-12 py-8 text-sm font-bold uppercase tracking-widest transition-all"
                asChild
              >
                <a href="https://bit.ly/Sponsor-Gamr-X-2026" target="_blank" rel="noopener noreferrer">
                  Sponsor Event
                </a>
              </Button>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="space-y-12">
              {[
                { title: "CHAMPIONSHIP TOURNEYS", desc: "Watch the best teams in Africa compete for glory and massive prize pools." },
                { title: "LIVE ENTERTAINMENT", desc: "Performances by top artists, DJ sets, and gaming culture showcases." },
                { title: "COMMUNITY ZONE", desc: "Meet creators, play casual matches, and connect with the community." }
              ].map((item, index) => (
                <div key={index} className="group space-y-2 cursor-default">
                  <h3 className="text-2xl font-bold uppercase tracking-tighter group-hover:text-blue-500 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 max-w-md leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;