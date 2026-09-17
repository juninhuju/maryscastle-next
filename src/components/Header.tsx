'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const pathname = usePathname();

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  const navLinks = [
    { label: 'Início', href: '/' },
    { label: 'Capítulo', href: '/livro' },
    { label: 'Quiz', href: '/quiz' },
    { label: 'Materiais', href: '/downloads' },
    { label: 'Imagens', href: '/galeria' },
    { label: 'Autor', href: '/autor' },
    { label: 'Reinos', href: '/reinos' },
  ];

  return (
    <header className="site-header">
      <div className="navbar container-fluid">
        <Link href="/" className="brand-link">
          <span className="brand-title">O Castelo das Marias</span>
          <span className="brand-subtitle">um romance sobrenatural</span>
        </Link>

        <nav className="nav-links" aria-label="Navegação principal">
          {navLinks.map((link) => {
            const isActive =
              link.href === '/'
                ? pathname === '/'
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link ${isActive ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="audio-wrapper">
          <audio
            ref={audioRef}
            src="/magoaremix.mp3"
            preload="none"
            onEnded={() => setIsPlaying(false)}
          />
          <button
            type="button"
            className={`audio-toggle-btn ${isPlaying ? 'playing' : ''}`}
            onClick={toggleAudio}
            aria-label={
              isPlaying
                ? 'Pausar trilha sonora oficial'
                : 'Tocar trilha sonora oficial'
            }
            title={
              isPlaying ? 'Pausar trilha sonora' : 'Tocar trilha sonora oficial'
            }
          >
            <span className="audio-icon" aria-hidden="true">
              {isPlaying ? '⏸️' : '🎵'}
            </span>
            <span className="audio-status-text">
              {isPlaying ? 'Pausar Trilha' : 'Trilha Sonora'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}