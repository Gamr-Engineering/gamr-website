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
            <section className="relative pt-32 pb-12 md:pt-48 md:pb-32 px-6 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black z-0" />
                <div className="container mx-auto relative z-10 max-w-5xl text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6 animate-fade-in">
                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                        In partnership with LSETF
                    </div>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-none mb-6 uppercase animate-fade-in delay-100">
                        Build Africa<br />
                        <span className="text-blue-500">on Roblox</span>
                        <span className="block text-xl md:text-2xl text-red-500 font-bold uppercase tracking-widest mt-4">Summer Edition</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-4 leading-relaxed animate-fade-in delay-200">
                        A summer creator development program by Gamr Studios and Gamr Lab, helping young African builders learn, collaborate, and create real Roblox experiences inspired by Africa’s stories, cities, culture, and future.
                    </p>
                    <p className="text-sm md:text-base font-semibold text-white max-w-2xl mx-auto mb-10 uppercase tracking-[0.2em] animate-fade-in delay-200">
                        Build skills. Build worlds. Build Africa on Roblox.
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
                                <a href="https://forms.gle/j8GAMA9kg1PGQtQz6" target="_blank" rel="noopener noreferrer">
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
            <section id="overview" className="py-12 md:py-20 bg-zinc-950/50">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-24 md:gap-16">
                        <div className="space-y-6">
                            <h2 className="text-blue-500 font-bold uppercase tracking-widest text-sm">Program Overview</h2>
                            <h3 className="text-3xl md:text-4xl font-bold uppercase tracking-tighter leading-tight">
                                What this program is about
                            </h3>
                            <p className="text-gray-400 leading-relaxed">
                                Build Africa on Roblox — Summer Edition is designed to help African creators move from interest to execution. Through structured learning, mentorship, and project-based work, participants will develop the skills needed to build better Roblox experiences and understand how games, worlds, and digital IP can create real opportunities.
                            </p>
                            <p className="text-gray-400 leading-relaxed">
                                Following the success and learnings from our first Roblox cohort, we are taking the next step: a sharper, more execution-driven summer program focused on learning, building, collaboration, and shipping real Roblox experiences.
                            </p>
                        </div>
                        <div className="space-y-6">
                            <h2 className="text-blue-500 font-bold uppercase tracking-widest text-sm">Our Mission</h2>
                            <h3 className="text-3xl md:text-4xl font-bold uppercase tracking-tighter leading-tight">
                                Why LSETF & Gamr are doing this
                            </h3>
                            <p className="text-gray-400 leading-relaxed">
                                Africa has one of the youngest and most creative populations in the world, but many young people still need access to the tools, structure, mentorship, and opportunities required to turn their creativity into real digital careers.
                            </p>
                            <p className="text-gray-400 leading-relaxed">
                                Through this partnership, LSETF and Gamr are creating a practical pathway for young people to learn future-facing skills in game development, digital creation, collaboration, and entrepreneurship. Roblox is more than a gaming platform—it is a global creation ecosystem where young developers can build worlds, tell stories, create experiences, form teams, and earn from their work.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Who This Is For */}
            <section className="pt-12 pb-24 md:py-20 border-y border-white/5">
                <div className="container mx-auto px-6">
                    <div className="text-left md:text-center mb-16 max-w-3xl md:max-w-none md:mx-auto">
                        <h2 className="text-blue-500 font-bold uppercase tracking-widest text-sm mb-4">Who This Is For</h2>
                        <h3 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter">Built for Builders</h3>
                        <p className="text-gray-400 mt-4 text-base md:text-lg leading-relaxed">This program is designed for serious creators based in Lagos/Nigeria or active in the wider African gaming ecosystem.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: Code,
                                title: "Roblox Builders",
                                desc: "You already build, experiment, or create on Roblox"
                            },
                            {
                                icon: Trophy,
                                title: "Aspiring Creators",
                                desc: "Interested in scripting, game design, world-building, UI/UX, 3D environments, or storytelling"
                            },
                            {
                                icon: Monitor,
                                title: "Lagos & Africa Based",
                                desc: "Based in Lagos/Nigeria or part of the African gaming and creator ecosystem"
                            },
                            {
                                icon: Users,
                                title: "Committed Builders",
                                desc: "Serious about working with other committed creators and taking Roblox from hobby to career pathway"
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="p-8 border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-left md:text-center flex flex-col items-start md:items-center">
                                <item.icon className="w-8 h-8 text-blue-500 mb-6 md:mx-auto" />
                                <h4 className="text-xl font-bold uppercase tracking-tight mb-2">{item.title}</h4>
                                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 max-w-3xl mx-auto text-left md:text-center border border-white/10 bg-zinc-950 p-8">
                        <p className="text-lg text-gray-300 leading-relaxed">
                            <strong>You do not have to be a professional developer yet.</strong> But you do need to show intent. That could be through a Roblox profile, past project, portfolio, prototype, design work, or anything that proves you are genuinely interested in building.
                        </p>
                    </div>
                </div>
            </section>

            <GamrLabCarousel />

            {/* What you can expect & What you will build */}
            <section className="py-12 md:py-20 bg-black">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-24 lg:gap-16">
                        <div className="space-y-8">
                            <h2 className="text-blue-500 font-bold uppercase tracking-widest text-sm">Your Journey</h2>
                            <h3 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter mb-8">What you can expect</h3>

                            <ul className="space-y-6">
                                {[
                                    { title: "Practical Learning", desc: "Hands-on sessions on Roblox Studio, world-building, scripting, design, and experience creation." },
                                    { title: "Clear Milestones", desc: "Structured weekly sprints, deliverables, and clear feedback loops." },
                                    { title: "Studio Exposure", desc: "Learn directly from Gamr's technical team and see how a Roblox-focused studio thinks, builds, and ships." },
                                    { title: "Collaboration", desc: "Partner with a community of serious, young African Roblox builders and creators." },
                                    { title: "Future Pathways", desc: "Access future opportunities in Gamr Lab, Gamr Studios, partner networks, and the creator economy." }
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
                        </div>

                        <div className="space-y-8">
                            <h2 className="text-blue-500 font-bold uppercase tracking-widest text-sm">The Deliverable</h2>
                            <h3 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter mb-8">What you will build</h3>
                            <p className="text-gray-400 leading-relaxed">
                                Participants will work toward creating Roblox experiences inspired by African creativity, culture, cities, communities, stories, and futures.
                            </p>

                            <div className="grid sm:grid-cols-2 gap-6 mt-6">
                                {[
                                    { title: "African Worlds", desc: "African-inspired virtual worlds and settings" },
                                    { title: "Lagos Themes", desc: "Detailed Lagos-themed interactive environments" },
                                    { title: "Multiplayer", desc: "Social and multiplayer interactive experiences" },
                                    { title: "Culture & Edu", desc: "Educational or cultural Roblox experiences" },
                                    { title: "Mini-Games", desc: "Fast-paced mini-games and game mechanics" },
                                    { title: "AI-Enhanced NPCs", desc: "Smart gameplay ideas with AI-driven NPCs" }
                                ].map((item, idx) => (
                                    <div key={idx} className="p-6 border border-white/5 bg-zinc-950 hover:border-blue-500/30 transition-colors">
                                        <h4 className="font-bold text-white uppercase tracking-tight mb-2 text-sm">{item.title}</h4>
                                        <p className="text-gray-400 text-xs">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Apply Now — full-width, centered on PC, centered on mobile */}
                    {!isApplicationClosed && (
                        <div className="mt-12 text-center">
                            <Button
                                className="bg-white text-black hover:bg-gray-200 rounded-none px-8 py-6 text-sm font-bold uppercase tracking-widest w-full md:w-auto"
                                asChild
                            >
                                <a href="https://forms.gle/j8GAMA9kg1PGQtQz6" target="_blank" rel="noopener noreferrer">Apply Now</a>
                            </Button>
                            <p className="text-gray-500 text-sm mt-4 uppercase tracking-widest">Spots are limited.</p>
                        </div>
                    )}
                    {isApplicationClosed && (
                        <div className="mt-12 bg-blue-500/10 border border-blue-500/20 p-6 rounded-none text-center">
                            <h4 className="text-xl font-bold uppercase tracking-tight mb-2">Applications for this cohort are now closed.</h4>
                            <p className="text-gray-400">Stay connected with Gamr for future creator programs and upcoming sprints.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Program Timeline & Application Details */}
            <section className="py-12 md:py-20 bg-zinc-950/50">
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="grid md:grid-cols-2 gap-24 md:gap-16">
                        {/* Left Side: Timeline & Details */}
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-blue-500 font-bold uppercase tracking-widest text-sm mb-4">Program Details</h2>
                                <h3 className="text-4xl font-bold uppercase tracking-tighter mb-8">Timeline & Format</h3>
                            </div>
                            
                            <div className="space-y-6">
                                {[
                                    { label: "Program", value: "Build Africa on Roblox — Summer Edition" },
                                    { label: "Partners", value: "Gamr Studios & Gamr Lab in partnership with LSETF" },
                                    { label: "Period", value: "Summer 2026" },
                                    { label: "Format", value: "Structured hybrid learning, building, and project delivery" },
                                    { label: "Schedule", value: "Exact dates and session details will be shared with selected applicants" }
                                ].map((item, idx) => (
                                    <div key={idx} className="border-b border-white/10 pb-4">
                                        <span className="text-blue-500 text-xs font-bold uppercase tracking-widest block mb-1">{item.label}</span>
                                        <p className="text-white text-lg font-medium">{item.value}</p>
                                    </div>
                                ))}
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed mt-6">
                                Participants should expect a focused rhythm with learning sessions, assignments, build sprints, feedback, and project milestones.
                            </p>
                        </div>

                        {/* Right Side: How to Apply */}
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-blue-500 font-bold uppercase tracking-widest text-sm mb-4">How To Apply</h2>
                                <h3 className="text-4xl font-bold uppercase tracking-tighter mb-8">Application details</h3>
                            </div>
                            <p className="text-gray-400 leading-relaxed font-medium">
                                Apply for Build Africa on Roblox — Summer Edition, delivered by Gamr Studios and Gamr Lab in partnership with LSETF.
                            </p>
                            <p className="text-gray-400 leading-relaxed text-sm">
                                Spaces are limited. Applications will be reviewed on a rolling basis, and shortlisted candidates will be contacted with next steps. You’ll be asked to share details such as:
                            </p>
                            
                            <div className="bg-zinc-900 border border-white/10 p-8 space-y-6">
                                <h4 className="text-lg font-bold uppercase tracking-tight text-white">Required Fields</h4>
                                <ul className="space-y-4">
                                    {[
                                        "Your Roblox username",
                                        "Your past experience or portfolio",
                                        "Any projects you have built or contributed to",
                                        "Your availability",
                                        "Your skills and interests",
                                        "Why you want to join the program"
                                    ].map((item, idx) => (
                                        <li key={idx} className="flex items-center gap-3">
                                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full shrink-0" />
                                            <span className="text-gray-300 text-sm">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <RobloxFAQ />

            {/* Ready to Build CTA */}
            <section className="py-12 md:py-20 bg-zinc-950/50 border-t border-white/5">
                <div className="container mx-auto px-6 text-left md:text-center">
                    <h3 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-8">
                        {isApplicationClosed ? "Summer Edition Applications are Closed" : "Ready to Build?"}
                    </h3>
                    {isApplicationClosed ? (
                        <Button
                            className="bg-transparent border border-white text-white hover:bg-white hover:text-black rounded-none px-12 py-8 text-lg font-bold uppercase tracking-widest w-full md:w-auto"
                            asChild
                        >
                            <a href="/">Return to Homepage</a>
                        </Button>
                    ) : (
                        <Button
                            className="bg-blue-600 text-white hover:bg-blue-700 rounded-none px-12 py-8 text-lg font-bold uppercase tracking-widest shadow-lg shadow-blue-900/20 w-full md:w-auto text-center"
                            asChild
                        >
                            <a href="https://forms.gle/j8GAMA9kg1PGQtQz6" target="_blank" rel="noopener noreferrer">Apply Now</a>
                        </Button>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default GamrLab;
