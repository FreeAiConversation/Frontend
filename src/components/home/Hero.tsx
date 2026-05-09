import { SearchBar } from './SearchBar';

interface HeroProps {
  onSearch: (query: string) => void;
}

export function Hero({ onSearch }: HeroProps) {
  return (
    <section className="pt-[calc(2rem+80px)] pb-2 px-6 text-center relative">
      {/* Subtle radial glow - Blue */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[radial-gradient(ellipse,rgba(100,150,255,0.12)_0%,transparent_70%)] pointer-events-none" />

      <div className="text-[clamp(38px,5.5vw,68px)] font-black tracking-[-3px] leading-[1.1] mb-5 relative z-10 animate-fade-in-up uppercase">
        Convert Anything.
      </div>

      {/* PAY NOTHING - Same width as Convert Anything */}
      <div className="flex items-center justify-center gap-2 md:gap-3 mb-5 relative z-10">
        <h3 className="text-[clamp(38px,5.5vw,68px)] font-black tracking-[-3px] bg-white text-black px-2 md:px-3 leading-[1.1] uppercase">
          PAY
        </h3>
        <h3 className="text-[clamp(38px,5.5vw,68px)] font-black tracking-[-3px] text-outline-grey leading-[1.1] uppercase">
          NOTHING.
        </h3>
      </div>

      <p className="text-[clamp(14px,1.8vw,17px)] text-text-muted max-w-[480px] mx-auto mb-9 leading-[1.7] relative z-10 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        Premium AI-powered tools for file conversion, image optimization, and content generation. 100% free, unlimited, and private.
      </p>

      <SearchBar onSearch={onSearch} />
    </section>
  );
}
