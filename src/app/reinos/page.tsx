import type { Metadata } from "next";
import Link from "next/link";
import { reinos } from "@/data/reinos";

export const metadata: Metadata = {
  title: "Os Quatro Reinos",
  description:
    "Conheça Lira, Natural, Cemitério e Encruzilhada: os quatro reinos que Joaquim atravessa em sua descida ao abismo no romance O Castelo das Marias.",
};

export default function ReinosPage() {
  return (
    <div className="container-fluid page-reinos">
      <h1>Os Quatro Reinos | Um mundo Sobrenatural</h1>
      <p className="lead">
        Conheça Lira, Natural, Cemitério e Encruzilhada: os quatro reinos que
        Joaquim atravessa em sua descida ao abismo, confrontando o amor traído,
        o rancor e as leis implacáveis do universo criado por Junior Cristovam.
      </p>

      <div className="cards-grid">
        {reinos.map((reino) => {
          const webpSrc = reino.imagemSrc
            ? reino.imagemSrc.replace(/\.webp$/, ".webp")
            : "";

          return (
            <article key={reino.slug} className="reino-card">
              <picture>
                {webpSrc && <source srcSet={webpSrc} type="image/webp" />}
                <img
                  loading="lazy"
                  decoding="async"
                  src={reino.imagemSrc}
                  alt={`Imagem do Reino ${reino.titulo}`}
                  className="card-img-top"
                />
              </picture>
              <div className="card-body">
                <h4 className="card-title">{reino.titulo}</h4>
                <p className="card-text">{reino.guardiao}</p>
                <p className="card-description">{reino.introducao}</p>
                <Link
                  className="reino-action"
                  href={reino.rota || `/reinos/${reino.slug}`}
                >
                  <span>Acessar reino</span>
                  <span className="reino-action-arrow" aria-hidden="true">
                    →
                  </span>
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
