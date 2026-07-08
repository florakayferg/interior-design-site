import Image from "next/image";

const COLLAGE_IMAGES = {
  porch: {
    src: "/images/porch-photo.jpg",
    alt: "Two women laughing on a white porch",
  },
  framing: {
    src: "/images/framing-photo.jpg",
    alt: "Construction framing walkthrough",
  },
  bed: {
    src: "/images/bed-detail.jpg",
    alt: "Quilted bedding detail",
  },
  floor: {
    src: "/images/floor-detail.jpg",
    alt: "Sunlit wood floor detail",
  },
};

type HeroProps = {
  onContactClick: () => void;
  onScheduleClick: () => void;
};

export default function Hero({ onContactClick, onScheduleClick }: HeroProps) {
  return (
    <section className="min-h-screen pt-24">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
        <div className="grid min-h-[520px] grid-cols-1 gap-3 sm:grid-cols-3 sm:grid-rows-2 md:min-h-[600px] md:gap-4 lg:min-h-[680px] lg:gap-5">
          <div className="group relative min-h-[240px] overflow-hidden sm:col-span-1 sm:row-span-2 sm:min-h-0">
            <Image
              src={COLLAGE_IMAGES.porch.src}
              alt={COLLAGE_IMAGES.porch.alt}
              fill
              sizes="(max-width: 640px) 100vw, 33vw"
              className="object-cover transition-opacity duration-700 ease-out group-hover:opacity-90"
              priority
            />
          </div>

          <div className="group relative min-h-[240px] overflow-hidden sm:col-span-1 sm:row-span-2 sm:min-h-0">
            <Image
              src={COLLAGE_IMAGES.framing.src}
              alt={COLLAGE_IMAGES.framing.alt}
              fill
              sizes="(max-width: 640px) 100vw, 33vw"
              className="object-cover transition-opacity duration-700 ease-out group-hover:opacity-90"
            />
          </div>

          <div className="group relative min-h-[200px] overflow-hidden sm:col-span-1 sm:row-span-1 sm:min-h-0">
            <Image
              src={COLLAGE_IMAGES.bed.src}
              alt={COLLAGE_IMAGES.bed.alt}
              fill
              sizes="(max-width: 640px) 100vw, 33vw"
              className="object-cover transition-opacity duration-700 ease-out group-hover:opacity-90"
            />
          </div>

          <div className="group relative min-h-[200px] overflow-hidden sm:col-span-1 sm:row-span-1 sm:min-h-0">
            <Image
              src={COLLAGE_IMAGES.floor.src}
              alt={COLLAGE_IMAGES.floor.alt}
              fill
              sizes="(max-width: 640px) 100vw, 33vw"
              className="object-cover transition-opacity duration-700 ease-out group-hover:opacity-90"
            />
          </div>
        </div>

        <div className="mt-16 border-t border-border pt-12 pb-20 md:mt-20 md:pt-16 md:pb-28">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-sm tracking-[0.25em] text-foreground/50 uppercase">
              Home is a creative pursuit
            </p>
            <h1 className="font-serif text-4xl leading-tight text-foreground md:text-5xl lg:text-6xl">
              Interiors crafted with intention
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-foreground/70 md:text-lg">
              We believe creating a home is a creative act — shaping rooms that
              reflect who you are, how you gather, and the life you are building
              within your walls.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
              <button
                type="button"
                onClick={onContactClick}
                className="min-w-[200px] border border-foreground bg-foreground px-8 py-3.5 text-sm tracking-[0.15em] text-background uppercase transition-colors duration-500 hover:bg-transparent hover:text-foreground"
              >
                Contact Us
              </button>
              <button
                type="button"
                onClick={onScheduleClick}
                className="min-w-[200px] border border-accent px-8 py-3.5 text-sm tracking-[0.15em] text-accent uppercase transition-colors duration-500 hover:bg-accent hover:text-background"
              >
                Schedule a Consultation
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
