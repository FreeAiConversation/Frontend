'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { Container } from '@/components/ui/Container';
import { Lock, Copy, RefreshCw, Check, Shield, Clock, Hash } from 'lucide-react';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

interface PasswordOptions {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
}

interface StrengthInfo {
  label: string;
  color: string;
  width: string;
  entropy: number;
  combinations: string;
  crackTime: string;
}

export function PasswordGeneratorTool() {
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);
  const [options, setOptions] = useState<PasswordOptions>({
    length: 16,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });
  const [strength, setStrength] = useState<StrengthInfo | null>(null);
  const sliderManual = useRef(false);

  const analyzePassword = useCallback((pw: string) => {
    if (!pw) {
      setStrength(null);
      return;
    }

    // Detect which character types are present
    let poolSize = 0;
    if (/[A-Z]/.test(pw)) poolSize += 26;
    if (/[a-z]/.test(pw)) poolSize += 26;
    if (/[0-9]/.test(pw)) poolSize += 10;
    if (/[^A-Za-z0-9]/.test(pw)) poolSize += 32;

    if (poolSize === 0) poolSize = 26; // fallback

    const entropy = Math.round(pw.length * Math.log2(poolSize));
    const combos = Math.pow(poolSize, pw.length);

    let label: string, color: string, width: string;
    if (entropy < 28) { label = 'Very Weak'; color = '#EF4444'; width = '15%'; }
    else if (entropy < 36) { label = 'Weak'; color = '#F97316'; width = '30%'; }
    else if (entropy < 60) { label = 'Fair'; color = '#F59E0B'; width = '50%'; }
    else if (entropy < 80) { label = 'Strong'; color = '#22C55E'; width = '75%'; }
    else { label = 'Very Strong'; color = '#10B981'; width = '100%'; }

    const combinations = combos > 1e15
      ? '10^' + Math.round(Math.log10(combos))
      : combos.toLocaleString();

    const seconds = combos / 1e10;
    let crackTime: string;
    if (seconds < 1) crackTime = 'Instant';
    else if (seconds < 60) crackTime = Math.round(seconds) + ' seconds';
    else if (seconds < 3600) crackTime = Math.round(seconds / 60) + ' minutes';
    else if (seconds < 86400) crackTime = Math.round(seconds / 3600) + ' hours';
    else if (seconds < 31536000) crackTime = Math.round(seconds / 86400) + ' days';
    else if (seconds < 3.154e9) crackTime = Math.round(seconds / 31536000) + ' years';
    else if (seconds < 3.154e12) crackTime = Math.round(seconds / 3.154e9) + ' billion years';
    else crackTime = '∞ (centuries+)';

    setStrength({ label, color, width, entropy, combinations, crackTime });
  }, []);

  const generatePassword = useCallback((overrideLength?: number) => {
    const len = overrideLength ?? options.length;
    let chars = '';
    if (options.uppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (options.lowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (options.numbers) chars += '0123456789';
    if (options.symbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (!chars) {
      setPassword('');
      setStrength(null);
      return;
    }

    const arr = new Uint32Array(len);
    crypto.getRandomValues(arr);
    let pw = '';
    for (let i = 0; i < len; i++) {
      pw += chars[arr[i] % chars.length];
    }

    setPassword(pw);
    setCopied(false);
    analyzePassword(pw);
  }, [options, analyzePassword]);

  // Generate only on initial mount
  useEffect(() => {
    generatePassword();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const copyPassword = async () => {
    if (!password) return;
    await navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const updateOption = (key: keyof PasswordOptions, value: boolean | number) => {
    setOptions((prev) => ({ ...prev, [key]: value }));
  };

  // Ensure at least one option is checked
  const toggleOption = (key: 'uppercase' | 'lowercase' | 'numbers' | 'symbols') => {
    const newValue = !options[key];
    const otherChecked = Object.entries(options)
      .filter(([k]) => k !== key && k !== 'length')
      .some(([, v]) => v === true);

    if (!newValue && !otherChecked) return; // Don't allow unchecking the last one
    updateOption(key, newValue);
  };

  return (
    <section className="py-16 md:py-20 relative">
      <Container>
        <Breadcrumb items={[
          { label: 'Tools', href: '/tools' },
          { label: 'Utilities', href: '/tools/utilities' },
          { label: 'Password Generator', href: '/tools/password-generator' },
        ]} />

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[11px] font-bold tracking-wider uppercase mb-4">
            <Lock className="w-3 h-3" />
            <span>Password Generator</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4">
            Password Generator
          </h1>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            Generate cryptographically secure passwords with customizable length, character types, and real-time strength analysis.
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Password Display */}
          <div className="border border-white/10 rounded-lg p-5 bg-white/[0.02]">
            <div className="flex items-center gap-3 mb-4">
              <input
                type="text"
                value={password}
                onChange={(e) => {
                  const newPw = e.target.value;
                  setPassword(newPw);
                  setCopied(false);
                  analyzePassword(newPw);
                  if (newPw.length <= 64) {
                    setOptions((prev) => ({ ...prev, length: Math.max(newPw.length, 1) }));
                  }
                }}
                placeholder="Type a password or click Generate"
                className="flex-1 p-4 bg-black/40 border border-white/10 rounded-md font-mono text-[15px] break-all min-h-[52px] focus:outline-none focus:border-white/30 transition-colors"
              />
              <button
                onClick={copyPassword}
                className="p-3 border border-white/10 rounded-md hover:bg-white/5 transition-colors flex-shrink-0"
                title="Copy to clipboard"
              >
                {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
              </button>
              <button
                onClick={() => generatePassword()}
                className="p-3 border border-white/10 rounded-md hover:bg-white/5 transition-colors flex-shrink-0"
                title="Regenerate"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>

            {/* Strength Meter */}
            {strength && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[12px] font-semibold text-text-muted uppercase tracking-wider">Strength</span>
                  <span className="text-[13px] font-bold" style={{ color: strength.color }}>
                    {strength.label}
                  </span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: strength.width, backgroundColor: strength.color }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="border border-white/10 rounded-lg p-5 bg-white/[0.02] space-y-5">
            <h3 className="text-[14px] font-bold">Settings</h3>

            {/* Length Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[12px] font-semibold text-text-muted uppercase tracking-wider">
                  Length
                </label>
                <span className="text-[13px] font-bold text-white">{options.length}</span>
              </div>
              <input
                type="range"
                min="4"
                max="64"
                value={options.length}
                onPointerDown={() => { sliderManual.current = true; }}
                onChange={(e) => {
                  const newLength = Number(e.target.value);
                  setOptions((prev) => ({ ...prev, length: newLength }));
                  if (sliderManual.current) {
                    generatePassword(newLength);
                  }
                }}
                onPointerUp={() => { sliderManual.current = false; }}
                className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between mt-1.5 text-[10px] text-text-dim">
                <span>4</span>
                <span>64</span>
              </div>
            </div>

            {/* Character Type Toggles */}
            <div>
              <label className="block text-[12px] font-semibold text-text-muted uppercase tracking-wider mb-3">
                Character Types
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { key: 'uppercase' as const, label: 'Uppercase', hint: 'A–Z' },
                  { key: 'lowercase' as const, label: 'Lowercase', hint: 'a–z' },
                  { key: 'numbers' as const, label: 'Numbers', hint: '0–9' },
                  { key: 'symbols' as const, label: 'Symbols', hint: '!@#$%' },
                ].map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => toggleOption(opt.key)}
                    className={`flex items-center justify-between p-3 rounded-md border transition-all text-left ${
                      options[opt.key]
                        ? 'border-white/30 bg-white/5'
                        : 'border-white/10 bg-transparent opacity-50'
                    }`}
                  >
                    <div>
                      <div className="text-[13px] font-semibold">{opt.label}</div>
                      <div className="text-[11px] text-text-dim">{opt.hint}</div>
                    </div>
                    <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                      options[opt.key] ? 'bg-white border-white' : 'border-white/30'
                    }`}>
                      {options[opt.key] && <Check className="w-3 h-3 text-black" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          {strength && (
            <div className="grid grid-cols-3 gap-3">
              <div className="border border-white/10 rounded-lg p-4 bg-white/[0.02] text-center">
                <div className="w-8 h-8 mx-auto mb-2 rounded-md bg-white/5 flex items-center justify-center">
                  <Hash className="w-4 h-4 text-white/60" />
                </div>
                <div className="text-[18px] font-black">{strength.entropy}</div>
                <div className="text-[11px] text-text-dim uppercase tracking-wider">Bits Entropy</div>
              </div>
              <div className="border border-white/10 rounded-lg p-4 bg-white/[0.02] text-center">
                <div className="w-8 h-8 mx-auto mb-2 rounded-md bg-white/5 flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white/60" />
                </div>
                <div className="text-[18px] font-black">{strength.combinations}</div>
                <div className="text-[11px] text-text-dim uppercase tracking-wider">Combinations</div>
              </div>
              <div className="border border-white/10 rounded-lg p-4 bg-white/[0.02] text-center">
                <div className="w-8 h-8 mx-auto mb-2 rounded-md bg-white/5 flex items-center justify-center">
                  <Clock className="w-4 h-4 text-white/60" />
                </div>
                <div className="text-[18px] font-black leading-tight">{strength.crackTime}</div>
                <div className="text-[11px] text-text-dim uppercase tracking-wider">Crack Time</div>
              </div>
            </div>
          )}

          {/* Privacy Note */}
          <div className="flex items-center justify-center gap-2 text-[12px] text-text-dim">
            <Lock className="w-3 h-3" />
            <span>Generated using Web Crypto API. Passwords never leave your device.</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
