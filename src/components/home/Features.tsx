import { Container } from '@/components/ui/Container';
import { Lock, Zap, Infinity, Bot } from 'lucide-react';

const features = [
  {
    icon: Lock,
    title: 'Privacy First',
    description: 'Files processed in your browser. Nothing uploaded to our servers.',
  },
  {
    icon: Zap,
    title: 'Instant Results',
    description: 'No waiting. Client-side processing for maximum speed.',
  },
  {
    icon: Infinity,
    title: 'Unlimited',
    description: 'No daily limits. No sign-up walls. Free forever.',
  },
  {
    icon: Bot,
    title: 'AI Powered',
    description: 'State-of-the-art AI for smart generation and optimization.',
  },
];

export function Features() {
  return (
    <section className="py-12 md:py-16 bg-bg relative overflow-hidden">
      <Container>
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-border mb-6">
            <Zap className="w-4 h-4 text-white" />
            <span className="text-xs font-semibold tracking-wide uppercase text-text-secondary">
              Key Benefits
            </span>
          </div>
          <h2 className="text-[clamp(32px,4vw,48px)] font-black tracking-tight mb-4">
            What Makes Us Different
          </h2>
          <p className="text-text-muted text-base md:text-lg max-w-2xl mx-auto">
            Built with your privacy, speed, and freedom in mind
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="text-center p-8 border border-border rounded-lg bg-bg-card transition-all duration-300 hover:border-border-hover hover:bg-bg-hover group"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-14 h-14 rounded-lg bg-white/5 border border-border flex items-center justify-center group-hover:bg-white/10 group-hover:border-border-hover transition-all duration-300">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                </div>
                <div className="text-base font-bold mb-2 group-hover:text-white transition-colors">
                  {feature.title}
                </div>
                <div className="text-sm text-text-muted leading-relaxed">
                  {feature.description}
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
