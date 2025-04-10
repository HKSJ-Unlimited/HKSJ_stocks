"use client"
import * as React from "react"

import { Card } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import position from "../../public/positions.jpeg";
import add from "../../public/add.jpeg";
import performance from "../../public/performance.jpg";
import transactions from "../../public/transactions.jpeg";
import Image from "next/image"

const images = [
    {
        id: 1,
        src: position,
        alt: "position",
    },
    {
        id: 2,
        src: add,
        alt: "add",
    },
    {
        id: 3,
        src: performance,
        alt: "performance",
    },
    {
        id: 4,
        src: transactions,
        alt: "transactions",
    },
    {
        id: 5,
        src: position,
        alt: "position",
    },
]

export function ImagesCaraousel() {
    const [api, setApi] = React.useState<CarouselApi>()
    const [current, setCurrent] = React.useState(0)
    const [count, setCount] = React.useState(0)

    React.useEffect(() => {
        if (!api) {
            return
        }

        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap() + 1)

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1)
        })
    }, [api])

    return (
        <div className="flex flex-col items-center justify-center gap-4 overflow-hidden py-8 md:py-16">
            <Carousel setApi={setApi} plugins={[
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                Autoplay({
                    delay: 3000,
                }),
            ]} className="mx-20">
                <CarouselContent>
                    {images.map(item => (
                        <CarouselItem key={item.id}>
                            <Card>
                                <Image
                                    src={item.src}
                                    alt={item.alt}
                                    className="object-cover object-center"
                                    quality={100}
                                />
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
            <div className="py-2 text-center text-sm text-muted-foreground">
                Slide {current} of {count}
            </div>
        </div>
    )
}
