import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
    {
        question: "What is the Roblox Builder Pathway?",
        answer: "Build Africa on Roblox — Summer Edition (Cohort 2) is a hardware-backed program at Gamr Lab in Lagos that helps African creators become Roblox developers. Selected builders get access to high-spec PCs, stable internet, mentorship, and a production-first curriculum to build and publish Afro-centric Roblox experiences."
    },
    {
        question: "Who is this program for?",
        answer: "It’s for serious, Africa-based creators who want to build on Roblox: scripters/programmers, 3D/environment artists, game designers, and technical creatives. You don’t need to be a pro already, but you must have basic skills, a portfolio or samples, and be ready to commit for 30 days of learning."
    },
    {
        question: "Do I need to pay to join?",
        answer: "No, there is no tuition fee for this pilot cohort. However, selection is competitive and based on your application, portfolio, and availability."
    },
    {
        question: "Do I need my own laptop or PC?",
        answer: "No. The program is hardware-backed. Accepted builders will have scheduled access to our gaming-grade workstations at Gamr Lab. If you have your own capable PC, that’s a plus and can supplement your lab time, but it’s not required."
    },
    {
        question: "Where and when does the program take place?",
        answer: "The program runs physically at Gamr Lab, Lagos, Nigeria, with a mix of in-person sessions and supported independent work. Cohort 2 exact session days and times will be shared with accepted participants."
    },
    {
        question: "What will I actually learn and build?",
        answer: (
            <>
                You’ll work inside Roblox Studio on real projects, covering:
                <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Luau scripting and core engine concepts</li>
                    <li>World-building, level design, and systems design</li>
                    <li>Monetization (passes, items, events) and basic analytics</li>
                </ul>
                <p className="mt-2">By the end of the program, each participant will have contributed to at least one playable experience with a strong Lagos/African theme.</p>
            </>
        )
    },
    {
        question: "Can I apply if I’m not in Lagos or can’t always come to the Lab?",
        answer: "Yes. As long as you have access to a laptop/PC that can run Roblox Studio and reasonably stable internet, you can apply. Lab rigs are an extra boost for those who need hardware support and will be prioritized for them."
    },
    {
        question: "What are you looking for in applications?",
        answer: (
            <>
                We’re looking for:
                <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Demonstrated interest or experience in games, code, 3D, or design</li>
                    <li>A basic portfolio</li>
                    <li>A clear idea of the African/Lagos experience you want to build</li>
                    <li>Realistic availability for the 30-day sprint</li>
                </ul>
            </>
        )
    },
    {
        question: "How do I apply?",
        answer: "Click the Apply Now button on this page and complete the application form. Shortlisted candidates will be contacted before final selection."
    }
];

const RobloxFAQ = () => {
    return (
        <section className="py-20 bg-black border-t border-white/5">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="text-center mb-16">
                    <h2 className="text-blue-500 font-bold uppercase tracking-widest text-sm mb-4">FAQ</h2>
                    <h3 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter">Got Questions?</h3>
                </div>

                <div className="bg-zinc-900/50 border border-white/5 p-6 md:p-8 rounded-lg">
                    <Accordion type="single" collapsible className="w-full space-y-4">
                        {faqData.map((item, idx) => (
                            <AccordionItem key={idx} value={`item-${idx}`} className="border-white/10 px-2 data-[state=open]:bg-white/5 data-[state=open]:border-blue-500/30 transition-colors rounded-lg">
                                <AccordionTrigger className="text-left text-lg md:text-xl font-bold uppercase tracking-tight hover:no-underline hover:text-blue-400 py-6">
                                    {item.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-400 text-base leading-relaxed pb-6">
                                    {item.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </section>
    );
};

export default RobloxFAQ;
