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
    <section className="pb-16">
      <Container>
        <h2 className="text-2xl font-extrabold tracking-tight text-center mb-9">
          Why Choose Us?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="text-center p-7 border border-border rounded-lg transition-all duration-200 hover:border-border-hover hover:bg-bg-card"
              >
                <div className="flex justify-center mb-3">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <div className="text-[14px] font-bold mb-1">{feature.title}</div>
                <div className="text-[12px] text-text-muted leading-[1.5]">
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
