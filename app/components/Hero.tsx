import Image from "next/image";

// TODO: Replace with your own project photography
const PROJECT_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80",
    alt: "Project 1",
    className: "col-span-2 row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80",
    alt: "Project 2",
    className: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1600210492486-724fe3c67d46?w=800&q=80",
    alt: "Project 3",
    className: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    alt: "Project 4",
    className: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
    alt: "Project 5",
    className: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    alt: "Project 6",
    className: "col-span-2 row-span-1",
  },
];

type HeroProps = {
  onContactClick: () => void;
  onScheduleClick: () => void;
};

export default function Hero({ onContactClick, onScheduleClick }: HeroProps) {
  return (
    <section className="min-h-screen pt-24">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
        <div className="grid auto-rows-[minmax(180px,1fr)] grid-cols-2 gap-3 md:grid-cols-4 md:gap-4 lg:gap-5">
          {PROJECT_IMAGES.map((image) => (
            <div
              key={image.alt}
              className={`group relative min-h-[200px] overflow-hidden md:min-h-[240px] ${image.className}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-opacity duration-700 ease-out group-hover:opacity-90"
                priority={image.alt === "Project 1"}
              />
            </div>
          ))}
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
