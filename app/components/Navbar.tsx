export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 border-b border-border/60 bg-background/90 backdrop-blur-[2px]">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-12 lg:px-16">
        {/* TODO: Replace with your logo image or business name */}
        <a
          href="#"
          className="font-serif text-xl tracking-wide text-foreground transition-opacity duration-500 hover:opacity-70 md:text-2xl"
        >
          Atelier &amp; Co.
        </a>
        <p className="hidden text-sm tracking-[0.2em] text-foreground/60 uppercase sm:block">
          Interior Design Studio
        </p>
      </nav>
    </header>
  );
}
