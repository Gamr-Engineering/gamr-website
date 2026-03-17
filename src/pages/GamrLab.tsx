import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Calendar, Users, Code, Monitor, Trophy, Clock, AlertTriangle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RobloxFAQ from "@/components/RobloxFAQ";
import { cn } from "@/lib/utils";
import GamrLabCarousel from "@/components/GamrLabCarousel";
import { campaigns } from "@/data/campaigns";
import { getCampaignStatus, formatRemainingTime } from "@/utils/campaignStatus";

const GamrLab = () => {
    const robloxCampaign = campaigns.find(c => c.id === "roblox-creator-pathway");
    const statusInfo = robloxCampaign ? getCampaignStatus(robloxCampaign) : { status: "CLOSED" as const };
    const { status, daysRemaining, hoursRemaining } = statusInfo;
    
    const isApplicationClosed = status === "CLOSED" || status === "UPCOMING";
    const isClosingSoon = status === "CLOSING_SOON";

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-blue-500/30">
            <Header />

            {isClosingSoon && (
                <div className="bg-orange-600 text-white py-3 px-6 text-center animate-pulse sticky top-20 z-40 flex items-center justify-center gap-3 font-bold uppercase tracking-tighter text-sm md:text-base">
                    <AlertTriangle className="w-5 h-5 md:w-6 h-6 shrink-0" />
                    <span>Applications are closing soon! Ends in: {formatRemainingTime(daysRemaining, hoursRemaining)}</span>
                    <Clock className="w-5 h-5 md:w-6 h-6 shrink-0" />
                </div>
            )}

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black z-0" />
                <div className="container mx-auto relative z-10 max-w-5xl text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6 animate-fade-in">
                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                        Lagos Creator Pathway
                    </div>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-none mb-6 uppercase animate-fade-in delay-100">
                        Build Africa<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">on Roblox</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in delay-200">
                        A 30-day, hardware-backed sprint at Gamr Lab turning African players into Roblox creators and earning digital entrepreneurs.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in delay-300">
                        {isApplicationClosed ? (
                            <Button
                                className="bg-gray-800 text-gray-400 cursor-not-allowed rounded-none px-8 py-6 text-sm font-bold uppercase tracking-widest min-w-[200px]"
                                disabled
                            >
                                {status === "UPCOMING" ? "Applications Opening Soon" : "Applications Closed"}
                            </Button>
                        ) : (
                            <Button
                                className={cn(
                                    "rounded-none px-8 py-6 text-sm font-bold uppercase tracking-widest min-w-[200px]",
                                    isClosingSoon ? "bg-orange-600 text-white hover:bg-orange-700 animate-bounce" : "bg-white text-black hover:bg-gray-200"
                                )}
                                asChild
                            >
                                <a href="https://docs.google.com/forms/d/e/1FAIpQLSfjUfZrHo1wfPIhrsFU5vDaNiN6MQkhKZmtEyH7xNSJVvWcbQ/viewform?usp=dialog" target="_blank" rel="noopener noreferrer">
                                    {isClosingSoon ? "Apply Now - Hurry!" : "Apply Now"}
                                </a>
                            </Button>
                        )}
                        <Button
                            variant="outline"
                            className="bg-transparent border border-white text-white hover:bg-white hover:text-black rounded-none px-8 py-6 text-sm font-bold uppercase tracking-widest min-w-[200px]"
                            asChild
                        >
                            <a href="#overview">
                                Learn More <ArrowRight className="ml-2 w-4 h-4" />
                            </a>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Program Overview */}
            <section id="overview" className="py-20 bg-zinc-950/50">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <h2 className="text-blue-500 font-bold uppercase tracking-widest text-sm">Program Overview</h2>
                            <h3 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter leading-none">
                                From Players to<br />Professionals
                            </h3>
                        </div>
                        <div>
                            <p className="text-lg text-gray-400 leading-relaxed">
                                The <span className="text-white font-bold">Roblox Builder Pathway (Lagos Pilot)</span> is a focused, 30-day "Build Africa on Roblox" program hosted at Gamr Lab. We provide high-spec hardware, stable power, and a production-first curriculum to help Nigerian and African builders go from players to professional Roblox creators — shipping Afro-centric worlds and unlocking real earning potential.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Who This Is For */}
            <section className="py-20 border-y border-white/5">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-blue-500 font-bold uppercase tracking-widest text-sm mb-4">Who This Is For</h2>
                        <h3 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter">Built for Builders</h3>
                        <p className="text-gray-400 mt-4">You don't need to be a pro yet, but you do need basic skills and a willingness to commit for 30 days.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Code,
                                title: "Scripters & Programmers",
                                desc: "Interested in Luau and Roblox Studio"
                            },
                            {
                                icon: Monitor,
                                title: "3D / Environment Artists",
                                desc: "World builders and visual creators"
                            },
                            {
                                icon: Trophy,
                                title: "Game Designers",
                                desc: "Systems thinkers and mechanics designers"
                            },
                            {
                                icon: Users,
                                title: "Serious Creators",
                                desc: "Ready to build & publish on Roblox"
                            }
                        ].map((item, idx) => (
                            <div key={idx} className={`p-8 border border-white/10 bg-white/5 hover:bg-white/10 transition-colors ${idx === 3 ? 'md:col-span-3 max-w-xl mx-auto w-full text-center' : ''}`}>
                                <item.icon className={`w-8 h-8 text-blue-500 mb-6 ${idx === 3 ? 'mx-auto' : ''}`} />
                                <h4 className="text-xl font-bold uppercase tracking-tight mb-2">{item.title}</h4>
                                <p className="text-gray-400">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <GamrLabCarousel />

            {/* What You Get */}
            <section className="py-20 bg-black">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16">
                        <div className="space-y-8">
                            <h2 className="text-blue-500 font-bold uppercase tracking-widest text-sm">What You Get</h2>
                            <h3 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-8">Everything You Need</h3>

                            <ul className="space-y-8">
                                {[
                                    { title: "Gamr Lab Access", desc: "~30 gaming-grade workstations and stable power in Lagos" },
                                    { title: "30-Day Sprint", desc: "Roblox Studio, Luau scripting, monetization, analytics — a Luau-to-Income curriculum" },
                                    { title: "Expert Mentorship", desc: "From a veteran Roblox builder and Gamr's technical team" },
                                    { title: "Publish Real Games", desc: "Support to publish real games and UGC on Roblox" },
                                    { title: "Revenue Path", desc: "Clear revenue-share path via Gamr Studios — DevEx + brand activations" }
                                ].map((item, idx) => (
                                    <li key={idx} className="flex gap-4">
                                        <div className="mt-1 w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                                            <Check className="w-3 h-3 text-blue-500" />
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold uppercase tracking-tight">{item.title}</h4>
                                            <p className="text-gray-400 mt-1">{item.desc}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            <div className="pt-8">
                                {isApplicationClosed ? (
                                    <div className="bg-blue-500/10 border border-blue-500/20 p-6 rounded-none text-center sm:text-left">
                                        <h4 className="text-xl font-bold uppercase tracking-tight mb-2">Applications for this cohort are now closed.</h4>
                                        <p className="text-gray-400">Stay connected with Gamr for future creator programs and upcoming sprints.</p>
                                    </div>
                                ) : (
                                    <>
                                        <Button
                                            className="bg-white text-black hover:bg-gray-200 rounded-none px-8 py-6 text-sm font-bold uppercase tracking-widest w-full sm:w-auto"
                                            asChild
                                        >
                                            <a href="https://docs.google.com/forms/d/e/1FAIpQLSfjUfZrHo1wfPIhrsFU5vDaNiN6MQkhKZmtEyH7xNSJVvWcbQ/viewform?usp=dialog" target="_blank" rel="noopener noreferrer">Apply Now</a>
                                        </Button>
                                        <p className="text-gray-500 text-sm mt-4 uppercase tracking-widest">Spots are limited.</p>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="bg-zinc-900 border border-white/10 p-8 lg:p-12 self-start sticky top-24">
                            <h3 className="text-2xl font-bold uppercase tracking-tighter mb-8 text-center">Program Structure</h3>
                            <div className="space-y-12 relative before:absolute before:left-[15px] before:top-2 before:bottom-2 before:w-[1px] before:bg-white/10">
                                {[
                                    { phase: "Phase 1", title: "Launch & Selection", desc: "Open call, applications, shortlisting 10–20 serious builders." },
                                    { phase: "Phase 2", title: "Build Sprint", desc: "30 days of structured sessions: Studio, scripting, world-building, monetization. Each participant ships at least one prototype; cohort ships at least one live experience." },
                                    { phase: "Phase 3", title: "Monetize & Showcase", desc: "We support you to monetize your worlds, track performance, and develop brand-ready demos." }
                                ].map((item, idx) => (
                                    <div key={idx} className="relative pl-12 group">
                                        <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-black border border-white/20 text-white flex items-center justify-center text-xs font-bold group-hover:border-blue-500 group-hover:text-blue-500 transition-colors z-10">
                                            {idx + 1}
                                        </div>
                                        <span className="text-blue-500 text-xs font-bold uppercase tracking-widest block mb-1">{item.phase}</span>
                                        <h4 className="text-xl font-bold uppercase tracking-tight mb-2">{item.title}</h4>
                                        <p className="text-gray-400 text-sm">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Key Outcomes & Eligibility */}
            <section className="py-20 bg-zinc-950/50">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="grid md:grid-cols-2 gap-16">
                        <div>
                            <h2 className="text-blue-500 font-bold uppercase tracking-widest text-sm mb-6">Key Outcomes</h2>
                            <ul className="space-y-4">
                                {[
                                    "Publish your first (or next) live Roblox experience",
                                    "Learn Luau and Roblox Studio in a production environment",
                                    "Join a network of African Roblox creators and potential future studios",
                                    "Get a path to earning via DevEx and brand activations"
                                ].map((item, idx) => (
                                    <li key={idx} className="flex gap-3">
                                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 shrink-0" />
                                        <span className="text-gray-300">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-blue-500 font-bold uppercase tracking-widest text-sm mb-6">Basic Eligibility</h2>
                            <ul className="space-y-4">
                                {[
                                    "Be at least 16 years old (parental consent required if under 18).",
                                    "Have basic to intermediate experience with Roblox Studio and Lua scripting.",
                                    "Provide a portfolio, published experience, or Roblox profile.",
                                    "Commit to a structured build sprint and meet milestones.",
                                    "Be open to feedback, collaboration, and community guidelines.",
                                    "Demonstrate interest in building engaging, monetizable experiences."
                                ].map((item, idx) => (
                                    <li key={idx} className="flex gap-3">
                                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 shrink-0" />
                                        <span className="text-gray-300">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                </div>
            </section>

            <RobloxFAQ />

            {/* Ready to Build CTA */}
            <section className="py-20 bg-zinc-950/50 border-t border-white/5">
                <div className="container mx-auto px-6 text-center">
                    <h3 className="text-3xl font-bold uppercase tracking-tighter mb-8">
                        {isApplicationClosed ? "Cohort 1 Applications are Closed" : "Ready to Build?"}
                    </h3>
                    {isApplicationClosed ? (
                        <Button
                            className="bg-transparent border border-white text-white hover:bg-white hover:text-black rounded-none px-12 py-8 text-lg font-bold uppercase tracking-widest"
                            asChild
                        >
                            <a href="/">Return to Homepage</a>
                        </Button>
                    ) : (
                        <Button
                            className="bg-blue-600 text-white hover:bg-blue-700 rounded-none px-12 py-8 text-lg font-bold uppercase tracking-widest shadow-lg shadow-blue-900/20"
                            asChild
                        >
                            <a href="https://docs.google.com/forms/d/e/1FAIpQLSfjUfZrHo1wfPIhrsFU5vDaNiN6MQkhKZmtEyH7xNSJVvWcbQ/viewform?usp=dialog" target="_blank" rel="noopener noreferrer">Apply Now</a>
                        </Button>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default GamrLab;
