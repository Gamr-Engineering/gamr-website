import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel"
import { cn } from "@/lib/utils"

import img1 from "@/assets/gamrlab/gamr-lab-1.jpg";
import img2 from "@/assets/gamrlab/gamr-lab-2.jpg";
import img3 from "@/assets/gamrlab/gamr-lab-3.jpg"; 
import img4 from "@/assets/gamrlab/gamr-lab-4.jpg";
import img5 from "@/assets/gamrlab/gamr-lab-5.jpg";
import img6 from "@/assets/gamrlab/gamr-lab-6.jpg";

const slides = [
    { src: img1, alt: "Gamr Lab Workstations and Environment" },
    { src: img2, alt: "Players and Creators at Gamr Lab" },
    { src: img3, alt: "Collaborative Workspace" },
    { src: img4, alt: "High-Performance Gaming Setup" },
    { src: img5, alt: "Gamr Lab Community Event" },
    { src: img6, alt: "Gaming Lounge and Social Area" },
]

export default function GamrLabCarousel() {
    const [api, setApi] = React.useState<CarouselApi>()
    const [current, setCurrent] = React.useState(0)
    const [count, setCount] = React.useState(0)

    React.useEffect(() => {
        if (!api) {
            return
        }

        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap())

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap())
        })
    }, [api])

    return (
        <section className="pt-6 pb-12 md:py-20 bg-black overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div>
                        <h2 className="text-blue-500 font-bold uppercase tracking-widest text-sm mb-2">The Lab</h2>
                        <h3 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter">
                            Built for <span className="text-blue-500">Pros</span>
                        </h3>
                    </div>
                    <p className="text-gray-400 max-w-md text-sm md:text-base leading-relaxed hidden md:block text-left">
                        Train, build, and compete in a world-class facility equipped with high-performance hardware and stable power.
                    </p>
                </div>

                <div className="mx-auto">
                    <Carousel
                        setApi={setApi}
                        plugins={[
                            Autoplay({
                                delay: 4000,
                            }),
                        ]}
                        className="w-full"
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                    >
                        <CarouselContent className="-ml-4">
                            {slides.map((slide, index) => (
                                <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                                    <div className="p-1">
                                        <div className="overflow-hidden rounded-xl border border-white/10 aspect-video relative group">
                                            <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/10 transition-colors z-10 duration-500" />
                                            <img
                                                src={slide.src}
                                                alt={slide.alt}
                                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                            />
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <div className="hidden md:flex items-center justify-end gap-2 mt-8">
                            <CarouselPrevious className="static translate-y-0 translate-x-0 h-12 w-12 border-white/10 hover:bg-white/10 hover:text-white" />
                            <div className="flex gap-2 mx-4">
                                {Array.from({ length: count }).map((_, index) => (
                                    <button
                                        key={index}
                                        className={cn(
                                            "w-2.5 h-2.5 rounded-full transition-all duration-300",
                                            current === index ? "bg-blue-500 w-8" : "bg-white/20 hover:bg-white/40"
                                        )}
                                        onClick={() => api?.scrollTo(index)}
                                        aria-label={`Go to slide ${index + 1}`}
                                    />
                                ))}
                            </div>
                            <CarouselNext className="static translate-y-0 translate-x-0 h-12 w-12 border-white/10 hover:bg-white/10 hover:text-white" />
                        </div>
                        
                        {/* Mobile Pagination */}
                        <div className="flex md:hidden justify-center gap-2 mt-6">
                             {Array.from({ length: count }).map((_, index) => (
                                <button
                                    key={index}
                                    className={cn(
                                        "w-2 h-2 rounded-full transition-all duration-300",
                                        current === index ? "bg-blue-500 w-6" : "bg-white/20"
                                    )}
                                    onClick={() => api?.scrollTo(index)}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>
                    </Carousel>
                </div>
            </div>
        </section>
    )
}
