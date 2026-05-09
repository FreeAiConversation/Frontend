'use client';

import { motion } from 'framer-motion';
import { Sparkles, DollarSign, Infinity, Lock } from 'lucide-react';

const stats = [
  { 
    value: '10+', 
    label: 'Premium Tools',
    icon: Sparkles,
  },
  { 
    value: '$0', 
    label: 'Always Free',
    icon: DollarSign,
  },
  { 
    value: '∞', 
    label: 'Unlimited Uses',
    icon: Infinity,
  },
  { 
    value: '100%', 
    label: 'Privacy First',
    icon: Lock,
  },
];

export function StatsBar() {
  return (
    <section className="border-t border-b border-border py-10 bg-bg-card relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.02)_0%,transparent_70%)] pointer-events-none" />
      
      <div className="max-w-container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                {/* Icon */}
                <motion.div
                  className="flex justify-center mb-3 text-text-secondary"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Icon className="w-6 h-6" />
                </motion.div>
                
                {/* Value */}
                <div className="text-[clamp(32px,4vw,48px)] font-black tracking-[-2px] leading-none">
                  {stat.value}
                </div>
                
                {/* Label */}
                <div className="text-[11px] text-text-secondary uppercase tracking-[1.5px] mt-1.5 font-semibold">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
