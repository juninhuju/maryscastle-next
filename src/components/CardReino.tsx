import Link from "next/link";
import { Reino } from "@/types/reino";

interface CardReinoProps {
  reino: Reino;
}

export default function CardReino({ reino }: CardReinoProps) {
  const webpSrc = reino.imagemSrc
    ? reino.imagemSrc.replace(/\.webp$/, ".webp")
    : "";

  return (
    <article className="reino-card">
      <picture>
        {webpSrc && <source srcSet={webpSrc} type="image/webp" />}
        <img
          loading="lazy"
          decoding="async"
          alt={`Imagem do Reino ${reino.titulo} de O Castelo das Marias`}
          className="card-img-top"
          src={reino.imagemSrc}
        />
      </picture>

      <div className="card-body">
        <h4 className="card-title">{reino.titulo}</h4>
        <p className="card-text">{reino.guardiao}</p>
        <Link
          className="reino-action"
          href={reino.rota || `/reinos/${reino.slug}`}
        >
          <span>Descobrir Reino</span>
          <span className="reino-action-arrow" aria-hidden="true">
            →
          </span>
        </Link>
      </div>
    </article>
  );
}
