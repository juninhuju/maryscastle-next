"use client";

import { useEffect, useState, KeyboardEvent } from "react";

interface SlideItem {
  id: number;
  src: string;
  webpSrc: string;
  alt: string;
}

const slides: SlideItem[] = Array.from({ length: 25 }, (_, index) => ({
  id: index + 1,
  src: `/carrossel/${index + 1}.webp`,
  webpSrc: `/carrossel/${index + 1}.webp`,
  alt: `Imagem do carrossel ${index + 1} de O Castelo das Marias`,
}));

export default function ImageCarousel() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (
      isPaused ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % slides.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [isPaused]);

  const goToSlide = (index: number) => setActiveIndex(index);

  const goToPrevious = () =>
    setActiveIndex((currentIndex) =>
      currentIndex === 0 ? slides.length - 1 : currentIndex - 1,
    );

  const goToNext = () =>
    setActiveIndex((currentIndex) => (currentIndex + 1) % slides.length);

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goToPrevious();
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goToNext();
    }
  };

  const activeSlide = slides[activeIndex];

  return (
    <section
      className="image-carousel"
      aria-label="Galeria de imagens"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div className="carousel-stage">
        <div className="carousel-live" aria-live="polite" aria-atomic="true">
          <picture>
            <source srcSet={activeSlide.webpSrc} type="image/webp" />
            <img
              src={activeSlide.src}
              alt={activeSlide.alt}
              className="carousel-image"
            />
          </picture>
          <span className="sr-only">
            Imagem {activeIndex + 1} de {slides.length}
          </span>
        </div>
        <button
          type="button"
          className="carousel-control carousel-control-prev"
          onClick={goToPrevious}
          aria-label="Imagem anterior"
        >
          &#8249;
        </button>
        <button
          type="button"
          className="carousel-control carousel-control-next"
          onClick={goToNext}
          aria-label="Próxima imagem"
        >
          &#8250;
        </button>
      </div>

      <button
        type="button"
        className="carousel-pause"
        onClick={() => setIsPaused((paused) => !paused)}
        aria-pressed={isPaused}
      >
        {isPaused
          ? "Reproduzir automaticamente"
          : "Pausar reprodução automática"}
      </button>

      <div className="carousel-indicators" aria-label="Selecionar imagem">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            className={`carousel-indicator${index === activeIndex ? " active" : ""}`}
            onClick={() => goToSlide(index)}
            aria-label={`Ir para a imagem ${slide.id}`}
            aria-current={index === activeIndex ? "true" : undefined}
          />
        ))}
      </div>

      <p className="carousel-counter">
        {activeIndex + 1} / {slides.length}
      </p>
    </section>
  );
}
