"use client";

import CardBlog from "@/components/card/CardBlog";
import type { CarouselApi } from "@/components/ui/carousel";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { blogs } from "@/data/blog";
import { useDevice } from "@/hooks/useDevice";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const BlogCarousel = () => {
  const [count, setCount] = useState(0);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const { isMobile, isTablet, isDesktop } = useDevice();

  useEffect(() => {
    if (!api) return;

    const itemsPerSlide = isDesktop ? 3 : isTablet ? 2 : 1;
    const totalSlides = Math.ceil(blogs.length / itemsPerSlide);
    setCount(totalSlides);

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", onSelect);
    setCurrent(api.selectedScrollSnap());

    return () => {
      api.off("select", onSelect);
    };
  }, [api, isMobile, isTablet, isDesktop]);

  return (
    <>
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {blogs.map((blog) => (
            <CarouselItem key={blog._id} className="sm:basis-1/2 lg:basis-1/3">
              <CardBlog
                title={blog.title}
                excerpt={blog.excerpt}
                date={blog.date}
                author={blog.author}
                image={blog.image}
                slug={blog.slug}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        {isDesktop && (
          <>
            <CarouselPrevious className="-left-4! xl:-left-10!" />
            <CarouselNext className="-right-4! xl:-right-10!" />
          </>
        )}
      </Carousel>

      {isTablet && count > 0 && (
        <div className="mt-4 flex justify-center gap-2">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              className={cn(
                "h-2.5 w-2.5 rounded-full transition-all cursor-pointer hover:bg-(--clr-primary)",
                current === index ? "bg-(--clr-primary) w-5" : "bg-[#1b356c60]",
              )}
              onClick={() => api?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {isMobile && count > 0 && (
        <div className="mt-4 flex justify-center gap-2">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              className={cn(
                "h-2.5 w-2.5 rounded-full transition-all cursor-pointer hover:bg-(--clr-primary)",
                current === index ? "bg-(--clr-primary) w-5" : "bg-[#1b356c60]",
              )}
              onClick={() => api?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default BlogCarousel;
