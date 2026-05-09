import Link from 'next/link';
import { Container } from '@/components/ui/Container';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-7">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-center gap-3">
          <div className="text-[12px] text-text-dim">
            © {currentYear} Free AI Conversion.
          </div>
          <div className="flex gap-5">
            <Link
              href="#"
              className="text-[12px] text-text-muted hover:text-white transition-colors duration-200"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="text-[12px] text-text-muted hover:text-white transition-colors duration-200"
            >
              Terms
            </Link>
            <Link
              href="#"
              className="text-[12px] text-text-muted hover:text-white transition-colors duration-200"
            >
              Contact
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
